const BASE = `https://api.fda.gov/drug/label.json`;

const BOXED_WARNING = `&search=boxed_warning:`;

const FDA_API_KEY = process.env.FDA_KEY;

const getBoxedWarningEndpoint = (medicine) => {
  return `${BASE}?api_key=${FDA_API_KEY}${BOXED_WARNING}${medicine}`;
};

module.exports = getBoxedWarningEndpoint;
