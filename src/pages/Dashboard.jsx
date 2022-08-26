import { useQuery } from '@tanstack/react-query';
import { Col, Row } from 'react-bootstrap';
import { VscChevronRight } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import IncomeChart from '../components/charts/IncomeChart';
import FullPageLoader from '../components/spinners/FullPageLoader';
import DashboardWidget from '../components/widgets/DashboardWidget';
import FullfilledOrders from '../components/widgets/FullfilledOrders';
import TransactionsTable from '../features/transactions/TransactionsTable';
import useAxios from '../hooks/useAxios';
import PrimaryLayout from '../layouts/PrimaryLayout';
import numberFormatter from '../utils/formatters';
import { links } from '../utils/links';

const Dashboard = () => {
  const api = useAxios();

  const getInsights = async (values) => {
    const response = await api.get('/insights/', values);
    return response.data;
  };

  const { isLoading, data } = useQuery(['insights'], getInsights);

  if (isLoading) return <FullPageLoader />;
  return (
    <PrimaryLayout>
      <section className="dashboard-page__container">
        <Row className="widgets__wrapper">
          <Col sm={12} md={5} xl={4}>
            <FullfilledOrders
              percentage={
                data.total_orders_today === 0
                  ? 0
                  : Math.round(
                      (data.fullfilled_orders_today / data.total_orders_today) *
                        100
                    )
              }
              todaysOrders={data.total_orders_today}
              fullfilledOrders={data.fullfilled_orders_today}
              targetAmount={data.amount_expected_today}
              completeRegions={data.fullfilled_regions_today}
              fullfilledQuantity={data.fullfilled_quantity}
            />
          </Col>
          <Col sm={12} md={7} xl={8} className="widgets">
            <DashboardWidget
              title="New Customers Today"
              statistics={`${data?.registered_customers_today}`}
              variant="dark-green"
              allText="customers"
              linkToAll={links.dashboard}
            />
            <DashboardWidget
              title="Order's Today"
              statistics={`${data?.total_orders_today}`}
              variant="earth-brown"
              allText="orders"
              linkToAll={links.dashboard}
            />
            <DashboardWidget
              title="Amount Recieved Today"
              statistics={numberFormatter(data?.fullfilled_amount_today)}
              variant="dark-orange"
              allText="transactions"
              linkToAll={links.dashboard}
            />
            <DashboardWidget
              title="Quantity Ordered Today"
              statistics={`${data?.total_quantity_today} KG`}
              variant="light-orange"
              allText="orders"
              linkToAll={links.dashboard}
            />
            <DashboardWidget
              title="Total Shops"
              statistics={`${data?.total_shops}`}
              variant="magenta"
              allText="shops"
              linkToAll={links.dashboard}
            />
            <DashboardWidget
              title="Total Regions"
              statistics={`${data?.total_regions}`}
              variant="light-green"
              allText="regions"
              linkToAll={links.regions}
            />
          </Col>
        </Row>
        <div className="w-95 my-1 mx-auto">
          <IncomeChart />
        </div>
        <div className="mt-5 px-1 mx-auto">
          <div className="latest-transactions">
            <h5 className="text-muted">Latest Transactions</h5>
            <Link to={links.transactions} className="text-muted">
              View all Transactions <VscChevronRight />
            </Link>
          </div>
          <TransactionsTable />
        </div>
      </section>
    </PrimaryLayout>
  );
};

export default Dashboard;
