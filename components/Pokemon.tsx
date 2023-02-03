import Image from 'next/image';
import Link from 'next/link';

const Pokemon = ({ pokemon, index }: any) => {
  const name = pokemon.name;
  return (
    <div className="border-4 rounded-2xl bg-slate-200 hover:bg-slate-400 p-4">
      <Link href={`/pokemon/${pokemon.name}`}>
        <div className="cursor-pointer flex flex-col justify-between">
          <p className="font-bold text-2xl text-center">
            #{index + 1}{' '}
            {name.charAt(0).toUpperCase() + name.substring(1, name.length)}
          </p>
          <div className="drop-shadow-2xl flex flex-col">
            <Image
              className=""
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1
                }.png`}
              alt={pokemon.name}
              width={192}
              height={192}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Pokemon;
