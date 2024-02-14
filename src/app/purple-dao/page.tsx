import { getFrameMetadata } from "@coinbase/onchainkit";
import type { Metadata } from "next";

const frameMetadata = getFrameMetadata({
  buttons: [
    { label: "Discover Your Friends!" },
    {
      action: "post_redirect",
      label: "Download CSV",
    },
  ],
  image: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/purple-dao/image/first`,
  post_url: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/purple-dao/main?page=0&first=true`,
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
