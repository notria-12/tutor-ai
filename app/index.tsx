/**
 * Tela Principal do App Tutor de Matemática
 * 
 * Esta tela permite ao usuário inserir equações matemáticas
 * e receber soluções detalhadas passo a passo através da API Gemini.
 */

import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { solveMathEquation, validateMathInput } from '../services/tutor-gerator';
import { styles } from '../styles';

export default function Index() {
  // Estado para armazenar a equação digitada pelo usuário
  const [equation, setEquation] = useState('');
  
  // Estado para armazenar a solução retornada pela API
  const [solution, setSolution] = useState('');
  
  // Estado para controlar o carregamento durante a requisição
  const [loading, setLoading] = useState(false);
  
  // Estado para armazenar mensagens de erro
  const [error, setError] = useState('');
  
  // Referência para animação do botão
  const scaleAnim = useRef(new Animated.Value(1)).current;

  /**
   * Função para resolver a equação
   * Faz a chamada à API e atualiza os estados conforme necessário
   */
  const handleSolveEquation = async () => {
    // Limpa erros anteriores
    setError('');
    
    // Valida a entrada do usuário
    if (!validateMathInput(equation)) {
      setError('Por favor, insira uma equação matemática válida.');
      return;
    }

    // Inicia o estado de carregamento
    setLoading(true);
    setSolution('');

    try {
      // Chama a API do Gemini
      const result = await solveMathEquation(equation);

      // Define a solução completa
      setSolution(result);

    } catch (err) {
      // Trata erros da API
      console.error('Erro ao resolver equação:', err);
      const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro ao processar sua equação. Tente novamente.';
      setError(errorMessage);
      setSolution('');
    } finally {
      // Finaliza o estado de carregamento
      setLoading(false);
    }
  };

  /**
   * Função para limpar todos os campos
   */
  const handleClear = () => {
    setEquation('');
    setSolution('');
    setError('');
  };

  /**
   * Animação do botão ao pressionar
   */
  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  /**
   * Função para inserir símbolos matemáticos comuns
   */
  const insertSymbol = (symbol: string) => {
    setEquation((prev) => prev + symbol);
  };

  /**
   * Formata o texto da solução removendo marcações Markdown
   * e aplicando formatação visual
   */
  const formatSolution = (text: string) => {
    if (!text) return [];

    const lines = text.split('\n');
    const formattedBlocks: Array<{ type: string; content: string; level?: number }> = [];

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) {
        // Linha vazia - adiciona espaçamento
        formattedBlocks.push({ type: 'space', content: '' });
        return;
      }

      // Detecta títulos (###, ##, #)
      if (trimmedLine.startsWith('###')) {
        formattedBlocks.push({
          type: 'heading3',
          content: trimmedLine.replace(/^###\s*/, '').replace(/\*\*/g, ''),
        });
      } else if (trimmedLine.startsWith('##')) {
        formattedBlocks.push({
          type: 'heading2',
          content: trimmedLine.replace(/^##\s*/, '').replace(/\*\*/g, ''),
        });
      } else if (trimmedLine.startsWith('#')) {
        formattedBlocks.push({
          type: 'heading1',
          content: trimmedLine.replace(/^#\s*/, '').replace(/\*\*/g, ''),
        });
      }
      // Detecta listas com bullet points
      else if (trimmedLine.startsWith('*   ') || trimmedLine.startsWith('* ')) {
        formattedBlocks.push({
          type: 'bullet',
          content: trimmedLine.replace(/^\*\s+/, '').replace(/\*\*/g, ''),
        });
      }
      // Detecta fórmulas matemáticas ($...$)
      else if (trimmedLine.includes('$')) {
        formattedBlocks.push({
          type: 'formula',
          content: trimmedLine.replace(/\$/g, '').replace(/\\/g, ''),
        });
      }
      // Texto normal
      else {
        formattedBlocks.push({
          type: 'text',
          content: trimmedLine.replace(/\*\*/g, ''),
        });
      }
    });

    return formattedBlocks;
  };

  const renderFormattedSolution = () => {
    const blocks = formatSolution(solution);

    return blocks.map((block, index) => {
      switch (block.type) {
        case 'heading1':
          return (
            <Text key={index} style={styles.solutionHeading1}>
              {block.content}
            </Text>
          );
        case 'heading2':
          return (
            <Text key={index} style={styles.solutionHeading2}>
              {block.content}
            </Text>
          );
        case 'heading3':
          return (
            <Text key={index} style={styles.solutionHeading3}>
              {block.content}
            </Text>
          );
        case 'bullet':
          return (
            <View key={index} style={styles.bulletContainer}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.bulletText}>{block.content}</Text>
            </View>
          );
        case 'formula':
          return (
            <View key={index} style={styles.formulaContainer}>
              <Text style={styles.formulaText}>{block.content}</Text>
            </View>
          );
        case 'space':
          return <View key={index} style={styles.spacer} />;
        case 'text':
        default:
          return (
            <Text key={index} style={styles.solutionTextFormatted}>
              {block.content}
            </Text>
          );
      }
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar style="dark" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.title}>🧮 Tutor de Matemática</Text>
          <Text style={styles.subtitle}>
            Digite sua equação e receba a solução passo a passo
          </Text>
        </View>

        {/* Área de Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Equação Matemática:</Text>
          
          {/* Container do input com botão de limpar */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={equation}
              onChangeText={setEquation}
              placeholder="Ex: 2x + 5 = 15"
              placeholderTextColor="#999"
              multiline
              numberOfLines={3}
              editable={!loading}
            />
            
            {/* Botão de limpar dentro do input */}
            {equation.length > 0 && !loading ? (
              <TouchableOpacity
                style={styles.clearInputButton}
                onPress={handleClear}
              >
                <Text style={styles.clearInputButtonText}>✕</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          {/* Teclado de símbolos matemáticos */}
          <View style={styles.symbolsContainer}>
            <Text style={styles.symbolsLabel}>Símbolos rápidos:</Text>
            <View style={styles.symbolsRow}>
              {['+', '-', '×', '÷', '=', '(', ')', 'x', 'y', '²', '³', '√'].map((symbol) => (
                <TouchableOpacity
                  key={symbol}
                  style={styles.symbolButton}
                  onPress={() => insertSymbol(symbol)}
                  disabled={loading}
                >
                  <Text style={styles.symbolText}>{symbol}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Botão Resolver (largura total) */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            style={[styles.solveButtonFull, loading && styles.buttonDisabled]}
            onPress={() => {
              animateButton();
              handleSolveEquation();
            }}
            disabled={loading || !equation.trim()}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Resolver Equação</Text>
            )}
          </TouchableOpacity>
        </Animated.View>

        {/* Mensagem de Erro */}
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </View>
        ) : null}

        {/* Área de Solução */}
        {solution ? (
          <View style={styles.solutionContainer}>
            <Text style={styles.solutionTitle}>📝 Solução:</Text>
            <View style={styles.solutionContent}>
              {renderFormattedSolution()}
            </View>
          </View>
        ) : null}

        {/* Indicador de carregamento */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6366f1" />
            <Text style={styles.loadingText}>Resolvendo sua equação...</Text>
            <Text style={styles.loadingSubtext}>Aguarde enquanto a IA processa</Text>
          </View>
        ) : null}

        {/* Exemplos rápidos */}
        {!solution && !loading && !error ? (
          <View style={styles.examplesContainer}>
            <Text style={styles.examplesTitle}>📚 Exemplos Rápidos:</Text>
            <View style={styles.examplesRow}>
              <TouchableOpacity
                style={styles.exampleButton}
                onPress={() => setEquation('2x + 5 = 15')}
              >
                <Text style={styles.exampleText}>2x + 5 = 15</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.exampleButton}
                onPress={() => setEquation('x² - 4 = 0')}
              >
                <Text style={styles.exampleText}>x² - 4 = 0</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.examplesRow}>
              <TouchableOpacity
                style={styles.exampleButton}
                onPress={() => setEquation('3x - 7 > 8')}
              >
                <Text style={styles.exampleText}>3x - 7 &gt; 8</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.exampleButton}
                onPress={() => setEquation('√(x + 3) = 5')}
              >
                <Text style={styles.exampleText}>√(x + 3) = 5</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {/* Dicas de uso */}
        {!solution && !loading && !error ? (
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>💡 Dicas:</Text>
            <Text style={styles.tipsText}>
              • Use 'x' ou 'y' para variáveis{'\n'}
              • Clique nos exemplos acima para testar{'\n'}
              • Funciona com equações, inequações e problemas matemáticos{'\n'}
              • Receba explicações detalhadas passo a passo
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
