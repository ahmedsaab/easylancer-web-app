import React from 'react';
import { MDBContainer, MDBFooter } from 'mdbreact';
import styled from 'styled-components';

const Footer = styled(MDBFooter)`
  margin-top: auto;
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
