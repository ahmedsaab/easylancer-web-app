import React from 'react';
import LightBox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import * as PropTypes from 'prop-types';
import ImageGrid from 'components/organisms/ImageGrid';

class LightBoxImagesGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
  }

  render() {
    const { photoIndex, isOpen } = this.state;
    const { images, className, imageHeight } = this.props;

    return (
      <div className={className}>
        <ImageGrid
          cellHeight={imageHeight}
          tiles={images.map((url, i) => ({
            img: url,
            title: '',
            cols: 1,
            onClick: () => this.setState({ photoIndex: i, isOpen: true }),
          }))}
        />
        {isOpen && (
          <LightBox
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
LightBoxImagesGrid.propTypes = {
  images: PropTypes.array.isRequired,
  imageHeight: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default LightBoxImagesGrid;
