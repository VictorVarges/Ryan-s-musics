import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './componentes/Loading';

const MIN_CARACTERES = 3;

export default class Login extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      login: '',
      loading: false,
      redirect: false,
    };
  }

  async handleClick() {
    this.setState({
      loading: true,
    });
    const response = await createUser(
      { name: 'Name' },
    );
    if (response === 'OK') {
      this.setState({
        loading: false,
        redirect: true,
      });
    }
  }

  handleChange(event) {
    this.setState({
      login: event.target.value,
    });
  }

  render() {
    const { login } = this.state;
    const { loading } = this.state;
    const { redirect } = this.state;
    return (
      <div data-testid="page-login">
        <div>
          { loading ? <Loading /> : null }
        </div>

        <form>
          <input
            type="text"
            value={ login }
            name="login"
            data-testid="login-name-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            onClick={ this.handleClick }
            disabled={ login.length < MIN_CARACTERES }
          >
            Entrar
          </button>
          <div>
            { redirect ? <Redirect to="/search" /> : null }
          </div>
        </form>
      </div>
    );
  }
}
