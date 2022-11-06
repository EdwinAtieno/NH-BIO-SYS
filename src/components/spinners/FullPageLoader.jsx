import Loader from '../../assets/svgs/Spinners';
import Riziki from '../../assets/svgs/Logos';

const FullPageLoader = () => {
  return (
    <div className="full-page-loader__wrapper">
      <span />
      <Riziki />
      <div>
        <Loader variant="green" />
        <span className="text-muted">Loading...</span>
      </div>
    </div>
  );
};

export default FullPageLoader;
