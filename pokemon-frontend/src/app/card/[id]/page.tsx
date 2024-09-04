'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Card from '../../components/Card';

interface Card {
    id: number;
    name: string;
    type: string;
    hp: number;
    attack: number;
    defense: number;
    thumb: string;
    weaknesses: string[];
    resistances: string[];
    expansion: string;
    rarity: string;
}

const CardDetail: React.FC = () => {
    const params = useParams();
    const [card, setCard] = useState<Card | null>(null);
    const [allCards, setAllCards] = useState<Card[]>([]);
    const [opponentId, setOpponentId] = useState<string>('');
    const [battleResult, setBattleResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCard = async () => {
            console.log('Frontend: Fetching card with ID:', params.id);
            try {
                const response = await fetch(`http://localhost:3001/cards/${params.id}`);
                console.log('Frontend: Response status:', response.status);
                console.log('Frontend: Response headers:', response.headers);

                if (response.status === 404) {
                    console.error('Frontend: Card not found');
                    setError('Card not found');
                    setCard(null);
                    return;
                }
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Frontend: Fetched card:', data);
                setCard(data);
                setError(null);
            } catch (error) {
                console.error('Frontend: Error fetching card:', error);
                setError('Error fetching card. Please try again.');
                setCard(null);
            }
        };

        const fetchAllCards = async () => {
            try {
                const response = await fetch('http://localhost:3001/cards');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setAllCards(data);
            } catch (error) {
                console.error('Error fetching all cards:', error);
                setError('Error fetching all cards. Please try again.');
            }
        };

        fetchCard();
        fetchAllCards();
    }, [params.id]);

    const handleBattle = async () => {
        if (!card || !opponentId) {
            setBattleResult('Please select an opponent');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/cards/battle/${card.id}/${opponentId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setBattleResult(result.details);
        } catch (error) {
            console.error('Error during battle:', error);
            setBattleResult('Error occurred during battle');
        }
    };

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!card) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <Link href="/" className="text-blue-500 hover:underline mb-4 block">
                &larr; Back to all cards
            </Link>
            <div className='flex'>
                <Card {...card} />
                <div className="ml-8">
                    <h2 className="text-2xl font-bold mb-4">Battle</h2>
                    <select
                        value={opponentId}
                        onChange={(e) => setOpponentId(e.target.value)}
                        className="p-2 border rounded mr-4"
                    >
                        <option value="">Select an opponent</option>
                        {allCards.filter(c => c.id !== card.id).map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleBattle}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Battle!
                    </button>
                    {battleResult && <p className="mt-4">{battleResult}</p>}
                </div>
            </div>
        </div>
    );
};

export default CardDetail;