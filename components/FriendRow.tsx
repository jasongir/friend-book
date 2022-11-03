import { Friend } from "../utils/utils";

interface FriendProps {
	onUpdate: (friend: Friend) => void;
	onDelete: (friend: Friend) => void;
	name: string;
	major: string;
	year: number;
	id: number;
}

const FriendRow: React.FC<FriendProps> = ({
	onDelete,
	onUpdate,
	name,
	major,
	year,
	id,
}) => {
	return (
		<>
			<div>{name}</div>
			<div>{major}</div>
			<div>{year}</div>
			<button onClick={() => onUpdate({ name, major, id, year })}>
				Update
			</button>
			<button onClick={(e) => onDelete({ name, major, id, year })}>
				Delete
			</button>
		</>
	);
};

export default FriendRow;
