import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const robotoMono400 = fetch(
    new URL(
      "../../../../../node_modules/@fontsource/roboto-mono/files/roboto-mono-latin-400-normal.woff",
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
          backgroundColor: "white",
        }}
      >
        <h1>Test Generated image</h1>
        <img
          alt="Nailong"
          height="300px"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk940wLtBSwksi6CzSgpJdv8sYG4U-TIMY3g&usqp=CAU"
        />
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
