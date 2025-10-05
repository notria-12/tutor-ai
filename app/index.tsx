/**
 * Tela Principal do App Tutor de Matemática
 * 
 * Esta tela permite ao usuário inserir equações matemáticas
 * e receber soluções detalhadas passo a passo através da API Gemini.
 */

import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Animated,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styles } from '../styles';
import { solveMathEquation, validateMathInput } from '../services/tutor-gerator';

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
      // Chama a API do Gemini com callback para streaming
      const result = await solveMathEquation(
        equation,
        (chunk: string) => {
          // Atualiza a solução em tempo real conforme os chunks chegam
          setSolution((prev) => prev + chunk);
        }
      );

      // Se não houver streaming, define a solução completa
      if (!result) {
        setError('Não foi possível obter uma resposta da API.');
      }

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

        {/* Botões de Ação */}
        <View style={styles.buttonContainer}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              style={[styles.button, styles.solveButton, loading && styles.buttonDisabled]}
              onPress={() => {
                animateButton();
                handleSolveEquation();
              }}
              disabled={loading || !equation.trim()}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Resolver</Text>
              )}
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity
            style={[styles.button, styles.clearButton]}
            onPress={handleClear}
            disabled={loading}
          >
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        </View>

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
              <Text style={styles.solutionText}>{solution}</Text>
            </View>
          </View>
        ) : null}

        {/* Indicador de carregamento */}
        {loading && !solution ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6366f1" />
            <Text style={styles.loadingText}>Resolvendo sua equação...</Text>
          </View>
        ) : null}

        {/* Dicas de uso */}
        {!solution && !loading && !error ? (
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>💡 Dicas:</Text>
            <Text style={styles.tipsText}>
              • Use 'x' ou 'y' para variáveis{'\n'}
              • Exemplos: "2x + 5 = 15", "x² - 4 = 0"{'\n'}
              • Funciona com equações, inequações e problemas matemáticos
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
