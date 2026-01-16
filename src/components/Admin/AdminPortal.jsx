import React, { useState } from 'react';

import { useAdminOrders } from '../../hooks/useAdminOrders';

const AdminPortal = ({ onBack, isSaleActive, toggleGlobalSale, isUpdatingSale }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [activeTab, setActiveTab] = useState('All');

    const {
        orders,
        loading,
        error: fetchError,
        syncingRow,
        fetchOrders,
        toggleDelivered,
        updateMess
    } = useAdminOrders();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'cojem' && password === 'jogw_2026_coj') {
            setIsAdmin(true);
            setError('');
            fetchOrders();
        } else {
            setError('Invalid credentials');
        }
    };

    const sortedOrders = [...orders].sort((a, b) => {
        // First sort by Delivered (False first)
        if (a.delivered !== b.delivered) {
            return a.delivered ? 1 : -1;
        }
        // Then by rowId (Newest first)
        return b.rowId - a.rowId;
    });

    const filteredOrders = activeTab === 'All'
        ? sortedOrders
        : sortedOrders.filter(o => {
            const orderMess = (o.mess || '').toString().trim().toUpperCase();
            const tabMess = activeTab.split(' ')[0].toUpperCase();
            return orderMess === tabMess;
        });

    return (
        <div className={`w-full ${isAdmin ? 'max-w-6xl' : 'max-w-md'} min-h-[80vh] flex items-center justify-center p-4 transition-all duration-500`}>
            <div className={`w-full bg-white/30 backdrop-blur-2xl rounded-3xl p-6 md:p-8 border border-white/40 shadow-2xl relative animate-in fade-in zoom-in duration-500`}>
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="absolute top-4 right-4 flex items-center gap-2 text-white/60 hover:text-white transition-all group z-50"
                    title="Back to Store"
                >
                    <span className="text-xs uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">Exit</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {!isAdmin ? (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-3xl font-black text-peach-700 mb-2 tracking-tight font-fredoka">Admin Access</h2>
                            <p className="text-peach-600/70 text-sm font-medium">Secure Management Portal</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-peach-400 focus:ring-0 outline-none transition-all bg-white/50 text-peach-900 placeholder-peach-300 font-medium"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-peach-400 focus:ring-0 outline-none transition-all bg-white/50 text-peach-900 placeholder-peach-300 font-medium"
                                    required
                                />
                            </div>

                            {(error || fetchError) && (
                                <p className="text-red-500 text-sm text-center font-bold bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                                    {error || fetchError}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="w-full py-4 bg-peach-500 hover:bg-peach-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-lg mt-4 font-fredoka uppercase tracking-widest"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="flex flex-col h-full space-y-6">
                        {/* Header Stats & Controls */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-6 border-b border-white/20">
                            <div>
                                <h2 className="text-3xl font-black text-peach-800 font-fredoka tracking-tight">Management Dashboard</h2>
                                <p className="text-peach-700/60 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">Live Order Control Center</p>
                            </div>

                            <div className="flex items-center gap-4 bg-white/20 p-2 rounded-2xl border border-white/20">
                                <div className="px-4 py-1.5 rounded-xl bg-white/50 border border-white/50 text-center">
                                    <p className="text-[10px] uppercase font-bold text-peach-600">Total Orders</p>
                                    <p className="text-xl font-black text-peach-800">{orders.length}</p>
                                </div>
                                <div className="px-4 py-1.5 rounded-xl bg-white/50 border border-white/50 text-center">
                                    <p className="text-[10px] uppercase font-bold text-peach-600">Active Sale</p>
                                    <button
                                        onClick={toggleGlobalSale}
                                        disabled={isUpdatingSale}
                                        className={`mt-1 flex items-center justify-center w-8 h-4 rounded-full transition-all relative ${isSaleActive ? 'bg-green-400' : 'bg-gray-300'}`}
                                    >
                                        <div className={`absolute w-3 h-3 bg-white rounded-full transition-all ${isSaleActive ? 'right-0.5' : 'left-0.5'}`} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                            {['All', 'A Mess', 'C Mess', 'D Mess', 'Other'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-2 rounded-full font-bold text-sm transition-all whitespace-nowrap border-2 ${activeTab === tab
                                        ? 'bg-peach-500 text-white border-peach-500 shadow-md'
                                        : 'bg-white/20 text-peach-700 border-transparent hover:bg-white/40'
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                            <button
                                onClick={fetchOrders}
                                disabled={loading}
                                className="ml-auto p-2 bg-honey-400 text-peach-900 rounded-lg hover:bg-honey-500 transition-all font-bold text-xs uppercase tracking-tighter"
                            >
                                {loading ? 'Refetching...' : 'Refresh'}
                            </button>
                        </div>

                        {/* Orders Table */}
                        <div className="bg-white/40 backdrop-blur-md rounded-2xl overflow-hidden border border-white/40 shadow-inner flex-grow min-h-[400px]">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-peach-100/50">
                                        <tr>
                                            <th className="px-4 py-3 text-[10px] uppercase tracking-widest font-black text-peach-800">Timestamp</th>
                                            <th className="px-4 py-3 text-[10px] uppercase tracking-widest font-black text-peach-800">Customer</th>
                                            <th className="px-4 py-3 text-[10px] uppercase tracking-widest font-black text-peach-800">Recipient / Hostel</th>
                                            <th className="px-4 py-3 text-[10px] uppercase tracking-widest font-black text-peach-800 text-center">Price</th>
                                            <th className="px-4 py-3 text-[10px] uppercase tracking-widest font-black text-peach-800 text-center">Delivered</th>
                                            <th className="px-4 py-3 text-[10px] uppercase tracking-widest font-black text-peach-800 text-center">Mess</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-peach-100/20">
                                        {filteredOrders.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="px-4 py-20 text-center text-peach-900/40 italic font-medium">
                                                    {loading ? 'Fetching happiness...' : 'No orders found in this category'}
                                                </td>
                                            </tr>
                                        ) : filteredOrders.map((order) => (
                                            <tr key={order.rowId} className="hover:bg-white/10 transition-colors">
                                                <td className="px-4 py-4 text-xs font-bold text-peach-700/60">
                                                    {new Date(order.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                                </td>
                                                <td className="px-4 py-4">
                                                    <p className="font-bold text-peach-900">{order.name}</p>
                                                    <p className="text-[10px] text-peach-700/50 uppercase font-black">{order.id}</p>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <p className="font-bold text-peach-900">{order.rname}</p>
                                                    <p className="text-xs font-black text-peach-700/80 bg-peach-100/50 inline-block px-2 py-0.5 rounded-md mt-1 italic uppercase">{order.rhostel}</p>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <span className="font-black text-peach-900">₹{order.totalprice}</span>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <button
                                                        onClick={() => toggleDelivered(order.rowId, order.delivered)}
                                                        disabled={syncingRow === order.rowId}
                                                        className={`w-10 h-6 rounded-full transition-all relative inline-block align-middle ${order.delivered ? 'bg-green-500' : 'bg-red-400'}`}
                                                    >
                                                        <div className={`absolute w-3.5 h-3.5 bg-white rounded-full top-1.5 transition-all ${order.delivered ? 'right-1.5' : 'left-1.5'}`} />
                                                        {syncingRow === order.rowId && (
                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-full">
                                                                <div className="w-2 h-2 border border-white border-t-transparent rounded-full animate-spin" />
                                                            </div>
                                                        )}
                                                    </button>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <select
                                                        value={order.mess}
                                                        onChange={(e) => updateMess(order.rowId, e.target.value)}
                                                        disabled={syncingRow === order.rowId}
                                                        className="text-[10px] font-black uppercase tracking-widest bg-white/50 border-none rounded-lg px-2 py-1 outline-none text-peach-800"
                                                    >
                                                        <option value="A">A</option>
                                                        <option value="C">C</option>
                                                        <option value="D">D</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Summary Footer */}
                        <div className="text-center">
                            <button
                                onClick={onBack}
                                className="px-10 py-3 bg-peach-500 hover:bg-peach-600 text-white font-black rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 text-sm uppercase tracking-widest font-fredoka"
                            >
                                Back to Client Site
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPortal;
