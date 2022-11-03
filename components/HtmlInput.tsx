import Head from "next/head";

interface HtmlInputProps {
	value: string | number;
	onChange: React.FormEventHandler;
	name: string;
	label: string;
	type: string;
	min?: number;
	max?: number;
}

const HtmlInput: React.FC<HtmlInputProps> = ({
	name,
	label,
	type,
	min,
	max,
	value,
	onChange,
}: HtmlInputProps) => (
	<>
		<Head>
			<meta
				name="description"
				content="Home page for hello world friendbook application"
			/>
		</Head>
		<div>
			<label htmlFor={name}>
				{label}
				{min && max ? (
					<input
						type={type}
						name={name}
						min={min}
						max={max}
						value={value}
						onChange={onChange}
					/>
				) : (
					<input
						type={type}
						name={name}
						value={value}
						onChange={onChange}
					/>
				)}
			</label>
		</div>
	</>
);

export default HtmlInput;
