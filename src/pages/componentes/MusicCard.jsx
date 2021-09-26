import React from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends React.Component {
  render() {
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
      </div>
    );
  }
}

MusicCard.propTypes = {
  eachmusic: PropTypes.arrayOf(PropTypes.object).isRequired,
};
