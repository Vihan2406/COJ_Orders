import { useState } from 'react';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzNgFpxIRy_JY9xbyPycx8luR8b7-fpZsV3pTlrn9_JQ2Ix4e2QcmmMjxIkV7SNnNfc1w/exec';

const idRegex = /^202[a-zA-Z0-9]{9}G$/i;
const phoneRegex = /^[0-9]{10}$/;

export const useOrderForm = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        custName: "",
        custId: "",
        custPhone: "",
        recName: "",
        recId: "",
        recPhone: "",
        recHostel: ""
    });
    const [cart, setCart] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSaleActive, setIsSaleActive] = useState(null);
    const [isUpdatingSale, setIsUpdatingSale] = useState(false);

<<<<<<< HEAD
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

    return {
        step, setStep, formData, updateFormData: (f, v) => setFormData(p => ({ ...p, [f]: v })), cart, items,
        toggleItem: (item) => setCart(prev => prev.find(i => i.id === item.id) ? prev.filter(i => i.id !== item.id) : [...prev, { ...item, qty: 1 }]),
        updateQty: (id, d) => setCart(p => p.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i)),
        submitOrder, nextStep: () => setStep(s => s + 1), prevStep: () => setStep(s => s - 1)
=======
    const story = "In the heart of our campus, a group of resilient women from the Samruddhi project pour their hopes and dreams into every bead they string and every flower they crochet. These aren't just accessories; they are symbols of financial independence and reclaimed dignity. By choosing 'Crafts of Joy', you're not just buying a product; you're joining a movement of empowerment, one handmade treasure at a time.";

    const items = [
        { id: 1, name: "Elastic colored bracelets", price: 55, img: "/images/elastic_bracelet.jpg" },
        { id: 2, name: "Adjustable colored bracelets", price: 65, img: "/images/adjustable_bracelet.jpg" },
        { id: 3, name: "Matt black/white bracelets", price: 70, img: "/images/matt_bracelet.jpg" },
        { id: 4, name: "Crocheted flower", price: 50, img: "/images/crochet_flower.jpg" }
    ];

    // Fetch Global Sale Status on mount
    useEffect(() => {
        const fetchSaleStatus = async () => {
            try {
                const res = await fetch(`${SCRIPT_URL}?action=getSaleStatus&t=${Date.now()}`);
                if (!res.ok) throw new Error("Network response was not ok");
                const data = await res.json();
                if (data && typeof data.isSaleActive === 'boolean') {
                    setIsSaleActive(data.isSaleActive);
                }
            } catch (err) {
                console.error("Critical: Failed to fetch global sale status.", err);
                setIsSaleActive(false); // Safe mode
            }
        };
        fetchSaleStatus();
    }, []);

    const toggleGlobalSale = async () => {
        const newState = !isSaleActive;
        setIsUpdatingSale(true);
        try {
            setIsSaleActive(newState);
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({
                    action: 'toggleSale',
                    status: newState
                })
            });
        } catch (err) {
            console.error("Failed to update global sale status:", err);
            setIsSaleActive(!newState);
            alert("Failed to update global sale status. Please try again.");
        } finally {
            setIsUpdatingSale(false);
        }
    };

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleItem = (item) => {
        setCart(prev => {
            const exists = prev.find(i => i.id === item.id);
            if (exists) {
                return prev.filter(i => i.id !== item.id);
            }
            return [...prev, { ...item, qty: 1 }];
        });
    };

    const updateQty = (id, delta) => {
        setCart(prev => prev.map(item =>
            item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
        ));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.qty), 0);
    };

    const validateUserDetails = () => {
        const { custName, custId, custPhone } = formData;
        if (!custName.trim() || !custId.trim() || !custPhone.trim()) {
            alert("Please fill in all buyer details");
            return false;
        }
        if (!idRegex.test(custId)) {
            alert("Please enter a valid BITS ID (e.g., 2023A7PS0000G)");
            return false;
        }
        if (!phoneRegex.test(custPhone)) {
            alert("Please enter a valid 10-digit phone number");
            return false;
        }
        return true;
    };

    const validateDeliveryInfo = () => {
        const { recName, recId, recPhone, recHostel } = formData;
        if (!recName.trim() || !recId.trim() || !recPhone.trim() || !recHostel.trim()) {
            alert("Please fill in all recipient details");
            return false;
        }
        if (!idRegex.test(recId)) {
            alert("Please enter a valid BITS ID for the recipient");
            return false;
        }
        if (!phoneRegex.test(recPhone)) {
            alert("Please enter a valid 10-digit phone number for the recipient");
            return false;
        }
        return true;
    };

    const submitOrder = async () => {
        setIsSubmitting(true);
        const total = calculateTotal();

        // Map quantities for all 7 slots (backend expects q1-q7)
        const quantities = {};
        for (let i = 1; i <= 7; i++) {
            const itemInCart = cart.find(item => item.id === i);
            quantities[`q${i}`] = itemInCart ? itemInCart.qty : 0;
        }

        const payload = {
            name: formData.custName,
            id: formData.custId,
            phone: formData.custPhone,
            rName: formData.recName,
            rId: formData.recId,
            rHostel: formData.recHostel,
            rPhone: formData.recPhone,
            ...quantities,
            totalPrice: total
        };

        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(payload)
            });
            setStep(5); // Success step
        } catch (error) {
            console.error("Order submission error:", error);
            alert("Failed to place order. Please check your connection and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    return {
        step,
        setStep,
        story,
        formData,
        updateFormData,
        cart,
        items,
        toggleItem,
        updateQty,
        calculateTotal,
        validateUserDetails,
        validateDeliveryInfo,
        submitOrder,
        nextStep,
        prevStep,
        isSubmitting,
        isSaleActive,
        toggleGlobalSale,
        isUpdatingSale
>>>>>>> a8e2cc1 (fix: restore order submission payload and complete admin dashboard)
    };
};
