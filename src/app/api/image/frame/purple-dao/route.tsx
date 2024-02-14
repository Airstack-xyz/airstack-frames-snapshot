import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const fid = req.nextUrl.searchParams.get("fid");

  const robotoMono400 = fetch(
    new URL(
      "../../../../../../node_modules/@fontsource/roboto-mono/files/roboto-mono-latin-400-normal.woff",
      import.meta.url
    )
  ).then((res) => res.arrayBuffer());
  const { data } = await fetch(
    `http://localhost:3000/api/airstack/purple-dao?fid=${fid}`
  ).then((res) => res.json());

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
        <div style={{ display: "flex", gap: 20 }}>
          {data?.slice(0, 3)?.map(
            (
              // @ts-ignore
              { profileName, userId, profileImageContentValue },
              key: number
            ) => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                key={key}
              >
                <img
                  src={profileImageContentValue?.image?.medium}
                  width="250px"
                  height="250px"
                  alt="Profile Image"
                  style={{
                    objectFit: "cover",
                    objectPosition: "25% 25%",
                    borderRadius: "50%",
                  }}
                />
                <b>@{profileName}</b>
                <p>FID {userId}</p>
              </div>
            )
          )}
        </div>
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
            src="https://airstack-frames-snapshot.vercel.app/logo.png"
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
