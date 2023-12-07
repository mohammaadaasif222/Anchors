import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { google } from "googleapis";
import nodemailer from 'nodemailer'
import url from "url";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "*" }));

function extractVideoId(videoUrl) {
  const videoId = url.parse(videoUrl, true).query.v;
  return videoId;
}
const youtube = google.youtube({
  version: "v3",
  auth: process.env.YT_API,
});


const fetchVideoDetails = async (videoUrl) => {
  try {
    const videoId = extractVideoId(videoUrl);
    const videoResponse = await youtube.videos.list({
      part: "snippet, statistics",
      id: videoId,
    });

    const videoDetails = videoResponse.data.items[0];
    const channelId = videoDetails.snippet.channelId;

    const channelResponse = await youtube.channels.list({
      part: "statistics",
      id: channelId,
    });

    const channelDetails = channelResponse.data.items[0];
    const {viewCount,likeCount, commentCount} = videoDetails.statistics
    const {subscriberCount} = channelDetails.statistics
    const earnings = Math.min(subscriberCount, viewCount)+10 * commentCount+5 *likeCount
    const thumbnail = videoDetails.snippet.thumbnails.default.url
    const uploadedOn = videoDetails.snippet.publishedAt;
    return {
      title: videoDetails.snippet.title,
      views: viewCount,
      likes: likeCount,
      comments:commentCount,
      subscriberCount: subscriberCount,
      earnings,
      thumbnail,
      uploadedOn,
    };
  } catch (error) {
    throw new Error("Error fetching video details:", error);
  }
};

app.post("/api/getVideoDetails", async (req, res) => {
  try {
    const { videoUrl } = req.body;

    if (!videoUrl) {
      return res
        .status(400)
        .json({ error: "Video URL is required in the request body." });
    }
    const videoDetails = await fetchVideoDetails(videoUrl);
    res.json({ videoDetails });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching video details." });
  }
});


app.post('/api/send-email', async (req, res) => {
  const { name, number, message } = req.body;
  

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD, 
    },
  });

  // Setup email data
  let mailOptions = {
    from: 'kasifsaif784@gmail.com',
    to: ' ravi@anchors.in',
    subject: 'Test mail', 
    text: `User Name: ${name}\nMobile Number : ${number}\nMessage: ${message}`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    res.status(200).send('Email sent successfully'); 
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email'); // Send error response
  }
});


app.get("/", async (req, res) => {
  res.status(200).json({
    message: "hello world",
  });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080!");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
