'use client';

import { getPokemonType } from '@/app/helpers';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { PokeApiService } from '../../api/poke';
import { Pokemon } from '../../models';
const inter = Inter({ subsets: ['latin'] })
const pokeApi = new PokeApiService();

export default function PokemonDetails({ params }:any) {
    const [pokemon, setPokemon] = useState<Pokemon>();
    
    useEffect(() => {
        pokeApi
            .fetchByName(params.name)
            .then((pokemon) => setPokemon(pokemon));
    })

    const Card = styled.div`
        background-color: white;
        border-radius: 10px;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        padding: 0.5rem;
    `;

    const Capitalized = styled.label`
        text-transform: capitalize;
    `;

    const Row = styled.div`
        display: flex;
        justify-content: space-evenly;
        flex-direction: row;
        width: 100%;
        margin-top: 1rem;
        margin-bottom: 1rem;
    `;

    return pokemon ? (
        <main className={inter.className}>
            <Card>
                <div className="row">
                    <div className="col">
                    <Image
                        alt={pokemon.name}
                        width={132}
                        height={132}
                        priority
                        src={pokemon.sprites.front_default}/>
                    </div>
                    <div className="col">
                        <Row>
                            <div className="col">
                                <div>
                                    <b>Name:</b>&nbsp;<Capitalized>{pokemon.name}</Capitalized>
                                </div>
                            </div>
                            <div className="col">
                                <div>
                                    <b><Capitalized>{pokemon.stats[0].stat.name}:</Capitalized></b>&nbsp;{pokemon.stats[0].base_stat}
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <div className="col">
                                <div>
                                    <b>Height:</b>&nbsp;<Capitalized>{pokemon.height}</Capitalized>
                                </div>
                            </div>
                            <div className="col">
                                <div>
                                    <b><Capitalized>{pokemon.stats[0].stat.name}:</Capitalized></b>&nbsp;{pokemon.stats[0].base_stat}
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <div className="col">
                                <div>
                                    <b>Weight:</b>&nbsp;<Capitalized>{pokemon.weight}</Capitalized>
                                </div>
                            </div>
                            <div className="col">
                                <div>
                                    <b><Capitalized>{pokemon.stats[0].stat.name}:</Capitalized></b>&nbsp;{pokemon.stats[0].base_stat}
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <div className="col">
                                <div>
                                    <b>Types:</b>&nbsp;<Capitalized>{getPokemonType(pokemon)}</Capitalized>
                                </div>
                            </div>
                            <div className="col">
                                <div>
                                    <b><Capitalized>{pokemon.stats[0].stat.name}:</Capitalized></b>&nbsp;{pokemon.stats[0].base_stat}
                                </div>
                            </div>
                        </Row>
                    </div>
                </div>
            </Card>
        </main>
    ) : null;
}