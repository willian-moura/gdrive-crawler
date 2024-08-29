const fsprom = require('fs').promises;
const fs = require('fs')
const readline = require('readline');
const { google } = require('googleapis');
const utils = require('./utils'); // Assuming utils is a custom module

const init = async () => {
  try {
    // Load client secrets from a local file.
    const content = await fsprom.readFile('credentials.json', 'utf-8');
    const auth = await authorize(JSON.parse(content));
    return auth;
  } catch (err) {
    console.error('Error loading client secret file:', err);
    throw err;
  }
};

async function authorize(credentials) {
  const { client_secret, client_id, redirect_uris } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  try {
    // Check if we have previously stored a token.
    const token = await fsprom.readFile('token.json', 'utf-8');
    oAuth2Client.setCredentials(JSON.parse(token));
    return oAuth2Client;
  } catch (err) {
    return await getNewToken(oAuth2Client);
  }
}

function getNewToken(oAuth2Client) {
  return new Promise((resolve, reject) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/drive.readonly'],
    });
    console.log('Authorize this app by visiting this url:', authUrl);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Enter the code from that page here: ', async (code) => {
      rl.close();
      try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);

        // Store the token to disk for later program executions
        await fsprom.writeFile('token.json', JSON.stringify(tokens));
        console.log('Token stored to', 'token.json');
        resolve(oAuth2Client);
      } catch (err) {
        console.error('Error retrieving access token', err);
        reject(err);
      }
    });
  });
}

async function downloadFilesInFolder(auth, folderId, saveDirName) {
  const drive = google.drive({ version: 'v3', auth });
  try {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType)',
    });

    const files = res.data.files;
    if (files.length) {
      console.log(`'# Files (${folderId}):'`);
      for (const file of files) {
        console.log(`- ${file.name} (${file.id})`);
        if(file.mimeType === 'application/vnd.google-apps.folder'){
          const dirname = utils.slugfy(file.name)
          await downloadFilesInFolder(auth, file.id, `${saveDirName}/${dirname}`)
          continue
        }
        if(await utils.dirExists(`${saveDirName}/${file.name}`)){
          console.log(`-> ${file.name} (${file.id}) already exists, skipping...`)
          continue
        }
        await downloadFile(auth, file, saveDirName);
      }
    } else {
      console.log('No files found.');
    }
  } catch (err) {
    console.error('The API returned an error:', err);
  }
}

async function downloadFile(auth, file, saveDirName) {
  const drive = google.drive({ version: 'v3', auth });
  const fileId = file.id;
  
  await utils.createDirIfNotExists(saveDirName);
  
  const dest = fs.createWriteStream(`${saveDirName}/${file.name}`);
  
  try {
    const res = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'stream' });

    return new Promise((resolve, reject) => {
      res.data
        .on('end', () => {
          console.log(`✓ ${file.name}`);
          resolve();
        })
        .on('error', err => {
          console.error('Error downloading file:', err);
          reject(err);
        })
        .pipe(dest);
    });
  } catch (err) {
    console.error('Error downloading file:', err);
  }
}


module.exports = {
    init,
    downloadFilesInFolder
}