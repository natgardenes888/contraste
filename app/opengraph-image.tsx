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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, borderRadius: 16, background: "#12110F" }}>
              <svg width="54" height="54" viewBox="0 0 64 64" fill="none">
                <path
                  d="M13.5 15.5h37c-.9 3.7-3.8 5.7-8.7 6l-6 .4c-3.3.2-5.4 1.6-6.1 4.2-.5 1.9.2 3.7 2.1 5.5 1.6 1.5 2.4 3.1 2.4 4.8 0 2.1-1.2 3.8-3.5 5-1.6.8-2.4 2-2.4 3.5v4.6h9.5c4.2 0 7.2 1.6 9 4.8H17.2c1.8-3.2 4.8-4.8 9-4.8h9.5v-4.6c0-1.5-.8-2.7-2.4-3.5-2.3-1.2-3.5-2.9-3.5-5 0-1.7.8-3.3 2.4-4.8 1.9-1.8 2.6-3.6 2.1-5.5-.7-2.6-2.8-4-6.1-4.2l-6-.4c-4.9-.3-7.8-2.3-8.7-6Z"
                  fill="#F8F5EE"
                />
                <path
                  d="M18.5 20.5c3.3 3.3 5.1 6.9 5.5 10.8.4 4-1 7.6-4.2 10.7M45.5 20.5c-3.3 3.3-5.1 6.9-5.5 10.8-.4 4 1 7.6 4.2 10.7"
                  stroke="#F8F5EE"
                  strokeWidth="2"
                  strokeLinecap="round"
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
