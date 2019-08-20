import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Lightbox from 'react-image-lightbox';
import 'components/molecules/ImagesGrid/index.css';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';

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
      <MDBContainer>
        <div className="mdb-lightbox no-margin">
          <MDBRow>
            {images.map((url, i) => (
              <MDBCol sm="3" key={url}>
                <Figure>
                  <img
                    src={url}
                    alt="Gallery"
                    className="img-fluid"
                    onClick={() =>
                      this.setState({ photoIndex: i, isOpen: true })
                    }
                  />
                </Figure>
              </MDBCol>
            ))}
            {/* <MDBCol sm="3"> */}
            {/*  <Figure */}
            {/*    onClick={() => this.setState({ photoIndex: 3, isOpen: true })} */}
            {/*  > */}
            {/*    <MDBView waves> */}
            {/*      <img */}
            {/*        src={smallImages[3]} */}
            {/*        alt="Gallery" */}
            {/*        className="img-fluid" */}
            {/*      /> */}
            {/*      {smallImages.length > 4 ? ( */}
            {/*        <MDBMask */}
            {/*          className="flex-center" */}
            {/*          overlay="teal-strong" */}
            {/*          style={{ cursor: 'zoom-in' }} */}
            {/*        > */}
            {/*          <p className="white-text">{`+${smallImages.length - 4}`}</p> */}
            {/*        </MDBMask> */}
            {/*      ) : ( */}
            {/*        <div /> */}
            {/*      )} */}
            {/*    </MDBView> */}
            {/*  </Figure> */}
            {/* </MDBCol> */}
          </MDBRow>
        </div>
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
      </MDBContainer>
    );
  }
}
ImagesGrid.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImagesGrid;
