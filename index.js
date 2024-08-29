const utils = require('./utils')
const driveapi = require('./driveapi')

const getLinks = async () => {
    const arrayPath = utils.getArg('-a') || utils.getArg('--array')
    const discoverPath = utils.getArg('-d') || utils.getArg('--discover')

    return arrayPath 
        ? JSON.parse(await fsprom.readFile(arrayPath, 'utf-8'))
        : await utils.extractLinks(discoverPath)
}

const execute = async () => {
    const links = await getLinks()
    const auth = await driveapi.init()
    for (let i = 0; i < links.length; i++) {
        const reg = /https:\/\/drive\.google\.com.*\/folders\/(.*)\?usp=sharing/.exec(links[i])
        await driveapi.downloadFilesInFolder(auth, reg[1], `./downloads/folder-${i+1}`)
    }
}

execute()

