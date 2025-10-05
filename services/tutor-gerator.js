// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
    GoogleGenAI,
} from '@google/genai';
import mime from 'mime';
  
async function generateTutor() {
    const ai = new GoogleGenAI({
      apiKey: process.env.PUBLIC_GEMINI_API_KEY,
    });
    const config = {
      responseModalities: [
          'IMAGE',
          'TEXT',
      ],
      systemInstruction: [
          {
            text: `Estou um app que será um tutor de matemática, dada uma equação de entrada devo retornar a resolução de forma detalhada. Explicando passo a passo com a equação foi resolvida.
  
  Responda com apenas uma resposta.`,
          }
      ],
    };
    const model = 'gemini-2.5-flash-image';
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: `INSERT_INPUT_HERE`,
          },
        ],
      },
    ];
  
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });
    let fileIndex = 0;
    for await (const chunk of response) {
      if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) {
        continue;
      }
      if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
        const fileName = `ENTER_FILE_NAME_${fileIndex++}`;
        const inlineData = chunk.candidates[0].content.parts[0].inlineData;
        const fileExtension = mime.getExtension(inlineData.mimeType || '');
        const buffer = Buffer.from(inlineData.data || '', 'base64');
        
      }
      else {
        console.log(chunk.text);
      }
    }
  }
  
  
  