//app/controllers/busControllers.js

import moment from 'moment';

import dbQuery from '../db/dev/dbQuery.js';
import {
  empty
} from '../helpers/validations.js';
import {
  errorMessage, successMessage, status,
} from '../helpers/status.js';


/**
   * Add A Bus
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
const addBusDetails = async (req, res) => {
  const {
    number_plate, manufacturer, model, year, capacity,
  } = req.body;

  const created_on = moment(new Date());

  if (empty(number_plate) || empty(manufacturer) || empty(model) || empty(year)
  || empty(capacity)) {
    errorMessage.error = 'All fields are required';
    return res.status(status.bad).send(errorMessage);
  }
  // {	"number_plate":"123gp", "manufacturer":"volvo", "model":"v16", "year":"2006", "capacity": 30}
  const createBusQuery = `INSERT INTO
          bus(number_plate, manufacturer, model, year, capacity, created_on)
          VALUES($1, $2, $3, $4, $5, $6)
          returning *`;
  const values = [
    number_plate,
    manufacturer,
    model,
    year,
    capacity,
    created_on,
  ];
    
  try {
    const { rows } = await dbQuery.query(createBusQuery, values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.error = 'Unable to add bus';
    return res.status(status.error).send(errorMessage);
  }
};

/**
   * Get All Buses
   * @param {object} req 
   * @param {object} res 
   * @returns {object} buses array
   */
const getAllBuses = async (req, res) => {
  const getAllBusQuery = 'SELECT * FROM bus ORDER BY id DESC';
  try {
    const { rows } = await dbQuery.query(getAllBusQuery);
    const dbResponse = rows;
    if (dbResponse[0] === undefined) {
      errorMessage.error = 'There are no buses';
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.success).send(successMessage);
  } catch (error) {
    errorMessage.error = 'An error Occured';
    return res.status(status.error).send(errorMessage);
  }
};


export {
  addBusDetails,
  getAllBuses,
};