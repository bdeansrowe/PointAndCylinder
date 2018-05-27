import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import NumericInput from 'react-numeric-input';

var mag = require('vectors/mag')(3);
var sub = require('vectors/sub')(3, {scalers: false});
var copy = require('vectors/copy')(3);
var mult = require('vectors/mult')(3, { vectors: false });
var add = require('vectors/add')(3);
var normalize = require('vectors/normalize')(3)
var dot = require('vectors/dot')(3)


import Vector3 from './components/vector3';


class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			a: [-5.0, 0.0, 0.0],
			b: [5.0, 0.0, 0.0],
			r: 2.0,
			p: [3.0, 3.0, 0.0],
			l: 0.0,
			c: [0.0, 0.0, 0.0],
			u: [0.0, 0.0, 0.0],
			x: 19.0,
			h: [20.0, 21.0, 22.0],
			n2: 23.0,
			y2: 24.0,
			d: 25.0,
			solution_case: ''
		};

		this.onVectorComponentChange = this.onVectorComponentChange.bind(this);
	}

	componentDidMount() {
		this.compute();
	}

	compute() {
		this.length();
		this.center();
		this.unitAxisVector();
		// all other computes are dependent on these and called
		// in the cb to setState of the state value they are dependent on		
		this.forceUpdate();
	}

	length() {
		let l = copy(this.state.a);
		sub(l, this.state.b);

		this.setState({l: mag(l)}, () => {this.distanceToCylinder()});
	}

	center() {
		let c = copy(this.state.a);
		let ab = copy(this.state.b);
		sub(ab, c);
		mult(ab, 0.5);
		add(c, ab);

		this.setState({c: c}, () => {this.ex(); this.enSquared()});
	}

	unitAxisVector() {
		let u = copy(this.state.b);
		let a = copy(this.state.a);

		sub(u, a);
		normalize(u);

		this.setState({u: u}, () => this.ex());
}

	ex() {
		let c = copy(this.state.c);
		let p = copy(this.state.p);
		let u = copy(this.state.u);

		sub(p, c);

		let x = dot(p, u);

		this.setState({x: x}, () => {this.aitch(); this.ySquared()});
	}

	aitch() {
		let h = copy(this.state.c);
		let u = copy(this.state.u);
		let x = this.state.x;

		add(h, mult(u, x));

		this.setState({h: h});
	}

	enSquared() {
		let p = copy(this.state.p);
		let c = copy(this.state.c);

		sub(p, c);

		let n2 = mag(p)**2;

		this.setState({n2: n2}, () => this.ySquared());
	}

	ySquared() {
		let n2 = this.state.n2;
		let x2 = this.state.x**2;

		let y2 = n2 - x2;

		this.setState({y2: y2}, () => {this.distanceToCylinder()});
	}

	distanceToCylinder() {
		let absX = Math.abs(this.state.x);
		let l = this.state.l;
		let half_l = l / 2.0;
		let y2 = this.state.y2;
		let y = y2**0.5;
		let r = this.state.r;
		let r2 = r**2;

		let d = 0.0;
		let solution_case = '';

		if (absX <= half_l) {
			if (y2 >= r2) {
				d = y - r;
				solution_case = 'Ia: P is exterior to the cylinder and within the bounds of the axis';
			} else {
				d = Math.min(Math.abs(y - r), Math.abs(half_l - absX));
				solution_case = 'Ib: P is interior to the cylinder and either closer to an end-cap or the cylinder wall';
			}
		} else {
			if (y2 >= r2) {
				d = (((y-r)**2) + (absX - half_l)**2)**0.5;
				solution_case = "IIa: P is beyond the bounds of the cylinder's axis and radius";
			} else {
				d = absX - half_l;
				solution_case = "IIb: P is beyond the bounds of the cylinder's axis but within the bounds of it's radius";
			}
		}

		this.setState({d: d, solution_case: solution_case});
	}

	onVectorComponentChange(valueAsNumber, vector_name, component_index) {
		let v3 = this.state[vector_name];

		v3[component_index] = valueAsNumber;
		let new_state = {};
		new_state[vector_name] = v3;
		this.setState(new_state);
		this.compute();
	}

	render() {
		return (
			<div>
				<h1> Inputs </h1>
				<div>
					<p> Cylinder defined by axis points and radius </p>
					A &nbsp;[<Vector3
						v3={this.state.a}
						vector_name='a'
						onChange={this.onVectorComponentChange} />]
					&nbsp;
					B &nbsp;[<Vector3
						v3={this.state.b}
						vector_name='b'
						onChange={this.onVectorComponentChange} />]
					&nbsp;
					Radius &nbsp;
						<NumericInput
							step={0.1}
							precision={3}
							min={0}
							size={5}
							value={this.state.r}
							onChange={valueAsNumber => {
								this.setState({r: valueAsNumber}, this.compute());
							}} />
				</div>
				<div>
					<br/>
					<p> Point to find distance to cylinder </p>
					P &nbsp;[<Vector3
						v3={this.state.p}
						vector_name='p'
						onChange={this.onVectorComponentChange} />]
				</div>
				<div><hr/></div>
				<div>
					<h1> Computed Intermediates </h1>
					<p> l: Cylinder Length &nbsp;
						<NumericInput
							precision={3}
							size={6}
							readOnly
							value={this.state.l} />
					</p>
					<p> C: Axis Center &nbsp;[<Vector3 v3={this.state.c} readOnly />] </p>
					<p> u: Unit Axis Vector &nbsp;[<Vector3 v3={this.state.u} readOnly />] </p>
					<p> x: Scaler projection of vector PC on the axis &nbsp;
						<NumericInput
							precision={3}
							size={6}
							readOnly
							value={this.state.x} />
					</p>
					<p> h: Coordinate of P orthogonally projected onto the axis &nbsp;
						[<Vector3 v3={this.state.h} readOnly />]
					</p>
					<p> n2: Squared distance from P to C &nbsp;
						<NumericInput
							precision={3}
							size={6}
							readOnly
							value={this.state.n2} />
					</p>
					<p> y2: Squared distance from P to the axis &nbsp;
						<NumericInput
							precision={3}
							size={6}
							readOnly
							value={this.state.y2} />
					</p>
				</div>
				<div><hr/></div>
				<div>
					<h1> Distance from P to Cylinder </h1>
					<p> d: &nbsp;
						<NumericInput
							precision={3}
							size={6}
							readOnly
							value={this.state.d} /> &nbsp;
						Solution case {this.state.solution_case}
					</p>
				</div>
			</div>
		);
	}
}

// Take this component's generated HTML and put it'
// on the page (in the DOM)

ReactDOM.render(<App />, document.querySelector('.container'));
