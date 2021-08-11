const path = require('path');

const handle404 = (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '..', 'public', '400.html'));
};

module.exports = handle404;
