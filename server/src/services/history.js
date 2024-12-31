const { HistoryModel } = require("../models/History");
const { UserModel } = require("../models/User");

class HistoryService {
  create = async ({ userID, mangaID }) => {
    const foundUser = await UserModel.findById(userID);
    if (!foundUser) throw new Error("User not found!");

    const foundHistory = await HistoryModel.findOne({
      history_user_id: userID,
      history_manga_id: mangaID,
    });

    if (foundHistory) {
      await HistoryModel.deleteOne({
        history_user_id: userID,
        history_manga_id: mangaID,
      });
    }

    const result = await HistoryModel.create({
      history_user_id: userID,
      history_manga_id: mangaID,
    });

    return { result };
  };

  find = async (userID, mangaID) => {
    const foundHistories = await HistoryModel.findOne({
      history_user_id: userID,
      history_manga_id: mangaID,
    });
    if (!foundHistories) throw new Error("Cannot find your history!");
    return foundHistories;
  };

  findAll = async (userID) => {
    const foundHistorys = await HistoryModel.find({
      history_user_id: userID,
    }).sort({ answer_name: 1, createdAt: -1 });
    return foundHistorys;
  };

  delete = async (userID, mangaID) => {
    const foundHistory = await HistoryModel.findOne({
      history_user_id: userID,
      history_manga_id: mangaID,
    });
    if (!foundHistory) throw new Error("Cannot find history!");

    const result = await HistoryModel.deleteOne({
      history_user_id: userID,
      history_manga_id: mangaID,
    });
    return result;
  };

  deleteAll = async (userID) => {
    const result = await HistoryModel.deleteMany({
      history_user_id: userID,
    });
    return result;
  };
}

module.exports = new HistoryService();
