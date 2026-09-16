import { ImageResponse } from "next/og";

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
          background: "#0f1219",
          color: "#eef1f7",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#8b93a7" }}>
          Software Engineer
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, letterSpacing: -2 }}>Sahil Shitole</div>
          <div style={{ fontSize: 32, marginTop: 12, color: "#9bb0ff" }}>Backend Systems × Applied AI</div>
        </div>
        <div style={{ fontSize: 22, color: "#8b93a7" }}>~1.5 years · Pune, India</div>
      </div>
    ),
    size,
  );
}
