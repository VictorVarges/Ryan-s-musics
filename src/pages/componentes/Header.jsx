import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from './Loading';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.callGetUser();
  }

  async callGetUser() {
    const userObject = await getUser();
    this.setState({
      user: userObject.name,
      loading: false,
    });
  }

  render() {
    const { user } = this.state;
    const { loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <Loading /> : null}
        <h2 data-testid="header-user-name">{user}</h2>
        <Link
          to="/search"
          data-testid="link-to-search"
        >
          Search
        </Link>
        <Link
          to="/favorites"
          data-testid="link-to-favorites"
        >
          Favorites
        </Link>
        <Link
          to="/profile"
          data-testid="link-to-profile"
        >
          Profile
        </Link>
      </header>
    );
  }
}
