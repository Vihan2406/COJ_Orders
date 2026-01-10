import { useState, useEffect } from 'react';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx3zVJFD5HXzLuRHde3Wg5Tg_1XwtrbndEuWumzuOmP2aFvdkr0TGUQneNM6MoD3j3rDw/exec';
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
    });
    const [cart, setCart] = useState([]);
    const [items] = useState([
        { id: 1, name: "Daisy Bracelet", price: 150, img: "/images/item1.png" },
        { id: 2, name: "Crochet Bee", price: 250, img: "/images/item2.png" },
        { id: 3, name: "Handmade Keychain", price: 120, img: "/images/item3.png" },
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        if (!idRegex.test(formData.custId.trim())) return "Format required: 202XXXXXXXXXG";
        if (!phoneRegex.test(formData.custPhone.trim())) return "Enter a valid 10-digit number.";
        return null;
    };

    const validateDeliveryInfo = () => {
        if (!formData.recName.trim()) return "Recipient name is required.";
        if (!idRegex.test(formData.recId.trim())) return "Format required: 202XXXXXXXXXG";
        if (!phoneRegex.test(formData.recPhone.trim())) return "Enter a valid 10-digit number.";
        return null;
    };

    const generateReceiverEmail = (id) => {
        // ID format: 2024XXXXXXXXG
        // Requirement: f + 1,2,3,4 + 9,10,11,12 + @goa.bits-pilani.ac.in
        // Actually the user said: f + (first 4 digits) + 5th last + 4th last + 3rd last + 2nd last
        // ID is like 202XXXX0456G
        // Digit index: 0123...
        // Last char is 'G'
        // indices for 5th, 4th, 3rd, 2nd last are digits.
        const cleanId = id.trim().toUpperCase();
        const prefix = 'f';
        const first4 = cleanId.substring(0, 4);
        const lastDigits = cleanId.substring(cleanId.length - 5, cleanId.length - 1);
        return `${prefix}${first4}${lastDigits}@goa.bits-pilani.ac.in`;
    };

    const submitOrder = async () => {
        setIsSubmitting(true);
        const selectedStr = cart.map(item => `${item.name}(x${item.qty})`).join(", ");
        const total = calculateTotal();
        const receiverEmail = generateReceiverEmail(formData.recId);

        const sheetData = {
            name: formData.custName,
            id: formData.custId,
            phone: formData.custPhone,
            items: selectedStr + " | Total: ₹" + total,
            rName: formData.recName,
            rId: formData.recId,
            rPhone: formData.recPhone
        };

        const mailerData = {
            to: receiverEmail,
            orderDetails: {
                customerName: formData.custName,
                customerId: formData.custId,
                recipientName: formData.recName,
                items: selectedStr,
                total: total
            }
        };

        try {
            // 1. Submit to Google Sheets (Original Logic)
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(sheetData)
            });

            // 2. Trigger Auto-Mailer
            try {
                const mailResponse = await fetch('/api/send-order-mail', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(mailerData)
                });

                if (!mailResponse.ok) {
                    const errorMsg = await mailResponse.json();
                    throw new Error(errorMsg.error || "Mail failed");
                }
            } catch (mailError) {
                console.error("Auto-mailer failed, but order was recorded", mailError);
                alert("Order recorded, but confirmation email failed: " + mailError.message);
            }

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
        nextStep, prevStep, isSubmitting
    };
};
