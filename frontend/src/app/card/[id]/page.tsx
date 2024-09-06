import React from 'react';
import Link from 'next/link';
import Card from '../../components/card/Card';
import BattleComponent from '../../components/battle/BattleComponent'; // Import the new BattleComponent
import { Card as CardTypes } from '../../types/Card';
import { API_URL } from '../../config';

interface CardDetailProps {
    card: CardTypes | null;
    error: string | null;
    allCards: CardTypes[];
}

const CardDetail: React.FC<CardDetailProps> = ({ card, error, allCards }) => {
    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4 flex flex-col items-center">
            <Link href="/" className="text-blue-500 hover:underline mb-4 block">
                &larr; Back to all cards
            </Link>
            <div className='flex lg:flex-row-reverse flex-col sm:flex-col gap-8'>
                {card && <BattleComponent card={card} allCards={allCards} />} {/* Use the BattleComponent */}
                {!card ? <div className='card'>Loading...</div> : <Card {...card} />}
            </div>
        </div>
    );
};

// Fetching data directly in the component
export async function generateStaticParams() {
    const res = await fetch(`${API_URL}/cards`);
    const cards = await res.json();

    return cards.map((card: CardTypes) => ({
        id: card.id.toString(),
    }));
}

export async function getCardData(id: string) {
    const res = await fetch(`${API_URL}/cards/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch card');
    }
    return res.json();
}

export async function getAllCards() {
    const res = await fetch(`${API_URL}/cards`);
    if (!res.ok) {
        throw new Error('Failed to fetch all cards');
    }
    return res.json();
}

// This function will be called on the server side
export default async function CardDetailPage({ params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const card = await getCardData(id);
        const allCards = await getAllCards();

        return <CardDetail card={card} error={null} allCards={allCards} />;
    } catch (error) {
        if (error instanceof Error) {
            return <CardDetail card={null} error={error.message} allCards={[]} />;
        } else {
            return <CardDetail card={null} error="An unknown error occurred" allCards={[]} />;
        }
    }
}