import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "./Card"; // Adjust the import path as necessary 
import HomeComponent from "../home/Home";

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
        weaknesses={["test"]}
        resistances={["test"]}
        expansion=""
        rarity=""
      />,
    );
    expect(screen.getByText("pikachu")).toBeInTheDocument();
  });

  test("renders error message on fetch failure", async () => {
    // Mock fetch to simulate error
    global.fetch = jest.fn(() => Promise.reject("API is down"));
    render(<HomeComponent initialCards={[]} initialLoading={false} initialError={null} />);
    expect(await screen.findByText("Failed to fetch cards.")).toBeInTheDocument();
  });
});
