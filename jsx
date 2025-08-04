// src/pages/FacebookCommentAI.js
import { useState } from 'react';
import axios from 'axios';

export default function FacebookCommentAI() {
  const [postUrl, setPostUrl] = useState('');
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post('/api/facebook/get-comments', { postUrl });
      setComments(res.data.comments);
    } catch (error) {
      alert('Error fetching comments: ' + error.message);
    }
    setIsLoading(false);
  };

  const generateReply = async (commentId) => {
    try {
      const res = await axios.post('/api/ai/generate-reply', { commentId });
      return res.data.reply;
    } catch (error) {
      console.error('AI Error:', error);
      return "ขออภัย ไม่สามารถสร้างคำตอบได้ในขณะนี้";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        value={postUrl}
        onChange={(e) => setPostUrl(e.target.value)}
        placeholder="วางลิงก์โพสต์ Facebook"
        className="w-full p-3 border rounded"
      />
      <button 
        onClick={fetchComments}
        className="bg-blue-500 text-white p-3 rounded mt-2"
        disabled={isLoading}
      >
        {isLoading ? 'กำลังโหลด...' : 'ดึงคอมเมนต์'}
      </button>

      <div className="mt-6 space-y-4">
        {comments.map(comment => (
          <CommentBlock 
            key={comment.id} 
            comment={comment} 
            onGenerate={generateReply}
          />
        ))}
      </div>
    </div>
  );
}
