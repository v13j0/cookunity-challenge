import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const pokemons = [
    {
      thumb:
        'https://img.pokemondb.net/sprites/home/normal/2x/avif/feraligatr.avif', // Reemplaza con la URL o path de la imagen
      name: 'Feraligatr',
      type: 'Water',
      expansion: 'Neo Genesis',
      rarity: 'Holo Rare',
      hp: 160, // Asignado a partir del ataque
      attack: 320,
      defense: 0, // No especificado, puedes ajustar
      weaknesses: ['Electric'],
      resistances: [],
    },
    {
      thumb: 'https://img.pokemondb.net/sprites/home/normal/2x/avif/onix.avif',
      name: 'Onix',
      type: 'Rock/Ground',
      expansion: 'Base Set',
      rarity: 'Common',
      hp: 40, // Asignado a partir del ataque
      attack: 80,
      defense: 0, // No especificado, puedes ajustar
      weaknesses: ['Water'],
      resistances: ['Electric'],
    },
    {
      thumb:
        'https://img.pokemondb.net/sprites/home/normal/2x/avif/pikachu.avif',
      name: 'Pikachu',
      type: 'Electric',
      expansion: 'Base Set',
      rarity: 'Common',
      hp: 20, // Asignado a partir del ataque
      attack: 20,
      defense: 0, // No especificado, puedes ajustar
      weaknesses: ['Fighting'],
      resistances: ['Metal'],
    },
    {
      thumb:
        'https://img.pokemondb.net/sprites/home/normal/2x/avif/sneasel.avif',
      name: 'Sneasel',
      type: 'Dark/Ice',
      expansion: 'Neo Genesis',
      rarity: 'Uncommon',
      hp: 20, // Asignado a partir del ataque
      attack: 20,
      defense: 0, // No especificado, puedes ajustar
      weaknesses: ['Fighting'],
      resistances: ['Psychic'],
    },
    {
      thumb:
        'https://img.pokemondb.net/sprites/home/normal/2x/avif/scizor.avif',
      name: 'Scizor',
      type: 'Metal/Bug',
      expansion: 'Neo Discovery',
      rarity: 'Holo Rare',
      hp: 60, // Asignado a partir del ataque
      attack: 60,
      defense: 0, // No especificado, puedes ajustar
      weaknesses: ['Fire'],
      resistances: ['Psychic'],
    },
    {
      thumb:
        'https://img.pokemondb.net/sprites/home/normal/2x/avif/treecko.avif',
      name: 'Treecko',
      type: 'Grass',
      expansion: 'EX Ruby & Sapphire',
      rarity: 'Common',
      hp: 40, // Asignado a partir del ataque
      attack: 40,
      defense: 0, // No especificado, puedes ajustar
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
