import HomeComponent from './components/home/Home';
import AddCard from './components/card/AddCard';
import { API_URL } from './config';
import Link from 'next/link';


export default async function Home() {
  const res = await fetch(`${API_URL}/cards`, { cache: 'no-store' });
  const initialCards = await res.json();

  return (
    <div>
      <HomeComponent initialCards={initialCards} initialLoading={false} initialError={null} />
    </div>
  );
}