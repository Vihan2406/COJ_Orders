import React from 'react';

const SummaryStep = ({ formData, cart, calculateTotal, onSubmit, onBack, isSubmitting }) => {
    return (
        <div className="flex flex-col w-full animate-fadeIn">
            <h2 className="text-2xl font-bold font-quicksand text-peach-800 text-center mb-6">Review Order</h2>

            <div className="bg-white/30 backdrop-blur-xl rounded-2xl border border-white/30 p-6 space-y-6 shadow-sm">
                <div>
                    <span className="block text-xs font-bold text-amber-800 uppercase tracking-widest mb-1">Purchased By</span>
                    <span className="text-amber-950 font-semibold">{formData.custName}</span>
                </div>

                <div>
                    <span className="block text-xs font-bold text-amber-800 uppercase tracking-widest mb-1">Delivery To</span>
                    <span className="text-amber-950 font-semibold">{formData.recName}</span>
                </div>

                <div>
                    <span className="block text-xs font-bold text-amber-800 uppercase tracking-widest mb-1">Selected Items</span>
                    <div className="space-y-2 mt-2">
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between items-center text-amber-950">
                                <span>• {item.name} <span className="text-amber-800 font-bold">x{item.qty}</span></span>
                                <span className="font-semibold text-sm">₹{item.price * item.qty}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-4 border-t border-white/20 flex justify-between items-center">
                    <span className="text-lg font-bold text-amber-900">Total Amount</span>
                    <span className="text-2xl font-black text-amber-950">₹{calculateTotal()}</span>
                </div>
            </div>

            <button
                onClick={onSubmit}
                disabled={isSubmitting}
                className="w-full py-4 bg-peach-500 hover:bg-peach-600 text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSubmitting ? "Processing..." : "Place Order & Send"}
            </button>
            <button
                onClick={onBack}
                disabled={isSubmitting}
                className="w-full py-4 bg-amber-400 hover:bg-amber-500 text-peach-900 font-semibold text-lg rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-md mt-4 disabled:opacity-50"
            >
                Edit Details
            </button>
        </div>
    );
};

export default SummaryStep;
