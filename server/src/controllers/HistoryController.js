const HistoryService = require("../services/history");
const { SuccessResponse } = require("../core/success-response");

class HistoryController {
  async create(req, res, next) {
    const { userID, mangaID } = req.body;
    new SuccessResponse({
      message: "Save history successfully",
      metadata: await HistoryService.create({
        userID,
        mangaID,
      }),
    }).send(res);
  }

  async find(req, res, next) {
    const { userID, mangaID } = req.query;
    new SuccessResponse({
      message: "Get history successfully",
      metadata: await HistoryService.find(userID, mangaID),
    }).send(res);
  }

  async findAll(req, res, next) {
    const ID = req.params.id;
    new SuccessResponse({
      message: "Get all history successfully",
      metadata: await HistoryService.findAll(ID),
    }).send(res);
  }

  async delete(req, res, next) {
    const { userID, mangaID } = req.body;
    new SuccessResponse({
      message: "Delete history successfully",
      metadata: await HistoryService.delete(userID, mangaID),
    }).send(res);
  }

  async deleteAll(req, res, next) {
    const ID = req.params.id;
    new SuccessResponse({
      message: "Delete all history successfully",
      metadata: await HistoryService.deleteAll(ID),
    }).send(res);
  }
}

module.exports = new HistoryController();
