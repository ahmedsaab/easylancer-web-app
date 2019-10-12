import React from 'react';
import { MDBContainer, MDBFooter } from 'mdbreact';

const Footer = () => (
  <MDBFooter color="unique-color-dark" className="page-footer font-small">
    <div className="footer-copyright text-center py-3">
      <MDBContainer fluid>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a href="https://www.skillranks.com"> www.skillranks.com </a>
      </MDBContainer>
    </div>
  </MDBFooter>
);

export default Footer;
