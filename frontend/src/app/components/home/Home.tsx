"use client";

import React from "react";
import Link from "next/link";
import CardList from "../../components/card/CardList"; // Import the new CardList component
import { useFetchExpansionsAndTypes } from "../../hooks/index";
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
  const { expansions, types } = useFetchExpansionsAndTypes();

  return (
    <div>
      {initialLoading ? (
        <CardSkeleton />
      ) : (
        <CardList initialCards={initialCards} expansions={expansions} types={types} />
      )}
      {initialError && <p className="text-red-500">{initialError}</p>}
    </div>
  );
};

export default HomeComponent;