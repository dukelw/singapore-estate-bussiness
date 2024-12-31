const EstateService = require("../services/estate");
const { SuccessResponse } = require("../core/success-response");

class EstateController {
  async create(req, res, next) {
    new SuccessResponse({
      message: "Create estate successfully",
      metadata: await EstateService.create(req.body),
    }).send(res);
  }

  async find(req, res, next) {
    new SuccessResponse({
      message: "Find estate successfully",
      metadata: await EstateService.find(req.query.estateID),
    }).send(res);
  }

  async findAll(req, res, next) {
    new SuccessResponse({
      message: "Get all estate successfully",
      metadata: await EstateService.findAll(req.query.page, req.query.limit),
    }).send(res);
  }

  async delete(req, res, next) {
    const { userID, estateID } = req.body;
    new SuccessResponse({
      message: "Delete estate successfully",
      metadata: await EstateService.delete(userID, estateID),
    }).send(res);
  }

  async update(req, res, next) {
    new SuccessResponse({
      message: "Update estate successfully",
      metadata: await EstateService.update(req.params.estateID, req.body),
    }).send(res);
  }

  async updateAll(req, res, next) {
    new SuccessResponse({
      message: "Update all estate successfully",
      metadata: await EstateService.updateAll(req.body),
    }).send(res);
  }
}

module.exports = new EstateController();
