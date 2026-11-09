const fs = require('fs');
const path = require('path');
const targetFolder = './MP3';
const outputFile = './files.json';
fs.readdir(targetFolder, (err, files) => {
	if (err) {
		console.error("Could not list the directory.", err);
		process.exit(1);
	}
	fs.writeFileSync(outputFile, JSON.stringify(files, null, 2));
	console.log(`Successfully generated file list for ${files.length} files.`);
});
