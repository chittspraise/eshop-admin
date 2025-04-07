import React from 'react';

const TermsAndConditions: React.FC = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Terms and Conditions</h1>
            <p>Welcome to our grocery store app. By using this application, you agree to the following terms and conditions:</p>
            
            <h2>1. Use of the App</h2>
            <p>
                This app is intended for personal use only. You agree not to use the app for any unlawful or prohibited activities.
            </p>
            
            <h2>2. Account Responsibility</h2>
            <p>
                You are responsible for maintaining the confidentiality of your account and password. Any activity under your account is your responsibility.
            </p>
            
            <h2>3. Product Information</h2>
            <p>
                We strive to provide accurate product information, but we do not guarantee that all details are error-free. Prices and availability are subject to change without notice.
            </p>
            
            <h2>4. Limitation of Liability</h2>
            <p>
                We are not liable for any damages arising from the use of this app, including but not limited to direct, indirect, incidental, or consequential damages.
            </p>
            
            <h2>5. Changes to Terms</h2>
            <p>
                We reserve the right to update these terms and conditions at any time. Continued use of the app constitutes acceptance of the updated terms.
            </p>
            
            <h2>6. Contact Us</h2>
            <p>
                If you have any questions about these terms, please contact us at support@grocerystoreapp.com.
            </p>
        </div>
    );
};

export default TermsAndConditions;