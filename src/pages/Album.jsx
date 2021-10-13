import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from './componentes/Header';
import MusicCard from './componentes/MusicCard';
import Loading from './componentes/Loading';

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
      loading: false,
    };
  }

  componentDidMount() {
    this.handleGetMusics();
  }

  async handleGetMusics() {
    this.setState({
      loading: true,
    });
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
      loading: false,
    });
  }

  render() {
    const { artistName, coverFrontAlbum, albumName, musics, loading } = this.state;
    return (
      loading
        ? <Loading />
        : (
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
                      />
                    </div>
                  );
                }
                return null;
              })}
            </section>
          </div>
        )
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(
    PropTypes.any,
  ).isRequired,
};
