import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { PokemonDetails } from '../types';

/**
 * Cliente Axios configurado para la PokeAPI
 * Incluye interceptores para agregar el token de autenticación
 */
const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().user?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Simula un proceso de login
 * @param email - Correo del usuario
 * @param password - Contraseña del usuario
 * @returns Objeto con token y email del usuario
 */
export const fakeLogin = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    token: 'fake-jwt-token',
    email,
  };
};

/**
 * Busca Pokémon por nombre
 * @param query - Término de búsqueda
 * @returns Lista de Pokémon que coinciden con la búsqueda
 */
export const searchPokemons = async (query: string) => {
  const response = await api.get('/pokemon?limit=2000');
  const allPokemons = response.data.results;
  return allPokemons.filter((pokemon: { name: string }) => 
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  );
};

/**
 * Obtiene la lista completa de Pokémon
 * @returns Lista paginada de Pokémon
 */
export const fetchPokemons = async () => {
  const response = await api.get('/pokemon?limit=2000');
  return {
    results: response.data.results,
  };
};

/**
 * Obtiene los detalles de un Pokémon específico
 * @param name - Nombre del Pokémon
 * @returns Detalles completos del Pokémon
 */
export const fetchPokemonDetails = async (name: string): Promise<PokemonDetails> => {
  const response = await api.get(`/pokemon/${name}`);
  return response.data;
};