import { Polygon, DrawingManager, InfoWindow } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import { getPolygonCenter } from '../../utils/polygons';
import GoogleMapBase from './GoogleMapBase';

const DrawingMap = ({ setShow, setValues, values }) => {
  const onPolygonComplete = (polygon) => {
    setValues({
      ...values,
      paths: JSON.stringify(polygon.getPath().getArray()),
    });
    setShow(true);
  };

  const onOverlayComplete = (e) => {
    e.overlay.setMap(null);
  };

  return (
    <GoogleMapBase>
      <DrawingManager
        onPolygonComplete={onPolygonComplete}
        onOverlayComplete={onOverlayComplete}
        drawingMode="polgon"
      />
      {values?.paths && values.paths.length > 0 && (
        <>
          <Polygon
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
            }}
            paths={JSON.parse(values.paths)}
          />
          <InfoWindow position={getPolygonCenter(JSON.parse(values.paths))}>
            <div className="p-1">
              <div>
                <h6>{values.region}</h6>
              </div>
            </div>
          </InfoWindow>
        </>
      )}
    </GoogleMapBase>
  );
};

const valuesShape = {
  region: PropTypes.string.isRequired,
  paths: PropTypes.string.isRequired,
};

DrawingMap.propTypes = {
  setShow: PropTypes.func.isRequired,
  setValues: PropTypes.func.isRequired,
  values: PropTypes.shape(valuesShape).isRequired,
};

export default DrawingMap;
