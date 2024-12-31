const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Favourite";
const COLLECTION_NAME = "Favourites";

var favouriteSchema = new Schema(
  {
    favourite_user_id: {
      type: String,
      required: true,
    },
    favourite_manga_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = {
  FavouriteModel: model(DOCUMENT_NAME, favouriteSchema),
};
