const { s3, PutObjectCommand, GetObjectCommand } = require("../configs/s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const crypto = require("crypto");
const randomImageName = () => crypto.randomBytes(16).toString("hex");

// S3 Client
const uploadImageFromLocalS3 = async ({ file }) => {
  try {
    const imageName = randomImageName();
    // config upload image
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: imageName,
      Body: file.buffer,
      ContentType: "image/jpeg",
    });

    // upload image
    const result = await s3.send(command);
    console.log("S3 upload result:::", result);

    // config public url
    const signedUrl = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: imageName,
    });

    const url = await getSignedUrl(s3, signedUrl, { expiresIn: 36000 });

    // Cloudfront
    return {
      url,
      result,
    };
  } catch (error) {
    console.error(error + "when uploading image S3");
  }
};

module.exports = {
  uploadImageFromLocalS3,
};
