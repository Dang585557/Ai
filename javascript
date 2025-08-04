// api/facebook/get-comments.js
import { FacebookApi } from 'facebook-api-v2';
import axios from 'axios';

export default async function handler(req, res) {
  const { postUrl } = req.body;

  // 1. ดึงข้อมูลจาก Facebook Graph API
  const fbApi = new FacebookApi({
    appId: process.env.FB_APP_ID,
    appSecret: process.env.FB_APP_SECRET,
    accessToken: process.env.FB_PAGE_TOKEN
  });

  try {
    const postId = extractPostId(postUrl); // ฟังก์ชันแยก Post ID
    const comments = await fbApi.get(`/${postId}/comments`);

    // 2. ส่งคอมเมนต์ไปให้ Frontend
    res.status(200).json({ comments: formatComments(comments.data) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
