import React from 'react';
import { Crown, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Subscription, hasPremiumAccess, isTrialEnded, getTrialEndDate } from '../../lib/subscription';

interface SubscriptionBannerProps {
  subscription: Subscription | null;
}

export const SubscriptionBanner: React.FC<SubscriptionBannerProps> = ({ subscription }) => {
  const navigate = useNavigate();

  if (!subscription || hasPremiumAccess(subscription)) {
    return null;
  }

  const trialEnded = isTrialEnded(subscription);
  const trialEndDate = getTrialEndDate(subscription);

  return (
    <div className={`rounded-xl p-4 mb-6 border-2 ${
      trialEnded 
        ? 'bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-800'
        : 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            trialEnded 
              ? 'bg-red-500' 
              : 'bg-gradient-to-br from-blue-500 to-purple-500'
          }`}>
            <Crown className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className={`font-semibold ${
              trialEnded 
                ? 'text-red-700 dark:text-red-300' 
                : 'text-blue-700 dark:text-blue-300'
            }`}>
              {trialEnded 
                ? 'Trial ended – Upgrade to access premium features!' 
                : `Trial ends on ${trialEndDate} – Upgrade to keep premium features!`
              }
            </h3>
            <p className={`text-sm ${
              trialEnded 
                ? 'text-red-600 dark:text-red-400' 
                : 'text-blue-600 dark:text-blue-400'
            }`}>
              Get unlimited access to budgets, savings goals, and advanced features
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/subscription')}
          className={`px-6 py-2 rounded-xl font-semibold transition-all duration-200 hover:scale-105 flex items-center gap-2 ${
            trialEnded
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
          }`}
        >
          Upgrade Now
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};