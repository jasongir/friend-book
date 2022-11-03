import dotenv from "dotenv";
import mysql from "mysql";

dotenv.config();

const con = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: "jag-cs4750",
});

export const executeQuery = async (
	query: string,
	args: (string | number)[],
	failureMessage: string
) => {
	try {
		const result = await new Promise((resolve, reject) => {
			con.query(query, args, function (error, results, fields) {
				if (error) reject(error);
				if (results) resolve(results);
				if (fields) resolve(fields);
			});
		});
		return result;
	} catch (err) {
		console.error(
			(err as mysql.MysqlError).code && (err as mysql.MysqlError).message
				? `${failureMessage} ${(err as mysql.MysqlError).code}, ${
						(err as mysql.MysqlError).message
				  }`
				: err
		);
	}
	return {};
};
