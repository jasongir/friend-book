import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	Friend,
	getFriends,
	postFriend,
	updateFriend,
	deleteFriend,
} from "../utils/utils";
import HtmlInput from "../components/HtmlInput";
import FriendRow from "../components/FriendRow";

// import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
	const [mode, setMode] = useState<"CREATE" | "UPDATE">("CREATE");
	const [formState, setFormState] = useState<Friend>({
		name: "",
		major: "",
		year: 1,
		id: -1,
	});

	const clearFormState = () => {
		setFormState({ id: -1, major: "", name: "", year: 1 });
		setMode("CREATE");
	};

	const queryClient = useQueryClient();
	const { data, isLoading, isError } = useQuery(["friends"], getFriends);
	const postMutation = useMutation(postFriend, {
		onSettled: () => queryClient.invalidateQueries(["friends"]),
	});
	const updateMutation = useMutation(updateFriend, {
		onSettled: () => queryClient.invalidateQueries(["friends"]),
	});
	const deleteMutation = useMutation(deleteFriend, {
		onSettled: () => queryClient.invalidateQueries(["friends"]),
	});

	const onDelete = (friend: Friend) => {
		deleteMutation.mutate({ id: friend.id });
	};

	const onUpdate = (friend: Friend) => {
		setMode("UPDATE");
		setFormState({ ...friend });
	};

	const onSubmitHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const { id, major, name, year } = formState;
		if (mode === "CREATE") {
			postMutation.mutate({ id, major, name, year });
		} else {
			updateMutation.mutate({ id, major, name, year });
		}
		clearFormState();
	};

	return (
		<>
			<Head>
				<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
				<meta
					name="description"
					content="Friend book home page. Keep track of your friends, their majors, and their years"
				/>
			</Head>
			<header>
				<h1>Friend Book!!</h1>
				<form onSubmit={onSubmitHandler}>
					<HtmlInput
						name="name"
						label="Name:"
						type="text"
						value={formState.name}
						onChange={(e: React.FormEvent) =>
							setFormState({
								...formState,
								name: (e.target as HTMLInputElement).value,
							})
						}
					/>
					<HtmlInput
						name="major"
						label="Major:"
						type="text"
						value={formState.major}
						onChange={(e: React.FormEvent) =>
							setFormState({
								...formState,
								major: (e.target as HTMLInputElement).value,
							})
						}
					/>
					<HtmlInput
						name="year"
						label="Year:"
						type="number"
						min={1}
						max={5}
						value={formState.year}
						onChange={(e: React.FormEvent) =>
							setFormState({
								...formState,
								year: Number((e.target as HTMLInputElement).value),
							})
						}
					/>
					<button>{mode}</button>
					{mode === "UPDATE" && (
						<button onClick={() => setMode("CREATE")}>CANCEL</button>
					)}
				</form>
			</header>
			<main>
				<div className="main-container">
					<div>Name</div>
					<div>Major</div>
					<div>Year</div>
					<div></div>
					<div></div>
					{(data as Friend[])?.map(({ name, year, major, id }) => (
						<FriendRow
							key={id}
							name={name}
							year={year}
							major={major}
							id={id}
							onDelete={onDelete}
							onUpdate={onUpdate}
						/>
					))}
				</div>
				{isLoading && <p>Loading data...</p>}
				{isError && <p>Encountered an error loading data</p>}
			</main>
		</>
	);
};

export default Home;
