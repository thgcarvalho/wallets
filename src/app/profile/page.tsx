'use client';

import { useState, useEffect } from 'react';
import InvestorProfileQuestionnaire from '@/components/InvestorProfileQuestionnaire';
import InvestorProfileDisplay from '@/components/InvestorProfileDisplay';
import { InvestorProfile } from '@/types/InvestorProfile';

export default function ProfilePage() {
  const [profile, setProfile] = useState<InvestorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load profile from localStorage on component mount
    const loadProfile = () => {
      try {
        const savedProfile = localStorage.getItem('investorProfile');
        if (savedProfile) {
          const parsedProfile = JSON.parse(savedProfile) as InvestorProfile;
          setProfile(parsedProfile);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleProfileComplete = (newProfile: InvestorProfile) => {
    setProfile(newProfile);
  };

  const handleRetakeQuestionnaire = () => {
    // Clear the current profile and show questionnaire again
    localStorage.removeItem('investorProfile');
    setProfile(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      {profile ? (
        <InvestorProfileDisplay
          profile={profile}
          onRetakeQuestionnaire={handleRetakeQuestionnaire}
        />
      ) : (
        <InvestorProfileQuestionnaire
          onComplete={handleProfileComplete}
        />
      )}
    </div>
  );
}
