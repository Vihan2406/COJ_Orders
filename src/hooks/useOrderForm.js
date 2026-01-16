import { useState, useEffect } from 'react';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzNgFpxIRy_JY9xbyPycx8luR8b7-fpZsV3pTlrn9_JQ2Ix4e2QcmmMjxIkV7SNnNfc1w/exec';
const idRegex = /^202[a-zA-Z0-9]{9}G$/i;
const phoneRegex = /^[0-9]{10}$/;

export const useOrderForm = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        custName: "", custId: "", custPhone: "",
        recName: "", recId: "", recPhone: "", recHostel: ""
    });
    const [cart, setCart] = useState([]);

    // UPDATED: Only 4 items remain
    const [items] = useState([
        { id: 1, name: "Elastic colored bracelets", price: 55, img: "/images/elastic_bracelet.jpg" },
        { id: 2, name: "Adjustable colored bracelets", price: 65, img: "/images/adjustable_bracelet.jpg" },
        { id: 3, name: "Matt black/white bracelets", price: 70, img: "/images/matt_bracelet.jpg" },
        { id: 4, name: "Crocheted flower", price: 50, img: "/images/crochet_flower.jpg" }
    ]);

    const calculateTotal = () => cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    const submitOrder = async () => {
        const total = calculateTotal();
        const quantities = {};
        // Only mapping 4 products now
        [1, 2, 3, 4].forEach(id => {
            const itemInCart = cart.find(item => item.id === id);
            quantities[`q${id}`] = itemInCart ? itemInCart.qty : null;
        });

        const sheetData = {
            ...formData,
            ...quantities,
            totalPrice: total
        };

        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(sheetData)
            });
            setStep(5);
        } catch (error) {
            alert("Submission failed. Please try again.");
        }
    };

    return {
        step, setStep, formData, updateFormData: (f, v) => setFormData(p => ({ ...p, [f]: v })), cart, items,
        toggleItem: (item) => setCart(prev => prev.find(i => i.id === item.id) ? prev.filter(i => i.id !== item.id) : [...prev, { ...item, qty: 1 }]),
        updateQty: (id, d) => setCart(p => p.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i)),
        calculateTotal, submitOrder, nextStep: () => setStep(s => s + 1), prevStep: () => setStep(s => s - 1)
    };
};
