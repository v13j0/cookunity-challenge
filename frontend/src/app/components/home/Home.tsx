"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Card from "../../components/card/Card";
import { useFetchExpansionsAndTypes, useFetchCards, useDebounce } from "../../hooks/index";
import { Card as CardType } from "../../types/Card";

interface HomeProps {
  initialCards: CardType[];
  initialLoading: boolean;
  initialError: string | null;
}

const CardSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div className="card animate-pulse h-4 bg-gray-100 rounded mb-2">Loading...</div>
    <div className="card animate-pulse h-4 bg-gray-100 rounded mb-2">Loading...</div>
    <div className="card animate-pulse h-4 bg-gray-100 rounded w-full">Loading...</div>
  </div>
);

const HomeComponent: React.FC<HomeProps> = ({ initialCards, initialLoading, initialError }) => {
  const [nameFilter, setNameFilter] = useState("");
  const [expansionFilter, setExpansionFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const { expansions, types } = useFetchExpansionsAndTypes();
  const debouncedNameFilter = useDebounce(nameFilter, 300);
  const { cards, loading, error } = useFetchCards(debouncedNameFilter, expansionFilter, typeFilter);
  const displayedCards = cards.length > 0 ? cards : initialCards;

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

      {error && <p className="text-red-500">{error}</p>}

      {loading ? <CardSkeleton /> :
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedCards.map((card) => (
            <Link
              key={card.id}
              href={`/card/${card.id}`}
              as={`/card/${card.id}`}
              passHref
            >
              <div className="cursor-pointer">
                <Card {...card} />
              </div>
            </Link>
          ))}
        </div>
      }
    </div>
  );
};

export default HomeComponent;