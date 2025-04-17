import { YoutubeTranscript } from "youtube-transcript";
import { PrismaClient } from "@prisma/client";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
const ytdl = require("@distube/ytdl-core");

// async function getYouTubeTitle(url) {
//   try {
//     const info = await ytdl.getInfo(url);
//     return info.videoDetails.title;
//   } catch (error) {
//     console.error("ytdl-core Error:", error);
//     return null;
//   }
// }
const prisma = new PrismaClient();

export async function POST(req) {
  // const ytdl = (await import("@distube/ytdl-core")).default;
  try {
    const body = await req.json();
    const url = body.url;
    if (!url) {
      return new Response(JSON.stringify({ error: "URL not provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    
    if (!prisma.videos) {
      throw new Error("Model 'videos' is not defined in the Prisma client.");
    }
    ytdl
      .getBasicInfo(
        url
      )
      .then(async(info) => {
        console.log(info.videoDetails.title);
        const newVideoTitle = await prisma.videos.create({
          data: {
            title: info.videoDetails.title,
            urls: [info.videoDetails.title, url],
          },
        });
      });
    const transcript = await YoutubeTranscript.fetchTranscript(url);

    return new Response(JSON.stringify(transcript), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}