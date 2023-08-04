import React, { useEffect, useState } from 'react';
import RootPage from './Components/RootPage/RootPage'
import HomePage from './Components/Home/HomePage'
import ProfilePage from './Components/ProfilePage/ProfilePage'
import AboutPage from './Components/About/AboutPage'
import { Route,Routes } from 'react-router-dom';
import axios from 'axios';
import './App.css'

interface Pokemon {
  name: string;
  height: number;
  id: number;
  img: string;
  types: string[];
}

  const App: React.FC = ()=>{

    const[pokemonList, setPokemonList] = useState<Pokemon[]>([]);

    useEffect(() => {
      async function fetchPokemonData() {
        try{
          const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon/?limit=200&offset=0'
          ); 

          const results = response.data.results;

          const fetchedPokemonList: Pokemon[] = await Promise.all(
            results.map(async (pokemon: { url: string }) => {
              const pokemonDataResponse = await axios.get(pokemon.url);
              
              return {
                name:pokemonDataResponse.data.name,
                height: pokemonDataResponse.data.height,
                id: pokemonDataResponse.data.id,
                img: pokemonDataResponse.data.sprites.other.dream_world.front_default,
                types: pokemonDataResponse.data.types.map(
                  (type: {type: {name: string}}) => type.type.name
                )
              }
            })
          )
          setPokemonList(fetchedPokemonList);
        } catch(error){
          console.error("Error fetching Pokemon data:", error);
        }
      }
    
      fetchPokemonData();
    },[]);

  return (
    <>
      <Routes>
        <Route path="/" element={ <RootPage/>}>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
        </Route>
      </Routes>

      <section>
      <ul>
        {pokemonList.map((pokemon) => 
          <li>
            <div style={{border : '1px solid'}}>
              <div>
                <img  src={pokemon.img} />
              </div>
              <div>
                <p>ID: {pokemon.id}</p>
                <p>Name: {pokemon.name}</p>
                <p>Height: {pokemon.height}</p>
              </div>
            </div>
          </li>
        )}
      </ul>
    </section>
    </>
  )
}

export default App
