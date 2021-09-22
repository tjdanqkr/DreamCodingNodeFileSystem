const readfiles = () => {
  const fs = require('fs');
  new fs.readdirSync(__dirname, (err, files) => {
    //   console.log(readfiles);
    if (err) {
      console.error(err);
      return;
    } else {
      return files;
    }
  });
};
module.exports.readFiles = readfiles;
