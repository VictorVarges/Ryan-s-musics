import React from 'react';
import Header from './componentes/Header';

export default class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <p>Teste</p>
      </div>
    );
  }
}
