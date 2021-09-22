const fs = require('fs');
const path = process.argv[2];
const folderNames = ['captured', 'video', 'duplicated'];
const readFiles = () => {
  return new fs.readdirSync(__dirname, (err, files) => {
    //   console.log(readfiles);
    if (err) {
      console.error(err);
      return;
    } else {
      return files;
    }
  });
};
const createArgvFolderFuction = () => {
  fs.mkdir(`${__dirname}/${path}`, (err) => {
    if (err) {
      console.error('exist');
    }
  });
};
const createFolderFuction = () => {
  folderNames.forEach((folderName) => {
    fs.mkdir(`${__dirname}/${path}/${folderName}`, (err) => {
      if (err) {
        console.error('exist');
      }
    });
  });
};

const checkingFile = (file) => {
  const videoReg = /mp4|mov/g;
  const captureReg = /png|aae/g;
  const duplicatedReg = /_E/g;
  if (videoReg.test(file)) {
    goToVideo(file);
  } else if (captureReg.test(file)) {
    goToCapture(file);
  } else {
    duplicatedReg.test(file)
      ? goToDuplicated(file)
      : console.log('not file', file);
  }
};

const goToVideo = (file) => {
  fs.copyFileSync(file, `${__dirname}/${path}/${folderNames[1]}/${file}`);
};
const goToCapture = (file) => {
  fs.copyFileSync(file, `${__dirname}/${path}/${folderNames[0]}/${file}`);
};
const goToDuplicated = (file) => {
  fs.copyFileSync(file, `${__dirname}/${path}/${folderNames[2]}/${file}`);
};

const main = () => {
  createArgvFolderFuction();
  createFolderFuction();
  const Files = readFiles();
  Files.forEach((file) => checkingFile(file));
};
main();
