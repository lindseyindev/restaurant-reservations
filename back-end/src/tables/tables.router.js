const router = require("express").Router();
const controller = require("./tables.controller");
const reservationController = require("../reservations/reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// router
//   .route("/")
//   //.post(controller.create)
//   .get(controller.list)
//   .all(methodNotAllowed);
// //use patch not put
//   router
//   .route("/:table_id/seat")
//   .put(controller.update)
//   //.delete(controller.delete)
//   .all(methodNotAllowed);

////////

router
  .route("/")
  .post(controller.create)
  .get(controller.list)
  .all(methodNotAllowed);

//router.route("/:table_id").get(controller.read).all();

router
  .route("/:table_id/seat")
  .put(reservationController.reservationExists, controller.update)
  .delete(controller.destroy)
  .all(methodNotAllowed);

module.exports = router;
