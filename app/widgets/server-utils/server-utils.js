const fs = require('fs');

function getFilesContent(foldersPath, fileName) {
    return new Promise((resolve, reject) => {
        let currArticlesPath = `${foldersPath}/${fileName}`;

        fs.readFile(currArticlesPath, (err, buffer) => {
            if (err) {
                reject(err);
                return;
            }
            let filesContent = buffer.toString();
            resolve(filesContent);
        });
    })
}

function updateFile(filePath, fileBody) {
    return saveFile(filePath, fileBody);
}

function saveFile(filePath, fileBody) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, fileBody, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(true);
        });
    });
}

function renameFile(oldfilePath, newFilePath) {
    return new Promise((resolve, reject) => {
        fs.rename(oldfilePath, newFilePath, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(true);
        });
    });
}

function deleteFile(filePath) {
    return new Promise((resolve, reject) => {
        let doesFileExists = fs.existsSync(filePath);

        if (doesFileExists) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(true);
            });
        } else {
            reject(`curr path: ${filePath} doesnt exists`);
        }
    });
}


function getValidFileName(datasName, id) {
    let validFileName = datasName
        .normalize('NFD')
        .toLowerCase()
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/gi, '_').toLocaleLowerCase() + `-${id}`;
    
    return validFileName;
}

module.exports = {
    getFilesContent,
    updateFile,
    renameFile,
    deleteFile,
    getValidFileName,
    saveFile
};