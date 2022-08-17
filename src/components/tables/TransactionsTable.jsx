import Table from 'react-bootstrap/Table';
import numberFormatter from '../../utils/formatters';

const TransactionsTable = () => {
  const rows = [
    {
      id: 1143155,
      product_volume: 15,
      img: 'https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg',
      customer: 'John Smith',
      date: '1 March',
      amount: 785,
      method: 'MPESA on Delivery',
      status: 'Completed',
    },
    {
      id: 2235235,
      product_volume: 54,
      img: 'https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg',
      customer: 'Michael Doe',
      date: '1 March',
      amount: 900,
      method: 'MPESA',
      status: 'Pending',
    },
    {
      id: 2342353,
      product_volume: 65,
      img: 'https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg',
      customer: 'John Smith',
      date: '1 March',
      amount: 35,
      method: 'MPESA on Delivery',
      status: 'Pending',
    },
    {
      id: 2357741,
      product_volume: 75,
      img: 'https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg',
      customer: 'Jane Smith',
      date: '1 March',
      amount: 920,
      method: 'MPESA',
      status: 'Cancelled',
    },
    {
      id: 2342355,
      product_volume: 20,
      img: 'https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg',
      customer: 'Harold Carol',
      date: '1 March',
      amount: 2000,
      method: 'MPESA',
      status: 'Pending',
    },
  ];
  return (
    <Table striped className="transactions-table mt-1">
      <thead>
        <tr>
          <th className="text-muted">Tracking ID</th>
          <th className="text-muted">Customer</th>
          <th className="text-muted">Date/ Time</th>
          <th className="text-muted">Amount</th>
          <th className="text-muted">Payment Method</th>
          <th className="text-muted">Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          return (
            <tr key={row.id}>
              <td className="py-3">{row.id}</td>
              <td className="py-3">{row.customer}</td>
              <td className="py-3">{row.date}</td>
              <td className="py-3">{numberFormatter(row.amount)}</td>
              <td className="py-3">{row.method}</td>
              <td className="py-3">
                <span
                  className={`transaction-status transaction-status--${row.status.toLowerCase()}`}
                >
                  {row.status}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TransactionsTable;
