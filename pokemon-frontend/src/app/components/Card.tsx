import React from 'react';
import './Card.css';
interface CardProps {
    id: number;
    name: string;
    type: string;
    hp: number;
    attack: number;
    thumb: string;
    weaknesses?: string[] | string;
    resistances?: string[] | string;
    expansion: string;
    rarity: string;
}

const Card: React.FC<CardProps> = ({ name, type, hp, attack, thumb, weaknesses, resistances, expansion, rarity }) => {
    return (
        <div className="card">
            <div className="flex flex-row justify-between mb-4">
                <h2 className="name">{name}</h2>
                <p className="hp">HP {hp}</p>
            </div>
            <img className="thumb" src={thumb} alt={name} width={100} height={100} />
            <p className="type">Type: {type}</p>
            <p className="attack">Attack: {attack}</p>
            <p className="weakness">Weakness: {weaknesses}</p>
            <p className="resistance">Resistance: {resistances}</p>
            <p className="expansion">Expansion: {expansion}</p>
            <p className="rarity">Rarity: {rarity}</p>
        </div>
    );
};

export default Card;