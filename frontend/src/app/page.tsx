import HomeComponent from './components/home/Home';
import { API_URL } from './config';

export default async function Home() {
  const res = await fetch(`${API_URL}/cards`);
  const initialCards = await res.json();

  return (
    <HomeComponent
      initialCards={initialCards}
      initialLoading={false}
      initialError={null}
    />
  );
}