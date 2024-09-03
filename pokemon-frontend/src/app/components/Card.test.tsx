import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "./Card"; // Adjust the import path as necessary

describe("Card Component", () => {
  test("renders card with correct title", () => {
    render(
      <Card
        id={1}
        name="pikachu"
        type="common"
        hp={2}
        attack={2}
        thumb="test.com"
        weaknesses=""
        resistances=""
        expansion=""
        rarity=""
      />,
    );
    expect(screen.getByText("pikachu")).toBeInTheDocument();
  });

  // ... other tests
});
