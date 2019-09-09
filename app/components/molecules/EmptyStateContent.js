import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import CenteredDiv from 'components/atoms/CenteredDiv';

const ContentContainer = styled(CenteredDiv)`
  background: #f9f9f9bf;
  padding-left: 15%;
  padding-right: 15%;
  padding-top: 20%;
  padding-bottom: 20%;
  @media (max-width: 599px) {
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
  className,
}) {
  return (
    <ContentContainer className={className}>
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
  className: PropTypes.string,
};

export default EmptyStateContent;
