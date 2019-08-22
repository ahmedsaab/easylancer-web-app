import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import * as PropTypes from 'prop-types';
import { GoogleApiWrapper } from 'google-maps-react';
import { MDBInput } from 'mdbreact';
import styled from 'styled-components';
import Spinner from 'components/atoms/Spinner';

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

const LocationInput = styled(MDBInput).attrs(props => ({
  label: props.label,
}))``;

const getTypes = type => {
  const types = [];

  switch (type) {
    case 'city':
      types.push('(cities)');
      break;
    case 'country':
      types.push('country');
      break;
    case 'address':
      types.push('geocode');
      break;
    default:
  }

  return types;
};

class Places extends React.Component {
  handleSelect = async address => {
    const { onSelect, onError } = this.props;

    try {
      const result = (await geocodeByAddress(address))[0];
      const geo = await getLatLng(result);
      const city = result.address_components.find(component =>
        component.types.includes('locality'),
      );
      const cityAlt = result.address_components.find(component =>
        component.types.includes('administrative_area_level_1'),
      );
      const country = result.address_components.find(component =>
        component.types.includes('country'),
      );

      onSelect({
        country,
        city: city || cityAlt,
        address: result.formatted_address,
        geo,
      });
    } catch (error) {
      onError(error);
    }
  };

  render() {
    const { type, countryISOCode, text, onChange } = this.props;
    const searchOptions = {
      types: getTypes(type),
      componentRestrictions: { country: countryISOCode },
    };

    return (
      <PlacesAutocomplete
        value={text}
        onChange={onChange}
        onSelect={this.handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <Content>
            <LocationInput
              label={this.props.label}
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

Places.propTypes = {
  onSelect: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['city', 'country', 'address']),
  label: PropTypes.string,
  text: PropTypes.string,
  countryISOCode: PropTypes.string,
};

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
  LoadingContainer: Spinner,
})(Places);
