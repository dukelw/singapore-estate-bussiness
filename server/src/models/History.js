const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "History";
const COLLECTION_NAME = "Histories";

var historySchema = new Schema(
  {
    history_user_id: {
      type: String,
      required: true,
    },
    history_manga_id: {
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
  HistoryModel: model(DOCUMENT_NAME, historySchema),
};
