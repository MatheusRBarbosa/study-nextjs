'use client';

import { PokemonCard } from '../components/pokemonCard';
import { Inter } from 'next/font/google'
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { PokeApiService, FetchResult } from '../api/poke';

const inter = Inter({ subsets: ['latin'] })
const pokeApi = new PokeApiService();

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: 2rem;
`;

const GridItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default function Home() {
  const [data, setData] = useState<FetchResult>();
  
  useEffect(() => {
    pokeApi.fetchData().then((data: FetchResult) => {
        setData(data)
    });
  }, [])

  return (
    <main className={inter.className}>
        <Grid>
            {data?.results.map(p => (
                <GridItem key={p.url}>
                    <PokemonCard pokemonUrl={p.url}/>
                </GridItem>
            ))}
        </Grid>
    </main>
  )
}
