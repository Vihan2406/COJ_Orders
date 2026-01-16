import { useState, useEffect } from 'react';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzwmYRU7tk8WBtNuzrfs_NRtVgrj8a8kGFLRbSqx1tqtFqi5IZo2DUf7h8QxMTo2xSsoQ/exec';
const idRegex = /^202[a-zA-Z0-9]{9}G$/i;
const phoneRegex = /^[0-9]{10}$/;

const stories = [
    "Every piece in our collection is crafted with the belief that small things bring the most joy. We focus on quality and character.",
    "Our journey started with a single ball of yarn and a desire to create something tangible in a digital world.",
    "We believe handmade isn't just a process; it's a connection. Thank you for choosing student-made craft.",
    "Craft of Joy represents patience and precision. Each bracelet and crochet item is checked twice for perfection.",
    "From dorm-room designs to your doorstep—we are proud to share these unique creations with you.",
    "Whether it's a gift for yourself or a friend, these items are built to last and carry a story of their own."
];

export const useOrderForm = () => {
    const [step, setStep] = useState(0);
    const [story, setStory] = useState("");
    const [formData, setFormData] = useState({
        custName: "",
        custId: "",
        custPhone: "",
        recName: "",
        recId: "",
        recPhone: "",
        recHostel: "", // NEW FIELD ADDED
    });
    const [cart, setCart] = useState([]);

    // UPDATED: 7 items with new prices and image placeholders
    const [items] = useState([
        { id: 1, name: "Elastic colored bracelets", price: 55, img: "/images/elastic_bracelet.jpg" },
        { id: 2, name: "Adjustable colored bracelets", price: 65, img: "/images/adjustable_bracelet.jpg" },
        { id: 3, name: "Matt black/white bracelets", price: 70, img: "/images/matt_bracelet.jpg" },
        { id: 4, name: "Crocheted flower", price: 50, img: "/images/crochet_flower.jpg" },
        { id: 5, name: "Evil eye crochet", price: 80, img: "/images/evil_eye.jpg" },
        { id: 6, name: "Stuffed evil eye crochet", price: 150, img: "/images/stuffed_evil_eye.jpg" },
        { id: 7, name: "Phone charms", price: 70, img: "/images/phone_charm.jpg" },
    ]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSaleActive, setIsSaleActive] = useState(() => {
        const saved = localStorage.getItem('coj_sale_active');
        return saved === null ? true : saved === 'true';
    });

    useEffect(() => {
        localStorage.setItem('coj_sale_active', isSaleActive);
    }, [isSaleActive]);

    useEffect(() => {
        setStory(stories[Math.floor(Math.random() * stories.length)]);
    }, []);

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleItem = (item) => {
        setCart(prev => {
            const exists = prev.find(i => i.id === item.id);
            if (exists) {
                return prev.filter(i => i.id !== item.id);
            } else {
                return [...prev, { ...item, qty: 1 }];
            }
        });
    };

    const updateQty = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.qty + delta);
                return { ...item, qty: newQty };
            }
            return item;
        }));
    };

    const calculateTotal = () => {
        return cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    };

    const validateUserDetails = () => {
        if (!formData.custName.trim()) return "Please enter your name.";
        if (!idRegex.test(formData.custId.trim())) return "Invalid ID format.";
        if (!phoneRegex.test(formData.custPhone.trim())) return "Invalid phone number.";
        return null;
    };

    const validateDeliveryInfo = () => {
        if (!formData.recName.trim()) return "Recipient name is required.";
        if (!idRegex.test(formData.recId.trim())) return "Invalid Recipient ID.";
        if (!formData.recHostel.trim()) return "Recipient Hostel is required."; // MANDATORY HOSTEL CHECK
        if (!phoneRegex.test(formData.recPhone.trim())) return "Invalid phone number.";
        return null;
    };


    const submitOrder = async () => {
        setIsSubmitting(true);
        const total = calculateTotal();

        // Map cart items to q1-q7 for the 17-column Excel structure
        const quantities = {};
        [1, 2, 3, 4, 5, 6, 7].forEach(id => {
            const itemInCart = cart.find(item => item.id === id);
            quantities[`q${id}`] = itemInCart ? itemInCart.qty : null;
        });

        const sheetData = {
            name: formData.custName,
            id: formData.custId,
            phone: formData.custPhone,
            rName: formData.recName,
            rId: formData.recId,
            rHostel: formData.recHostel, // SENDING HOSTEL
            rPhone: formData.recPhone,
            ...quantities, // SPREADING q1, q2, q3, q4, q5, q6, q7
            totalPrice: total // SENDING CALCULATED TOTAL
        };

        try {
            // Submit to Google Sheets
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(sheetData)
            });

            setStep(5); // Success step
        } catch (error) {
            console.error("Order submission failed", error);
            alert("Submission failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        step, setStep, story, formData, updateFormData, cart, items, toggleItem, updateQty,
        calculateTotal, validateUserDetails, validateDeliveryInfo, submitOrder,
        nextStep, prevStep, isSubmitting, isSaleActive, setIsSaleActive
    };
};
