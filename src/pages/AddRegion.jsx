import { useState } from 'react';
import DrawingMap from '../components/maps/DrawingMap';
import AddRegionModal from '../features/regions/AddRegionModal';
import PrimaryLayout from '../layouts/PrimaryLayout';

const AddRegion = () => {
  const initialValues = {
    region: '',
    paths: [],
  };
  const [show, setShow] = useState(false);
  const [values, setValues] = useState(initialValues);

  return (
    <PrimaryLayout>
      <AddRegionModal
        initialValues={initialValues}
        show={show}
        setShow={setShow}
        values={values}
        setValues={setValues}
      />
      <DrawingMap setShow={setShow} values={values} setValues={setValues} />
    </PrimaryLayout>
  );
};

export default AddRegion;
