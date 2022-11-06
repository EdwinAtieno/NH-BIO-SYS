import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { links } from '../../utils/links';

const RegionsTable = ({ regions }) => {
  return (
    <Table striped className="transactions-table mt-1">
      <thead>
        <tr>
          <th className="text-muted">Region ID</th>
          <th className="text-muted">Region Name</th>
          <th className="text-muted">Status</th>
          <th className="text-muted">Actions</th>
        </tr>
      </thead>
      <tbody>
        {regions.map((region) => {
          return (
            <tr key={region.id}>
              <td className="py-3 fw-bold text-muted">{region.id}</td>
              <td className="py-3 fw-bold">{region.region}</td>
              <td className="py-3">
                <span
                  className={`region-status region-status--${
                    region.is_active ? 'active' : 'disabled'
                  }`}
                >
                  {region.is_active ? 'active' : 'disabled'}
                </span>
              </td>
              <td className="py-3">
                <Link to={`${links.region}/${region.id}`} className="mx-1">
                  View
                </Link>
                <Link to={`${links.region}/${region.id}`} className="mx-1">
                  Edit
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

RegionsTable.propTypes = {
  regions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      region: PropTypes.string.isRequired,
      paths: PropTypes.string.isRequired,
      is_active: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default RegionsTable;
