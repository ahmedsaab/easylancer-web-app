import React from 'react';
import { MDBContainer, MDBFooter } from 'mdbreact';
import styled from 'styled-components';

const FooterContainer = styled(MDBFooter)`
  margin-top: auto;
`;

const Footer = () => (
  <FooterContainer color="unique-color-dark" className="page-footer font-small">
    <div className="footer-copyright text-center py-3">
      <MDBContainer fluid>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a href="https://www.easylancer.com"> www.easylancer.com </a>
      </MDBContainer>
    </div>
  </FooterContainer>
);

export default Footer;
