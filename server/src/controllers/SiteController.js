class SiteController {
  async welcome(req, res, next) {
    try {
      console.log("Welcome function!");
      res.status(200).send({
        message: "Hello, welcome to Lewis's manga website using Docker!",
      });
    } catch (err) {
      res.send(err);
    }
  }
}

module.exports = new SiteController();
