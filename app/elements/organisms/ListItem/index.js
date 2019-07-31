import React from 'react';
import PropTypes from 'prop-types';

import Item from 'elements/organisms/ListItem/Item';
import Wrapper from 'elements/organisms/ListItem/Wrapper';

function ListItem(props) {
  return (
    <Wrapper>
      <Item>{props.item}</Item>
    </Wrapper>
  );
}

ListItem.propTypes = {
  item: PropTypes.any,
};

export default ListItem;
