import React, { useState } from 'react';

const DeliveryInfoStep = ({ formData, updateFormData, onNext, onBack, validate }) => {
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
            <h2 className="text-2xl font-bold font-quicksand text-peach-800 text-center mb-6">Delivery Info</h2>

            <input
                type="text"
                placeholder="Recipient Name"
                className="w-full p-4 mb-4 border-2 border-gray-100 rounded-xl focus:border-peach-400 focus:ring-0 outline-none transition-all"
                value={formData.recName}
                onChange={(e) => updateFormData('recName', e.target.value)}
            />

            <input
                type="text"
                placeholder="Recipient ID/Room (202...G)"
                className="w-full p-4 mb-1 border-2 border-gray-100 rounded-xl focus:border-peach-400 focus:ring-0 outline-none transition-all"
                value={formData.recId}
                onChange={(e) => updateFormData('recId', e.target.value)}
            />
            <div className="text-red-500 text-sm mb-4 h-5">
                {errors.general?.includes('ID') && "Format required: 202XXXXXXXXXG"}
            </div>

            <input
                type="tel"
                placeholder="Recipient Phone"
                className="w-full p-4 mb-1 border-2 border-gray-100 rounded-xl focus:border-peach-400 focus:ring-0 outline-none transition-all"
                value={formData.recPhone}
                onChange={(e) => updateFormData('recPhone', e.target.value)}
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
                Next: Final Summary
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

export default DeliveryInfoStep;
