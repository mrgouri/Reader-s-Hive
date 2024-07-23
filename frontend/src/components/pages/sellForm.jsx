import React, { useState } from 'react';
import Axios from 'axios'; 
import { useUser } from '../../UserContext';

function SellBookForm() {
    const { user} = useUser();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        genre: '',
        image: '',
        condition: '',
        language: '',
        price: '',
        age: '',
        binding: '',
        isSold: 0,
        userSold: user._id
    });
    const [successMessage, setSuccessMessage] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const response = await Axios.post("http://localhost:3000/book/add", formData);  // Corrected URL
            console.log(response.data);
            setSuccessMessage('Book added successfully');
            setFormData({
                title: '',
                author: '',
                description: '',
                genre: '',
                image: '',
                condition: '',
                language: '',
                price: '',
                age: '',
                binding: '',
                isSold: 0,
                // contact: '',
                userSold: user._id
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-center text-3xl">Sell a Book</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-8/12 m-auto">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
                    <input type="text" name="author" id="author" value={formData.author} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows="3" className="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
                    <input type="text" name="language" id="language" value={formData.language} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="binding" className="block text-sm font-medium text-gray-700">Binding</label>
                    <input type="text" name="binding" id="binding" value={formData.binding} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre</label>
                    <input type="text" name="genre" id="genre" value={formData.genre} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Condition</label>
                    <input type="text" name="condition" id="condition" value={formData.condition} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                    <input type="text" name="age" id="age" value={formData.age} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input type="text" name="price" id="price" value={formData.price} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                </div>
                {/* <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                    <input type="text" name="price" id="price" value={formData.contact} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                </div> */}
                {/* <div className="mb-4">
                    <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">Cover Image URL</label>
                    <input type="text" name="coverImage" id="coverImage" value={formData.coverImage} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full"/>
                </div> */}
                {successMessage && (
                    <div className="bg-green-200 text-green-800 px-4 py-2 rounded-md mb-4">
                        {successMessage}
                    </div>
                )}
                <div className="mt-4">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">Add Book</button>
                </div>
            </form>
        </div>
    );
}

export default SellBookForm;
