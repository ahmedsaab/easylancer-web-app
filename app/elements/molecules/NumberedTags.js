import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import Tag from 'elements/atoms/Tag';

const TagNumber = styled.div`
  display: inline;
  border: 1px solid #0000004a;
  border-radius: 3px;
  padding: 0px 5px;
  background: #c7d8ff;
  font-size: 0.65rem;
`;

const TagText = styled.div`
  display: inline;
  padding-right: 5px;
`;

function NumberedTags({ tags, className }) {
  const Tags = tags.map(tag => (
    <Tag key={tag.name}>
      <TagText>{tag.name}</TagText>
      <TagNumber>{tag.count}</TagNumber>
    </Tag>
  ));
  return <div className={className}>{Tags}</div>;
}

NumberedTags.propTypes = {
  tags: PropTypes.array,
  className: PropTypes.string,
};

export default NumberedTags;
