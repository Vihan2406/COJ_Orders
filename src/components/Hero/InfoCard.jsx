import React from 'react';

const InfoCard = ({ story, onNext }) => {
    return (
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl w-full">
            {/* Heading */}
            <h1 className="text-[2.7rem] md:text-[3.375rem] font-bold text-white mb-12 drop-shadow-[0_5px_5px_rgba(180,83,9,0.6)] tracking-tight font-fredoka text-texture-grainy leading-tight pb-4">
                Craft of Joy
            </h1>

            {/* Info Card Body */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-10 shadow-xl w-full mb-8 text-amber-950">
                <p className="text-lg md:text-xl leading-relaxed font-medium italic">
                    {story}
                </p>
                <div className="my-6 border-b border-amber-900/10 w-1/3 mx-auto"></div>
                <p className="text-sm md:text-base opacity-90">
                    Each piece in our collection is handmade with care and dedication. From bracelets to keychains, every item carries a story of craftsmanship and joy.
                    <br /><br />
                    <span className="font-bold text-amber-900 not-italic block mt-2">Order now and spread happiness!</span>
                </p>
            </div>

            {/* CTA Button */}
            <button
                onClick={onNext}
                className="group relative w-full max-w-md bg-white/80 hover:bg-white text-amber-900 font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-4 hover:scale-105 active:scale-95"
            >
                <span>Start Your Order</span>
                <span className="text-2xl transition-transform group-hover:translate-x-2">→</span>
            </button>
        </div>
    );
};

export default InfoCard;
