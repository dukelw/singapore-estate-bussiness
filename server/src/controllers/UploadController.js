const UploadService = require("../services/upload");
const { SuccessResponse } = require("../core/success-response");
class UploadController {
  async uploadImageS3(req, res, next) {
    const { file } = req;
    console.log("File S3::::", file);
    if (!file) throw new BadRequestError("File missing");
    new SuccessResponse({
      message: "Upload thumbnail image s3 success",
      metadata: await UploadService.uploadImageFromLocalS3({
        file,
      }),
    }).send(res);
  }
}

module.exports = new UploadController();
