/**
 * Estilos do App Tutor de Matemática
 * 
 * Define todos os estilos visuais da aplicação seguindo
 * princípios de design moderno e UX intuitivo.
 */

import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get('window');

// Paleta de cores
const colors = {
  primary: '#6366f1',        // Indigo vibrante
  primaryDark: '#4f46e5',    // Indigo escuro
  secondary: '#10b981',      // Verde
  background: '#f8fafc',     // Cinza muito claro
  white: '#ffffff',
  text: '#1e293b',           // Cinza escuro
  textLight: '#64748b',      // Cinza médio
  border: '#e2e8f0',         // Cinza claro
  error: '#ef4444',          // Vermelho
  errorBg: '#fee2e2',        // Vermelho claro
  success: '#10b981',        // Verde
  warning: '#f59e0b',        // Laranja
};

export const styles = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // ScrollView
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },

  // Cabeçalho
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 22,
  },

  // Container de input
  inputContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },

  // Wrapper do input com botão de limpar
  inputWrapper: {
    position: 'relative',
  },

  input: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    paddingRight: 50, // Espaço para o botão de limpar
    fontSize: 18,
    color: colors.text,
    minHeight: 80,
    textAlignVertical: 'top',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },

  // Botão de limpar dentro do input
  clearInputButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.textLight,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },

  clearInputButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Símbolos matemáticos
  symbolsContainer: {
    marginTop: 16,
  },

  symbolsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textLight,
    marginBottom: 10,
  },

  symbolsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  symbolButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  symbolText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },

  // Botões
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },

  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  solveButton: {
    backgroundColor: colors.primary,
  },

  // Botão resolver em largura total
  solveButtonFull: {
    backgroundColor: colors.primary,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  buttonDisabled: {
    backgroundColor: colors.textLight,
    opacity: 0.6,
  },

  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },

  clearButton: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.border,
  },

  clearButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },

  // Container de erro
  errorContainer: {
    backgroundColor: colors.errorBg,
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },

  errorText: {
    color: colors.error,
    fontSize: 15,
    lineHeight: 22,
  },

  // Container de solução
  solutionContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  solutionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },

  solutionContent: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
  },

  solutionText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 26,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },

  // Estilos para solução formatada
  solutionHeading1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 16,
    marginBottom: 8,
  },

  solutionHeading2: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 14,
    marginBottom: 6,
  },

  solutionHeading3: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
    marginTop: 12,
    marginBottom: 6,
  },

  solutionTextFormatted: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 8,
  },

  bulletContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 8,
  },

  bulletPoint: {
    fontSize: 16,
    color: colors.primary,
    marginRight: 8,
    fontWeight: 'bold',
  },

  bulletText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },

  formulaContainer: {
    backgroundColor: '#f0f4ff',
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },

  formulaText: {
    fontSize: 16,
    color: colors.text,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    lineHeight: 24,
  },

  spacer: {
    height: 12,
  },

  // Container de loading
  loadingContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.textLight,
    fontWeight: '500',
  },

  loadingSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: colors.textLight,
    opacity: 0.7,
  },

  // Indicador de streaming
  streamingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 20,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },

  streamingText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },

  // Container de exemplos
  examplesContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  examplesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },

  examplesRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },

  exampleButton: {
    flex: 1,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  exampleText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.primary,
  },

  // Container de dicas
  tipsContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },

  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },

  tipsText: {
    fontSize: 15,
    color: colors.textLight,
    lineHeight: 24,
  },
});
