import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const robotoMono400 = fetch(
    new URL(
      "../../../../../../node_modules/@fontsource/roboto-mono/files/roboto-mono-latin-400-normal.woff",
      import.meta.url
    )
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          fontSize: 20,
          fontWeight: 600,
        }}
      >
        <h1>
          <b>Validation Successful!</b>
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Powered By{" "}
          <img
            alt="Airstack Logo"
            height="100px"
            src={`${process.env.NEXT_PUBLIC_HOSTNAME}/logo.png`}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Roboto_Mono_400", data: await robotoMono400, weight: 400 },
      ],
    }
  );
}

export const runtime = "edge";
