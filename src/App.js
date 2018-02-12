import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Timer from './Timer.js';
// import plus from 'react-icons/lib/io/ios-add';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			breakCounter: 0,
			sessionCounter: 0
		};
	}

	incrementBreak = () => {
		this.setState({
			breakCounter: ++this.state.breakCounter
		});
	};

	decrementBreak = () => {
		this.setState({
			breakCounter: --this.state.breakCounter
		});
	};

	incrementSession = () => {
		this.setState({
			sessionCounter: ++this.state.sessionCounter
		});
	};

	decrementSession = () => {
		this.setState({
			sessionCounter: --this.state.sessionCounter
		});
	};

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Pomodoro Timer</h1>
				</header>
				<div className="ops">
					<button onClick={this.decrementBreak}>-</button>
					<span>{this.state.breakCounter}</span>
					<button onClick={this.incrementBreak}>+</button>

					<button onClick={this.decrementSession}>-</button>
					<span>{this.state.sessionCounter}</span>
					<button onClick={this.incrementSession}>+</button>
				</div>
				<Timer
					session={this.state.sessionCounter}
					break={this.state.breakCounter}
				/>
			</div>
		);
	}
}

export default App;
