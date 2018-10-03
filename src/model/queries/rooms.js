const db_connection = require('./../database/db_connection');

const addRoom = (object, callback) => {
  const {
    room_num, description, price, imgs, services, type,
  } = object;
  const sql = {
    text: 'INSERT INTO rooms (room_num,description,price,imgs,services,type) VALUES ($1,$2,$3,$4,$5,$6) RETURNING * ;',
    values: [room_num, description, price, imgs, services, type],
  };

  db_connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

const deleteRoom = (id, callback) => {
  const sql = {
    text: 'DELETE FROM rooms WHERE id =$1 RETURNING *;',
    values: [id],
  };

  db_connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};
const getRoom = (id, callback) => {
  const sql = {
    text: 'select * from rooms where id=$1',
    values: [id],
  };
  db_connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

const updateRoom = (object, callback) => {
  const {
    room_num: roomNum, description, price, imgs, services, type,
  } = object;
  const sql = {
    text: ' UPDATE rooms SET description = $2 , price = $3 , imgs = $4 ,services = $5, type = $6  WHERE room_num = $1;',
    values: [roomNum, description, price, imgs, services, type],
  };
  db_connection.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result.rowCount);
    }
  });
};

module.exports = {
  addRoom, deleteRoom, getRoom, updateRoom,
};
