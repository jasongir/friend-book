import { NextApiRequest, NextApiResponse } from "next";
import { executeQuery } from "../../../backend-utils/db";
import { z } from "zod";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		console.log("GET");
		try {
			const data = await executeQuery(
				"SELECT * FROM Friend;",
				[],
				"Failed to fetch friends"
			);
			return res.status(200).send(data ?? []);
		} catch (error) {
			return res.status(400).json({ success: false });
		}
	} else if (req.method === "POST") {
		console.log("POST");
		const reqData = {
			name: req.body.name,
			major: req.body.major,
			year: req.body.year,
		};
		const Friend = z.object({
			name: z.string().max(100),
			major: z.string().max(100),
			year: z.number().int().gte(1).lte(5),
		});
		const result = Friend.safeParse(reqData);

		if (!result.success) {
			return res.status(400).json({ success: false });
		} else {
			try {
				const data = await executeQuery(
					`INSERT INTO 
            Friend(name, major, year) 
            VALUES (?, ?, ?)`,
					[result.data.name, result.data.major, result.data.year],
					"Failed to insert into Friend"
				);
				return res.status(201).json({ success: true });
			} catch (error) {
				console.log("ERROR");
				return res.status(400).json({ success: false });
			}
		}
	}
	return res.status(400).json({ success: false });
}
