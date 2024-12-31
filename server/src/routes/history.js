const express = require("express");
const router = express.Router();
const historyController = require("../controllers/HistoryController");
const asyncHandler = require("../helpers/async-handler");

router.get("/find", asyncHandler(historyController.find));
router.get("/find-all/:id", asyncHandler(historyController.findAll));
router.delete("/", asyncHandler(historyController.delete));
router.delete("/:id", asyncHandler(historyController.deleteAll));
router.post("/", asyncHandler(historyController.create));

module.exports = router;
