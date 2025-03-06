import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Search } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPokemons, fetchPokemonDetails, searchPokemons } from '../services/api';
import { useAuthStore } from '../store/authStore';
import { Pokemon, PokemonDetails } from '../types';
import { PokemonCard } from '../components/PokemonCard';

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const queryClient = useQueryClient();
  const itemsPerPage = 20;

  const {
    data: pokemonsData,
    isLoading: isLoadingPokemons
  } = useQuery({
    queryKey: ['pokemons'],
    queryFn: fetchPokemons,
  });

  const {
    data: searchResults,
    isLoading: isSearching
  } = useQuery({
    queryKey: ['search', searchTerm],
    queryFn: () => searchPokemons(searchTerm),
    enabled: searchTerm.length > 0,
  });

  const pokemons = searchTerm 
    ? [...(searchResults || [])].sort((a, b) => a.name.localeCompare(b.name))
    : [...(pokemonsData?.results || [])].sort((a, b) => a.name.localeCompare(b.name));
  
  const totalPages = Math.ceil(pokemons.length / itemsPerPage);
  const currentPokemons = pokemons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleLogout = () => {
    setUser(null);
    queryClient.clear();
    navigate('/login');
  };

  const handlePokemonClick = async (pokemon: Pokemon) => {
    try {
      const details = await fetchPokemonDetails(pokemon.name);
      setSelectedPokemon(details);
    } catch (error) {
      console.error('Error al cargar los detalles del pokémon:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (isLoadingPokemons) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    pages.push(
      <li key="first" className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button
          className="page-link"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          Inicio
        </button>
      </li>
    );

    pages.push(
      <li key="prev" className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button
          className="page-link"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &laquo;
        </button>
      </li>
    );

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    pages.push(
      <li key="next" className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button
          className="page-link"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
      </li>
    );

    pages.push(
      <li key="last" className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button
          className="page-link"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Fin
        </button>
      </li>
    );

    return pages;
  };

  return (
    <div className="min-vh-100">
      <nav className="navbar navbar-expand-lg shadow-sm">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="navbar-brand d-flex align-items-center">
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
                alt="Pokeball"
                className="me-2"
                style={{ width: '24px', height: '24px' }}
              />
              <span>Pokédex</span>
            </div>
            <div className="d-flex align-items-center gap-3">
              <span className="text-white d-none d-sm-inline">{user?.email}</span>
              <button 
                className="btn btn-link text-white p-0 d-sm-none text-truncate"
                style={{ maxWidth: '150px' }}
                title={user?.email}
              >
                {user?.email}
              </button>
              <button
                onClick={handleLogout}
                className="btn btn-primary d-flex align-items-center"
              >
                <LogOut size={18} className="me-2" />
                <span className="d-none d-sm-inline">Cerrar Sesión</span>
                <span className="d-sm-none">Salir</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <div className="card shadow-sm">
          <div className="card-header">
            <div className="position-relative">
              <Search className="position-absolute top-50 translate-middle-y ms-3 text-muted" size={20} />
              <input
                type="text"
                className="form-control ps-5"
                placeholder="Buscar Pokémon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="card-body p-0">
            {isSearching ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Buscando...</span>
                </div>
              </div>
            ) : (
              <div className="list-group list-group-flush">
                {currentPokemons.map((pokemon, index) => (
                  <button
                    key={pokemon.name}
                    className="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
                    onClick={() => handlePokemonClick(pokemon)}
                  >
                    <div className="d-flex align-items-center">
                      <img 
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
                        alt="Pokeball"
                        className="me-3"
                        style={{ width: '20px', height: '20px' }}
                      />
                      <span className="text-capitalize">{pokemon.name}</span>
                    </div>
                    <span className="text-muted">
                      #{(currentPage - 1) * itemsPerPage + index + 1}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="card-footer bg-white">
            <nav className="d-flex justify-content-center">
              <ul className="pagination mb-0">
                {renderPagination()}
              </ul>
            </nav>
          </div>
        </div>
      </main>

      {selectedPokemon && (
        <PokemonCard
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}
    </div>
  );
};