'use client';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { PokeApiService } from "../api/poke";
import { getPokemonType } from "../helpers";
import { Pokemon } from '../models';

const pokeApi = new PokeApiService();

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


export function PokemonCard({pokemonUrl = ""}) {
    const [pokemon, setPokemon] = useState<Pokemon>();

    useEffect(() => {
        pokeApi.fetchPokemon(pokemonUrl).then((data: Pokemon) => setPokemon(data));
    }, []);

    return pokemon ? (
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
    ) : null;
}