/*
file name:sendEmail.js
description: used to send email via AWS SES
version :1.0.0
Author: Jasmeen-Maradeeya
*/

// change console.log to use the internal logger

const AWS = require('aws-sdk');
require('dotenv').config();

// eslint-disable-next-line no-unused-vars
exports.sendEmail = async (email, template, subject, token) => {
  AWS.config.update({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_REGION,
  });

  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: template,
        },
        Text: {
          Charset: 'UTF-8',
          Data: 'TEXT_FROMAT_BODY',
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
    Source: process.env.ADMIN_EMAIL_ID,
  };
  const sendPromise = new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise();

  sendPromise
    // eslint-disable-next-line no-unused-vars
    .then(function (data) {})
    .catch(function (err) {
      // eslint-disable-next-line no-console
      console.error(err.message);
    });
};
