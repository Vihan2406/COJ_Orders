import React from 'react';

const SuccessStep = () => {
    return (
        <div className="flex flex-col items-center text-center animate-fadeIn py-10">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <span className="text-5xl text-emerald-600">✓</span>
            </div>
            <h2 className="text-3xl font-black font-quicksand text-peach-800 mb-4">Thank You!</h2>
            <p className="text-gray-600 max-w-xs mx-auto mb-8">
                Your order has been placed successfully. We are crafting your joy!
            </p>
            <button
                onClick={() => window.location.reload()}
                className="w-full py-4 bg-peach-500 hover:bg-peach-600 text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
                Return Home
            </button>
        </div>
    );
};

export default SuccessStep;
