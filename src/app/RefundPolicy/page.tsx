import React from 'react';
import Link from 'next/link';

const RefundPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white px-4 py-12 md:px-8">
            <div className="max-w-4xl mx-auto space-y-8 bg-zinc-950 p-6 md:p-10 rounded-2xl border border-zinc-800 shadow-xl">
                <div className="border-b border-zinc-800 pb-6">
                    <Link href="/" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors inline-block mb-3">
                        ← Back to Home
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Refund, Shipping & Cancellation Policy</h1>
                    <p className="text-sm text-zinc-400 mt-2">Last Updated: October 2026</p>
                </div>

                <div className="space-y-6 text-zinc-300 leading-relaxed text-sm md:text-base">
                    <section className="space-y-3">
                        <p>
                            At <strong className="text-white">eShop</strong> (Proudchitts Inc.), we are dedicated to providing swift, dependable, and transparent grocery and essentials fulfillment for you and your loved ones. This policy outlines how fulfillment, delivery, cancellations, and refunds are handled on our platform.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">1. Shipping & Local Delivery Policy</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong className="text-white">Hyperlocal Model:</strong> We do not operate an overseas dropshipping model. All items listed on eShop are sourced and fulfilled locally through our network of verified neighborhood grocery stores and supermarkets in the recipient&apos;s vicinity.
                            </li>
                            <li>
                                <strong className="text-white">Dispatch & Processing Time:</strong> Once your payment is successfully processed via Paystack, the order is instantly dispatched to nearby verified partner merchants.
                            </li>
                            <li>
                                <strong className="text-white">Fulfillment Window:</strong> Standard orders are prepared for in-store pickup or dispatched for local courier delivery within <strong>30 minutes to 3 hours</strong>.
                            </li>
                            <li>
                                <strong className="text-white">Collection Verification:</strong> Recipients collecting in-store present a secure digital order identifier / PIN code provided in the eShop app or via notification.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">2. Order Cancellation Policy</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong className="text-white">Pre-Acceptance Cancellation:</strong> You may cancel any order before it is accepted and prepared by a partner merchant. Cancelled orders are eligible for an immediate <strong>100% full refund</strong>.
                            </li>
                            <li>
                                <strong className="text-white">Merchant Unavailability:</strong> If no partner merchant in the delivery area is able to fulfill the order (e.g. store is closed or items are out of stock), the order is automatically declined, and the transaction is refunded in full immediately.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-xl font-bold text-white">3. Return & Refund Policy</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong className="text-white">Refund Conditions:</strong> You are entitled to a full or partial refund if:
                                <ul className="list-circle pl-6 mt-1 space-y-1">
                                    <li>An ordered item is out of stock or unavailable at the time of packing.</li>
                                    <li>The order cannot be fulfilled or delivered due to merchant unavailability.</li>
                                    <li>Items received are damaged, defective, or incorrect.</li>
                                </ul>
                            </li>
                            <li>
                                <strong className="text-white">Refund Timeline & Methods:</strong>
                                <ul className="list-circle pl-6 mt-1 space-y-1">
                                    <li><strong className="text-white">In-App Wallet:</strong> Refund amounts are credited instantly to your in-app eShop wallet balance and can be used immediately for future orders.</li>
                                    <li><strong className="text-white">Original Payment Card / Method (Paystack):</strong> If you prefer a reversal to your original debit/credit card or bank account, Paystack processes card refunds within <strong>3 to 5 business days</strong> depending on your issuing bank.</li>
                                </ul>
                            </li>
                            <li>
                                <strong className="text-white">How to Request a Refund:</strong> Contact our support team within 24 hours of scheduled collection/delivery with your Order ID and photos of damaged or incorrect goods (if applicable).
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-3 border-t border-zinc-800 pt-6">
                        <h2 className="text-xl font-bold text-white">4. Customer Support Contact</h2>
                        <p>We are here to assist with any questions, delivery queries, or refund requests:</p>
                        <div className="bg-zinc-900/60 p-4 rounded-xl border border-zinc-800 space-y-1">
                            <p><strong className="text-white">Entity:</strong> eShop (Proudchitts Inc.)</p>
                            <p><strong className="text-white">Email:</strong> <a href="mailto:eshop@gmail.com" className="text-emerald-400 underline">eshop@gmail.com</a></p>
                            <p><strong className="text-white">WhatsApp & Phone Support:</strong> <a href="tel:+27789857143" className="text-emerald-400 underline">+27 789 857 143</a></p>
                            <p><strong className="text-white">Support Availability:</strong> Monday – Sunday (8:00 AM – 8:00 PM SAST)</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default RefundPolicy;
