import axios from "axios";

export interface Friend {
	id: number;
	name: string;
	major: string;
	year: number;
}

export interface PostResponse {
	success: boolean;
}

export async function getFriends(): Promise<Friend[]> {
	const { data } = await axios.get("/api/friend");
	return data as Friend[];
}

export async function postFriend({
	name,
	major,
	year,
}: Friend): Promise<PostResponse> {
	const { data } = await axios.post("/api/friend", {
		name,
		major,
		year,
	});
	return data as PostResponse;
}

export async function updateFriend({
	id,
	name,
	major,
	year,
}: Friend): Promise<PostResponse> {
	const { data } = await axios.put(`/api/friend/${id}`, {
		id,
		name,
		major,
		year,
	});
	return data as PostResponse;
}

export async function deleteFriend({
	id,
}: {
	id: number;
}): Promise<PostResponse> {
	const req = await axios.delete(`/api/friend/${id}`);
	return req.data as PostResponse;
}
