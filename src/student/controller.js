const pool = require("../../db");
const queries = require("./queries");

const getUsers = (req, res) => {
	pool.query(queries.getUsers, (error, results) => {
		if (error) throw error;
		res.status(200).json(results.rows);
	});
};

const getUsersById = (req, res) => {
	const id = parseInt(req.params.id);
	pool.query(queries.getUsersById, [id], (error, results) => {
		if (error) throw error;
		res.status(200).json(results.rows);
	});
};

const addUsers = (req, res) => {
	const { name, email, age, dob } = req.body;
	//check if email exists
	pool.query(queries.checkEmailExists, [email], (error, results) => {
		if (results.rows.length) {
			res.send("Email already exists!");
		}
		pool.query(queries.addUsers, [name, email, age, dob], (error, results) => {
			if (error) throw error;
			res.status(201).send("User created successfully!");
		});
	});
};

const removeUser = (req, res) => {
	const id = parseInt(req.params.id);
	pool.query(queries.getUsersById, [id], (error, results) => {
		const userFound = results.rows.length;
		if (!userFound)
			res.send("Students does not exists in the database, could not remove!");

		pool.query(queries.removeUser, [id], (error, results) => {
			if (error) throw error;
			res.status(200).send("User removed successfully!");
		});
	});
};

const updateUser = (req, res) => {
	const id = parseInt(req.params.id);
	const { name } = req.body;
	pool.query(queries.getUsersById, [id], (error, results) => {
		const userFound = results.rows.length;
		if (!userFound)
			res.send("Students does not exists in the database, could not update!");

    pool.query(queries.updateUser, [name, id], (error, results) => {
      if (error) throw error;
      res.status(200).send("User updated successfully");
    });
	});
};

module.exports = { getUsers, getUsersById, addUsers, removeUser, updateUser };
