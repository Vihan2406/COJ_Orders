import jsPDF from 'jspdf';

const SuccessStep = ({ formData, cart, calculateTotal }) => {
    const generateReceipt = async () => {
        const doc = new jsPDF();

        // Helper to load image
        const loadImage = (src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'Anonymous'; // Needed if images are from external source, though here they are local public
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    resolve(canvas.toDataURL('image/png'));
                };
                img.onerror = reject;
                img.src = src;
            });
        };

        try {
            const [nirmaanLogo, samruddhiLogo] = await Promise.all([
                loadImage('/nirmaan_logo.png'),
                loadImage('/samruddhi_logo.svg')
            ]);

            // Header Logos
            // Nirmaan Logo
            doc.addImage(nirmaanLogo, 'PNG', 20, 10, 25, 10);
            // Samruddhi Logo
            doc.addImage(samruddhiLogo, 'PNG', 165, 8, 25, 15);

        } catch (error) {
            console.error("Failed to load logos for receipt:", error);
            // Continue without logos if they fail
        }

        // Branding
        doc.setFontSize(22);
        doc.setTextColor(180, 83, 9); // Amber-900 like color
        doc.text("Crafts of Joy", 105, 30, { align: "center" });

        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text("Order Receipt", 105, 40, { align: "center" });

        // Date
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 105, 48, { align: "center" });

        let yPos = 60;
        const lineHeight = 7;

        // Customer Details
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.setFont(undefined, 'bold');
        doc.text("Customer Details:", 20, yPos);
        yPos += lineHeight;
        doc.setFont(undefined, 'normal');
        doc.text(`Name: ${formData?.custName || "N/A"}`, 20, yPos);
        yPos += lineHeight;
        doc.text(`ID: ${formData?.custId || "N/A"}`, 20, yPos);
        yPos += lineHeight;
        doc.text(`Phone: ${formData?.custPhone || "N/A"}`, 20, yPos);
        yPos += lineHeight * 2;

        // Recipient Details
        doc.setFont(undefined, 'bold');
        doc.text("Recipient Details:", 20, yPos);
        yPos += lineHeight;
        doc.setFont(undefined, 'normal');
        doc.text(`Name: ${formData?.recName || "N/A"}`, 20, yPos);
        yPos += lineHeight;
        doc.text(`ID: ${formData?.recId || "N/A"}`, 20, yPos);
        yPos += lineHeight;
        doc.text(`Phone: ${formData?.recPhone || "N/A"}`, 20, yPos);
        yPos += lineHeight;
        doc.text(`Hostel: ${formData?.recHostel || "N/A"}`, 20, yPos);
        yPos += lineHeight * 2;

        // Order Summary
        doc.setFont(undefined, 'bold');
        doc.text("Order Summary:", 20, yPos);
        yPos += lineHeight;

        doc.setFontSize(10);
        // Header
        doc.text("Item", 20, yPos);
        doc.text("Qty", 150, yPos, { align: "right" });
        doc.text("Price", 170, yPos, { align: "right" });
        doc.text("Total", 190, yPos, { align: "right" });
        yPos += lineHeight;
        doc.line(20, yPos - 5, 190, yPos - 5); // Line below header

        doc.setFont(undefined, 'normal');
        cart?.forEach(item => {
            const itemTotal = item.price * item.qty;
            doc.text(item.name, 20, yPos);
            doc.text(String(item.qty), 150, yPos, { align: "right" });
            doc.text(String(item.price), 170, yPos, { align: "right" });
            doc.text(String(itemTotal), 190, yPos, { align: "right" });
            yPos += lineHeight;
        });

        yPos += 5;
        doc.line(20, yPos - 5, 190, yPos - 5); // Line above total

        // Grand Total
        const totalAmount = calculateTotal ? calculateTotal() : 0;
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text(`Grand Total: Rs. ${totalAmount}`, 190, yPos, { align: "right" });

        // Footer
        yPos += 30;
        doc.setFontSize(10);
        doc.setFont(undefined, 'italic');
        doc.setTextColor(150);
        doc.text("Thank you for supporting Samruddhi - Empowering Women!", 105, yPos, { align: "center" });

        doc.save("CraftsOfJoy_Receipt.pdf");
    };

    return (
        <div className="flex flex-col items-center text-center animate-fadeIn py-10">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <span className="text-5xl text-emerald-600">✓</span>
            </div>
            <h2 className="text-3xl font-black font-quicksand text-peach-800 mb-4">Thank You!</h2>
            <p className="text-gray-600 max-w-xs mx-auto mb-8">
                Your order has been placed successfully. We are crafting your joy!
            </p>

            <div className="w-full space-y-3">
                <button
                    onClick={generateReceipt}
                    className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2"
                >
                    <span>📄 Download Receipt</span>
                </button>

                <button
                    onClick={() => window.location.reload()}
                    className="w-full py-4 bg-peach-500 hover:bg-peach-600 text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                >
                    Return Home
                </button>
            </div>
        </div>
    );
};

export default SuccessStep;
