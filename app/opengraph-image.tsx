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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 96, height: 64, borderRadius: 12, background: "#ffffff" }}>
              <svg width="86" height="58" viewBox="0 0 120 80" fill="none">
                <path
                  d="M12 15h96c-.8 3.8-4.8 6-12.4 6H77.8c-6 0-9.8 2.2-11.1 6.3-.8 2.4-.1 5 2 7.4 1.6 1.8 2.7 3.5 3.2 5 .7 2.4-.2 4.2-2.7 5.3-2.3 1-5.4 1.5-9.2 1.5s-6.9-.5-9.2-1.5c-2.5-1.1-3.4-2.9-2.7-5.3.5-1.5 1.6-3.2 3.2-5 2.1-2.4 2.8-5 2-7.4C52 23.2 48.2 21 42.2 21H24.4C16.8 21 12.8 18.8 12 15Z"
                  fill="#050505"
                />
                <path
                  d="M52.5 43.4c2.1 1 4.6 1.5 7.5 1.5s5.4-.5 7.5-1.5c-.8 3-2.2 5.7-4.2 8.1-1.5 1.8-2.3 3.8-2.3 6v4.2h24.5c5.1 0 9.1 2 12 6H22.5c2.9-4 6.9-6 12-6H59v-4.2c0-2.2-.8-4.2-2.3-6-2-2.4-3.4-5.1-4.2-8.1Z"
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
