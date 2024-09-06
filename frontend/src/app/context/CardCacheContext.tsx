'use client';
import React, { createContext, useContext, useState } from 'react';
import { Card as CardType } from '../types/Card';

interface CardCacheContextType {
    cache: Record<number, CardType>;
    setCard: (id: number, card: CardType) => void;
    getCard: (id: number) => CardType | undefined;
}

const CardCacheContext = createContext<CardCacheContextType | undefined>(undefined);

export const CardCacheProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cache, setCache] = useState<Record<number, CardType>>({});

    const setCard = (id: number, card: CardType) => {
        setCache((prev) => ({ ...prev, [id]: card }));
    };

    const getCard = (id: number) => {
        return cache[id];
    };

    return (
        <CardCacheContext.Provider value={{ cache, setCard, getCard }}>
            {children}
        </CardCacheContext.Provider>
    );
};

export const useCardCache = () => {
    const context = useContext(CardCacheContext);
    if (!context) {
        throw new Error('useCardCache must be used within a CardCacheProvider');
    }
    return context;
};