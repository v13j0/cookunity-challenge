"use client";

import React, { useState } from "react";
import CardList from "../../components/card/CardList";
import { useFetchExpansionsAndTypes } from "../../hooks/index";
import { Card as CardType } from "../../types/Card";

interface HomeProps {
  initialCards: CardType[];
  initialLoading: boolean;
  initialError: string | null;
}



const HomeComponent: React.FC<HomeProps> = ({ initialCards, initialLoading, initialError }) => {
  const { expansions, types } = useFetchExpansionsAndTypes();
  const [cards, setCards] = useState<CardType[]>(initialCards); // Use state for cards

  return (
    <div>
      <CardList initialCards={cards} expansions={expansions} types={types} />
      {initialError && <p className="text-red-500">{initialError}</p>}
    </div>
  );
};

export default HomeComponent;