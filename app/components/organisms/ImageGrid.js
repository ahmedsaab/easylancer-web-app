import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: 'auto',
    margin: '0 !important',
  },
}));

/**
 * const tiles = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     cols: 2,
 *     onClick: func,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

const ClickableGridListTile = styled(GridListTile)`
  cursor: ${props => (props.onClick ? 'pointer' : 'unset')};
  :hover {
    opacity: ${props => (props.onClick ? '0.8' : '1')};
  }
`;

export default function ImageGrid({ tiles, cellHeight }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={cellHeight} className={classes.gridList} cols={3}>
        {tiles.map(tile => (
          <ClickableGridListTile
            onClick={tile.onClick}
            key={tile.img}
            cols={tile.cols || 1}
          >
            <img src={tile.img} alt={tile.title} />
          </ClickableGridListTile>
        ))}
      </GridList>
    </div>
  );
}

ImageGrid.propTypes = {
  tiles: PropTypes.array.isRequired,
  cellHeight: PropTypes.number.isRequired
};
