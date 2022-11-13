import PrimaryLayout from '../layouts/PrimaryLayout';
import SuppliersInfo from '../features/Suppliers/SuppliersInfo';
import ContactPInfo from '../features/ContactPerson/ContactPInfo';

const Suppliers = () => {
  return (
    <PrimaryLayout>
      <SuppliersInfo />
      <ContactPInfo />
    </PrimaryLayout>
  );
};

export default Suppliers;
