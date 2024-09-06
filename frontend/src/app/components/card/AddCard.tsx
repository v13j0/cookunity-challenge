"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_URL } from '../../config';
import { useCardCache } from '../../context/CardCacheContext'; // Adjusted import

const AddCard: React.FC = () => {
    const { setCard } = useCardCache(); // Access setCard from CardCacheContext
    const [cardData, setCardData] = useState<{
        name: string;
        type: string;
        hp: number;
        attack: number;
        thumb: string;
        weaknesses: string[];
        resistances: string[];
        expansion: string;
        rarity: string;
    }>({
        name: "Pikachu",
        type: "Electric",
        hp: 60,
        attack: 50,
        thumb: "unknown.png",
        weaknesses: ["Fighting"],
        resistances: ["Steel"],
        expansion: "Base",
        rarity: "Common",
    });

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/cards`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
                body: JSON.stringify(cardData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const newCard = await response.json();
            setCard(newCard.id, newCard); // Update the cache with the new card
            router.push('/'); // Navigate to the home page
        } catch (error) {
            console.error("Error adding card:", error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center p-6 bg-gray-100">
            <h1>Add a New Card</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-4 mb-4 w-full max-w-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="name"
                        value={cardData.name}
                        onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                        Type:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="type"
                        value={cardData.type}
                        onChange={(e) => setCardData({ ...cardData, type: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hp">
                        HP:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        id="hp"
                        value={cardData.hp}
                        onChange={(e) => setCardData({ ...cardData, hp: Number(e.target.value) })}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="attack">
                        Attack:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        id="attack"
                        value={cardData.attack}
                        onChange={(e) => setCardData({ ...cardData, attack: Number(e.target.value) })}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thumb">
                        Thumbnail URL:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="thumb"
                        value={cardData.thumb}
                        onChange={(e) => setCardData({ ...cardData, thumb: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weaknesses">
                        Weaknesses (comma-separated):
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="weaknesses"
                        value={cardData.weaknesses.join(',')}
                        onChange={(e) => setCardData({ ...cardData, weaknesses: e.target.value.split(',') })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="resistances">
                        Resistances (comma-separated):
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="resistances"
                        value={cardData.resistances.join(',')}
                        onChange={(e) => setCardData({ ...cardData, resistances: e.target.value.split(',') })}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expansion">
                        Expansion:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="expansion"
                        value={cardData.expansion}
                        onChange={(e) => setCardData({ ...cardData, expansion: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rarity">
                        Rarity:
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="rarity"
                        value={cardData.rarity}
                        onChange={(e) => setCardData({ ...cardData, rarity: e.target.value })}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Add Card
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCard;