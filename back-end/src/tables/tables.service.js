const knex = require("../db/connection");

const tableName = "tables"

// list by date
function list() {
    return knex(tableName)
    .orderBy("table_name")
}

function create(table) {
  return knex(tableName)
    .insert(table, "*")
    .then((createdTables) => createdTables[0]);
}

// seat is update
function seat(table_id, reservation_id) {
    return knex.transaction(async (transaction) => {
        await knex("reservations")
          .where({ reservation_id })
          .update({ status: "seated" })
          .transacting(transaction);
    
        return knex("tables")
          .where({ table_id })
          .update({ reservation_id }, "*")
          .transacting(transaction)
          .then((records) => records[0]);
    });
}

// read 
function read(table_id) {
    return knex(tableName)
        .where("table_id", table_id)
        .first();
}

// checking if table is free or not
function occupy(table) {
    return knex.transaction(async (transaction) => {
      await knex("reservations")
        .where({ reservation_id: table.reservation_id })
        .update({ status: "finished" })
        .transacting(transaction);
  
      return knex(tableName)
        .where({ table_id: table.table_id })
        .update({ reservation_id: null }, "*")
        .transacting(transaction)
        .then((records) => records[0]);
    });
}

module.exports = {
  create,
  list,
  seat,
  read,
  occupy
};

//


// function list(){
//     return knex("tables")
//     .select("*")
//     .orderBy("table_name")
// }

// function update({tableId, reservationId}){
// return knex("tables")
//     .select("*")
//     .where({"table_id": tableId})
//     .update({"reservation_id": reservationId})
//     .returning("*")
//     .then((data) => data[0])
// }



// module.exports = {
//     list, update,

// }