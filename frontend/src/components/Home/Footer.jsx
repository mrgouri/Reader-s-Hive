import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/2 lg:w-1/3 mb-6">
                        <h2 className="text-2xl font-bold mb-4">About Us</h2>
                        <p className="text-gray-400">BookNest is your one-stop destination for buying and selling books. We offer a wide range of books from various genres to cater to book lovers everywhere.</p>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3 mb-6">
                        <h2 className="text-2xl font-bold mb-4">Contact Details</h2>
                        <p className="text-gray-400">Email: support@booknest.com</p>
                        <p className="text-gray-400">Phone: +123 456 7890</p>
                        <p className="text-gray-400">Address: 123 Book Street, Reading Town, Bookland</p>
                    </div>
                </div>
                <div className="text-center text-gray-500 mt-6">
                    &copy; {new Date().getFullYear()} BookNest. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
