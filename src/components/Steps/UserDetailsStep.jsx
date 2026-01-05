import React, { useState } from 'react';

const UserDetailsStep = ({ formData, updateFormData, onNext, onBack, validate }) => {
    const [errors, setErrors] = useState({});

    const handleNext = () => {
        const error = validate();
        if (error) {
            setErrors({ general: error });
        } else {
            onNext();
        }
    };

    return (
        <div className="flex flex-col w-full animate-fadeIn">
            <h2 className="text-2xl font-bold font-quicksand text-peach-800 text-center mb-6">Your Details</h2>

            <input
                type="text"
                placeholder="Full Name"
                className="w-full p-4 mb-4 border-2 border-gray-100 rounded-xl focus:border-peach-400 focus:ring-0 outline-none transition-all"
                value={formData.custName}
                onChange={(e) => updateFormData('custName', e.target.value)}
            />

            <input
                type="text"
                placeholder="ID (202XXXXXXXXXG)"
                className="w-full p-4 mb-1 border-2 border-gray-100 rounded-xl focus:border-peach-400 focus:ring-0 outline-none transition-all"
                value={formData.custId}
                onChange={(e) => updateFormData('custId', e.target.value)}
            />
            <div className="text-red-500 text-sm mb-4 h-5">
                {errors.general?.includes('ID') && "Format required: 202XXXXXXXXXG"}
            </div>

            <input
                type="tel"
                placeholder="10-Digit Phone Number"
                className="w-full p-4 mb-1 border-2 border-gray-100 rounded-xl focus:border-peach-400 focus:ring-0 outline-none transition-all"
                value={formData.custPhone}
                onChange={(e) => updateFormData('custPhone', e.target.value)}
            />
            <div className="text-red-500 text-sm mb-4 h-5">
                {errors.general?.includes('Phone') && "Enter a valid 10-digit number."}
            </div>

            {errors.general && !errors.general.includes('ID') && !errors.general.includes('Phone') && (
                <div className="text-red-500 text-sm mb-4 text-center">{errors.general}</div>
            )}

            <button
                onClick={handleNext}
                className="w-full py-4 bg-peach-500 hover:bg-peach-600 text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg mt-4"
            >
                Next: Shop Collection
            </button>
            <button
                onClick={onBack}
                className="w-full py-4 bg-honey-400 hover:bg-honey-500 text-peach-900 font-semibold text-lg rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-md mt-4"
            >
                Back
            </button>
        </div>
    );
};

export default UserDetailsStep;
