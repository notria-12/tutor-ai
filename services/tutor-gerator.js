/**
 * Serviço de Tutor de Matemática usando Google Gemini AI
 * 
 * Este módulo fornece funções para resolver equações matemáticas
 * utilizando a API do Google Gemini, retornando explicações detalhadas
 * passo a passo.
 */

import { GoogleGenAI } from '@google/genai';
import Constants from 'expo-constants';

/**
 * Resolve uma equação matemática usando a API do Gemini
 * 
 * @param {string} equation - A equação matemática a ser resolvida
 * @param {function} onChunk - Callback chamado para cada chunk de resposta recebido
 * @returns {Promise<string>} - A solução completa da equação
 * @throws {Error} - Lança erro se a API falhar ou se a chave API não estiver configurada
 */
export async function solveMathEquation(equation, onChunk = null) {
  try {
    // Obtém a chave da API do arquivo de configuração do Expo
    const apiKey = Constants.expoConfig?.extra?.geminiApiKey || process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('Chave da API do Gemini não configurada. Adicione EXPO_PUBLIC_GEMINI_API_KEY no arquivo .env');
    }

    // Inicializa o cliente da API do Google Gemini
    const ai = new GoogleGenAI({
      apiKey: apiKey,
    });

    // Configuração do modelo de IA
    const config = {
      responseModalities: ['TEXT'], // Apenas texto para melhor compatibilidade com React Native
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
    const model = 'gemini-2.0-flash-exp';

    // Conteúdo da requisição com a equação do usuário
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: `Resolva a seguinte equação ou problema matemático: ${equation}`,
          },
        ],
      },
    ];

    // Faz a requisição para a API com streaming
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let fullResponse = '';

    // Processa cada chunk da resposta em streaming
    for await (const chunk of response) {
      // Verifica se o chunk contém dados válidos
      if (!chunk.candidates || 
          !chunk.candidates[0].content || 
          !chunk.candidates[0].content.parts) {
        continue;
      }

      // Extrai o texto do chunk
      const chunkText = chunk.text || '';
      fullResponse += chunkText;

      // Chama o callback se fornecido (para atualização em tempo real da UI)
      if (onChunk && chunkText) {
        onChunk(chunkText);
      }
    }

    return fullResponse;

  } catch (error) {
    console.error('Erro ao resolver equação:', error);
    throw new Error(`Falha ao processar a equação: ${error.message}`);
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