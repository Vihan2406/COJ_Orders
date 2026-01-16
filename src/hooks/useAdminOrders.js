import { useState, useEffect, useCallback } from 'react';

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzNgFpxIRy_JY9xbyPycx8luR8b7-fpZsV3pTlrn9_JQ2Ix4e2QcmmMjxIkV7SNnNfc1w/exec';

export const useAdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [syncingRow, setSyncingRow] = useState(null);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${SCRIPT_URL}?action=getOrders&t=${Date.now()}`);
            if (!res.ok) throw new Error("Failed to fetch orders");
            const data = await res.json();
            // Sort by rowId descending (Newest first)
            const sortedData = data.sort((a, b) => b.rowId - a.rowId);
            setOrders(sortedData);
        } catch (err) {
            console.error("Admin Fetch Error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const toggleDelivered = async (rowId, currentStatus) => {
        const newStatus = !currentStatus;
        setSyncingRow(rowId);

        // Optimistic Update
        setOrders(prev => prev.map(o => o.rowId === rowId ? { ...o, delivered: newStatus } : o));

        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({
                    action: 'updateDelivered',
                    rowId,
                    delivered: newStatus
                })
            });
        } catch (err) {
            console.error("Delivery Toggle Error:", err);
            // Revert
            setOrders(prev => prev.map(o => o.rowId === rowId ? { ...o, delivered: currentStatus } : o));
            alert("Failed to sync delivery status.");
        } finally {
            setSyncingRow(null);
        }
    };

    const updateMess = async (rowId, newMess) => {
        const oldOrder = orders.find(o => o.rowId === rowId);
        if (!oldOrder) return;

        setSyncingRow(rowId);
        // Optimistic Update
        setOrders(prev => prev.map(o => o.rowId === rowId ? { ...o, mess: newMess } : o));

        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({
                    action: 'updateMess',
                    rowId,
                    mess: newMess
                })
            });
        } catch (err) {
            console.error("Mess Update Error:", err);
            // Revert
            setOrders(prev => prev.map(o => o.rowId === rowId ? { ...o, mess: oldOrder.mess } : o));
            alert("Failed to sync mess assignment.");
        } finally {
            setSyncingRow(null);
        }
    };

    return {
        orders,
        loading,
        error,
        syncingRow,
        fetchOrders,
        toggleDelivered,
        updateMess
    };
};
