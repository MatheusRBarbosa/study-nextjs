'use client';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as outlineStar } from '@fortawesome/free-regular-svg-icons';
import styled from "styled-components";
import { PokeApiService } from "../api/poke";
import { getPokemonType } from "../helpers";
import { Pokemon } from '../models';

const pokeApi = new PokeApiService();

const Content = styled.div`
    height: 15rem;
    width: 15rem;
`

const Card = styled.div`
    height: 15rem;
    width: 15rem;
    background-color: #131A22;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    cursor: pointer;
`;

const CardHeader = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 75%;
`;

const CardBody = styled.div`
    position: relative;
    height: 25%;
    padding: 0.5rem;
    background-color: #fff;
    border-radius: 0 0 10px 10px;
`;

const Title = styled.div`
    width: 100%;
    font-weight: bold;
    font-size: 18px;
    text-align: center;
    text-transform: capitalize;
`;

const Description = styled.div`
    width: 100%;
    text-align: center;
    text-transform: capitalize;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #121212;
`;

const StarPosition = styled.div`
    position: absolute;
    background-color: white;
    height: 3rem;
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    z-index: 10;
`;

const Star = styled(FontAwesomeIcon)`
    color: #edb211;
    font-size: 24px;
`;


export function PokemonCard({userFavorites, pokemonUrl = "", favoriteFn}: any) {
    const [pokemon, setPokemon] = useState<Pokemon>();
    let favorite = false;

    useEffect(() => {
        pokeApi.fetchPokemon(pokemonUrl).then((data: Pokemon) => {
            setPokemon(data);
        });

    }, []);

    /**
     * 
     */
    const onFavoriteClick = () => {
        favoriteFn(pokemon?.name, favorite);
    }

    /**
     * 
     */
    const isFavorite = () => {
        const index = userFavorites?.findIndex((f: any) => f.name == pokemon?.name)!;
        favorite = index >= 1;
        return favorite;
    }

    return pokemon ? (
        <Content>
            <StarPosition onClick={onFavoriteClick}><Star icon={isFavorite() ? solidStar : outlineStar} /></StarPosition>
            <StyledLink href={`/detail/${pokemon.name}`}>
                <Card>
                    <CardHeader>
                    <Image 
                        alt={pokemon.name}
                        width={132}
                        height={132}
                        priority
                        src={pokemon.sprites.front_default}/>
                    </CardHeader>
                    <CardBody>
                        <Title>{pokemon.name}</Title>
                        <Description>{getPokemonType(pokemon)}</Description>
                    </CardBody>
                </Card>
            </StyledLink>
        </Content>
    ) : null;
}