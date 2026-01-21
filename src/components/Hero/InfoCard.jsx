import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';

const InfoCard = ({ story, onNext, isSaleActive = true, isAuthenticated, onLoginSuccess }) => {
    const empowermentQuotes = [
        "I learned that my voice matters the moment I chose not to silence it.",
        "Strength didn’t arrive overnight — it grew every time I stood up for myself.",
        "I am not waiting to be saved. I am building my own way forward.",
        "They called it courage. I called it necessity.",
        "My dreams are not too big — the world just hasn’t caught up yet.",
        "I stopped asking for permission and started believing in myself.",
        "Empowerment began the day I realized I was enough.",
        "I come from women who never gave up, even when no one was watching.",
        "I turned my struggles into lessons and my lessons into strength.",
        "I am proud of the woman I am becoming.",
        "My independence is my greatest achievement.",
        "I choose progress over fear, every single time.",
        "I didn’t break the rules — I rewrote them.",
        "I carry my past with pride, not shame.",
        "I rise not alone, but with others beside me.",
        "Being empowered means believing in myself, even on difficult days.",
        "I am more than expectations placed on me.",
        "The moment I trusted myself, everything changed.",
        "My resilience is my inheritance.",
        "I stand tall because I earned my place."
    ];

    const womenImages = [
        "/samruddhi_women/my-image.png",
        "/samruddhi_women/my-image (1).png",
        "/samruddhi_women/my-image (2).png",
        "/samruddhi_women/my-image (3).png",
        "/samruddhi_women/my-image (4).png"
    ];

    const [shuffledQuotes, setShuffledQuotes] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        // Shuffle quotes on mount
        const shuffled = [...empowermentQuotes].sort(() => Math.random() - 0.5);
        setShuffledQuotes(shuffled);
    }, []);

    useEffect(() => {
        if (shuffledQuotes.length === 0) return;

        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % shuffledQuotes.length);
                setFade(true);
            }, 500); // Wait for fade out
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, [shuffledQuotes]);

    // Simple JWT decoder to get user info without extra libraries
    const decodeJwt = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error("Failed to decode JWT", e);
            return null;
        }
    };

    const handleLoginSuccess = (credentialResponse) => {
        const decoded = decodeJwt(credentialResponse.credential);
        if (decoded) {
            // Restrict to BITS Pilani Goa campus domain
            if (decoded.email.endsWith('@goa.bits-pilani.ac.in')) {
                onLoginSuccess({
                    name: decoded.name,
                    email: decoded.email,
                    picture: decoded.picture
                });
            } else {
                alert("Access Denied: Please use your university email (@goa.bits-pilani.ac.in) to place an order.");
            }
        }
    };

    // Use current index to pick one of the 5 images (cycling)
    const currentImage = womenImages[currentIndex % womenImages.length];

    return (
        <div className="relative z-20 flex flex-col items-center text-center max-w-4xl w-full">
            {/* Heading */}
            <h1 className="text-[2.7rem] md:text-[3.375rem] font-bold text-white mb-12 drop-shadow-[0_5px_5px_rgba(180,83,9,0.6)] tracking-tight font-fredoka text-texture-grainy leading-tight pb-4">
                Crafts of Joy
            </h1>

            {/* Info Card Body*/}
            <div className="bg-white/25 backdrop-blur-xl border border-white/40 rounded-2xl p-8 md:p-10 shadow-xl w-full mb-8 text-amber-950">
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

            {/* Samruddhi Women Carousel */}
            <div className="bg-white/25 backdrop-blur-xl border border-white/40 rounded-2xl p-0 shadow-xl w-full mb-8 text-amber-950 transition-all min-h-[500px] flex flex-col items-center overflow-hidden">
                {/* Image Section - Larger Standardized Size */}
                <div className="w-full h-80 md:h-[400px] relative flex items-center justify-center pt-10">
                    <img
                        src={currentImage}
                        alt="Samruddhi Woman"
                        className={`h-full max-w-[95%] object-contain filter grayscale brightness-110 drop-shadow-2xl transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
                    />
                </div>

                <div className="px-8 pb-8 pt-4 w-full flex flex-col items-center">
                    <div className="mb-4 border-b border-dashed border-amber-900/20 w-2/3"></div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-amber-900/60 mb-4 block">Voices of Samruddhi</span>
                    <p className={`text-lg md:text-xl leading-relaxed font-medium italic transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                        "{shuffledQuotes[currentIndex] || empowermentQuotes[0]}"
                    </p>
                    <div className="my-6 border-b border-amber-900/10 w-1/4 mx-auto"></div>
                    <p className="text-xs md:text-sm font-semibold text-amber-900/40 uppercase tracking-widest">
                        Empowering Women, Crafting Change
                    </p>
                </div>
            </div>

            {/* CTA Button or Sales Paused Notice */}
            {isSaleActive === true ? (
                isAuthenticated ? (
                    <button
                        onClick={onNext}
                        className="group relative w-full max-w-md bg-white/80 hover:bg-white text-amber-900 font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-4 hover:scale-105 active:scale-95"
                    >
                        <span>Continue Your Order</span>
                        <span className="text-2xl transition-transform group-hover:translate-x-2">→</span>
                    </button>
                ) : (
                    <div className="flex flex-col items-center gap-4 w-full">
                        <p className="text-white font-bold bg-amber-900/30 px-6 py-2 rounded-full backdrop-blur-sm">
                            Please sign in with Google to start your order
                        </p>
                        <div className="scale-125 transform transition-transform hover:scale-130 active:scale-120">
                            <GoogleLogin
                                onSuccess={handleLoginSuccess}
                                onError={() => console.log('Login Failed')}
                                theme="filled_blue"
                                shape="pill"
                                text="continue_with"
                            />
                        </div>
                    </div>
                )
            ) : isSaleActive === false ? (
                <div className="w-full max-w-md bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-xl animate-in fade-in zoom-in duration-700">
                    <div className="flex items-center justify-center gap-3 text-white mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-black uppercase tracking-widest text-lg">Sales Paused</span>
                    </div>
                    <p className="text-white/80 text-sm font-medium">
                        We are currently catching up on orders. <br />
                        Check back soon for more joy!
                    </p>
                </div>
            ) : (
                <div className="h-16 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};

export default InfoCard;
