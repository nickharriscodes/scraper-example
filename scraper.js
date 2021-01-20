const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');

const url = 'https://www.ninjakitchen.com/parts/0/all/1336/precision-processor-bowl-with-lid/?modelNumber=AMZ012BL';

const transporter = nodemailer.createTransport({
  service: 'example',
  auth: {
    user: process.env.SCRAPE_EMAIL,
    pass: process.env.SCRAPE_PASS
  }
});

const email = (options) => {
  transporter.sendMail(options, function(error, info){
    if (error) {
      console.log(error, 'error mail error');
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const sendNotAvailable = () => {
  const notAvailOptions = {
    from: process.env.SCRAPE_EMAIL,
    to: process.env.SCRAPE_EMAIL_TO,
    subject: 'Ninja part not available',
    text: `It is not available now. Go here to confirm ${url}`
  };
  email(notAvailOptions);
}

const sendError = (err) => {
  const errorMailOptions = {
    from: process.env.SCRAPE_EMAIL,
    to: process.env.SCRAPE_EMAIL_TO,
    subject: 'Scraper App Error',
    text: `Something went wrong. Login to Heroku for more details. Here is error: ${err}`
  };
  email(errorMailOptions);
}

const sendAvailable = () => {
  const availOptions = {
    from: process.env.SCRAPE_EMAIL,
    to: process.env.SCRAPE_EMAIL_TO,
    subject: 'Ninja part availability',
    text: `It may be available now! Go here ${url}`
  }
  email(availOptions);
}

axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const availability = $('#prodDetailHolder p span strong');
    let availStatus = availability[0].attribs['ng-markup'];
    if (availStatus === 'Currently sold out') {
      sendNotAvailable();
    } else {
      sendAvailable();
    }
  })
  .catch(error => {
    console.log(error);
    sendError(error);
  });
  