import React, { useState } from 'react';

const AdminPortal = ({ onBack, isSaleActive, toggleGlobalSale, isUpdatingSale }) => {
    // ... same state ...
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const handleLogin = (e) => {
        // ... same logic ...
        e.preventDefault();
        if (username === 'cojem' && password === 'jogw_2026_coj') {
            setIsAdmin(true);
            setError('');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="w-full min-h-[80vh] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/30 backdrop-blur-2xl rounded-3xl p-8 border border-white/40 shadow-2xl relative animate-in fade-in zoom-in duration-500">
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="absolute top-4 right-4 flex items-center gap-2 text-white/60 hover:text-white transition-all group"
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
                            <h2 className="text-3xl font-black text-peach-700 mb-2 tracking-tight">Admin Access</h2>
                            <p className="text-peach-600/70 text-sm">Secure Management Portal</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-peach-400 focus:ring-0 outline-none transition-all bg-white/50 text-peach-900 placeholder-peach-300"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-peach-400 focus:ring-0 outline-none transition-all bg-white/50 text-peach-900 placeholder-peach-300"
                                    required
                                />
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm text-center font-medium bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="w-full py-4 bg-peach-500 hover:bg-peach-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-lg mt-4"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="text-center py-10 space-y-6">
                        <div className="w-20 h-20 bg-green-400/20 border border-green-400/40 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-peach-700">Access Granted</h2>
                            <p className="text-peach-600/70 mt-2">Welcome to the Admin Dashboard</p>
                        </div>
                        <div className="bg-white/10 rounded-2xl p-6 border border-white/10 text-left">
                            <p className="text-peach-800 text-xs uppercase tracking-wider font-bold mb-6 italic text-center">General Controls</p>

                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 shadow-inner">
                                <div className="space-y-1">
                                    <p className="text-peach-700 font-bold">Store Sale Status</p>
                                    <p className="text-peach-600/50 text-xs">Toggle to stop/start all orders</p>
                                </div>
                                <button
                                    onClick={toggleGlobalSale}
                                    disabled={isUpdatingSale}
                                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-300 focus:outline-none ${isSaleActive ? 'bg-peach-500 shadow-inner' : 'bg-gray-200'} ${isUpdatingSale ? 'opacity-50 cursor-wait' : ''}`}
                                >
                                    <span
                                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-all duration-500 shadow-md ${isSaleActive ? 'translate-x-7' : 'translate-x-1'}`}
                                    />
                                </button>
                            </div>

                            <div className="mt-6 text-center space-y-2">
                                <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${isSaleActive ? 'bg-green-400/20 text-green-400 border border-green-400/30' : 'bg-red-400/20 text-red-400 border border-red-400/30'}`}>
                                    {isSaleActive ? 'Sale is Live' : 'Sale is Stopped'}
                                </span>
                                {isUpdatingSale && (
                                    <p className="text-peach-600/50 text-[10px] uppercase font-bold animate-pulse">Syncing with server...</p>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setIsAdmin(false);
                                setUsername('');
                                setPassword('');
                            }}
                            className="text-peach-600/60 hover:text-peach-600 text-sm font-medium transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPortal;
