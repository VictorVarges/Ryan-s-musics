import React from 'react';
import Header from './componentes/Header';

export default class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <p>teste</p>
      </div>
    );
  }
}
