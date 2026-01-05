import React from 'react';

const CollectionStep = ({ items, cart, toggleItem, updateQty, onNext, onBack, calculateTotal }) => {

    const handleNext = () => {
        if (cart.length > 0) {
            onNext();
        } else {
            alert("Please select at least one item!");
        }
    };

    return (
        <div className="flex flex-col w-full animate-fadeIn">
            <h2 className="text-2xl font-bold font-quicksand text-peach-800 text-center mb-6">Our Collection</h2>

            <div className="space-y-4 mb-8">
                {items.map(item => {
                    const inCart = cart.find(i => i.id === item.id);
                    return (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-peach-50 rounded-2xl border border-peach-100 shadow-sm transition-all hover:bg-peach-100">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-gray-200 rounded-xl overflow-hidden shadow-inner">
                                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <div className="font-bold text-peach-900">{item.name}</div>
                                    <div className="text-peach-600 text-sm font-semibold">₹{item.price}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {inCart && (
                                    <div className="flex items-center gap-2 bg-peach-100 rounded-full px-3 py-1 scale-95 animate-fadeIn">
                                        <button
                                            onClick={() => updateQty(item.id, -1)}
                                            className="w-6 h-6 flex items-center justify-center bg-peach-500 text-white rounded-full font-bold text-xs"
                                        >
                                            -
                                        </button>
                                        <span className="font-bold text-peach-800 w-4 text-center">{inCart.qty}</span>
                                        <button
                                            onClick={() => updateQty(item.id, 1)}
                                            className="w-6 h-6 flex items-center justify-center bg-peach-500 text-white rounded-full font-bold text-xs"
                                        >
                                            +
                                        </button>
                                    </div>
                                )}
                                <input
                                    type="checkbox"
                                    checked={!!inCart}
                                    onChange={() => toggleItem(item)}
                                    className="w-6 h-6 rounded-md border-2 border-peach-200 text-peach-600 focus:ring-peach-500 cursor-pointer accent-peach-600"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-between items-center p-6 bg-white border-t-4 border-honey-400 -mx-8 -mb-8 rounded-b-3xl shadow-inner mt-4">
                <span className="text-gray-500 font-semibold uppercase tracking-wider text-sm">Subtotal</span>
                <span className="text-2xl font-bold text-peach-700">₹{calculateTotal()}</span>
            </div>

            <button
                onClick={handleNext}
                className="w-full py-4 bg-peach-500 hover:bg-peach-600 text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg mt-10"
            >
                Next: Delivery Info
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

export default CollectionStep;
