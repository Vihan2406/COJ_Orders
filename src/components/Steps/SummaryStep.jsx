import React from 'react';

const SummaryStep = ({ formData, cart, calculateTotal, onSubmit, onBack, isSubmitting }) => {
    const total = calculateTotal();

    return (
        <div className="flex flex-col w-full animate-fadeIn font-quicksand">
            <h2 className="text-2xl font-bold text-peach-800 text-center mb-6">Review Order</h2>

            <div className="bg-white/50 backdrop-blur-md rounded-2xl p-6 border-2 border-dashed border-peach-200 mb-6 shadow-inner">
                {/* Customer Details */}
                <div className="mb-4">
                    <span className="text-[10px] uppercase tracking-widest text-peach-800 font-bold">Purchased By</span>
                    <p className="text-lg font-semibold text-peach-900">{formData.custName}</p>
                    <p className="text-sm text-peach-700/70">ID: {formData.custId}</p>
                </div>

                {/* Recipient Details */}
                <div className="mb-4 border-t border-peach-100 pt-4">
                    <span className="text-[10px] uppercase tracking-widest text-peach-800 font-bold">Delivery To</span>
                    <p className="text-lg font-semibold text-peach-900">{formData.recName}</p>
                    <p className="text-sm text-peach-700/70">ID: {formData.recId}</p>
                    <p className="text-sm text-peach-800 font-bold">Hostel: {formData.recHostel}</p>
                </div>

                {/* Items Breakdown */}
                <div className="mb-4 border-t border-peach-100 pt-4">
                    <span className="text-[10px] uppercase tracking-widest text-peach-800 font-bold">Selected Items</span>
                    <div className="mt-2 space-y-1">
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between text-sm text-peach-900">
                                <span>{item.name} x{item.qty}</span>
                                <span className="font-bold">₹{item.price * item.qty}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Grand Total */}
                <div className="border-t-2 border-honey-400 pt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-peach-800">Grand Total</span>
                    <span className="text-2xl font-black text-peach-900">₹{total}</span>
                </div>
            </div>

            {/* SWD Consent Statement */}
            <div className="mb-8 px-2 text-center">
                <p className="text-red-500 font-bold text-base leading-tight italic">
                    "You consent to deduct ₹{total} from your SWD account"
                </p>
            </div>

            <button
                onClick={onSubmit}
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1 ${isSubmitting ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-peach-500 hover:bg-peach-600'
                    }`}
            >
                {isSubmitting ? 'Processing...' : 'Confirm & Place Order'}
            </button>

            <button
                onClick={onBack}
                className="w-full py-4 bg-honey-400 hover:bg-honey-500 text-peach-900 font-bold text-lg rounded-xl transition-all mt-4 shadow-md"
            >
                Back
            </button>
        </div>
    );
};

export default SummaryStep;
