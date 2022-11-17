import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
const Pokemon = ({ pokemon }: any) => {
  const { name, types, weight, height, stats, abilities } = pokemon;
  const pokeType = types[0].type.name;
  const pokeName =
    name.charAt(0).toUpperCase() + name.substring(1, name.length);
  const pokeImage = pokemon.sprites.front_default;
  return (
    <div>
      <Head>
        <title>{pokeName}</title>
      </Head>
      <div className={'flex flex-col justify-center items-center'}>
        <Link className="mt-6 " href={'/'}>
          <p className="mt-4 p-4 hover:bg-white cursor-pointer bg-slate-200 rounded-2xl border-4 border-slate-500">
            Go to home page
          </p>
        </Link>
        <div
          className={`flex flex-row  m-5 text-center p-4 rounded-2xl 
        ${pokeType === 'bug' && 'bg-emerald-400'}
        ${pokeType === 'dark' && 'bg-gray-800'}
        ${pokeType === 'dragon' && 'bg-violet-400'}
        ${pokeType === 'electric' && 'bg-yellow-300'}
        ${pokeType === 'fairy' && 'bg-pink-400'}
        ${pokeType === 'fighting' && 'bg-red-800'}
        ${pokeType === 'fire' && 'bg-red-600'}
        ${pokeType === 'flying' && 'bg-gray-200'}
        ${pokeType === 'ghost' && 'bg-purple-800'}
        ${pokeType === 'grass' && 'bg-green-600'}
        ${pokeType === 'ground' && 'bg-yellow-600'}
        ${pokeType === 'water' && 'bg-cyan-300'}
        ${pokeType === 'normal' && 'bg-gray-600'}
        ${pokeType === 'poison' && 'bg-purple-600'}
        ${pokeType === 'psychic' && 'bg-violet-600'}
        ${pokeType === 'rock' && 'bg-yellow-800'}
        ${pokeType === 'steel' && 'bg-slate-600'}
        ${pokeType === 'ice' && 'bg-cyan-100'}`}>
          <div>
            <span>
              <b>{pokeName}</b>
            </span>
            {types.map((elem: any, index: number) => {
              let namePoke = elem.type.name;
              return (
                <div key={index}>
                  <p
                    className={`my-3 rounded-2xl 
        ${namePoke === 'bug' && 'bg-emerald-200'}
        ${namePoke === 'dark' && 'bg-gray-600'}
        ${namePoke === 'dragon' && 'bg-violet-200'}
        ${namePoke === 'electric' && 'bg-yellow-100'}
        ${namePoke === 'fairy' && 'bg-pink-200'}
        ${namePoke === 'fighting' && 'bg-red-600'}
        ${namePoke === 'flying' && 'bg-gray-100'}
        ${namePoke === 'fire' && 'bg-red-500'}
        ${namePoke === 'ghost' && 'bg-purple-600'}
        ${namePoke === 'grass' && 'bg-green-400'}
        ${namePoke === 'ground' && 'bg-yellow-400'}
        ${namePoke === 'water' && 'bg-cyan-100'}
        ${namePoke === 'normal' && 'bg-gray-400'}
        ${namePoke === 'poison' && 'bg-purple-400'}
        ${namePoke === 'psychic' && 'bg-violet-400'}
        ${namePoke === 'rock' && 'bg-yellow-600'}
        ${namePoke === 'steel' && 'bg-slate-400'}
        ${namePoke === 'ice' && 'bg-cyan-300'}`}>
                    {namePoke.toUpperCase().charAt(0) +
                      namePoke.substring(1, namePoke.length)}
                  </p>
                </div>
              );
            })}
            <Image src={pokeImage} alt={pokeName} width={200} height={200} />
            <p className="rounded-2xl bg-indigo-500 font-bold">
              Peso: {weight / 10} kg
            </p>
            <p className="mt-5 rounded-2xl bg-indigo-500 font-bold">
              Altura: {height / 10} m
            </p>
          </div>
          <div>
            Elementos
            {abilities.map((elem: any, index: number) => {
              <p>Elem {elem} </p>;
            })}
          </div>
          <div className="mx-5">
            <p>Estadísticas</p>
            {stats.map((elem: any, index: number) => {
              let x = elem.base_stat;
              let maxStat = 255;
              let y = elem.stat.name;
              let nameStat =
                y.charAt(0).toUpperCase() + y.substring(1, y.length);
              return (
                <>
                  <div className="flex flex-col my-2" key={index}>
                    {nameStat.replace('-', ' ')} {x}
                    <progress max={maxStat} value={x}>
                      {x}
                    </progress>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Pokemon;
export async function getServerSideProps(context: any) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${context.query.name}`
  );
  const pokemon = await res.json();
  return {
    props: { pokemon },
  };
}
