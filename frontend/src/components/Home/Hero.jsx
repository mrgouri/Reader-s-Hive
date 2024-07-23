import React from 'react';
import { Link } from 'react-router-dom';
function Hero() {
    return (
        <div className="bg-cover bg-center h-screen flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512820790803-83ca734da794')" }}>
            <div className="bg-black bg-opacity-50 p-10 rounded-lg text-center">
                <h1 className="text-5xl text-white font-bold mb-4">Welcome to Reader's Hive</h1>

                <p className="text-xl text-white mb-6">Your one-stop destination for buying and selling books</p>
                <Link to="/book">
                <a href="#shop" className="bg-yellow-500 text-black py-3 px-6 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition duration-300">Shop Now</a>
                </Link>
            </div>
        </div>
    );
}

export default Hero;
