const { EstateModel } = require("../models/Estate");
const { UserModel } = require("../models/User");

class EstateService {
  create = async ({
    estate_name,
    estate_image,
    estate_year,
    estate_town,
    estate_type,
    estate_area_sqm,
    estate_distance,
    estate_rly,
    estate_price,
  }) => {
    const result = await EstateModel.create({
      estate_name,
      estate_image,
      estate_year,
      estate_town,
      estate_type,
      estate_area_sqm,
      estate_distance,
      estate_rly,
      estate_price,
    });

    return result;
  };

  find = async (estateID) => {
    const foundEstate = await EstateModel.findById(estateID);
    if (!foundEstate) throw new Error("Estate not found!");
    return foundEstate;
  };

  findAll = async (page = 1, limit = 15) => {
    const skip = (page - 1) * limit;
    const foundEstates = await EstateModel.find().skip(skip).limit(limit);
    const totalEstates = await EstateModel.countDocuments();
    return { estates: foundEstates, totalEstates };
  };

  delete = async (userID, estateID) => {
    const foundUser = await UserModel.findById(userID);
    if (!foundUser.isAdmin) throw new Error("Authorization error!");

    const foundEstate = await EstateModel.findById(estateID);
    if (!foundEstate) throw new Error("Cannot find estate!");

    const result = await EstateModel.deleteOne({ _id: estateID });
    return result;
  };

  update = async (estateID, updateData) => {
    const foundEstate = await EstateModel.findById(estateID);
    if (!foundEstate) throw new Error("Estate not found!");

    const updatedEstate = await EstateModel.findByIdAndUpdate(
      estateID,
      { $set: updateData },
      { new: true }
    );
    return updatedEstate;
  };

  updateAll = async (updateData) => {
    console.log("Update data", updateData);
    const updatedEstates = await EstateModel.updateMany(
      {},
      { $set: updateData }
    );
    return updatedEstates;
  };
}

module.exports = new EstateService();
