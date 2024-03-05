import { join } from "path";
import satori from "satori";
import * as fs from "fs";

const concertOneFontPath = join(process.cwd(), "ConcertOne-Regular.ttf");
let concertOneFontData = fs.readFileSync(concertOneFontPath);

const captchaImagePath = join(process.cwd(), "public", "captcha.png");
const captchaImageData = fs.readFileSync(captchaImagePath);
const captchaImageBase64 = `data:image/png;base64,${captchaImageData.toString(
  "base64"
)}`;

export const generateCaptchaImageSvg = async (
  numA: number,
  numB: number
): Promise<string> => {
  return await satori(
    <div
      style={{
        backgroundImage: `url(${captchaImageBase64})`,
        backgroundSize: "contain", // or 'contain' depending on your needs
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-around",
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#FFF",
          position: "absolute",
          right: 20,
          display: "flex",
          bottom: 38,
          fontSize: "5px",
          borderRadius: "1px",
          fontFamily: "ConcertOne-Regular", // use the font name here
          color: "#000", // change this to the color you want for the text
          paddingTop: "2px",
          paddingBottom: "2px",
          paddingRight: "10px",
          paddingLeft: "10px",
        }}
      >
        {numA} + {numB}
      </div>
    </div>,
    {
      width: 195.8,
      height: 102.4,
      fonts: [
        {
          data: concertOneFontData,
          name: "ConcertOne-Regular.ttf",
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
};
