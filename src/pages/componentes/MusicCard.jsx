import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends React.Component {
  constructor() {
    super();

    this.clickFavorites = this.clickFavorites.bind(this);
    this.definingChecked = this.definingChecked.bind(this);

    this.state = {
      loading: false,
      check: false,
    };
  }

  componentDidMount() {
    this.hackToDidMount();
  }

  async hackToDidMount() {
    const callFunction = await this.definingChecked();
    this.setState({
      check: callFunction,
    });
  }

  async definingChecked() {
    const { eachmusic } = this.props;
    const favoritesMusics = await getFavoriteSongs();
    return favoritesMusics.some((music) => music.trackId === eachmusic.trackId);
  }

  async clickFavorites() {
    const { eachmusic } = this.props;
    const { fetchFavoriteSongs } = this.props;
    this.setState({
      loading: true,
    });
    const valueChecked = await this.definingChecked();
    // console.log('aa', eachmusic);

    if (valueChecked) {
      await removeSong(eachmusic);
      await fetchFavoriteSongs();
      this.setState({
        loading: false,
        check: false,
      });
    } else {
      await addSong(eachmusic);
      this.setState({
        loading: false,
        check: true,
      });
    }
  }

  renderCheckbox() {
    const { eachmusic } = this.props;
    const { check } = this.state;
    return (
      <div>
        <audio data-testid="audio-component" src={ eachmusic.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <p>
          { eachmusic.trackName }
        </p>
        <form>
          <label
            htmlFor={ `checkbox-music-${eachmusic.trackId}` }
          >
            Favorita
            <input
              type="checkbox"
              value={ eachmusic.trackId }
              checked={ check }
              onChange={ this.clickFavorites }
              data-testid={ `checkbox-music-${eachmusic.trackId}` }
              id={ `checkbox-music-${eachmusic.trackId}` }
            />
          </label>
        </form>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      loading ? <Loading /> : this.renderCheckbox()
    );
  }
}

MusicCard.propTypes = {
  eachmusic: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchFavoriteSongs: PropTypes.func.isRequired,
};
