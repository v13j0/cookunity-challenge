import HomeComponent from './components/home/Home';

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cards`);
  const initialCards = await res.json();

  return (
    <HomeComponent
      initialCards={initialCards}
      initialLoading={false}
      initialError={null}
    />
  );
}