import React, { useState } from 'react';

const DeliveryInfoStep = ({ formData, updateFormData, onNext, onBack, validate }) => {
    const [errors, setErrors] = useState({});

    const handleNext = () => {
        // Local check for the Hostel field to ensure it is not null/empty
        if (!formData.recHostel || formData.recHostel.trim() === "") {
            setErrors({ general: "Recipient Hostel is required and cannot be empty." });
            return;
        }

        const error = validate();
        if (error) {
            setErrors({ general: error });
        } else {
            onNext();
        }
    };

    return (
        <div className="flex flex-col w-full animate-fadeIn">
            <h2 className="text-2xl font-bold font-quicksand text-[#006266] text-center mb-6">Delivery Info</h2>

            {/* Recipient Name */}
            <input
                type="text"
                placeholder="Recipient Name"
                className="w-full p-4 mb-4 border-2 border-gray-100 rounded-xl focus:border-[#55efc4] focus:ring-0 outline-none transition-all"
                value={formData.recName || ''}
                onChange={(e) => updateFormData('recName', e.target.value)}
            />

            {/* Recipient ID */}
            <input
                type="text"
                placeholder="Recipient ID"
                className="w-full p-4 mb-4 border-2 border-gray-100 rounded-xl focus:border-[#55efc4] focus:ring-0 outline-none transition-all"
                value={formData.recId || ''}
                onChange={(e) => updateFormData('recId', e.target.value)}
            />

            {/* Recipient Hostel - Mandatory Field */}
            <input
                type="text"
                placeholder="Recipient Hostel"
                className={`w-full p-4 mb-4 border-2 rounded-xl focus:ring-0 outline-none transition-all ${
                    errors.general && (!formData.recHostel || formData.recHostel.trim() === "") 
                    ? "border-red-400" 
                    : "border-gray-100 focus:border-[#55efc4]"
                }`}
                value={formData.recHostel || ''}
                onChange={(e) => updateFormData('recHostel', e.target.value)}
            />

            {/* Recipient Phone Number */}
            <input
                type="tel"
                placeholder="Recipient Phone Number"
                className="w-full p-4 mb-1 border-2 border-gray-100 rounded-xl focus:border-[#55efc4] focus:ring-0 outline-none transition-all"
                value={formData.recPhone || ''}
                onChange={(e) => updateFormData('recPhone', e.target.value)}
            />

            {/* Error Message Display */}
            {errors.general && (
                <div className="text-red-500 text-sm mt-2 mb-4 text-center font-bold">
                    {errors.general}
                </div>
            )}

            <button
                onClick={handleNext}
                className="w-full py-4 bg-[#006266] hover:bg-[#074e51] text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg mt-4"
            >
                Next: Final Summary
            </button>
            <button
                onClick={onBack}
                className="w-full py-4 bg-[#fdcb6e] hover:bg-[#eeb850] text-[#5d4037] font-semibold text-lg rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-md mt-4"
            >
                Back
            </button>
        </div>
    );
};

export default DeliveryInfoStep;
