const fs = require('fs');

function getFilesContent(foldersPath, fileName) {
    return new Promise((resolve, reject) => {
        let currArticlesPath = `${foldersPath}/${fileName}`;

        let doesFileExist = fs.existsSync(currArticlesPath);
        if(!doesFileExist) {
            resolve(false);
            return;
        }

        fs.readFile(currArticlesPath, (err, buffer) => {
            if (err) reject(err)
            let filesContent = buffer.toString();
            resolve(filesContent);
        });
    })
}

function updateFile(filePath, fileBody) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, fileBody, (err) => {
            if (err) reject(err);
            resolve(true);
        });
    });
}

function renameFile(oldfilePath, newFilePath) {
    return new Promise((resolve, reject) => {
        fs.rename(oldfilePath, newFilePath, (err) => {
            if (err) throw reject(err);
            resolve(true);
        });
    });
}

function deleteFile(filePath) {
    return new Promise((resolve, reject) => {
        let doesFileExists = fs.existsSync(filePath);

        if (doesFileExists) {
            fs.unlink(filePath, (err) => {
                if (err) throw reject(err);
                resolve(true);
            });
        } else {
            reject(`curr path: ${filePath} doesnt exists`);
        }
    });
}

module.exports = {
    getFilesContent,
    updateFile,
    renameFile,
    deleteFile
};