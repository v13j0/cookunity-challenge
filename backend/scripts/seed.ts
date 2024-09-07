import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const pokemons = [
    {
      thumb: 'feraligatr.png',
      name: 'Feraligatr',
      type: 'Water',
      expansion: 'Neo Genesis',
      rarity: 'Holo Rare',
      hp: 160,
      attack: 320,
      weaknesses: ['Electric'],
      resistances: [],
    },
    {
      thumb: 'onix.png',
      name: 'Onix',
      type: 'Rock/Ground',
      expansion: 'Base Set',
      rarity: 'Common',
      hp: 40,
      attack: 80,
      weaknesses: ['Water'],
      resistances: ['Electric'],
    },
    {
      thumb: 'pikachu.png',
      name: 'Pikachu',
      type: 'Electric',
      expansion: 'Base Set',
      rarity: 'Common',
      hp: 20,
      attack: 20,
      weaknesses: ['Fighting'],
      resistances: ['Metal'],
    },
    {
      thumb: 'sneasel.png',
      name: 'Sneasel',
      type: 'Dark/Ice',
      expansion: 'Neo Genesis',
      rarity: 'Uncommon',
      hp: 20,
      attack: 20,
      weaknesses: ['Fighting'],
      resistances: ['Psychic'],
    },
    {
      thumb: 'scizor.png',
      name: 'Scizor',
      type: 'Metal/Bug',
      expansion: 'Neo Discovery',
      rarity: 'Holo Rare',
      hp: 60,
      attack: 60,
      weaknesses: ['Fire'],
      resistances: ['Psychic'],
    },
    {
      thumb: 'treecko.png',
      name: 'Treecko',
      type: 'Grass',
      expansion: 'EX Ruby & Sapphire',
      rarity: 'Common',
      hp: 40,
      attack: 40,
      weaknesses: ['Fire'],
      resistances: [],
    },
  ];

  for (const pokemon of pokemons) {
    await prisma.card.create({
      data: pokemon,
    });
  }

  console.log('Pokémon cards have been added to the database.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
