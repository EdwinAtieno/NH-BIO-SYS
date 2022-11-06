import { useQuery } from '@tanstack/react-query';
import { VscChevronRight } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import FullPageLoader from '../components/spinners/FullPageLoader';
import PrimaryLayout from '../layouts/PrimaryLayout';
import { links } from '../utils/links';

const Dashboard = () => {
  const { isLoading } = useQuery(['insights']);

  if (isLoading) return <FullPageLoader />;
  return (
    <PrimaryLayout>
      <section className="dashboard-page__container">
        <div className="mt-5 px-1 mx-auto">
          <div className="latest-transactions">
            <h5 className="text-muted">Latest Transactions</h5>
            <Link to={links.transactions} className="text-muted">
              View all Transactions <VscChevronRight />
            </Link>
          </div>
        </div>
      </section>
    </PrimaryLayout>
  );
};

export default Dashboard;
