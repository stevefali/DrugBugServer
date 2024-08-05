const BASE = `https://api.fda.gov/drug/label.json`;

const BOXED_WARNING = `?search=boxed_warning:`;

const getBoxedWarningEndpoint = (medicine) => {
  return `${BASE}${BOXED_WARNING}${medicine}`;
};

module.exports = getBoxedWarningEndpoint;
