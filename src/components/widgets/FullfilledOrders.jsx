import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import PropTypes from 'prop-types';
import numberFormatter from '../../utils/formatters';

const FullfilledOrders = ({ percentage }) => {
  return (
    <article className="fullfilled-orders">
      <header>
        <h5 className="text-muted">Fullfilled Orders</h5>
      </header>
      <main>
        <div className="progress mx-auto my-3">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            strokeWidth={5}
            styles={buildStyles({
              textColor: '#6b9b3b',
              pathColor: '#6b9b3b',
            })}
          />
        </div>
        <div className="d-flex justify-content-center align-items-flex-start mb-1">
          <div className="m-2">
            <h6 className="text-muted">Total Amount Today</h6>
            <h3>{numberFormatter(Math.floor(Math.random() * 1000000))}</h3>
          </div>
          <div className="m-2">
            <h6 className="text-muted">Order Regions</h6>
            <h3>10</h3>
          </div>
        </div>
        <footer className="d-flex justify-content-space-between align-items-flex-start">
          <div className="m-2">
            <h6 className="text-muted">Target Number</h6>
            <h5>100</h5>
          </div>
          <div className="m-2">
            <h6 className="text-muted">Target Amount</h6>
            <h5>{numberFormatter(Math.floor(Math.random() * 1000000))}</h5>
          </div>
          <div className="m-2">
            <h6 className="text-muted">Target Regions</h6>
            <h5>10</h5>
          </div>
        </footer>
      </main>
    </article>
  );
};

FullfilledOrders.defaultProps = {
  percentage: 10,
};

FullfilledOrders.propTypes = {
  percentage: PropTypes.number,
};

export default FullfilledOrders;
