// 사용자의 폴더 이름을 받아온다.
// 그 안
const path = require('path');
const os = require('os');
const fs = require('fs');
const folder = process.argv[2];
const workingDir = path.join(__dirname, 'Pictures', folder);

if (!folder || !fs.existsSync(workingDir)) {
  console.error('folder name is undefined');
  return;
}
const videoDir = path.join(workingDir, 'video');
const capturedDir = path.join(workingDir, 'captured');
const duplicatedDir = path.join(workingDir, 'duplicated');

!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir);
!fs.existsSync(duplicatedDir) && fs.mkdirSync(duplicatedDir);

fs.promises
  .readdir(workingDir)
  .then((files) => processFiles(files))
  .catch(console.error);

function processFiles(files) {
  files.forEach((file) => {
    if (isVideoFile(file)) {
      move(file, videoDir);
    } else if (isCapturedFile(file)) {
      move(file, capturedDir);
    } else if (isDuplicatedFile(files, file)) {
      move(file, duplicatedDir);
    }
  });
}

const isVideoFile = (file) => {
  const regExp = /(mp4|mov)$/gm;
  const match = file.match(regExp);
  return !!match;
};
const isCapturedFile = (file) => {
  const regExp = /(png|aae)$/gm;
  const match = file.match(regExp);
  return !!match;
};
const isDuplicatedFile = (files, file) => {
  if (!file.startsWith('IMG_') || file.startsWith('IMG_E')) return false;
  const edited = `IMG_E${file.split('_')[1]}`;
  const found = files.find((f) => f.includes(edited));
  return !!found;
};

const move = (file, targetDir) => {
  const oldPath = path.join(workingDir, file);
  const newPath = path.join(targetDir, file);
  fs.promises.rename(oldPath, newPath).catch(console.error);
};
