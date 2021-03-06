import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import Tag from 'components/atoms/Tag';

const TagNumber = styled.div`
  display: inline;
  border: 1px solid #0000004a;
  padding-left: 5px;
  border-radius: 3px;
  padding: 0px 5px;
  background: #c7d8ff;
  font-size: 0.65rem;
`;

const TagText = styled.div`
  display: inline;
`;

function NumberedTags({ tags, className }) {
  const Tags = tags
    .sort((a, b) => a > b)
    .map(tag => (
      <Tag key={tag.value}>
        <TagText>{tag.value}</TagText>
        {tag.count > 1 ? <TagNumber>{tag.count}</TagNumber> : null}
      </Tag>
    ));
  return <div className={className}>{Tags}</div>;
}

NumberedTags.propTypes = {
  tags: PropTypes.array,
  className: PropTypes.string,
};

export default NumberedTags;
