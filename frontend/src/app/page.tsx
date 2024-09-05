import dynamic from 'next/dynamic';

const HomeComponent = dynamic(() => import('../app/components/home/Home'), { ssr: false });

export default function Home() {
  return <HomeComponent />;
}