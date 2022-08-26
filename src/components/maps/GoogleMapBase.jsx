import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Loader from '../spinners/Loader';

const libraries = ['drawing'];

const GoogleMapBase = ({ children, center, zoom }) => {
  const [showContent, setShowContent] = useState(false);
  const containerStyle = {
    width: '100%',
    height: '750px',
  };
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    libraries,
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const onLoad = () => {
    setShowContent(true);
  };

  if (!isLoaded) {
    return (
      <div className="p-3 d-flex align-items-center justify-content-center flex-column">
        <Loader variant="black" /> Loading map...
      </div>
    );
  }

  return (
    <GoogleMap
      zoom={zoom}
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
    >
      {showContent && children}
    </GoogleMap>
  );
};

const locationShape = {
  lat: PropTypes.number,
  lng: PropTypes.number,
};

GoogleMapBase.propTypes = {
  children: PropTypes.node.isRequired,
  center: PropTypes.shape(locationShape),
  zoom: PropTypes.number,
};

GoogleMapBase.defaultProps = {
  zoom: 10,
  center: { lat: -1.3190255, lng: 36.7645247 },
};

export default GoogleMapBase;
