export function currencyFormatter(value, currency = 'KES') {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    style: 'currency',
    currency,
  }).format(value);
}

export default function numberFormatter(num) {
  if (num >= 1000000) {
    const numInMillion = (num / 1000000).toFixed(1);
    return `${currencyFormatter(numInMillion)}m`;
  }
  if (num >= 1000) {
    const numInThousand = (num / 1000).toFixed(1);
    return `${currencyFormatter(numInThousand)}k`;
  }
  return currencyFormatter(num);
}
