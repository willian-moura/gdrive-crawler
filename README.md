[🇧🇷 Versão em português brazileiro](README.br.md)

# Google Drive File Downloader

This script is used to download files from Google Drive based on links provided either through a text file or a JSON array file. It requires Google API credentials for authentication and authorization.

## Prerequisites

1. **Node.js**: Make sure you have Node.js installed.
2. **Google API Credentials**: You need to create a `credentials.json` file to authenticate the script with Google Drive API.

### Setting up Google API Credentials

To use this script, you need to create a `credentials.json` file from the Google Developer Console:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing project.
3. Navigate to `APIs & Services` > `Credentials`.
4. Click on `Create Credentials` and choose `OAuth 2.0 Client IDs`.
5. Download the generated credentials file and save it as `credentials.json` in the root directory of the project.

## Usage

This script can be run in two different modes depending on the source of the Google Drive links:

1. **Discovery Mode** (`-d`): The script will parse a text file to find Google Drive links using a regular expression.
2. **Array Mode** (`-a`): The script will read a JSON file containing an array of Google Drive links.

### Command-Line Arguments

- `-d <file_path>`: Use this flag to specify the path to a text file. The script will search for Google Drive links within this file using regex and download them.

    ```bash
    node download.js -d /path/to/textfile.txt
    ```

- `-a <file_path>`: Use this flag to specify the path to a JSON array file. The script will read the JSON array from this file and download each Google Drive link.

    ```bash
    node download.js -a /path/to/jsonfile.json
    ```

### Example

1. **Discovery Mode Example**:

    If you have a text file named `links.txt` that contains multiple Google Drive links, you can run:

    ```bash
    node download.js -d links.txt
    ```

2. **Array Mode Example**:

    If you have a JSON file named `links.json` with a JSON array of Google Drive links, you can run:

    ```bash
    node download.js -a links.json
    ```

## Note

Ensure that your `credentials.json` file is present in the same directory as your script before running the commands. This file is necessary for authenticating your requests to the Google Drive API.

## License

This project is licensed under the MIT License.

