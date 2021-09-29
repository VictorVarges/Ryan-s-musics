import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends React.Component {
  constructor() {
    super();

    this.clickFavorites = this.clickFavorites.bind(this);
    this.definingChecked = this.definingChecked.bind(this);

    this.state = {
      favoriteMusic: [],
      loading: false,
    };
  }

  definingChecked(check) {
    const { favoriteMusic } = this.state;
    const existSongs = favoriteMusic.some((existMusic) => existMusic.trackId === check);
    if (existSongs) return true;
    return false;
  }

  async clickFavorites(event) {
    const idCaptured = Number(event.target.value);
    const { musicsalbum } = this.props;
    const valueChecked = event.target.checked;

    const favoriteCaptured = musicsalbum.find((music) => music.trackId === idCaptured);

    this.setState({
      loading: true,
    });

    if (valueChecked) {
      await addSong(favoriteCaptured);
      this.setState((prevState) => ({
        favoriteMusic: [...prevState.favoriteMusic, favoriteCaptured],
        loading: false,
      }));
    }
  }

  renderCheckbox() {
    const { eachmusic } = this.props;
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
            htmlFor="favorita"
          >
            Favorita
            <input
              type="checkbox"
              value={ eachmusic.trackId }
              defaultChecked={ this.definingChecked(eachmusic.trackId) }
              onClick={ this.clickFavorites }
              data-testid={ `checkbox-music-${eachmusic.trackId}` }
            />
          </label>
        </form>
      </div>
    );
  }

  render() {
    const { musicsalbum } = this.props;
    const { loading } = this.state;
    if (musicsalbum.length === 0) return <Loading />;
    return (
      loading ? <Loading /> : this.renderCheckbox()
    );
  }
}

MusicCard.propTypes = {
  eachmusic: PropTypes.objectOf(PropTypes.any).isRequired,
  musicsalbum: PropTypes.arrayOf(PropTypes.object).isRequired,
};
