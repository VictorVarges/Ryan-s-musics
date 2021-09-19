import React from 'react';
import Header from './componentes/Header';

const MIN_CARACTERES = 2;

export default class Search extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      pesquisa: '',
    };
  }

  handleChange(event) {
    this.setState({
      pesquisa: event.target.value,
    });
  }

  render() {
    const { pesquisa } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
            name="button"
            data-testid="search-artist-button"
            disabled={ pesquisa.length < MIN_CARACTERES }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
