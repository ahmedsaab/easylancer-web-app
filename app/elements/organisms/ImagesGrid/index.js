import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBView, MDBMask } from 'mdbreact';
import Lightbox from 'react-image-lightbox';
import 'elements/organisms/ImagesGrid/index.css';
import styled from 'styled-components';

const images = [
  'https://mdbootstrap.com/img/Others/documentation/img%20(145)-mini.jpg',
  'https://mdbootstrap.com/img/Others/documentation/img%20(150)-mini.jpg',
  'https://mdbootstrap.com/img/Others/documentation/img%20(152)-mini.jpg',
  'https://mdbootstrap.com/img/Others/documentation/img%20(42)-mini.jpg',
  'https://mdbootstrap.com/img/Others/documentation/img%20(151)-mini.jpg',
  'https://mdbootstrap.com/img/Others/documentation/img%20(40)-mini.jpg',
  'https://mdbootstrap.com/img/Others/documentation/img%20(148)-mini.jpg',
  'https://mdbootstrap.com/img/Others/documentation/img%20(147)-mini.jpg',
  'https://mdbootstrap.com/img/Others/documentation/img%20(149)-mini.jpg',
];

const smallImages = [
  'https://mdbootstrap.com/img/Others/documentation/img%20(145)-mini.jpg',
  'https://mdbootstrap.com/img/Others/documentation/img%20(150)-mini.jpg',
  'https://mdbootstrap.com/img/Others/documentation/img%20(152)-mini.jpg',
  'https://mdbootstrap.com/img/Others/documentation/img%20(42)-mini.jpg',
  'https://mdbootstrap.com/img/Others/documentation/img%20(151)-mini.jpg',
  'https://mdbootstrap.com/img/Others/documentation/img%20(40)-mini.jpg',
  'https://mdbootstrap.com/img/Others/documentation/img%20(148)-mini.jpg',
  'https://mdbootstrap.com/img/Others/documentation/img%20(147)-mini.jpg',
  'https://mdbootstrap.com/img/Others/documentation/img%20(149)-mini.jpg',
];

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
    return (
      <MDBContainer>
        <div className="mdb-lightbox no-margin">
          <MDBRow>
            <MDBCol sm="3">
              <Figure>
                <img
                  src={smallImages[0]}
                  alt="Gallery"
                  className="img-fluid"
                  onClick={() => this.setState({ photoIndex: 0, isOpen: true })}
                />
              </Figure>
            </MDBCol>
            <MDBCol sm="3">
              <Figure>
                <img
                  src={smallImages[1]}
                  alt="Gallery"
                  className="img-fluid"
                  onClick={() => this.setState({ photoIndex: 1, isOpen: true })}
                />
              </Figure>
            </MDBCol>
            <MDBCol sm="3">
              <Figure>
                <img
                  src={smallImages[2]}
                  alt="Gallery"
                  className="img-fluid"
                  onClick={() => this.setState({ photoIndex: 2, isOpen: true })}
                />
              </Figure>
            </MDBCol>
            <MDBCol sm="3">
              <Figure
                onClick={() => this.setState({ photoIndex: 3, isOpen: true })}
              >
                <MDBView waves>
                  <img
                    src={smallImages[3]}
                    alt="Gallery"
                    className="img-fluid"
                  />
                  {smallImages.length > 4 ? (
                    <MDBMask
                      className="flex-center"
                      overlay="teal-strong"
                      style={{ cursor: 'zoom-in' }}
                    >
                      <p className="white-text">{`+${smallImages.length - 4}`}</p>
                    </MDBMask>
                  ) : (
                    <div />
                  )}
                </MDBView>
              </Figure>
            </MDBCol>
          </MDBRow>
        </div>
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            imageTitle={`${photoIndex + 1}/${images.length}`}
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

export default ImagesGrid;
