import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f9f9f9bf;
  padding-left: 15%;
  padding-right: 15%;
  padding-top: 20%;
  padding-bottom: 20%;
  @media (max-width: 575px) {
    padding-left: 10%;
    padding-right: 10%;
  }
`;

const Summary = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
`;

const Details = styled.div`
  font-size: 1rem;
  text-align: center;
`;

const Picture = styled.img`
  width: 70%;
  padding-top: 10px;
  padding-bottom: 20px;
`;

function EmptyStateContent({
  summary,
  details,
  picture,
  children,
  containerStyle,
}) {
  return (
    <ContentContainer style={containerStyle}>
      <Picture src={picture} />
      <Summary>{summary}</Summary>
      <Details>{details}</Details>
      {children}
    </ContentContainer>
  );
}

EmptyStateContent.propTypes = {
  summary: PropTypes.string,
  details: PropTypes.string,
  picture: PropTypes.string,
  children: PropTypes.any,
  containerStyle: PropTypes.object,
};

export default EmptyStateContent;
