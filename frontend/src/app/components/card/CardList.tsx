'use client'; // This component will be a client component

import React, { useState } from 'react';
import Card from './Card';
import { Card as CardType } from '../../types/Card';
import Link from 'next/link';

interface CardListProps {
    initialCards: CardType[];
    expansions: string[];
    types: string[];
}

const CardList: React.FC<CardListProps> = ({ initialCards, expansions, types }) => {
    const [nameFilter, setNameFilter] = useState('');
    const [expansionFilter, setExpansionFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');

    const filteredCards = initialCards.filter(card => {
        const matchesName = card.name.toLowerCase().includes(nameFilter.toLowerCase());
        const matchesExpansion = expansionFilter ? card.expansion === expansionFilter : true;
        const matchesType = typeFilter ? card.type === typeFilter : true;
        return matchesName && matchesExpansion && matchesType;
    });

    return (
        <div className="container mx-auto p-4 flex flex-col items-center">
            <h1 className="text-3xl mb-4">Pokémon App</h1>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
                <input
                    type="text"
                    placeholder="Filter by name"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    className="p-2 border rounded flex-grow"
                />
                <select
                    value={expansionFilter}
                    onChange={(e) => setExpansionFilter(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">All Expansions</option>
                    {Array.isArray(expansions) && expansions.map((expansion) => (
                        <option key={expansion} value={expansion}>
                            {expansion}
                        </option>
                    ))}
                </select>
                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="">All Types</option>
                    {Array.isArray(types) && types.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCards.map((card) => (
                    <Link
                        key={card.id}
                        href={`/card/${card.id}`}
                        as={`/card/${card.id}`}
                        passHref
                    >
                        <div className="cursor-pointer">
                            <Card key={card.id} {...card} />
                        </div>
                    </Link>
                ))
                }
                ))}
            </div>
        </div>
    );
};

export default CardList;