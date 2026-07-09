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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 58, height: 58, borderRadius: 14, background: "#ffffff" }}>
              <div
                style={{
                  width: 44,
                  height: 36,
                  background: "#050505",
                  clipPath: "polygon(0 0,100% 0,92% 13%,70% 18%,58% 32%,58% 54%,68% 66%,58% 74%,66% 86%,86% 90%,92% 100%,8% 100%,14% 90%,34% 86%,42% 74%,32% 66%,42% 54%,42% 32%,30% 18%,8% 13%)"
                }}
              />
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
