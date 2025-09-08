'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { INVESTOR_QUESTIONS, QuestionAnswer, InvestorProfile, getProfileFromScore } from '@/types/InvestorProfile';

interface InvestorProfileQuestionnaireProps {
  onComplete: (profile: InvestorProfile) => void;
}

export default function InvestorProfileQuestionnaire({ onComplete }: InvestorProfileQuestionnaireProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuestionAnswer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQ = INVESTOR_QUESTIONS[currentQuestion];
  const isLastQuestion = currentQuestion === INVESTOR_QUESTIONS.length - 1;

  const handleAnswerSelect = (answerId: number, points: number) => {
    const newAnswer: QuestionAnswer = {
      questionId: currentQ.id,
      answerId,
      points
    };

    const updatedAnswers = [...answers.filter(a => a.questionId !== currentQ.id), newAnswer];
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      handleSubmit();
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Calculate total score
    const totalScore = answers.reduce((sum, answer) => sum + answer.points, 0);
    
    // Determine profile
    const profile = getProfileFromScore(totalScore);
    
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
    return answers.find(a => a.questionId === currentQ.id);
  };

  const canProceed = () => {
    return getCurrentAnswer() !== undefined;
  };

  const progress = ((currentQuestion + 1) / INVESTOR_QUESTIONS.length) * 100;

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
            Pergunta {currentQuestion + 1} de {INVESTOR_QUESTIONS.length}
          </div>

          {/* Question */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white">
              {currentQ.text}
            </h3>
            
            <div className="space-y-3">
              {currentQ.answers.map((answer) => {
                const isSelected = getCurrentAnswer()?.answerId === answer.id;
                return (
                  <button
                    key={answer.id}
                    onClick={() => handleAnswerSelect(answer.id, answer.points)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-100'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100'
                    }`}
                  >
                    {answer.text}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
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
