import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import messages from './messages';
import Item from './Item';
import Wrapper from './Wrapper';

function TaskListItem(props) {
  const { id } = props.item;

  return (
    <Wrapper>
      <Link to={`/task/${id}`}>
        <Item>
          {props.item.id} - {props.item.price}
        </Item>
      </Link>
    </Wrapper>
  );
}

TaskListItem.propTypes = {
  item: PropTypes.any,
};

export default TaskListItem;
