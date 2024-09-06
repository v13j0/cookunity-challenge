'use client';

import React, { useState } from 'react';
import { Card as CardType } from '../../types/Card';
import { API_URL } from '../../config';

interface BattleComponentProps {
    card: CardType;
    allCards: CardType[];
}

const BattleComponent: React.FC<BattleComponentProps> = ({ card, allCards }) => {
    const [opponentId, setOpponentId] = useState<string>('');
    const [battleResult, setBattleResult] = useState<string | null>(null);

    const handleBattle = async () => {
        if (!card || !opponentId) {
            setBattleResult('Please select an opponent');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/cards/battle/${card.id}/${opponentId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setBattleResult(result.details);
        } catch (error) {
            setBattleResult('Error occurred during battle');
        }
    };

    return (
        <div>
            <h2 className="text-2xl mb-4">Battle</h2>
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
            <div className='battle-result lg:text-left text-center'>
                {battleResult && battleResult.split('.').map((line, index) => (
                    <p key={index} className="mt-4">{line.trim()}</p>
                ))}
            </div>
        </div>
    );
};

export default BattleComponent;