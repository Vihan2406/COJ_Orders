import React from 'react';

const SummaryStep = ({ formData, cart, calculateTotal, onSubmit, onBack, isSubmitting }) => {
    const total = calculateTotal();

    return (
        <div className="flex flex-col w-full animate-fadeIn font-quicksand">
            <h2 className="text-2xl font-bold text-[#006266] text-center mb-6">Review Order</h2>
            
            <div className="bg-white/50 backdrop-blur-md rounded-2xl p-6 border-2 border-dashed border-[#55efc4] mb-6 shadow-inner">
                {/* Customer Details */}
                <div className="mb-4">
                    <span className="text-[10px] uppercase tracking-widest text-[#006266] font-bold">Purchased By</span>
                    <p className="text-lg font-semibold text-gray-800">{formData.custName}</p>
                    <p className="text-sm text-gray-600">ID: {formData.custId}</p>
                </div>

                {/* Recipient Details */}
                <div className="mb-4 border-t border-gray-200 pt-4">
                    <span className="text-[10px] uppercase tracking-widest text-[#006266] font-bold">Delivery To</span>
                    <p className="text-lg font-semibold text-gray-800">{formData.recName}</p>
                    <p className="text-sm text-gray-600">ID: {formData.recId}</p>
                    <p className="text-sm text-gray-600 font-bold">Hostel: {formData.recHostel}</p>
                </div>

                {/* Items Breakdown */}
                <div className="mb-4 border-t border-gray-200 pt-4">
                    <span className="text-[10px] uppercase tracking-widest text-[#006266] font-bold">Selected Items</span>
                    <div className="mt-2 space-y-1">
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between text-sm text-gray-700">
                                <span>{item.name} x{item.qty}</span>
                                <span className="font-medium">₹{item.price * item.qty}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Grand Total */}
                <div className="border-t-2 border-[#fdcb6e] pt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-[#006266]">Grand Total</span>
                    <span className="text-2xl font-extrabold text-[#006266]">₹{total}</span>
                </div>
            </div>

            {/* SWD Consent Bold Statement */}
            <div className="mb-8 px-2 text-center">
                <p className="text-red-600 font-bold text-base leading-tight italic">
                    "You consent to deduct ₹{total} from your SWD account"
                </p>
            </div>

            <button
                onClick={onSubmit}
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1 ${
                    isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#006266] hover:bg-[#074e51]'
                }`}
            >
                {isSubmitting ? 'Processing...' : 'Confirm & Place Order'}
            </button>

            <button
                onClick={onBack}
                className="w-full py-4 bg-[#fdcb6e] hover:bg-[#eeb850] text-[#5d4037] font-bold text-lg rounded-xl transition-all mt-4 shadow-md"
            >
                Back
            </button>
        </div>
    );
};

export default SummaryStep;
