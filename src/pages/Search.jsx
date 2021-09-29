import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './componentes/Header';
import Loading from './componentes/Loading';

const MIN_CARACTERES = 2;

export default class Search extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.handleAPI = this.handleAPI.bind(this);
    this.renderAlbumsList = this.renderAlbumsList.bind(this);

    this.state = {
      pesquisa: '',
      albums: [],
      showForm: true,
      loading: false,
      artist: '',
      renderNameArtist: false,
    };
  }

  handleChange(event) {
    this.setState({
      pesquisa: event.target.value,
    });
  }

  async handleClick() {
    const { pesquisa } = this.state;
    // antes da API.
    this.setState({
      showForm: false,
      loading: true,
      // renderNameArtist: false,
    });
    const searchAlbum = await searchAlbumsAPI(pesquisa);
    let artistOurBand = pesquisa;
    if (searchAlbum.length === 0) {
      artistOurBand = '';
    }
    // Após a API ser invocada.
    this.setState({
      pesquisa: '',
      showForm: true,
      albums: searchAlbum,
      loading: false,
      artist: artistOurBand,
      renderNameArtist: true,
    });
  }

  handleForm() {
    const { pesquisa } = this.state;
    return (
      <form>
        <input
          type="text"
          value={ pesquisa }
          name="pesquisa"
          data-testid="search-artist-input"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          name="buttonSearch"
          data-testid="search-artist-button"
          disabled={ pesquisa.length < MIN_CARACTERES }
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>
      </form>
    );
  }

  handleAPI() {
    const { artist } = this.state;
    const { renderNameArtist } = this.state;
    if (renderNameArtist === true) {
      if (artist !== '') {
        return (
          <p>
            {`Resultado de álbuns de: ${artist}`}
          </p>
        );
      }
      return (
        <p>
          Nenhum álbum foi encontrado
        </p>
      );
    }
  }

  renderAlbumsList() {
    const { albums } = this.state;
    return (
      <ul>
        {albums.map((album) => (
          <li key={ album.collectionId }>
            <Link
              data-testid={ `link-to-album-${album.collectionId}` }
              to={ `/album/${album.collectionId}` }
            >
              <img
                src={ album.artworkUrl100 }
                alt={ album.collectionName }
              />
            </Link>
            <h3>
              {album.collectionName}
            </h3>
            <h5>
              {album.artistName}
            </h5>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { showForm } = this.state;
    const { loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {showForm ? this.handleForm() : null}
        {loading ? <Loading /> : null}
        {this.handleAPI()}
        {this.renderAlbumsList()}
      </div>
    );
  }
}
