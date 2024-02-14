import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";

const frameMetadata = getFrameMetadata({
  buttons: [
    { label: "Discover Your Friends!" },
    {
      action: "link",
      label: "Download CSV",
      target: `https://explorer.airstack.xyz/token-balances?address=fc_fid%3A${fid}&rawInput=%23%E2%8E%B1fc_fid%3A${fid}%E2%8E%B1%28fc_fid%3A${fid}++ethereum+null%29&inputType=&tokenType=&activeView=&activeTokenInfo=&activeSnapshotInfo=&tokenFilters=&activeViewToken=&activeViewCount=&blockchainType=&sortOrder=&spamFilter=&mintFilter=&resolve6551=&activeSocialInfo=farcaster%E2%94%82vitalik.eth%E2%94%82${fid}%E2%94%820%E2%94%82135744%E2%94%82%E2%94%82%E2%94%8272%E2%94%82%E2%94%82%23%E2%8E%B10xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60%E2%8E%B1%280xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60+ADDRESS+ethereum+null%29`,
    },
  ],
  image: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/purple-dao/image/first`,
  post_url: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/purple-dao/main?page=0`,
});

export const metadata: Metadata = {
  title: "Airstack Purple DAO Friends Frames",
  description: "Airstack Purple DAO Friends Frames",
  openGraph: {
    title: "Airstack Purple DAO Friends Frames",
    description: "Airstack Purple DAO Friends Frames",
    images: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/purple-dao/image/first`,
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Airstack Purple DAO Friends Frames</h1>
    </>
  );
}
