// components/NotificationSidebar.tsx
import React from 'react';

const NotificationSidebar: React.FC = () => {
    return (
        <aside className="w-full bg-white p-4 mr-7 mt-2 shadow-md rounded border border-gray-300">
            <h4 className="text-lg font-semibold mb-4">Notifications</h4>
            <ul>
                {/* Example notifications */}
                <li className="mb-2 border-b border-gray-300 pb-2">
                    <p className="text-sm font-medium">Event Reminder</p>
                    <p className="text-sm text-gray-600">You have an upcoming event on Aug 25, 2024.</p>
                </li>
                <li className="mb-2 border-b border-gray-300 pb-2">
                    <p className="text-sm font-medium">Registration Confirmation</p>
                    <p className="text-sm text-gray-600">Your registration for the Tech Conference has been confirmed.</p>
                </li>
                <li className="mb-2 border-b border-gray-300 pb-2">
                    <p className="text-sm font-medium">Payment Confirmation</p>
                    <p className="text-sm text-gray-600">Your payment for the Webinar has been successfully processed.</p>
                </li>
                <li className="mb-2 border-b border-gray-300 pb-2">
                    <p className="text-sm font-medium">Event Update</p>
                    <p className="text-sm text-gray-600">The venue for the Workshop has changed to Room 205.</p>
                </li>
                {/* Add more notifications as needed */}
            </ul>
        </aside>
    );
};

export default NotificationSidebar;
