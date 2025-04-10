// require('dotenv').config();
// const AWS = require('aws-sdk');
// const s3 = new AWS.S3({
//     accessKeyId: process.env.AWS_S3_KEY,
//     secretAccessKey: process.env.AWS_S3_SECRET,
//     region: process.env.AWS_REGION
// });
// exports.uploadJSON = async(data,projectId,res)=>{
//           let json = `${projectId}.json`;

//           const params = {
//               Bucket: process.env.AWS_S3BUCKET,
//               Key: json,
//               Body: data,
//               ACL: "public-read",
//           };

//           let s3Object = await s3.upload(params).promise();
//         return ({ s3Object });
// }
