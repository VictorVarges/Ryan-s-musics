import React from 'react';

import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from './componentes/Header';
import Loading from './componentes/Loading';
import MusicCard from './componentes/MusicCard';

export default class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
    this.fetchFavoriteSongs = this.fetchFavoriteSongs.bind(this);
    this.renderFavorites = this.renderFavorites.bind(this);
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  async fetchFavoriteSongs(action) {
    if (action) {
      this.setState({
        loading: true,
      });
    }
    const favoritesSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoritesSongs,
    });
  }

  renderFavorites() {
    const { favoritesSongs } = this.state;
    return (
      <div>
        {favoritesSongs.map((favoriteMusic) => (
          <div key={ favoriteMusic.trackId }>
            <MusicCard
              eachmusic={ favoriteMusic }
              fetchFavoriteSongs={ this.fetchFavoriteSongs }
            />
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {(loading) ? <Loading /> : this.renderFavorites()}
      </div>
    );
  }
}
