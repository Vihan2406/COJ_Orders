import React from 'react';
import InfoCard from '../Hero/InfoCard';

const WelcomeStep = ({ story, onNext, isSaleActive, isAuthenticated, onLoginSuccess }) => {
    return (
        <div className="flex flex-col items-center text-center animate-fadeIn w-full">
            <InfoCard
                story={story}
                onNext={onNext}
                isSaleActive={isSaleActive}
                isAuthenticated={isAuthenticated}
                onLoginSuccess={onLoginSuccess}
            />
        </div>
    );
};

export default WelcomeStep;
