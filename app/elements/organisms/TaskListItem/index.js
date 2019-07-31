import React from 'react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Item from 'elements/organisms/TaskListItem/Item';
import Wrapper from 'elements/organisms/TaskListItem/Wrapper';

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
