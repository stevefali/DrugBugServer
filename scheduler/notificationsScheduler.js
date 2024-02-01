const Bree = require("bree");
const path = require("path");

const appDir = path.resolve(__dirname, "..");

let schedule = [];

const bree = new Bree({
  root: false,
  jobs: schedule,
  errorHandler: (error) => {
    console.log(error);
  },
});

const initializeBree = async () => {
  await bree.start();
  console.log("Bree starting");
};

initializeBree();
