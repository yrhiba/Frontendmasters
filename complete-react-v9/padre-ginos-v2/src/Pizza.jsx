const Pizza = (props) => {
	return (
		<div className="pizza-item">
			<h2>{props.name}</h2>
			<p>{props.description}</p>
		</div>
	)
};

export default Pizza;