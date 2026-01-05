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
import { useOrderForm } from './hooks/useOrderForm';

function App() {
    const {
        step, setStep, story, formData, updateFormData, cart, items, toggleItem, updateQty,
        calculateTotal, validateUserDetails, validateDeliveryInfo, submitOrder,
        nextStep, prevStep, isSubmitting
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
                return <SuccessStep />;
            default:
                return <WelcomeStep story={story} onNext={nextStep} />;
        }
    };

    return (
        <div className="relative min-h-screen w-full font-sans overflow-x-hidden">
            {/* --- FIXED BACKGROUND LAYER --- */}
            <div className="fixed inset-0 w-full h-full overflow-hidden bg-gradient-to-b from-purple-300 via-orange-300 to-yellow-200 z-0 pointer-events-none">
                <Sun />
                <Clouds />
                <Waves />
            </div>

            {/* --- SCROLLABLE CONTENT --- */}
            <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-start pt-4 pb-10 px-4">
                <Logos />
                {step === 0 ? (
                    <div className="w-full max-w-4xl">
                        {renderStep()}
                    </div>
                ) : (
                    <div className="w-full max-w-lg bg-white/25 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/40">
                        {renderStep()}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
