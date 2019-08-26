import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Lightbox from 'react-image-lightbox';
import 'components/organisms/ImagesGrid/index.css';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import ImageGrid from 'components/organisms/ImageGrid';

const Figure = styled('figure')`
  padding: 0.5rem;
`;

class ImagesGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
  }

  render() {
    const { photoIndex, isOpen } = this.state;
    const { images } = this.props;

    return (
      <div>
        <ImageGrid
          tiles={images.map((url, i) => ({
            img: url,
            title: '',
            cols: 1,
            onClick: () => this.setState({ photoIndex: i, isOpen: true }),
          }))}
        />
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            imageTitle={`${images + 1}/${images.length}`}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}
      </div>
    );
  }
}
ImagesGrid.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImagesGrid;
