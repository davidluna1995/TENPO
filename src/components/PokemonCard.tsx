import React, { useState } from 'react';
import { Ruler, Weight, Zap, ImageOff } from 'lucide-react';
import { PokemonDetails } from '../types';

interface PokemonCardProps {
  pokemon: PokemonDetails;
  onClose: () => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClose }) => {
  const [currentSprite, setCurrentSprite] = useState<'default' | 'shiny'>('default');
  const [showFront, setShowFront] = useState(true);
  const [imageError, setImageError] = useState(false);

  const getCurrentSprite = () => {
    if (currentSprite === 'default') {
      return showFront ? pokemon.sprites.front_default : pokemon.sprites.back_default;
    }
    return showFront ? pokemon.sprites.front_shiny : pokemon.sprites.back_shiny;
  };

  const translateAbility = (abilityName: string): string => {
    const abilityTranslations: { [key: string]: string } = {
      'overgrow': 'Espesura',
      'chlorophyll': 'Clorofila',
      'blaze': 'Mar Llamas',
      'solar-power': 'Poder Solar',
      'torrent': 'Torrente',
      'rain-dish': 'Cura Lluvia',
      'shield-dust': 'Polvo Escudo',
      'run-away': 'Fuga',
      'shed-skin': 'Mudar',
      'compound-eyes': 'Ojo Compuesto',
      'swarm': 'Enjambre',
      'keen-eye': 'Vista Lince',
      'tangled-feet': 'Pies Liados',
      'big-pecks': 'Sacapecho',
      'guts': 'Agallas',
      'hustle': 'Entusiasmo',
      'intimidate': 'Intimidación',
      'static': 'Electricidad Estática',
      'sand-veil': 'Velo Arena',
      'lightning-rod': 'Pararrayos',
      'sturdy': 'Robustez',
      'rock-head': 'Cabeza Roca',
      'inner-focus': 'Foco Interno',
      'synchronize': 'Sincronía',
      'clear-body': 'Cuerpo Puro',
      'natural-cure': 'Cura Natural',
      'serene-grace': 'Dicha',
      'swift-swim': 'Nado Rápido',
      'battle-armor': 'Armadura Batalla',
      'levitate': 'Levitación',
    };
    return abilityTranslations[abilityName] || abilityName.replace(/-/g, ' ');
  };

  const getTypeColor = (type: string) => {
    const typeColors: { [key: string]: string } = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC'
    };
    return typeColors[type] || '#777777';
  };

  const formatStatName = (statName: string) => {
    const statTranslations: { [key: string]: string } = {
      hp: 'PS',
      attack: 'Ataque',
      defense: 'Defensa',
      'special-attack': 'Ataque Esp.',
      'special-defense': 'Defensa Esp.',
      speed: 'Velocidad'
    };
    return statTranslations[statName] || statName;
  };

  const ImageWithFallback = () => {
    const sprite = getCurrentSprite();
    
    if (imageError || !sprite) {
      return (
        <div 
          className="d-flex flex-column align-items-center justify-content-center bg-light rounded"
          style={{ width: '150px', height: '150px' }}
        >
          <ImageOff size={48} className="text-muted mb-2" />
          <small className="text-muted">Imagen no disponible</small>
        </div>
      );
    }

    return (
      <img
        src={sprite}
        alt={pokemon.name}
        className="img-fluid mb-3"
        style={{ width: '150px', height: '150px' }}
        onError={() => setImageError(true)}
      />
    );
  };

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header border-bottom-0">
            <h5 className="modal-title text-capitalize d-flex align-items-center">
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" 
                alt="Pokeball"
                className="me-2"
                style={{ width: '24px', height: '24px' }}
              />
              {pokemon.name} #{pokemon.id ? pokemon.id.toString().padStart(3, '0') : 'Sin número'}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            />
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-md-4 text-center">
                <div className="position-relative">
                  <ImageWithFallback />
                  <div className="btn-group d-flex justify-content-center mb-3">
                    <button
                      className={`btn btn-sm ${currentSprite === 'default' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => {
                        setCurrentSprite('default');
                        setImageError(false);
                      }}
                    >
                      Normal
                    </button>
                    <button
                      className={`btn btn-sm ${currentSprite === 'shiny' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => {
                        setCurrentSprite('shiny');
                        setImageError(false);
                      }}
                    >
                      Shiny
                    </button>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-primary d-block w-100 mb-3"
                    onClick={() => {
                      setShowFront(!showFront);
                      setImageError(false);
                    }}
                  >
                    {showFront ? 'Ver dorso' : 'Ver frente'}
                  </button>
                </div>
                <div className="d-flex flex-wrap justify-content-center gap-2 mb-3">
                  {pokemon.types && pokemon.types.length > 0 ? (
                    pokemon.types.map((type) => (
                      <span
                        key={type.type.name}
                        className="badge text-capitalize px-3 py-2"
                        style={{ 
                          backgroundColor: getTypeColor(type.type.name),
                          color: 'white'
                        }}
                      >
                        {type.type.name}
                      </span>
                    ))
                  ) : (
                    <span className="badge bg-secondary">Sin tipo definido</span>
                  )}
                </div>
              </div>

              <div className="col-md-8">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row text-center">
                      <div className="col-4 border-end">
                        <div className="d-flex flex-column align-items-center">
                          <Ruler className="mb-2 text-primary" size={24} />
                          <h6 className="card-subtitle text-muted">Altura</h6>
                          <p className="card-text mt-1">
                            {pokemon.height ? `${pokemon.height / 10}m` : 'Sin información'}
                          </p>
                        </div>
                      </div>
                      <div className="col-4 border-end">
                        <div className="d-flex flex-column align-items-center">
                          <Weight className="mb-2 text-primary" size={24} />
                          <h6 className="card-subtitle text-muted">Peso</h6>
                          <p className="card-text mt-1">
                            {pokemon.weight ? `${pokemon.weight / 10}kg` : 'Sin información'}
                          </p>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="d-flex flex-column align-items-center">
                          <Zap className="mb-2 text-primary" size={24} />
                          <h6 className="card-subtitle text-muted">Exp. Base</h6>
                          <p className="card-text mt-1">
                            {pokemon.base_experience || 'Sin información'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h6 className="mb-3">Habilidades</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {pokemon.abilities && pokemon.abilities.length > 0 ? (
                      pokemon.abilities.map((ability) => (
                        <span
                          key={ability.ability.name}
                          className={`badge ${ability.is_hidden ? 'bg-secondary' : 'bg-primary'}`}
                          title={ability.is_hidden ? 'Habilidad Oculta' : 'Habilidad Normal'}
                        >
                          {translateAbility(ability.ability.name)}
                        </span>
                      ))
                    ) : (
                      <span className="badge bg-secondary">Sin habilidades conocidas</span>
                    )}
                  </div>
                </div>

                <div>
                  <h6 className="mb-3">Estadísticas base</h6>
                  {pokemon.stats && pokemon.stats.length > 0 ? (
                    pokemon.stats.map((stat) => (
                      <div key={stat.stat.name} className="mb-2">
                        <div className="d-flex justify-content-between mb-1">
                          <small>{formatStatName(stat.stat.name)}</small>
                          <small>{stat.base_stat}</small>
                        </div>
                        <div className="progress" style={{ height: '6px' }}>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${(stat.base_stat / 255) * 100}%`,
                              backgroundColor: stat.base_stat > 100 ? '#28a745' : '#007bff'
                            }}
                            aria-valuenow={stat.base_stat}
                            aria-valuemin={0}
                            aria-valuemax={255}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">Sin estadísticas disponibles</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};