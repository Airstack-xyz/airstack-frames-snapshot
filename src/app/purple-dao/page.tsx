import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";

const frameMetadata = getFrameMetadata({
  buttons: [{ label: "Discover Your Friends!" }],
  image:
    "https://airstack-frames-snapshot.vercel.app/api/image/first-purple-dao",
  post_url: "https://airstack-frames-snapshot.vercel.app/api/purple-dao",
});

export const metadata: Metadata = {
  title: "Airstack Purple DAO Friends Frames",
  description: "Airstack Purple DAO Friends Frames",
  openGraph: {
    title: "Airstack Purple DAO Friends Frames",
    description: "Airstack Purple DAO Friends Frames",
    images:
      "https://airstack-frames-snapshot.vercel.app/api/image/first-purple-dao",
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
