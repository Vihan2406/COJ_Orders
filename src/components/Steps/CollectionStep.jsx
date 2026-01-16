import React from 'react';

const CollectionStep = ({ cart, toggleItem, updateQty, onNext, onBack, calculateTotal }) => {
    // ... items array same as before ...
    const items = [
        { id: 1, name: "Elastic colored bracelets", price: 55, img: "/images/elastic_bracelet.jpg" },
        { id: 2, name: "Adjustable colored bracelets", price: 65, img: "/images/adjustable_bracelet.jpg" },
        { id: 3, name: "Matt black/white bracelets", price: 70, img: "/images/matt_bracelet.jpg" },
        { id: 4, name: "Crocheted flower", price: 50, img: "/images/crochet_flower.jpg" },
        { id: 5, name: "Evil eye crochet", price: 80, img: "/images/evil_eye.jpg" },
        { id: 6, name: "Stuffed evil eye crochet", price: 150, img: "/images/stuffed_evil_eye.jpg" },
        { id: 7, name: "Phone charms", price: 70, img: "/images/phone_charm.jpg" }
    ];

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
                        <div key={item.id} className="flex items-center justify-between p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/30 shadow-sm transition-all hover:bg-white/50">
                            {/* Left: Image and Name */}
                            <div className="flex items-center gap-4 flex-grow">
                                <div className="w-[100px] h-[100px] bg-peach-50 rounded-xl overflow-hidden shadow-inner border-2 border-white flex-shrink-0">
                                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="font-bold text-peach-900 leading-tight">{item.name}</div>
                                    <div className="text-peach-700/70 text-sm font-bold mt-1">₹{item.price}</div>
                                </div>
                            </div>

                            {/* Right: Quantity and Checkbox */}
                            <div className="flex items-center gap-3">
                                {inCart && (
                                    <div className="flex items-center gap-2 bg-peach-100/50 rounded-full px-3 py-1 scale-95 animate-fadeIn border border-peach-200">
                                        <button
                                            onClick={() => updateQty(item.id, -1)}
                                            className="w-6 h-6 flex items-center justify-center bg-peach-500 text-white rounded-full font-bold text-xs hover:bg-peach-600 transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="font-bold text-peach-900 w-4 text-center">{inCart.qty}</span>
                                        <button
                                            onClick={() => updateQty(item.id, 1)}
                                            className="w-6 h-6 flex items-center justify-center bg-peach-500 text-white rounded-full font-bold text-xs hover:bg-peach-600 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                )}
                                <input
                                    type="checkbox"
                                    checked={!!inCart}
                                    onChange={() => toggleItem(item)}
                                    className="w-6 h-6 rounded-md border-2 border-peach-400 text-peach-600 focus:ring-peach-500 cursor-pointer accent-peach-500"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Subtotal Section */}
            <div className="flex justify-between items-center p-6 bg-white/30 backdrop-blur-xl border-t border-peach-100 -mx-8 -mb-8 rounded-b-3xl shadow-inner mt-4">
                <span className="text-peach-900/60 font-semibold uppercase tracking-wider text-sm">Subtotal</span>
                <span className="text-2xl font-bold text-peach-900">₹{calculateTotal()}</span>
            </div>

            {/* Navigation Buttons */}
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
