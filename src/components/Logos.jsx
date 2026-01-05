import React from 'react';

const Logos = () => {
    return (
        <div className="flex gap-10 md:gap-40 justify-center items-center mb-6">
            {/* Nirmaan Logo */}
            <a
                href="https://www.instagram.com/nirmaangoa"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center p-1 rounded-lg hover:bg-black/5 transition-all duration-300 transform hover:scale-105"
            >
                <img src="/nirmaan_logo.png" alt="Nirmaan Goa" className="h-14 md:h-18 w-auto object-contain drop-shadow-md" />
            </a>

            {/* Samruddhi Logo */}
            <a
                href="https://www.instagram.com/samruddhi.nirmaangoa/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center p-1 rounded-lg hover:bg-black/5 transition-all duration-300 transform hover:scale-105"
            >
                <img src="/samruddhi_logo.svg" alt="Samruddhi Nirmaan Goa" className="h-20 md:h-28 w-auto object-contain drop-shadow-md" />
            </a>
        </div>
    );
};

export default Logos;
