import React from 'react';

const Waves = () => {
    return (
        <div className="absolute bottom-0 left-0 w-full h-auto overflow-hidden z-0 pointer-events-none leading-none">
            {/* Layer 1: Back (Darker) */}
            <div className="absolute bottom-0 w-[200%] h-32 md:h-48 animate-wave-fluid-slow opacity-80">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-orange-400">
                    <path d="M321.39,56.44c130-14,240,15,360,15,100,0,200-20,300-40,140-30,210,10,300,10V200H0V90C120,70,200,60,321.39,56.44Z" />
                </svg>
            </div>

            {/* Layer 2: Middle (Medium brightness) */}
            <div className="absolute bottom-0 w-[200%] h-28 md:h-40 animate-wave-fluid-medium opacity-90 translate-x-[-150px]">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-yellow-500">
                    <path d="M985.66,92.83C906.67,72,823.78,31,432.84,31,47.04,15,200,120,0,120H1200V0C1100,20,1080,120,985.66,92.83Z" opacity=".5" />
                    <path d="M321.39,56.44c130-14,240,15,360,15,100,0,200-20,300-40,140-30,210,10,300,10V200H0V90C120,70,200,60,321.39,56.44Z" />
                </svg>
            </div>

            {/* Layer 3: Front (Lightest) */}
            <div className="absolute bottom-0 w-[200%] h-20 md:h-32 animate-wave-fluid-fast opacity-100 translate-x-[-100px]">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full fill-yellow-200">
                    <path d="M0,0V15.81C13,36.92,47.64,50.17,79.54,58.85c69,18.77,143.23,19.38,208.68,5.43,62.88-13.4,116-41,180.23-53.11,72.33-13.62,143.89-2.3,212.91,15.65,65.3,17,125.79,35.34,194,37.31,109.11,3.16,215.19-48.48,324.64-64.84V0Z" />
                </svg>
            </div>
        </div>
    );
};

export default Waves;
