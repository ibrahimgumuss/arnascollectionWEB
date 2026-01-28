import HomeClient from '@/components/home/HomeClient';

interface HomeProps {
  searchParams: Promise<{ q?: string; category?: string; show?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const searchQuery = params.q || '';
  const categoryFilter = params.category || '';
  const showAll = params.show === 'all';

  return (
    <HomeClient
      searchQuery={searchQuery}
      categoryFilter={categoryFilter}
      showAll={showAll}
    />
  );
}
