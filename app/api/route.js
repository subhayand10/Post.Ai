import { YoutubeTranscript } from "youtube-transcript";
import { PrismaClient } from "@prisma/client";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
const prisma = new PrismaClient();

export async function POST(req) {
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

    const execAsync = promisify(exec);
    
    // Get the full path to yt-dlp.exe
    const exePath = path.join(process.cwd(), 'app', 'api', 'yt-dlp.exe');
    
    // Use the full path in the command
    const command = `"${exePath}" -e "${url}"`;
    
    const { stdout } = await execAsync(command, {
      windowsHide: true,
    });

    const lines = JSON.stringify(stdout).trim().split("\n");
    const newVideoTitle = await prisma.videos.create({
      data: {
        title: lines[0],
        urls: [lines[0], url],
      },
    });
    console.log(lines[0])
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