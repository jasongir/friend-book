import { NextApiRequest, NextApiResponse } from "next/types";
import { executeQuery } from "../../../backend-utils/db";
import { z } from "zod";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { id } = req.query;
	const resId = z.number().int().safeParse(Number(id));
	if (!resId.success) return res.status(400).json({ success: false });

	if (req.method === "PUT") {
		console.log("PUT");
		const { name, id, major, year } = req.body;
		const Friend = z.object({
			name: z.string().max(100),
			major: z.string().max(100),
			year: z.number().int().gte(1).lte(5),
			id: z.number().int(),
		});

		const result = Friend.safeParse({ name, id, major, year });
		if (!result.success) {
			return res.status(400).json({ success: false });
		} else {
			const { name, major, year, id } = result.data;
			try {
				await executeQuery(
					`UPDATE Friend
               SET name = ?, major = ?, year = ?
               WHERE id = ?`,
					[name, major, year, id],
					"Failed to edit Friend"
				);
				return res.status(200).json({ success: true });
			} catch (error) {
				// return res.status(400).json({ success: false });
			}
		}
	} else if (req.method === "DELETE") {
		console.log("DELETE");
		try {
			await executeQuery(
				`DELETE FROM Friend
         WHERE id = ?`,
				[resId.data],
				"Failed to delete from Friend"
			);
			return res.status(200).json({ success: false });
		} catch (error) {
			// return res.status(400).json({ success: false });
		}
	}
	return res.status(400).json({ success: false });
}
