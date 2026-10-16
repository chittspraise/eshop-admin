import React from 'react';
import Link from 'next/link';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white px-4 py-12 md:px-8">
            <div className="max-w-4xl mx-auto space-y-8 bg-zinc-950 p-6 md:p-10 rounded-2xl border border-zinc-800 shadow-xl">
                <div className="border-b border-zinc-800 pb-6">
                    <Link href="/" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors inline-block mb-3">
                        ← Back to Home
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Privacy Policy</h1>
                    <p className="text-sm text-zinc-400 mt-2">Last Updated: October 2026</p>
                </div>

                <div className="space-y-6 text-zinc-300 leading-relaxed text-sm md:text-base">
                    <section className="space-y-2">
                        <p>
                            Welcome to <strong className="text-white">eShop</strong> (Proudchitts Inc.). Your privacy is critical to us, and we are committed to safeguarding your personal data and maintaining full transparency.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">1. Information We Collect</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong className="text-white">Personal Information:</strong> Name, email address, phone number, and recipient delivery address provided during registration or checkout.</li>
                            <li><strong className="text-white">Payment Details:</strong> Secure transaction references processed via PCI-DSS compliant payment gateways (Paystack). eShop does not store raw credit/debit card numbers or CVVs on its servers.</li>
                            <li><strong className="text-white">Location Data:</strong> Geolocation coordinates used solely to locate nearby registered partner stores and calculate accurate delivery distances.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">2. How We Use Your Information</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>To route, fulfill, and deliver orders to your chosen recipient via our partner network.</li>
                            <li>To send transaction receipts, order status updates, and digital pickup codes via WhatsApp or SMS.</li>
                            <li>To process refunds, prevent fraudulent transactions, and resolve customer support inquiries.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">3. Data Protection & Security</h2>
                        <p>
                            We employ industry-standard encryption, SSL transmission, and secure row-level database access policies to protect all user accounts and transaction records.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">4. Related Policies</h2>
                        <p>
                            For full details regarding order dispatch, shipping, cancellations, and returns, please review our{' '}
                            <Link href="/TermsAndCondition" className="text-emerald-400 underline">Terms and Conditions</Link> and{' '}
                            <Link href="/RefundPolicy" className="text-emerald-400 underline">Refund & Cancellation Policy</Link>.
                        </p>
                    </section>

                    <section className="space-y-3 border-t border-zinc-800 pt-6">
                        <h2 className="text-xl font-bold text-white">5. Contact Us</h2>
                        <p>If you have any questions or requests regarding your personal information, contact our privacy officer:</p>
                        <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800 space-y-1">
                            <p><strong className="text-white">Company:</strong> eShop (Proudchitts Inc.)</p>
                            <p><strong className="text-white">Email:</strong> <a href="mailto:eshop@gmail.com" className="text-emerald-400 underline">eshop@gmail.com</a></p>
                            <p><strong className="text-white">Support & WhatsApp:</strong> <a href="tel:+27789857143" className="text-emerald-400 underline">+27 789 857 143</a></p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
