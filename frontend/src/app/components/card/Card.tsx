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
        <div className="card">
            <div className="flex flex-row justify-between mb-4 w-full">
                <h2 className="name">{name}</h2>
                <p className="honk-400 hp">HP {hp}</p>
            </div>
            <Image className="thumb" src={`/images/${thumb}`} alt={name} width={200} height={200} />
            <div className="abilities">
                <div className='flex flex-col'>
                    <p><strong>Type: </strong>{type}</p>
                    <p><strong>Attack: </strong>{attack}</p>
                </div>
                <div className='flex flex-col'>
                    <p><strong>Weaknesses: </strong>
                        {weaknesses?.map((weakness, index) => (
                            <span key={index}>{weakness}</span>
                        ))}
                    </p>
                    {weaknesses?.length === 0 && <span>None</span>}
                    <p><strong>Resistances: </strong>
                        {resistances?.map((resistance, index) => (
                            <span key={index}>{resistance}</span>
                        ))}
                        {resistances?.length === 0 && <span>None</span>}
                    </p>
                </div>
            </div>
            <div className="footer flex flex-col w-full">
                <p>Expansion: {expansion}</p>
                <p>Rarity: {rarity}</p>
            </div>
        </div >
    );
};

export default Card;