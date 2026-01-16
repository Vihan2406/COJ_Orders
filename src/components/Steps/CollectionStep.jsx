import React from 'react';

const CollectionStep = ({ items, cart, toggleItem, updateQty, onNext, onBack, calculateTotal }) => {
    return (
        <div className="flex flex-col w-full animate-fadeIn">
            <h2 className="text-2xl font-bold text-[#006266] text-center mb-6">Our Collection</h2>
            <div className="space-y-4 mb-8">
                {items.map(item => {
                    const inCart = cart.find(i => i.id === item.id);
                    return (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/30 shadow-sm transition-all hover:bg-white/50">
                            <div className="flex items-center gap-4 flex-grow">
                                <div className="w-[100px] h-[100px] bg-[#dfe6e9] rounded-xl overflow-hidden border-2 border-white flex-shrink-0">
                                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="font-bold text-[#006266]">{item.name}</div>
                                    <div className="text-gray-600 text-sm">₹{item.price}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {inCart && (
                                    <div className="flex items-center gap-2 bg-[#e0f7f1] rounded-full px-3 py-1">
                                        <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 bg-[#006266] text-white rounded-full font-bold">-</button>
                                        <span className="font-bold text-[#006266]">{inCart.qty}</span>
                                        <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 bg-[#006266] text-white rounded-full font-bold">+</button>
                                    </div>
                                )}
                                <input type="checkbox" checked={!!inCart} onChange={() => toggleItem(item)} className="w-6 h-6 accent-[#006266]" />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-between items-center p-6 bg-white/30 border-t border-[#fdcb6e] rounded-b-3xl">
                <span className="text-[#006266]/70 font-semibold uppercase text-sm">Subtotal</span>
                <span className="text-2xl font-bold text-[#006266]">₹{calculateTotal()}</span>
            </div>
            <button onClick={onNext} className="w-full py-4 bg-[#006266] text-white font-semibold text-lg rounded-xl mt-10">Next: Delivery Info</button>
            <button onClick={onBack} className="w-full py-4 bg-[#fdcb6e] text-[#5d4037] font-semibold text-lg rounded-xl mt-4">Back</button>
        </div>
    );
};
export default CollectionStep;
