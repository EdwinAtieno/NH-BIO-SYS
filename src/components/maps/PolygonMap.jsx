import { Polygon, Marker, InfoWindow } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import { getPolygonCenter, polygonColor } from '../../utils/polygons';
import GoogleMapBase from './GoogleMapBase';

const PolygonMap = ({ paths, center }) => {
  return (
    <GoogleMapBase center={center}>
      <Marker>
        {paths.map((path) => {
          const color =
            polygonColor[Math.floor(Math.random() * polygonColor.length)];
          const regionCenter = getPolygonCenter(path.paths);
          if (path) {
            return (
              <div key={path.id}>
                <Polygon
                  options={{
                    strokeColor: color,
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: color,
                    fillOpacity: 0.35,
                  }}
                  paths={path.paths}
                />
                <InfoWindow position={regionCenter}>
                  <div className="p-1">
                    <div>
                      <h6>{path.region}</h6>
                      <p
                        className={
                          path.is_active ? 'text-success' : 'text-danger'
                        }
                      >
                        {path.is_active ? 'active' : 'disabled'}
                      </p>
                    </div>
                  </div>
                </InfoWindow>
              </div>
            );
          }
          return '';
        })}
      </Marker>
    </GoogleMapBase>
  );
};

const locationShape = {
  lat: PropTypes.number,
  lng: PropTypes.number,
};

const regionShape = {
  id: PropTypes.number,
  region: PropTypes.string,
  is_active: PropTypes.bool,
  paths: PropTypes.arrayOf(PropTypes.shape(locationShape)),
};

PolygonMap.propTypes = {
  center: PropTypes.shape(locationShape).isRequired,
  paths: PropTypes.arrayOf(PropTypes.shape(regionShape)).isRequired,
};

export default PolygonMap;
