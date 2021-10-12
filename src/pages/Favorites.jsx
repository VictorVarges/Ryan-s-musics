import React from 'react';
import Header from './componentes/Header';
// import Loading from '../components/Loading';
// import MusicCard from '../components/MusicCard';
// import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends React.Component {
  render() {
    return (
      <div
        data-testid="page-favorites"
      >
        <Header />
        <p>Teste</p>
      </div>
    );
  }
}
