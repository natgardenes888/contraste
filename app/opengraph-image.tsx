import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CONTRASTE - Lo que tu algoritmo no te enseña";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#fbfaf7",
          color: "#151412",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 82, height: 58, borderRadius: 14, background: "#ffffff" }}>
              <svg width="72" height="48" viewBox="0 0 96 64" fill="none">
                <path
                  d="M7 14h82c-.8 3.1-3.9 5-9.1 5H63.8c-5.4 0-8.2 2.2-8.2 6.1 0 2.4 1.7 4 4 5.3 2.9 1.7 3.8 4.7 1.5 6.6-1.1.9-2.8 1.5-5 1.8-2.4.4-3.2 2.3-1.2 3.6 1.8 1.2 2.5 3.1 1.5 4.9-.6 1.1-2 2-4 2.8-2.5.9-3.8 2.5-3.8 4.8v2.7H77c3.6 0 6.4 1.5 8.3 4.4H10.7c1.9-2.9 4.7-4.4 8.3-4.4h28.4v-2.7c0-2.3-1.3-3.9-3.8-4.8-2-.8-3.4-1.7-4-2.8-1-1.8-.3-3.7 1.5-4.9 2-1.3 1.2-3.2-1.2-3.6-2.2-.3-3.9-.9-5-1.8-2.3-1.9-1.4-4.9 1.5-6.6 2.3-1.3 4-2.9 4-5.3 0-3.9-2.8-6.1-8.2-6.1H16.1C10.9 19 7.8 17.1 7 14Z"
                  fill="#050505"
                />
              </svg>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: 7 }}>CONTRASTE</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 22, height: 22, borderRadius: 11, background: "#3657d8" }} />
            <div style={{ width: 22, height: 22, borderRadius: 11, background: "#df755f" }} />
            <div style={{ width: 22, height: 22, borderRadius: 11, background: "#6d8a72" }} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
          <div style={{ fontSize: 78, lineHeight: 1.04, fontWeight: 700 }}>
            Lo que tu algoritmo no te enseña.
          </div>
          <div style={{ marginTop: 30, fontSize: 30, lineHeight: 1.35, color: "#45484a" }}>
            Ideas virales contrastadas con argumentos, evidencia y preguntas mejores.
          </div>
        </div>
        <div style={{ display: "flex", width: "100%", height: 12 }}>
          <div style={{ flex: 1, background: "#3657d8" }} />
          <div style={{ flex: 1, background: "#df755f" }} />
          <div style={{ flex: 1, background: "#6d8a72" }} />
          <div style={{ flex: 1, background: "#c29b3b" }} />
        </div>
      </div>
    ),
    size
  );
}
