const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/**
 * List handler for reservation resources
 */

async function list(req, res) {
  const { reservation_date } = req.query
  const data = await service.list(reservation_date)
  res.json({ data });
}



async function create(req, res, next){
  const data = await service.create(req.body.data)
  res.status(201).json({ data })
}


module.exports = {
  create: asyncErrorBoundary(create),
  list: asyncErrorBoundary(list)}
  //revisit later
  //update: [asyncErrorBoundary(reviewExists), hasValidProperties, update],
  //delete: [asyncErrorBoundary(reviewExists), destroy],
