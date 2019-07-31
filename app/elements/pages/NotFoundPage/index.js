/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import messages from 'elements/pages/NotFoundPage/messages';

export default function NotFound() {
  return (
    <article>
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
    </article>
  );
}
