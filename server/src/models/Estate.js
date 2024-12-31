const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Estate";
const COLLECTION_NAME = "Estates";

var estateSchema = new Schema(
  {
    estate_name: {
      type: String,
      required: true,
    },
    estate_image: {
      type: String,
      default: "",
    },
    estate_year: {
      type: Number,
    },
    estate_town: {
      type: String,
      required: true,
    },
    estate_type: {
      type: String,
      required: true,
    },
    estate_area_sqm: {
      type: Number,
    },
    estate_distance: {
      type: String,
    },
    estate_rly: {
      type: Number,
    },
    estate_price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = {
  EstateModel: model(DOCUMENT_NAME, estateSchema),
};
