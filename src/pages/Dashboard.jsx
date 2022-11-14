import { useQuery } from '@tanstack/react-query';
import FullPageLoader from '../components/spinners/FullPageLoader';
import PrimaryLayout from '../layouts/PrimaryLayout';

const Dashboard = () => {
  const { isLoading } = useQuery(['insights']);

  if (isLoading) return <FullPageLoader />;
  return (
    <PrimaryLayout>
      <section className="dashboard-page__container">
        <div className="mt-5 px-1 mx-auto">
          <div className="latest-transactions">
            <h5 className="text-muted">Latest Updates and Track</h5>
          </div>
        </div>
      </section>
    </PrimaryLayout>
  );
};

export default Dashboard;
