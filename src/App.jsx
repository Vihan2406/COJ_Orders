import React from 'react';
import Sun from './components/Background/Sun';
import Clouds from './components/Background/Clouds';
import Waves from './components/Background/Waves';
import Logos from './components/Logos';
import WelcomeStep from './components/Steps/WelcomeStep';
import UserDetailsStep from './components/Steps/UserDetailsStep';
import CollectionStep from './components/Steps/CollectionStep';
import DeliveryInfoStep from './components/Steps/DeliveryInfoStep';
import SummaryStep from './components/Steps/SummaryStep';
import SuccessStep from './components/Steps/SuccessStep';
import AdminButton from './components/Admin/AdminButton';
import AdminPortal from './components/Admin/AdminPortal';
import { useOrderForm } from './hooks/useOrderForm';

function App() {
    const [isAdminView, setIsAdminView] = React.useState(false);
    const {
        step, setStep, story, formData, updateFormData, cart, items, toggleItem, updateQty,
        calculateTotal, validateUserDetails, validateDeliveryInfo, submitOrder,
        nextStep, prevStep, isSubmitting, isSaleActive, toggleGlobalSale, isUpdatingSale
    } = useOrderForm();

    const renderStep = () => {
        switch (step) {
            case 0:
                return <WelcomeStep story={story} onNext={nextStep} />;
            case 1:
                return (
                    <UserDetailsStep
                        formData={formData}
                        updateFormData={updateFormData}
                        onNext={nextStep}
                        onBack={prevStep}
                        validate={validateUserDetails}
                    />
                );
            case 2:
                return (
                    <CollectionStep
                        items={items}
                        cart={cart}
                        toggleItem={toggleItem}
                        updateQty={updateQty}
                        onNext={nextStep}
                        onBack={prevStep}
                        calculateTotal={calculateTotal}
                    />
                );
            case 3:
                return (
                    <DeliveryInfoStep
                        formData={formData}
                        updateFormData={updateFormData}
                        onNext={nextStep}
                        onBack={prevStep}
                        validate={validateDeliveryInfo}
                    />
                );
            case 4:
                return (
                    <SummaryStep
                        formData={formData}
                        cart={cart}
                        calculateTotal={calculateTotal}
                        onSubmit={submitOrder}
                        onBack={prevStep}
                        isSubmitting={isSubmitting}
                    />
                );
            case 5:
                return <SuccessStep formData={formData} cart={cart} calculateTotal={calculateTotal} />;
            default:
                return <WelcomeStep story={story} onNext={nextStep} />;
        }
    };

    return (
        <div className="relative min-h-screen w-full font-sans overflow-x-hidden">
            {!isAdminView && <AdminButton onClick={() => setIsAdminView(true)} />}

            {/* --- FIXED BACKGROUND LAYER --- */}
            <div className="fixed inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-peach-300 via-orange-300 to-yellow-200 z-0 pointer-events-none">
                <Sun />
                <Clouds />
                <Waves />
            </div>

            {/* --- SCROLLABLE CONTENT --- */}
            <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-start pt-4 pb-10 px-4">
                {isAdminView ? (
                    <AdminPortal
                        onBack={() => setIsAdminView(false)}
                        isSaleActive={isSaleActive}
                        toggleGlobalSale={toggleGlobalSale}
                        isUpdatingSale={isUpdatingSale}
                    />
                ) : (
                    <>
                        <Logos />
                        {step === 0 ? (
                            <div className="w-full max-w-4xl">
                                <WelcomeStep story={story} onNext={nextStep} isSaleActive={isSaleActive} />
                            </div>
                        ) : isSaleActive === false ? (
                            <div className="w-full max-w-lg mt-20 bg-white/30 backdrop-blur-2xl rounded-3xl p-12 border border-white/40 shadow-2xl text-center animate-in fade-in slide-in-from-bottom-10 duration-700">
                                <div className="w-24 h-24 bg-orange-400/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Sales Paused</h2>
                                <p className="text-white/70 text-lg leading-relaxed">
                                    We're currently taking a short break to catch up on orders. <br />
                                    Check back soon for more <strong>Craft of Joy</strong>!
                                </p>
                            </div>
                        ) : isSaleActive === true ? (
                            <div className="w-full max-w-lg bg-white/25 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/40">
                                {renderStep()}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center mt-20 text-white italic opacity-60">
                                <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
                                <p>Securing Connection...</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
