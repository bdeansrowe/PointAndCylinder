import React, {Component} from 'react';
import VectorComponent from './vector_component';

const Vector3 = (props) => {
	// let onChange = props.onChange;

	const vectorComponents = props.v3.map((component, index, v3) => {
		return (
				<VectorComponent
					vector_name={props.vector_name}
					component_index={index}
					readOnly={props.readOnly}
					component_value={component}
					onChange={props.onChange} />
		);
	});

	// console.log(this.state.v3);

	return(
		<span> {vectorComponents} </span>
	);
};

// class Vector3 extends Component { //= (vector3) => {
// 	constructor(props) {
// 		super(props);

// 		this.updateParent = props.updateParent;

// 		this.state = {
// 			v3: props.v3
// 		};
// 	}

// 	render() {
// 		const vectorComponents = this.state.v3.map((component, index, v3) => {
// 			return (
// 					<VectorComponent
// 						component_value={component}
// 						onChange={event => {
// 							v3[index] = Number(event.target.value);
// 							this.setState({v3: v3});
// 							if (this.updateParent) this.updateParent(v3);
// 						}} />
// 			);
// 		});

// 		// console.log(this.state.v3);

// 		return (vectorComponents);
// 	}
// };

export default Vector3;