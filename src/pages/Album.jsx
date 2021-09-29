import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from './componentes/Header';
import MusicCard from './componentes/MusicCard';

export default class Album extends React.Component {
  constructor() {
    super();

    // this.handleChangeMusics = this.handleChangeMusics.bind(this);
    this.handleGetMusics = this.handleGetMusics.bind(this);

    this.state = {
      artistName: '',
      coverFrontAlbum: '',
      albumName: '',
      musics: [],
    };
  }

  componentDidMount() {
    this.handleGetMusics();
  }
  // handleChangeMusics(event) {
  //   this.setState({
  //     musics: event.target.value,
  //   });
  // }

  async handleGetMusics() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const requestMusicsApi = await getMusics(id);
    this.setState({
      artistName: requestMusicsApi[0].artistName,
      coverFrontAlbum: requestMusicsApi[0].artworkUrl100,
      albumName: requestMusicsApi[0].collectionName,
      musics: requestMusicsApi,
    });
  }

  render() {
    const { artistName, coverFrontAlbum, albumName, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <img
            alt="coverAlbum"
            src={ coverFrontAlbum }
          />
          <p
            data-testid="album-name"
          >
            {albumName}
          </p>
          <p
            data-testid="artist-name"
          >
            {artistName}
          </p>
        </section>
        <section>
          {musics.map((music, index) => {
            if (index !== 0) {
              return (
                <div key={ music.trackId }>
                  <MusicCard
                    eachmusic={ music }
                    musicsalbum={ musics }
                  />
                </div>
              );
            }
            return null;
          })}
        </section>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(
    PropTypes.any,
  ).isRequired,
};
