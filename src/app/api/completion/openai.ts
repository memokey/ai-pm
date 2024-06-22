import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_SECRET_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { input } = req.body;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          messages: input,
          max_tokens: 150,
          model: "gpt-3.5-turbo",
          stream: false,
        },
        {
          headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const output =
        response.data.choices[0]?.message?.content?.trim() ||
        "Sorry, I do not understand.";
      res.status(200).json({ output });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
