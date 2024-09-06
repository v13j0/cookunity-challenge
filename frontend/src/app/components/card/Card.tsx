import React from 'react';
import './Card.css';
import Image from 'next/image';


interface CardProps {
    id: number;
    name: string;
    type: string;
    hp: number;
    attack: number;
    thumb: string;
    weaknesses?: string[];
    resistances?: string[];
    expansion: string;
    rarity: string;
}

const Card: React.FC<CardProps> = ({ name, type, hp, attack, thumb, weaknesses, resistances, expansion, rarity }) => {
    return (
        <div className="card shadow-md">
            <div className="flex flex-row justify-between mb-4 w-full">
                <h2 className="name">{name}</h2>
                <p className="honk-400 hp">HP {hp}</p>
            </div>
            <div className='w-full rounded-lg overflow-hidden bg-white border border-gray-200'>
                <Image className="thumb" src={`/images/${thumb}`} alt={name} width={200} height={200} priority />
            </div>
            <ul className="abilities">
                <li><strong>Type:</strong> {type}</li>
                <li><strong>Attack:</strong> {attack}</li>
                <li><strong>Weaknesses:</strong> {weaknesses?.map(w => <span key={w}>{w}</span>)}</li>
                <li><strong>Resistances:</strong> {resistances?.map(r => <span key={r}>{r}</span>)}</li>
            </ul>
            <div className="footer flex flex-col w-full">
                <p>Expansion: {expansion}</p>
                <p>Rarity: {rarity}</p>
            </div>
        </div >
    );
};

export default Card;