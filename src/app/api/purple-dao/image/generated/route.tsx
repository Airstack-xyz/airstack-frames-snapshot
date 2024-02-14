import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import type { PurpleDaoFriends } from "../../main/route";

export async function GET(req: NextRequest) {
  const data = JSON.parse(req.nextUrl.searchParams.get("data") ?? "{}");
  const page = Number(req.nextUrl.searchParams.get("page"));

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
        <div style={{ display: "flex", gap: 20 }}>
          {data
            ?.slice(3 * page, 3 * (page + 1))
            ?.map(
              (
                {
                  profileName,
                  userId,
                  profileImageContentValue,
                }: PurpleDaoFriends,
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
                    src={
                      profileImageContentValue?.image
                        ? profileImageContentValue?.image?.medium
                        : "https://assets.airstack.xyz/image/social/UwRcrit0laZuAeHxVt8ii/y+ABH8d39zpXpBTHQwH00=/medium.png"
                    }
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
