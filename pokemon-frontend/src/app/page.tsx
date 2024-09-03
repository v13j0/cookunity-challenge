"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Card from "./components/Card";
import { debounce } from "lodash"; // Make sure to install lodash

interface Card {
  id: number;
  name: string;
  type: string;
  hp: number;
  attack: number;
  defense: number;
  thumb: string;
  weaknesses: string[];
  resistances: string[];
  expansion: string;
  rarity: string;
}

const Home: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [nameFilter, setNameFilter] = useState("");
  const [expansionFilter, setExpansionFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [expansions, setExpansions] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCards = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        ...(nameFilter && { name: nameFilter }),
        ...(expansionFilter && { expansion: expansionFilter }),
        ...(typeFilter && { type: typeFilter }),
      }).toString();

      const response = await fetch(
        `http://localhost:3001/cards?${queryParams}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched cards:", data);
      setCards(data);
    } catch (error) {
      console.error("Error fetching cards:", error);
      setError("Failed to fetch cards. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [nameFilter, expansionFilter, typeFilter]);

  const debouncedFetchCards = useCallback(debounce(fetchCards, 300), [
    fetchCards,
  ]);

  useEffect(() => {
    debouncedFetchCards();
  }, [debouncedFetchCards]);

  useEffect(() => {
    const fetchExpansions = async () => {
      try {
        const response = await fetch("http://localhost:3001/cards/expansions");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setExpansions(data);
      } catch (error) {
        console.error("Error fetching expansions:", error);
      }
    };

    const fetchTypes = async () => {
      try {
        const response = await fetch("http://localhost:3001/cards/types");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTypes(data);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    fetchExpansions();
    fetchTypes();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pokémon Card Collection</h1>

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

export default Home;
