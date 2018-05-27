import React from 'react';

import NumericInput from 'react-numeric-input';


const VectorComponent = (props) => {

	return (
		<NumericInput
			precision={3}
			step={0.1}
			size={6}
			readOnly={props.readOnly}
			value={props.component_value}
			onChange={valueAsNumber => props.onChange(valueAsNumber, props.vector_name, props.component_index)} />
	);
};

export default VectorComponent;