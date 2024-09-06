import React from 'react';
import Link from 'next/link';
import Card from '../../components/card/Card';
import BattleComponent from '../../components/battle/BattleComponent';
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
                {card && <BattleComponent card={card} allCards={allCards} />}
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

// This function will be called on the server side
export default async function CardDetailPage({ params }: { params: { id: string } }) {
    const { id } = params;

    let card = null;
    let allCards = [];
    let error = null;

    try {
        const cardResponse = await fetch(`${API_URL}/cards/${id}`);
        if (!cardResponse.ok) {
            throw new Error('Failed to fetch card');
        }
        card = await cardResponse.json();

        const allCardsResponse = await fetch(`${API_URL}/cards`);
        if (!allCardsResponse.ok) {
            throw new Error('Failed to fetch all cards');
        }
        allCards = await allCardsResponse.json();
    } catch (err) {
        error = (err as Error).message;
    }

    return <CardDetail card={card} error={error} allCards={allCards} />;
}