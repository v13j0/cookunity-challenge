import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CardList from './CardList';
import { Card as CardType } from '../../types/Card';

const mockCards: CardType[] = [
    { id: 1, name: 'Pikachu', type: 'Electric', hp: 60, attack: 50, thumb: 'pikachu.jpg', weaknesses: ['Ground'], resistances: [], expansion: 'Base Set', rarity: 'Common' },
    { id: 2, name: 'Charmander', type: 'Fire', hp: 50, attack: 40, thumb: 'charmander.jpg', weaknesses: ['Water'], resistances: [], expansion: 'Base Set', rarity: 'Common' },
];

describe('CardList Component', () => {
    test('renders all cards initially', () => {
        render(<CardList initialCards={mockCards} expansions={[]} types={[]} />);
        expect(screen.getByText('Pikachu')).toBeInTheDocument();
        expect(screen.getByText('Charmander')).toBeInTheDocument();
    });

    test('filters cards by name', () => {
        render(<CardList initialCards={mockCards} expansions={[]} types={[]} />);

        // Simulate typing in the name filter
        fireEvent.change(screen.getByPlaceholderText('Filter by name'), { target: { value: 'Pikachu' } });

        expect(screen.getByText('Pikachu')).toBeInTheDocument();
        expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
    });

    test('filters cards by type', () => {
        render(<CardList initialCards={mockCards} expansions={[]} types={[]} />);

        // Simulate selecting a type filter
        fireEvent.change(screen.getByLabelText('Type'), { target: { value: 'Fire' } });

        expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
        expect(screen.getByText('Charmander')).toBeInTheDocument();
    });

    test('filters cards by expansion', () => {
        render(<CardList initialCards={mockCards} expansions={['Base Set']} types={[]} />);

        // Simulate selecting an expansion filter
        fireEvent.change(screen.getByLabelText('Expansion'), { target: { value: 'Base Set' } });

        expect(screen.getByText('Pikachu')).toBeInTheDocument();
        expect(screen.getByText('Charmander')).toBeInTheDocument();
    });
});