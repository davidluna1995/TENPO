/**
 * Interfaz para el usuario autenticado
 */
export interface User {
  email: string;    // Correo electrónico del usuario
  token: string;    // Token de autenticación
}

/**
 * Interfaz básica de Pokémon
 */
export interface Pokemon {
  name: string;     // Nombre del Pokémon
  url: string;      // URL con los detalles del Pokémon
}

/**
 * Interfaz detallada de Pokémon
 */
export interface PokemonDetails {
  id: number;       // ID único del Pokémon
  name: string;     // Nombre del Pokémon
  height: number;   // Altura del Pokémon
  weight: number;   // Peso del Pokémon
  base_experience: number; // Experiencia base
  abilities: {      // Habilidades del Pokémon
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
  }[];
  stats: {          // Estadísticas base
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {          // Tipos del Pokémon
    type: {
      name: string;
    };
  }[];
  sprites: {        // Imágenes del Pokémon
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
  };
}