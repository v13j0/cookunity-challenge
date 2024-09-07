import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card Component", () => {
  test("renders card with correct title", () => {
    render(
      <Card
        id={1}
        name="Pikachu"
        type="Electric"
        hp={60}
        attack={50}
        thumb="pikachu.jpg"
        weaknesses={["Ground"]}
        resistances={[]}
        expansion="Base Set"
        rarity="Common"
      />,
    );
    expect(screen.getByText("Pikachu")).toBeInTheDocument();
  });

  test("renders card with correct properties", () => {
    const mockCardProps = {
      id: 1,
      name: "Pikachu",
      type: "Electric",
      hp: 60,
      attack: 50,
      thumb: "pikachu.jpg",
      weaknesses: ["Ground"],
      resistances: [],
      expansion: "Base Set",
      rarity: "Common"
    };

    render(<Card {...mockCardProps} />);
    expect(screen.getByText("Pikachu")).toBeInTheDocument();
    expect(screen.getByText("HP 60")).toBeInTheDocument();
    const img = screen.getByAltText("Pikachu");
    expect(img).toHaveAttribute('src');
    expect(img.getAttribute('src')).toContain(encodeURIComponent(mockCardProps.thumb));
    expect(screen.getByText("Electric")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
    expect(screen.getByText("Ground")).toBeInTheDocument();
  });
});
