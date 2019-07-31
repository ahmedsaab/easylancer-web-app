import React from 'react';
import { MDBContainer, MDBFooter } from 'mdbreact';
import styled from 'styled-components';

const Footer = styled(MDBFooter)`
  height; 50px;
  position: fixed;
  z-index: 400;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  @media (min-width: 1200px) {
    padding-left: 250px;
  }
`;

const FooterPagePro = () => (
  <Footer color="unique-color-dark" className="page-footer font-small">
    <div className="footer-copyright text-center py-3">
      <MDBContainer fluid>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a href="https://www.MDBootstrap.com"> www.easylancer.com </a>
      </MDBContainer>
    </div>
  </Footer>
);

export default FooterPagePro;
