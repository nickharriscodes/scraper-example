# Ninja Scraper

This is a very basic example of a web scraper. It targets a very specific domain, gets the HTML using Axios, parses it using Cheerio, and then can notify the user of the result of the scrape using Nodemailer.

## Local Usage

To run this project locally, you will need to have node installed.

- on OSX, install [home brew](http://brew.sh/) and type `brew install node`
- on Windows, use the installer available at [nodejs.org](nodejs.org)
- on OSX, install git and type `brew install git`
- Open the terminal
- Go to a folder where you would like to install the project. Then type the following to download the repo:

`git clone https://github.com/nickharriscodes/scraper-example`

Then run

`npm install`

Then, either set your environment variables in a .bashrc or .bash_profile, or simply hardcode your email authentication information into scraper.js.

Then - 

`npm run start`


