import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";

const frameMetadata = getFrameMetadata({
  buttons: [{ label: "Discover Your Friends!" }],
  image: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/purple-dao/image/first`,
  post_url: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/purple-dao?page=0`,
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
