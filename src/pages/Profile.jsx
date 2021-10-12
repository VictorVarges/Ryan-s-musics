import React from 'react';
import { Link } from 'react-router-dom';
import Header from './componentes/Header';
import { getUser } from '../services/userAPI';
import Loading from './componentes/Loading';

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: [],
    };
    this.infoUser = this.infoUser.bind(this);
  }

  componentDidMount() {
    this.infoUser();
  }

  async infoUser() {
    const objectUser = await getUser();
    this.setState({
      user: objectUser,
      loading: false });
  }

  // utilizei este repositório como referência: https://github.com/tryber/sd-014-a-project-trybetunes/pull/104/files
  renderProfile(user) {
    return (
      <div>
        <h1>{user.name}</h1>
        <h3>{user.email}</h3>
        <img data-testid="profile-image" src={ user.image } alt={ user.name } />
        <p>{user.description}</p>
        <Link to="/profile/edit">
          <h4>Editar perfil</h4>
        </Link>
      </div>
    );
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? <Loading /> : this.renderProfile(user) }
      </div>
    );
  }
}
