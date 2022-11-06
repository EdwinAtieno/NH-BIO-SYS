import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import PropTypes from 'prop-types';
import numberFormatter from '../../utils/formatters';

const FullfilledOrders = ({
  percentage,
  todaysOrders,
  fullfilledOrders,
  targetAmount,
  fullfilledQuantity,
  completeRegions,
}) => {
  return (
    <article className="fullfilled-orders">
      <header>
        <h5 className="text-muted">Today&apos;s Deliveries</h5>
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
            <h6 className="text-muted">Delivered Orders</h6>
            <h3>{fullfilledOrders}</h3>
          </div>
          <div className="m-2">
            <h6 className="text-muted">Undelivered Orders</h6>
            <h3>{todaysOrders - fullfilledOrders}</h3>
          </div>
        </div>
        <footer className="d-flex justify-content-space-between align-items-flex-start">
          <div className="m-2">
            <h6 className="text-muted">Complete Regions</h6>
            <h5>{completeRegions}</h5>
          </div>
          <div className="m-2">
            <h6 className="text-muted">Target Amount</h6>
            <h5>{numberFormatter(targetAmount)}</h5>
          </div>
          <div className="m-2">
            <h6 className="text-muted">Quantity Delivered</h6>
            <h5>{fullfilledQuantity} KG</h5>
          </div>
        </footer>
      </main>
    </article>
  );
};

FullfilledOrders.propTypes = {
  percentage: PropTypes.number.isRequired,
  todaysOrders: PropTypes.number.isRequired,
  fullfilledOrders: PropTypes.number.isRequired,
  targetAmount: PropTypes.number.isRequired,
  fullfilledQuantity: PropTypes.number.isRequired,
  completeRegions: PropTypes.number.isRequired,
};

export default FullfilledOrders;
