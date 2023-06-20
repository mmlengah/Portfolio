const fs = require('fs-extra');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const grandParentDirectory = path.resolve(__dirname, '../..');
const buildDirectory = path.join(grandParentDirectory, "build");

if (!fs.existsSync(buildDirectory)) {
    fs.mkdirSync(buildDirectory, { recursive: true });
    console.log('Folder created:', buildDirectory);
} else {
    console.log('Folder already exists:', buildDirectory);
}

const filesToCopyAndFolder = [
  'index.html',
  '404.html',
  'assets',
];



// Copy the files and folders to the build folder
filesToCopyAndFolder.forEach(file => {
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

const filesToCopyFromFolder = [
  'pages'
];

filesToCopyFromFolder.forEach(file => {
  const source = path.join(grandParentDirectory, file);
  const destination = buildDirectory

  fs.copySync(source, destination)
});

const filesToRemove = [
    'assets/css/tailwind.css', 
    'assets/js/build.js', 
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

  // Read all files in the directory
fs.readdir(buildDirectory, (err, files) => {
  if (err) {
      return console.error('Unable to scan directory: ' + err);
  }

  // Loop through all the files
  files.forEach((file) => {
      if(path.extname(file) === '.html') {
          // Read the file content
          const html = fs.readFileSync(path.join(buildDirectory, file), 'utf-8');

          // Parse the HTML
          const dom = new JSDOM(html);
          const document = dom.window.document;

          // Select all the links
          const links = document.querySelectorAll('a');

          // Loop through all the links
          for (let link of links) {
              let href = link.getAttribute('href');

              // Perform your transformations
              if (href === './index.html' || href === 'index.html' || href === '../index.html') {
                  href = '/';
              } else if (href.includes('/') && href.includes('.html')) {
                href = href.substring(href.lastIndexOf('/')); // Removes everything before the last '/'
                href = href.replace('.html', ''); // Removes the '.html' extension
              } 
              else if(href.includes('.html')){
                href = href.replace('.html', '');
                href = "/" + href
              }

              // Set the new href
              link.setAttribute('href', href);
          }

          // Write the modified HTML back to the file
          fs.writeFileSync(path.join(buildDirectory, file), dom.serialize());
      }
  });
});