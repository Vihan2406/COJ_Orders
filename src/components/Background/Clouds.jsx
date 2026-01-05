import React from 'react';

const Clouds = () => {
    return (
        <div className="absolute top-0 right-0 w-full h-full z-0 pointer-events-none">
            {/* Cloud 1 - Slow, High */}
            <div className="absolute top-[10%] opacity-50 animate-cloud-slow blur-sm">
                <svg width="180" height="96" viewBox="0 0 150 80" fill="white" className="animate-bob-slow">
                    <path d="M40 70 Q 20 70 20 50 Q 20 30 50 30 Q 60 10 90 20 Q 120 10 130 40 Q 150 50 140 70 Z" />
                </svg>
            </div>

            {/* Cloud 2 - Medium, Lower */}
            <div className="absolute top-[25%] opacity-40 animate-cloud-medium blur-sm" style={{ animationDelay: '-10s' }}>
                <svg width="144" height="72" viewBox="0 0 120 60" fill="white" className="animate-bob-medium">
                    <path d="M30 50 Q 10 50 10 35 Q 10 20 35 20 Q 45 5 70 10 Q 95 5 105 30 Q 120 40 110 50 Z" />
                </svg>
            </div>

            {/* Cloud 3 - Fast, Small */}
            <div className="absolute top-[15%] opacity-35 animate-cloud-fast blur-sm" style={{ animationDelay: '-20s' }}>
                <svg width="120" height="60" viewBox="0 0 100 50" fill="white" className="animate-bob-fast">
                    <path d="M25 40 Q 10 40 10 30 Q 10 15 30 15 Q 40 5 60 10 Q 80 5 90 25 Q 100 30 90 40 Z" />
                </svg>
            </div>
        </div>
    );
};

export default Clouds;
