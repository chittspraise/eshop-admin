import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Privacy Policy</h1>
            <p>
                Welcome to our grocery store app. Your privacy is important to us, and we are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data.
            </p>

            <h2>Information We Collect</h2>
            <ul>
                <li>Personal information such as your name, email address, and phone number when you register or place an order.</li>
                <li>Payment information to process your transactions securely.</li>
                <li>Usage data, including app interactions and preferences, to improve your experience.</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <ul>
                <li>To process and deliver your orders.</li>
                <li>To provide customer support and respond to inquiries.</li>
                <li>To improve our app and personalize your experience.</li>
                <li>To send promotional offers and updates, if you opt-in.</li>
            </ul>

            <h2>Data Security</h2>
            <p>
                We implement industry-standard security measures to protect your data. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>Your Rights</h2>
            <p>
                You have the right to access, update, or delete your personal information. If you wish to exercise these rights, please contact us at support@grocerystoreapp.com.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review it periodically.
            </p>

            <h2>Contact Us</h2>
            <p>
                If you have any questions about this Privacy Policy, please contact us at support@grocerystoreapp.com.
            </p>
        </div>
    );
};

export default PrivacyPolicy;