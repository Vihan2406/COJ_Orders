import { useState } from 'react';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxGDGBTUYC7S5Qa8iDrEi8YUVBm76oqMOtXZ5436fj6Jzx2Zw_8C54reeEIGjx7lWWPmA/exec';

export const useOrderForm = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        custName: "", custId: "", custPhone: "",
        recName: "", recId: "", recPhone: "", recHostel: ""
    });
    const [cart, setCart] = useState([]);

    const [items] = useState([
        { id: 1, name: "Elastic colored bracelets", price: 55, img: "/images/elastic_bracelet.jpg" },
        { id: 2, name: "Adjustable colored bracelets", price: 65, img: "/images/adjustable_bracelet.jpg" },
        { id: 3, name: "Matt black/white bracelets", price: 70, img: "/images/matt_bracelet.jpg" },
        { id: 4, name: "Crocheted flower", price: 50, img: "/images/crochet_flower.jpg" },
        { id: 5, name: "Evil eye crochet", price: 80, img: "/images/evil_eye.jpg" },
        { id: 6, name: "Stuffed evil eye crochet", price: 150, img: "/images/stuffed_evil_eye.jpg" },
        { id: 7, name: "Phone charms", price: 70, img: "/images/phone_charm.jpg" }
    ]);

    const submitOrder = async () => {
        const quantities = {};
        [1, 2, 3, 4, 5, 6, 7].forEach(id => {
            const item = cart.find(i => i.id === id);
            quantities[`q${id}`] = item ? item.qty : null;
        });

        const payload = { ...formData, ...quantities, totalPrice: cart.reduce((a, b) => a + (b.price * b.qty), 0) };

        try {
            await fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) });
            setStep(5);
        } catch (e) { alert("Error submitting order."); }
    };

    return { step, setStep, formData, updateFormData: (f, v) => setFormData(p => ({...p, [f]: v})), cart, items, 
             toggleItem: (item) => setCart(prev => prev.find(i => i.id === item.id) ? prev.filter(i => i.id !== item.id) : [...prev, {...item, qty: 1}]),
             updateQty: (id, d) => setCart(p => p.map(i => i.id === id ? {...i, qty: Math.max(1, i.qty + d)} : i)),
             submitOrder, nextStep: () => setStep(s => s + 1), prevStep: () => setStep(s => s - 1)
    };
};
