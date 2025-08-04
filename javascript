// api/ai/generate-reply.js
import OpenAI from 'openai';

const openai = new OpenAI(process.env.OPENAI_KEY);

export default async function handler(req, res) {
  const { commentId } = req.body;
  
  try {
    const prompt = `
      คุณเป็นผู้ช่วยตอบคอมเมนต์ Facebook สำหรับธุรกิจ
      โปรดตอบคำถามต่อไปนี้อย่างเป็นมืออาชีพแต่เป็นกันเอง:
      "${commentText}"
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    res.status(200).json({ reply: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
