import Lost from '../assets/svgs/Illustrations';
import Button from '../components/buttons/Button';
import { links } from '../utils/links';

const NotFound = () => {
  return (
    <section className="not-found__container">
      <div className="not-found__image">
        <Lost />
      </div>
      <div className="not-found__text">
        <h1>404</h1>
        <h2>Ooops! Page Not Found</h2>
        <p>The page you requested could not be found</p>
        <Button size="lg" variant="earth-brown" href={links.dashboard}>
          Go Back Home
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
