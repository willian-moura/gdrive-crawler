const fs = require('fs');
const fsprom = require('fs/promises');

const getArg = (argName) => {
    const args = {
        ['--discover']: 'string',
        ['--array']: 'string',
        ['-d']: 'string',
        ['-a']: 'string',
    }

    if(args[argName] && args[argName] === 'string'){
        const index = process.argv.indexOf(argName)
        return index > -1 
            ? process.argv[index + 1] 
            : null
    }

    if(args[argName] && args[argName] === 'bool'){
        const index = process.argv.indexOf(argName)
        return index > -1 
            ? true 
            : false
    }

    return null    
}

const extractLinks = async (filepath) => {
    const file = await fsprom.readFile(filepath, 'utf-8')

    const regex = /https:\/\/drive\.google\.com.*\/folders\/(.*)\?usp=sharing/gm

    return file.match(regex)
}

const createDirIfNotExists = (directoryPath) => new Promise((resolve, reject) => {
    fs.access(directoryPath, fs.constants.F_OK, (err) => {
        err 
            ? fs.mkdir(directoryPath, {recursive: true}, (err2) => {
                err2 
                    ? reject(err2)
                    : resolve()
            })
            : resolve()
    });
})

const dirExists = (directoryPath) => new Promise((resolve, reject) => {
    fs.access(directoryPath, fs.constants.F_OK, (err) => {
        err 
            ? resolve(false)
            : resolve(true)
    });
})

const slugfy = (str) => {
    str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
             .replace(/\s+/g, '-') // replace spaces with hyphens
             .replace(/-+/g, '-'); // remove consecutive hyphens
    return str;
  }

module.exports = {
    extractLinks,
    createDirIfNotExists,
    slugfy,
    dirExists,
    getArg
}