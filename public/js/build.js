const fs = require('fs-extra');
const path = require('path');

const grandParentDirectory = path.resolve(__dirname, '../..');
const buildDirectory = path.join(grandParentDirectory, "build");

if (!fs.existsSync(buildDirectory)) {
    fs.mkdirSync(buildDirectory, { recursive: true });
    console.log('Folder created:', buildDirectory);
} else {
    console.log('Folder already exists:', buildDirectory);
}

const filesToCopy = [
  'app.js',
  'package.json',
  'node_modules',
  'public',
  'views'
];

// Copy the files and folders to the build folder
filesToCopy.forEach(file => {
  const source = path.join(grandParentDirectory, file);
  const destination = path.join(buildDirectory, file); // Include the file name in the destination path

  const fileStats = fs.statSync(source);
  if (fileStats.isFile()) {
    // It's a file, copy it
    fs.copySync(source, destination);
  } else if (fileStats.isDirectory()) {
    // It's a folder, copy the entire folder and its contents recursively
    fs.copySync(source, destination, {
      recursive: true
    });
  }
});

const filesToRemove = [
    'public/css/tailwind.css', 
    'public/js/build.js', 
];

// Remove the files from the build folder
filesToRemove.forEach(file => {
    const filePath = path.join(buildDirectory, file);
  
    if (fs.existsSync(filePath)) {
      fs.removeSync(filePath);
      console.log('File removed:', filePath);
    } else {
      console.log('File not found:', filePath);
    }
  });