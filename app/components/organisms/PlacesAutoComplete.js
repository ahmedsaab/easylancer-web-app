import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import * as PropTypes from 'prop-types';
import { GoogleApiWrapper } from 'google-maps-react';
import LoadingIndicator from 'components/molecules/LoadingIndicator';
import { MDBInput } from 'mdbreact';
import styled from 'styled-components';

const DropDownContainer = styled.div`
  position: absolute;
  top: 40px;
  z-index: 20;
  border: 1px solid grey;
  width: 100%;
  display: ${props => (props.show ? 'block' : 'none')};
`;

const Content = styled.div`
  position: relative;
`;

const DropDownItem = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  color: ${props => (props.active ? '#fff' : '#000')};
  background-color: ${props => (props.active ? '#2bbbad' : '#fff')};
`;

const LocationInput = styled(MDBInput).attrs(() => ({
  label: 'Location',
}))``;

class PlacesAutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
    };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = async address => {
    const { onLocationChange, onLocationError } = this.props;

    try {
      const result = (await geocodeByAddress(address))[0];
      const location = await getLatLng(result);

      console.log(JSON.stringify(result));
      this.setState({ address: result.formatted_address });
      onLocationChange(location);
    } catch (error) {
      onLocationError(error);
    }
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <Content>
            <LocationInput
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <DropDownContainer show={suggestions && suggestions.length}>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => (
                <DropDownItem
                  {...getSuggestionItemProps(suggestion)}
                  active={suggestion.active}
                >
                  <span>{suggestion.description}</span>
                </DropDownItem>
              ))}
            </DropDownContainer>
          </Content>
        )}
      </PlacesAutocomplete>
    );
  }
}

PlacesAutoComplete.propTypes = {
  onLocationChange: PropTypes.func.isRequired,
  onLocationError: PropTypes.func.isRequired,
};

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
  LoadingContainer: LoadingIndicator,
})(PlacesAutoComplete);
