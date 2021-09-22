const fs = require('fs');
const path = './';
const folderNames = ['captured', 'video', 'duplicated'];

const createFolderFuction = folderNames.forEach((folderName) => {
  fs.mkdir(path + folderName, (err) => {
    if (err) {
      console.error('exist');
    } else {
      console.log('create');
    }
  });
});

module.exports.createFolderFuction = createFolderFuction;
