import FitPage from 'components/atoms/FitPage';
import EmptyStateContent from 'components/molecules/EmptyStateContent';
import React from 'react';
import ErrorImage from '../../images/404.png';

export default function Error404() {
  return (
    <FitPage>
      <EmptyStateContent picture={ErrorImage} summary="Nothing to do here." />
    </FitPage>
  );
}
