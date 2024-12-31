const siteRouter = require("./site");
const userRouter = require("./user");
const historyRouter = require("./history");
const uploadRouter = require("./upload");
const commentRouter = require("./comment");
const notificationRouter = require("./notification");
const estateRouter = require("./estate");

function route(app) {
  app.use("/api/v1/user/", userRouter);
  app.use("/api/v1/estate", estateRouter);
  app.use("/api/v1/history/", historyRouter);
  app.use("/api/v1/comment/", commentRouter);
  app.use("/api/v1/upload/", uploadRouter);
  app.use("/api/v1/notification/", notificationRouter);
  app.use("/api/v1/", siteRouter);
}

module.exports = route;
