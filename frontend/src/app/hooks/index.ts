import { useState, useEffect } from "react";
import { API_URL } from "../config";

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

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useCards(
  nameFilter: string,
  expansionFilter: string,
  typeFilter: string
) {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams({
          ...(nameFilter && { name: nameFilter }),
          ...(expansionFilter && { expansion: expansionFilter }),
          ...(typeFilter && { type: typeFilter }),
        }).toString();

        const url = `${API_URL}/cards?${queryParams}`;
        console.log("Fetching cards from:", url);

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers your API might need
          },
        });

        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setCards(data);
      } catch (error) {
        console.error("Error fetching cards:", error);
        setError("Failed to fetch cards. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [nameFilter, expansionFilter, typeFilter]);

  return { cards, loading, error };
}

export function useExpansionsAndTypes() {
  const [expansions, setExpansions] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchExpansions = async () => {
      try {
        const response = await fetch(`${API_URL}/cards/expansions`);
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
        const response = await fetch(`${API_URL}/cards/types`);
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

  return { expansions, types };
}
