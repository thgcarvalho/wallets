'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { INVESTOR_QUESTIONS, QuestionAnswer, InvestorProfile, getProfileFromScore } from '@/types/InvestorProfile';

interface InvestorProfileQuestionnaireProps {
  onComplete: (profile: InvestorProfile) => void;
}

export default function InvestorProfileQuestionnaire({ onComplete }: InvestorProfileQuestionnaireProps) {
  const [currentQuestionId, setCurrentQuestionId] = useState(0);
  const [answers, setAnswers] = useState<QuestionAnswer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Encontra a pergunta atual pelo ID
  const currentQ = INVESTOR_QUESTIONS.find(q => q.id === currentQuestionId);
  const isLastQuestion = !currentQ?.answers.some(answer => answer.nextQuestionId);

  const handleAnswerSelect = (answerId: number, points: number) => {
    if (!currentQ) return;
    
    const newAnswer: QuestionAnswer = {
      questionId: currentQ.id,
      answerId,
      points
    };

    const updatedAnswers = [...answers.filter(a => a.questionId !== currentQ.id), newAnswer];
    setAnswers(updatedAnswers);

    // Encontra a resposta selecionada para obter o nextQuestionId
    const selectedAnswer = currentQ.answers.find(a => a.id === answerId);
    
    if (selectedAnswer?.nextQuestionId !== undefined) {
      // Vai para a próxima pergunta
      setCurrentQuestionId(selectedAnswer.nextQuestionId);
    } else {
      // Fim do questionário
      handleSubmit();
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    // Implementação simplificada - volta para a pergunta anterior
    // Em um sistema mais complexo, você manteria um histórico de navegação
    if (currentQuestionId > 0) {
      setCurrentQuestionId(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Calculate total score
    const totalScore = answers.reduce((sum, answer) => sum + answer.points, 0);
    
    // Determine profile using the new adaptive logic
    const profile = getProfileFromScore(totalScore, answers);
    
    // Create profile object
    const investorProfile: InvestorProfile = {
      profile,
      score: totalScore,
      answers,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    localStorage.setItem('investorProfile', JSON.stringify(investorProfile));
    
    // Call completion callback
    onComplete(investorProfile);
    
    setIsSubmitting(false);
  };

  const getCurrentAnswer = () => {
    if (!currentQ) return undefined;
    return answers.find(a => a.questionId === currentQ.id);
  };

  const canProceed = () => {
    return getCurrentAnswer() !== undefined;
  };

  // Calcula o progresso baseado no número de perguntas respondidas
  // Para o sistema adaptativo, sabemos que cada trilha tem exatamente 4 perguntas + 1 pergunta inicial
  const totalQuestions = 5; // 1 pergunta inicial + 4 perguntas da trilha
  const progress = (answers.length / totalQuestions) * 100;

  // Verificação de segurança
  if (!currentQ) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">Carregando questionário...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            Questionário de Perfil de Investidor
          </CardTitle>
          <CardDescription className="text-center text-gray-600 dark:text-gray-300">
            Responda às perguntas para descobrir o seu perfil de risco ideal
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Pergunta {answers.length + 1} de {totalQuestions}
          </div>

          {/* Question */}
          <div className="space-y-4">
            <div className="relative group">
              <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white cursor-help">
                {currentQ.text}
              </h3>
              {currentQ.info && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                  <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg px-3 py-2 max-w-sm shadow-lg border border-gray-700 dark:border-gray-300">
                    <div className="whitespace-normal break-words">
                      {currentQ.info}
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900 dark:border-t-gray-100 border-4"></div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-3">
              {currentQ.answers.map((answer) => {
                const isSelected = getCurrentAnswer()?.answerId === answer.id;
                return (
                  <div key={answer.id} className="relative group">
                    <button
                      onClick={() => handleAnswerSelect(answer.id, answer.points)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100'
                      }`}
                    >
                      <span className="cursor-help">{answer.text}</span>
                    </button>
                    {answer.info && (
                      <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
                        <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm rounded-lg px-3 py-2 max-w-xs shadow-lg border border-gray-700 dark:border-gray-300">
                          <div className="whitespace-normal break-words">
                            {answer.info}
                          </div>
                          <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900 dark:border-r-gray-100 border-4"></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionId === 0}
            >
              Anterior
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!canProceed() || isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? 'Processando...' : isLastQuestion ? 'Finalizar' : 'Próxima'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
