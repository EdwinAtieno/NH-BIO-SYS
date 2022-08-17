import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const DashboardWidget = ({
  title,
  statistics,
  variant,
  linkToAll,
  allText,
}) => {
  return (
    <article className={`dashboard-widget dashboard-widget--${variant}`}>
      <header className="header">
        <h6 className="title text-muted">{title}</h6>
      </header>
      <main>
        <h3 className="stats">{statistics}</h3>
      </main>
      <footer className="footer">
        <Link to={linkToAll} className="small">
          View all {allText}
        </Link>
      </footer>
    </article>
  );
};

DashboardWidget.propTypes = {
  title: PropTypes.string.isRequired,
  statistics: PropTypes.string.isRequired,
  variant: PropTypes.string,
  linkToAll: PropTypes.string.isRequired,
  allText: PropTypes.string.isRequired,
};

DashboardWidget.defaultProps = {
  variant: 'dark-green',
};

export default DashboardWidget;
