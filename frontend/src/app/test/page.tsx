'use client';
import { useState } from 'react';

export default function TestBattle() {
    const [result, setResult] = useState<string>('');
    const [attacker, setAttacker] = useState<string>('');
    const [defender, setDefender] = useState<string>('');

    const handleBattle = async () => {
        try {
            const response = await fetch(`http://localhost:3001/cards/battle/${attacker}/${defender}`);
            const data = await response.json();
            setResult(data ? 'Attacker wins!' : 'Defender survives!');
        } catch (error) {
            console.error('Error:', error);
            setResult('Error occurred');
        }
    };

    return (
        <div>
            <h1>Test Battle</h1>
            <input
                type="text"
                placeholder="Attacker ID"
                value={attacker}
                onChange={(e) => setAttacker(e.target.value)}
            />
            <input
                type="text"
                placeholder="Defender ID"
                value={defender}
                onChange={(e) => setDefender(e.target.value)}
            />
            <button onClick={handleBattle}>Battle!</button>
            <p>Result: {result}</p>
        </div>
    );
}