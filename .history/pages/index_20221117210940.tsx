import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Pokemon from '../components/Pokemon';
import pokeball from '../public/pokeball.png';
const Home: NextPage = ({ initialPokemon }: any) => {
  const [pokemon, setPokemon] = useState(initialPokemon);
  const [cont, setCont] = useState(0);
  const fetchPokemon = async (url: string, next: boolean) => {
    const res = await fetch(url);
    const nextPokemon = await res.json();
    setCont(next ? cont + 20 : cont - 20);
    setPokemon(nextPokemon);
  };
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="m-4">
        <div className="animate-waving-hand text-yellow-400 animate-slide-poke text-center font-bold text-2xl my-4">
          Pokédex
        </div>
        <div className="text-yellow-400 animate-text text-center font-bold text-2xl my-4">
          <Image src={pokeball} alt="pokeball" width={30} height={30} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {pokemon.results.map((monster: any, index: number) => (
            <Pokemon
              key={index}
              pokeId={index}
              pokemon={monster}
              index={index + cont}
            />
          ))}
        </div>
        <section className="mt-10 flex justify-center gap-5">
          <button
            className={`${
              !pokemon.previous && 'cursor-not-allowed	'
            } disabled:bg-gray-200 disabled:text-black text-white p-2 rounded-2xl bg-gray-500`}
            disabled={!pokemon.previous}
            onClick={() => fetchPokemon(pokemon.previous, false)}>
            previous 20 pokemon
          </button>
          <button
            className={
              'disabled:bg-gray-200 disabled:text-black text-white p-2 rounded-2xl bg-gray-500'
            }
            disabled={!pokemon.next}
            onClick={() => fetchPokemon(pokemon.next, true)}>
            next 20 pokemon
          </button>
        </section>
      </div>
    </>
  );
};

export default Home;

export async function getStaticProps(pokeId: string) {
  let initialPokemon;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
    initialPokemon = await res.json();
  } catch (error) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    initialPokemon = await res.json();
  }
  return {
    props: { initialPokemon },
  };
}
