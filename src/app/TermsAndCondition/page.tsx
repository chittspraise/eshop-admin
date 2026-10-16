import React from 'react';
import Link from 'next/link';

const TermsAndConditions: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white px-4 py-12 md:px-8">
            <div className="max-w-4xl mx-auto space-y-8 bg-zinc-950 p-6 md:p-10 rounded-2xl border border-zinc-800 shadow-xl">
                <div className="border-b border-zinc-800 pb-6">
                    <Link href="/" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors inline-block mb-3">
                        ← Back to Home
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Terms and Conditions</h1>
                    <p className="text-sm text-zinc-400 mt-2">Last Updated: October 2026</p>
                </div>

                <div className="space-y-6 text-zinc-300 leading-relaxed text-sm md:text-base">
                    <section className="space-y-2">
                        <p>
                            Welcome to <strong className="text-white">eShop</strong> (Proudchitts Inc.). By accessing or using our mobile application,
                            website, and on-demand fulfillment services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">1. Business Model & On-Demand Fulfillment</h2>
                        <p>
                            eShop operates an on-demand hyperlocal delivery and in-store collection platform connecting consumers and diaspora buyers with verified local grocery stores, supermarkets, and merchant outlets in the recipient&apos;s immediate area.
                        </p>
                        <p>
                            We are not a traditional dropshipping service. Products ordered through eShop are fulfilled locally and immediately from in-stock retail inventory held by our network of partner merchants.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">2. Account Responsibility</h2>
                        <p>
                            Users are responsible for maintaining the confidentiality of their account credentials, login information, and security PINs. Any activity occurring under your registered account is your responsibility. You agree to notify us immediately of any unauthorized access.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">3. Shipping, Fulfillment & Delivery Policy</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong className="text-white">Instant Dispatch:</strong> Once an order is paid and confirmed via our secure payment gateway (Paystack), it is dispatched automatically to registered partner merchant stores closest to the recipient&apos;s address.
                            </li>
                            <li>
                                <strong className="text-white">Fulfillment Window:</strong> Standard orders are prepared for pickup or dispatched for same-day local delivery within <strong>30 minutes to 3 hours</strong> during partner store operating hours.
                            </li>
                            <li>
                                <strong className="text-white">Collection & Verification:</strong> For self-collection orders, the recipient receives a unique digital pickup code / order identifier to present at the partner outlet.
                            </li>
                            <li>
                                <strong className="text-white">Delivery Confirmation:</strong> Real-time order progress is tracked via our platform, and status updates are provided upon pickup or completed delivery.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">4. Order Cancellation Policy</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong className="text-white">Customer-Initiated Cancellation:</strong> You may cancel an order before it has been accepted or prepared by a merchant partner for a <strong>100% full refund</strong>.
                            </li>
                            <li>
                                <strong className="text-white">Automatic Merchant Cancellation:</strong> If registered partner stores in the recipient area are unable to fulfill an order (e.g., item temporarily unavailable or outside service hours), the order is automatically declined, and a <strong>100% full refund</strong> is issued immediately.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">5. Refund & Return Policy</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong className="text-white">Eligibility:</strong> Full or partial refunds are provided if an item is out of stock, damaged upon delivery, incorrect, or if the order fails to be delivered/collected.
                            </li>
                            <li>
                                <strong className="text-white">Refund Methods:</strong>
                                <ul className="list-circle pl-6 mt-1 space-y-1">
                                    <li><strong className="text-white">In-App Wallet:</strong> Refunded credits are available immediately for future purchases.</li>
                                    <li><strong className="text-white">Original Payment Card (via Paystack):</strong> Reversals back to the customer&apos;s debit/credit card or bank account typically settle within <strong>3 to 5 business days</strong>, subject to bank processing times.</li>
                                </ul>
                            </li>
                            <li>
                                <strong className="text-white">Reporting Issues:</strong> Please report missing, expired, or damaged items within 24 hours of collection or delivery via in-app customer support, WhatsApp, or email, citing your Order ID.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">6. Product Pricing and Availability</h2>
                        <p>
                            We strive to ensure accurate pricing and catalog listings. In the event of inadvertent inventory shortages or pricing errors by a partner store, eShop reserves the right to cancel the affected items and issue an immediate refund.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">7. Limitation of Liability</h2>
                        <p>
                            eShop and Proudchitts Inc. shall not be liable for indirect, incidental, special, or consequential damages resulting from the use or inability to use the service, beyond the transaction amount paid for the order in question.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">8. Changes to Terms</h2>
                        <p>
                            We reserve the right to revise these Terms and Conditions at any time. Continued use of eShop following published changes constitutes acceptance of the revised terms.
                        </p>
                    </section>

                    <section className="space-y-3 border-t border-zinc-800 pt-6">
                        <h2 className="text-xl font-bold text-white">9. Contact & Support</h2>
                        <p>For questions regarding these terms, fulfillment, cancellations, or refunds, please contact us directly:</p>
                        <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800 space-y-1">
                            <p><strong className="text-white">Company:</strong> eShop (Proudchitts Inc.)</p>
                            <p><strong className="text-white">Email:</strong> <a href="mailto:eshop@gmail.com" className="text-emerald-400 underline">eshop@gmail.com</a></p>
                            <p><strong className="text-white">WhatsApp & Phone Support:</strong> <a href="tel:+27789857143" className="text-emerald-400 underline">+27 789 857 143</a></p>
                            <p><strong className="text-white">Live Policy Page:</strong> <a href="https://eshopadmin-zeta.vercel.app/TermsAndCondition" className="text-emerald-400 underline">https://eshopadmin-zeta.vercel.app/TermsAndCondition</a></p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
