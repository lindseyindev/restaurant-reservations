const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// async function list(req, res, next) {
//     let data = await service.list();
//     res.json({ data });
//   }

//  async function update(req, res, next){
//         const updatedTable = {
//           reservationId: req.body.data.reservation_id,
//           tableId: req.params.table_id,
//         };
//         let data = await service.update(updatedTable)
//         res.json({ data });
//  }

/**
 * V a l i d a t i o n
 */

//if reservation.status === booked

//if table.capacity < reservation.people

// module.exports = {
//   list: asyncErrorBoundary(list),
//   update: update,
// };

//////

function hasValidFields(req, res, next) {
  const { data = {} } = req.body;
  const validFields = new Set(["table_name", "capacity"]);

  const invalidFields = Object.keys(data).filter(
    (field) => !validFields.has(field)
  );

  if (invalidFields.length)
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  next();
}

function hasTableId(req, res, next) {
  const table = req.params.table_id;
  
  if (table) {
    res.locals.reservation = table;
    next();
  } else {
    next({
      status: 400,
      message: `missing table_id`,
    });
  }
}

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({ status: 400, message: `Must include a ${propertyName}` });
  };
}

const has_table_name = bodyDataHas("table_name");
const has_capacity = bodyDataHas("capacity");

function isValidTableName(req, res, next) {
  const { data = {} } = req.body;
  if (data["table_name"].length < 2) {
    return next({ status: 400, message: `table_name length is too short.` });
  }
  next();
}

function isValidNumber(req, res, next) {
  const { data = {} } = req.body;
  if ("capacity" in data) {
    if (data["capacity"] === 0 || !Number.isInteger(data["capacity"])) {
      return next({ status: 400, message: `capacity must be a number.` });
    }
  }
  next();
}

async function list(req, res) {
  const data = await service.list(req.query.date);
  res.json({
    data,
  });
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({
    data: data,
  });
}

async function read(req, res) {
  const data = res.locals.reservation;
  res.status(200).json({
    data,
  });
}

function hasCapacity(req, res, next) {
  const tableCapacity = res.locals.table.capacity;
  const reservationPeople = res.locals.reservation.people;
  if (tableCapacity < reservationPeople) {
    next({
      status: 400,
      message: `Too many guests ( ${reservationPeople} ) for table size. Please choose table with capacity.`,
    });
  } else {
    next();
  }
}

async function seat(req, res) {
  const data = await service.seat(
    Number(res.locals.table.table_id),
    Number(res.locals.reservation.reservation_id)
  );
  res.json({
    data,
  });
}

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(Number(table_id));

  if (table) {
    res.locals.table = table;
    next();
  } else {
    next({ status: 404, message: `No such table: ${table_id}` });
  }
}

function isOccupied(req, res, next) {
  if (res.locals.table.reservation_id) {
    next();
  } else {
    next({
      status: 400,
      message: `Table is not occupied`,
    });
  }
}

async function destroy(req, res) {
  const data = await service.occupy(res.locals.table);
  res.json({
    data,
  });
}

function isAvailable(req, res, next) {
  if (res.locals.table.reservation_id) {
    next({
      status: 400,
      message: `Table id is occupied: ${res.locals.table.table_id}`,
    });
  } else {
    next();
  }
}

function isBooked(req, res, next) {
  console.log(res.locals.reservation)
  if (res.locals.reservation.status === "booked") {
    next();
  } else {
    // if it is seated:
    next({
      status: 400,
      message: `Reservation is ${res.locals.reservation.status}.`,
    });
  }
}
module.exports = {
  create: [
    has_table_name,
    has_capacity,
    isValidTableName,
    isValidNumber,
    asyncErrorBoundary(create),
  ],
  read: [hasTableId, asyncErrorBoundary(read)],
  list: [asyncErrorBoundary(list)],
  update: [tableExists, isAvailable, hasCapacity, isBooked, seat],
  destroy: [tableExists, isOccupied, destroy],
};
