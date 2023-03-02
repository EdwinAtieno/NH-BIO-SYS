import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Stack } from 'react-bootstrap';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Button from '../components/buttons/Button';
import ErrorMessage from '../components/errors/ErrorMessage';
import Loader from '../components/spinners/Loader';
import RegionsTable from '../features/regions/RegionsTable';
import useAxios from '../hooks/useAxios';
import PrimaryLayout from '../layouts/PrimaryLayout';
import { links } from '../utils/links';

const Regions = () => {
  const api = useAxios();
  const [params, setParams] = useState({});

  const getRegions = async () => {
    const response = await api.get('/regions/', { params });
    return response.data;
  };

  const { isLoading, isError, data, refetch } = useQuery(
    ['regions', { params }],
    getRegions
  );

  const setLimitOffset = (limitOffsetUrl) => {
    const url = new URL(limitOffsetUrl);
    const searchParams = new URLSearchParams(url.search);
    setParams({
      ...params,
      limit: searchParams.get('limit'),
      offset: searchParams.get('offset'),
    });
  };

  return (
    <PrimaryLayout>
      <div className="p-3">
        <Stack direction="horizontal" gap={3}>
          <h3>Regions</h3>
          <Link to={`${links.regionsInMap}`} className=" ms-auto">
            View Regions in Map
          </Link>
          <Button variant="green" href={links.addRegion}>
            <AiOutlinePlusCircle />
            <span className="px-1">Add Region</span>
          </Button>
        </Stack>
        {!isLoading && !isError && (
          <div>
            <RegionsTable regions={data?.results} />
            <small className="text-muted fst-italic">
              Showing {data?.results.length} of {data?.count} results
            </small>
            <div className="d-flex justify-content-center align-items-center">
              <Button
                variant="dark"
                size="sm"
                className={data?.previous ? 'visible' : 'invisible'}
                onClick={() => setLimitOffset(data.previous)}
              >
                Previous Page
              </Button>
              <Button
                variant="dark"
                size="sm"
                className={data?.next ? 'visible' : 'invisible'}
                onClick={() => setLimitOffset(data.next)}
              >
                Next Page
              </Button>
            </div>
          </div>
        )}
        <div className="centered m-3">
          {isLoading && <Loader variant="black" />}
          {isError && (
            <ErrorMessage
              message="Oh snap! Failed to load regions"
              withRetry
              retryAction={refetch}
            />
          )}
        </div>
      </div>
    </PrimaryLayout>
  );
};

export default Regions;
