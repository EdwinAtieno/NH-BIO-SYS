export const getPolygonCenter = (polygon) => {
  if (!polygon || polygon.length === 0) {
    return { lat: -1.3190255, lng: 36.7645247 };
  }

  const latitudes = polygon.map((path) => path?.lat || 0);
  const longitudes = polygon.map((path) => path?.lng || 0);

  const latitude = latitudes.reduce((partialSum, a) => partialSum + a, 0);
  const longitude = longitudes.reduce((partialSum, a) => partialSum + a, 0);

  return {
    lat: latitude / latitudes.length,
    lng: longitude / longitudes.length,
  };
};

export const polygonColor = [
  '#3366CC',
  '#DC3912',
  '#FF9900',
  '#109618',
  '#990099',
  '#3B3EAC',
  '#0099C6',
  '#DD4477',
  '#66AA00',
  '#B82E2E',
  '#316395',
  '#994499',
  '#22AA99',
  '#AAAA11',
  '#6633CC',
  '#E67300',
  '#8B0707',
  '#329262',
  '#5574A6',
  '#3B3EAC',
];
