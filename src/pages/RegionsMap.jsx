import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PolygonMap from '../components/maps/PolygonMap';
import Loader from '../components/spinners/Loader';
import useAxios from '../hooks/useAxios';
import PrimaryLayout from '../layouts/PrimaryLayout';
import { getPolygonCenter } from '../utils/polygons';

const RegionsMap = () => {
  const [paths, setPaths] = useState([]);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const api = useAxios();

  const getAllRegions = async () => {
    const response = await api.get('/regions/', {
      params: {
        no_page: true,
      },
    });
    return response.data;
  };

  const { isLoading, data: regions } = useQuery(['allRegions'], getAllRegions);

  useEffect(() => {
    if (regions && regions.length > 0) {
      const validRegions = [];
      for (let i = 0; i < regions.length; i += 1) {
        const region = regions[i];
        try {
          const polygonCoordinates = JSON.parse(region.paths);
          validRegions.push({
            id: region.id,
            is_active: region.is_active,
            region: region.region,
            paths: polygonCoordinates,
          });
        } catch (err) {
          toast.error(`Failed to load ${region.region}`, {
            position: 'bottom-right',
          });
        }
      }
      setPaths(validRegions);
    }
  }, [regions]);

  useEffect(() => {
    if (paths.length > 0) {
      const merged = paths.map((path) => path.paths).flat(1);
      const mapCenter = getPolygonCenter(merged);
      setCenter(mapCenter);
    }
  }, [paths]);

  return (
    <PrimaryLayout>
      {isLoading && (
        <div className="centered m-3">
          {isLoading && <Loader variant="black" />}
        </div>
      )}
      {!isLoading && <PolygonMap paths={paths} center={center} />}
    </PrimaryLayout>
  );
};

export default RegionsMap;
