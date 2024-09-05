"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Card from "../../components/card/Card";
import { useDebounce, useCards, useExpansionsAndTypes } from "../../hooks/index";

interface Card {
  id: number;
  name: string;
  type: string;
  hp: number;
  attack: number;
  thumb: string;
  weaknesses: string[];
  resistances: string[];
  expansion: string;
  rarity: string;
}

const HomeComponent: React.FC = () => {
  useEffect(() => {
    console.log("API_URL:", process.env.NEXT_PUBLIC_API_URL);
  }, []);
  const [nameFilter, setNameFilter] = useState("");
  const [expansionFilter, setExpansionFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const debouncedNameFilter = useDebounce(nameFilter, 300);
  const { cards, loading, error } = useCards(debouncedNameFilter, expansionFilter, typeFilter);
  const { expansions, types } = useExpansionsAndTypes();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pokémon App</h1>

      <div className="mb-4 flex space-x-4">
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
          {expansions.map((expansion) => (
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
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link key={card.id} href={`/card/${card.id}`}>
            <div className="cursor-pointer">
              <Card {...card} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeComponent;