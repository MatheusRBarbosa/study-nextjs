'use client';

import { PokemonCard } from '../components/pokemonCard';
import { Inter } from 'next/font/google'
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { PokeApiService, FetchResult } from '../api/poke';
import { redirect } from 'next/navigation';
import { User } from '../api/favlist/models';
import { FavlistService } from '../api/favlist';

const inter = Inter({ subsets: ['latin'] })
const pokeApi = new PokeApiService();
const favService = new FavlistService();

const Main = styled.main`
    padding-top: 1rem;
    padding-bottom: 1rem;
`;

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
  const [user, setUser] = useState<User>();
  
  useEffect(() => {
    const currentToken = localStorage.getItem("token");
    if(!currentToken) {
        redirect('/login');
    }

    pokeApi.fetchData().then((data: FetchResult) => {
        setData(data)
    });

    favService.queryAuthedUser().then((response: any) => {
        setUser(response.data.getAuthedUser);
    })
  }, [])

  /**
   * 
   */
  const handleFavorite = (pokemonName: string, alreadyFavorite: boolean) => {
    let currentFavorites = [ ...user?.favorites! ];
    if(!alreadyFavorite) {
        favService.mutateAddFavorite({ pokemonName });
        currentFavorites.push({name: pokemonName});
    } else {
        favService.mutateRemoveFavorite({ pokemonName });
        currentFavorites = currentFavorites.filter(f => f.name !== pokemonName);
    }

    setUser({
        ...user!,
        favorites: currentFavorites
    })
  }


  return (
    <Main className={inter.className}>
        <Grid>
            {data?.results.map(p => (
                <GridItem key={p.url}>
                    <PokemonCard userFavorites={user?.favorites} pokemonUrl={p.url} favoriteFn={handleFavorite}/>
                </GridItem>
            ))}
        </Grid>
    </Main>
  )
}