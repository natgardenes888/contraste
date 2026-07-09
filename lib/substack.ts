const FEED_URL = "https://gardenat2am.substack.com/feed";

export type Writing = {
  slug: string;
  title: string;
  description: string;
  url: string;
  author: string;
  publishedAt: string;
  image?: string;
  content: string;
};

function cdata(item: string, tag: string) {
  const escapedTag = tag.replace(":", "\\:");
  const match = item.match(
    new RegExp(`<${escapedTag}(?:\\s[^>]*)?>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${escapedTag}>`)
  );
  return (match?.[1] ?? "").trim();
}

function decodeXml(value: string) {
  let decoded = value;

  // Feeds can contain numeric entities encoded once or twice, for example
  // &amp;#237;. Two passes convert both forms without touching ordinary text.
  for (let pass = 0; pass < 2; pass += 1) {
    decoded = decoded
      .replace(/&#(\d+);/g, (_, number: string) => safeCodePoint(Number.parseInt(number, 10)))
      .replace(/&#x([0-9a-f]+);/gi, (_, number: string) => safeCodePoint(Number.parseInt(number, 16)))
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&apos;|&#39;/g, "'");
  }

  return decoded;
}

function safeCodePoint(codePoint: number) {
  return Number.isInteger(codePoint) && codePoint >= 0 && codePoint <= 0x10ffff
    ? String.fromCodePoint(codePoint)
    : "";
}

function sanitizeSubstackHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/<form[\s\S]*?<\/form>/gi, "")
    .replace(/<div[^>]*class="[^"]*subscription-widget[^"]*"[\s\S]*?<\/form>\s*<\/div>\s*<\/div>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/href="javascript:[^"]*"/gi, 'href="#"')
    .replace(/<a /gi, '<a target="_blank" rel="noreferrer" ');
}

export async function getWritings(): Promise<Writing[]> {
  try {
    const response = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!response.ok) return [];

    const xml = await response.text();
    return Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g)).map((match) => {
      const item = match[1];
      const url = decodeXml(cdata(item, "link"));
      const image = item.match(/<enclosure[^>]+url="([^"]+)"/)?.[1];

      return {
        slug: url.split("/").filter(Boolean).pop() ?? "",
        title: decodeXml(cdata(item, "title")),
        description: decodeXml(cdata(item, "description")),
        url,
        author: decodeXml(cdata(item, "dc:creator")) || "nat",
        publishedAt: cdata(item, "pubDate"),
        image: image ? decodeXml(image) : undefined,
        content: sanitizeSubstackHtml(cdata(item, "content:encoded"))
      };
    });
  } catch {
    return [];
  }
}

export async function getWriting(slug: string) {
  return (await getWritings()).find((writing) => writing.slug === slug);
}
