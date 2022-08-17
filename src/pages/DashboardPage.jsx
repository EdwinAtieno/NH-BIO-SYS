import { Col, Row } from 'react-bootstrap';
import { VscChevronRight } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import IncomeChart from '../components/charts/IncomeChart';
import TransactionsTable from '../components/tables/TransactionsTable';
import DashboardWidget from '../components/widgets/DashboardWidget';
import FullfilledOrders from '../components/widgets/FullfilledOrders';
import PrimaryLayout from '../layouts/PrimaryLayout';
import numberFormatter from '../utils/formatters';
import { links } from '../utils/links';

const DashboardPage = () => {
  return (
    <PrimaryLayout>
      <section className="dashboard-page__container">
        <Row className="widgets__wrapper">
          <Col sm={12} md={5} xl={4}>
            <FullfilledOrders />
          </Col>
          <Col sm={12} md={7} xl={8} className="widgets">
            <DashboardWidget
              title="New Customers Today"
              statistics="12"
              variant="dark-green"
              allText="customers"
              linkToAll={links.dashboard}
            />
            <DashboardWidget
              title="Order's Today"
              statistics="130"
              variant="earth-brown"
              allText="orders"
              linkToAll={links.dashboard}
            />
            <DashboardWidget
              title="Amount Recieved Today"
              statistics={numberFormatter(Math.floor(Math.random() * 1000000))}
              variant="dark-orange"
              allText="transactions"
              linkToAll={links.dashboard}
            />
            <DashboardWidget
              title="Quantity Ordered Today"
              statistics="1000 KG"
              variant="light-orange"
              allText="orders"
              linkToAll={links.dashboard}
            />
            <DashboardWidget
              title="Total Shops"
              statistics="1000"
              variant="magenta"
              allText="shops"
              linkToAll={links.dashboard}
            />
            <DashboardWidget
              title="Total Regions"
              statistics="10"
              variant="light-green"
              allText="regions"
              linkToAll={links.dashboard}
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

export default DashboardPage;
