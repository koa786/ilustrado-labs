import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0F172A",
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="rotate(20 50 50)">
            <rect
              x="24"
              y="20"
              width="17"
              height="60"
              rx="8.5"
              fill="url(#iconLeftGrad)"
            />
            <rect
              x="47"
              y="14"
              width="17"
              height="50"
              rx="8.5"
              fill="url(#iconRightGrad)"
            />
          </g>
          <defs>
            <linearGradient id="iconLeftGrad" x1="32.5" y1="80" x2="32.5" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00E5FF" />
              <stop offset="50%" stopColor="#0088FF" />
              <stop offset="100%" stopColor="#0044FF" />
            </linearGradient>
            <linearGradient id="iconRightGrad" x1="55.5" y1="64" x2="55.5" y2="14" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0022AA" />
              <stop offset="45%" stopColor="#0066FF" />
              <stop offset="100%" stopColor="#00E5FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
