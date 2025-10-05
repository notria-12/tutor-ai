/**
 * Serviço de Tutor de Matemática usando Google Gemini AI
 * 
 * Este módulo fornece funções para resolver equações matemáticas
 * utilizando a API do Google Gemini.
 */

import { GoogleGenAI } from '@google/genai';

/**
 * Resolve uma equação matemática usando a API do Gemini
 * 
 * @param {string} equation - A equação matemática a ser resolvida
 * @returns {Promise<string>} - A solução completa da equação
 * @throws {Error} - Lança erro se a API falhar ou se a chave API não estiver configurada
 */
export async function solveMathEquation(equation) {
  try {
    // Inicializa o cliente da API do Google Gemini
    const ai = new GoogleGenAI({
      apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
    });

    // Configuração do modelo de IA
    const config = {
      thinkingConfig: {
        thinkingBudget: 0,
      },
      systemInstruction: [
        {
          text: `Você é um tutor de matemática especializado. Dada uma equação ou problema matemático, 
você deve:
1. Identificar o tipo de problema
2. Explicar a estratégia de resolução
3. Resolver passo a passo de forma detalhada
4. Apresentar a resposta final claramente

Formate sua resposta de forma clara e organizada, usando marcadores quando apropriado.
Seja didático e explique cada passo do raciocínio.`,
        }
      ],
    };

    // Modelo a ser utilizado
    const model = 'gemini-2.5-flash-lite';

    // Conteúdo da requisição com a equação do usuário
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: equation,
          },
        ],
      },
    ];

    // Faz a requisição para a API
    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    // Extrai o resultado
    const result = response?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!result) {
      throw new Error('Resposta vazia da API');
    }

    return result;

  } catch (error) {
    console.error('Erro ao resolver equação:', error);
    throw new Error(`Falha ao processar a equação: ${error.message || 'Erro desconhecido'}`);
  }
}

/**
 * Valida se uma string parece ser uma equação matemática válida
 * 
 * @param {string} input - String a ser validada
 * @returns {boolean} - true se parecer uma equação válida
 */
export function validateMathInput(input) {
  if (!input || input.trim().length === 0) {
    return false;
  }

  // Verifica se contém pelo menos um número ou operador matemático
  const mathPattern = /[0-9+\-*/=()x²³√∫∑]/;
  return mathPattern.test(input);
}
