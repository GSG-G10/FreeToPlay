const path = require('path')
const handle500 = (error, req, res, next) => {
  res.status(500).sendFile(path.join(__dirname, "..", "public", "500.html"));
};

module.exports = handle500;
