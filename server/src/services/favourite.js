const { FavouriteModel } = require("../models/Favourite");
const { UserModel } = require("../models/User");

class FavouriteService {
  create = async ({ userID, mangaID }) => {
    const foundUser = await UserModel.findById(userID);
    if (!foundUser) throw new Error("User not found!");

    const foundFavourite = await FavouriteModel.findOne({
      favourite_user_id: userID,
      favourite_manga_id: mangaID,
    });

    if (foundFavourite) {
      await FavouriteModel.deleteOne({
        favourite_user_id: userID,
        favourite_manga_id: mangaID,
      });
    }

    const result = await FavouriteModel.create({
      favourite_user_id: userID,
      favourite_manga_id: mangaID,
    });

    return { result };
  };

  find = async (userID, mangaID) => {
    const foundHistories = await FavouriteModel.findOne({
      favourite_user_id: userID,
      favourite_manga_id: mangaID,
    });
    if (!foundHistories) throw new Error("Cannot find your favourite!");
    return foundHistories;
  };

  findAll = async (userID) => {
    const foundFavourites = await FavouriteModel.find({
      favourite_user_id: userID,
    }).sort({ answer_name: 1, createdAt: -1 });
    return foundFavourites;
  };

  delete = async (userID, mangaID) => {
    const foundFavourite = await FavouriteModel.findOne({
      favourite_user_id: userID,
      favourite_manga_id: mangaID,
    });
    if (!foundFavourite) throw new Error("Cannot find favourite!");

    const result = await FavouriteModel.deleteOne({
      favourite_user_id: userID,
      favourite_manga_id: mangaID,
    });
    return result;
  };

  deleteAll = async (userID) => {
    const result = await FavouriteModel.deleteMany({
      favourite_user_id: userID,
    });
    return result;
  };
}

module.exports = new FavouriteService();
