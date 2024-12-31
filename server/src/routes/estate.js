const express = require("express");
const router = express.Router();
const estateController = require("../controllers/EstateController");
const asyncHandler = require("../helpers/async-handler");

router.get("/find", asyncHandler(estateController.find));
router.get("/get-all", asyncHandler(estateController.findAll));
router.put("/:estateID", asyncHandler(estateController.update));
router.put("/", asyncHandler(estateController.updateAll));
router.delete("/", asyncHandler(estateController.delete));
router.post("/", asyncHandler(estateController.create));

module.exports = router;
