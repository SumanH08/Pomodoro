import React, { Component } from 'react';

class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentSession: 0,
			currentBreak: 0,
			startTime: 0,
			currentActive: 'session',
			isTimerRunning: false
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			currentSession: nextProps.session * 10,
			currentBreak: nextProps.break * 10
		});
	}

	startSession = () => {
		// var startTime = this.props.value * 60;
		this.setState({ isTimerRunning: true });
		console.log('Inside start session');
		this.setState({
			startTime: this.state.currentSession,
			currentActive: 'session'
		});
		this.timer = setInterval(this.timerFunc, 1000);
	};

	startBreak = () => {
		console.log('Inside start break');
		this.setState({
			startTime: this.state.currentBreak,
			currentActive: 'break'
		});
		this.timer = setInterval(this.timerFunc, 1000);
	};

	timerFunc = () => {
		this.setState({ startTime: this.state.startTime - 1 });
		console.log(this.state.startTime);

		if (this.state.startTime === 0 && this.state.currentActive === 'break') {
			console.log('this is break time');
			clearInterval(this.timer);
			this.startSession();
		} else if (
			this.state.startTime === 0 &&
			this.state.currentActive === 'session'
		) {
			console.log('this is session time');
			clearInterval(this.timer);
			this.startBreak();
		}

		// console.log('Inside methods');
		// var currMin = parseInt(this.state.startTime / 60);
		// var currSec = this.checkSecond(this.state.startTime % 60);
		// var currTime = currMin + ':' + currSec;
		// this.state.timeNow = currTime;
		// if (currTime === '00:00' || currTime === '0:00') {
		// 	clearInterval(this.state.myVar);
		// 	console.log('Inside curr time becoming 0');
		//
		// 	if (this.state.prev == 'session') {
		// 		this.state.prev = 'break';
		// 		this.startBreak();
		// 	} else {
		// 		this.state.prev = 'session';
		// 		this.startSession();
		// 	}
		// }
	};

	checkSecond = sec => {
		if (sec < 10 && sec >= 0) {
			sec = '0' + sec;
		} // add zero in front of numbers < 10
		if (sec < 0) {
			sec = '59';
		}
		return sec;
	};

	pause = () => {
		console.log('Inside pause func');
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = false;
		} else {
			console.log('Inside pause else');
			this.timer = setInterval(this.timerFunc, 1000);
		}
	};

	renderTitle = currentActive => {
		if (currentActive === 'session') {
			return 'Session';
		} else {
			return 'Break';
		}
	};

	renderTime = timeNow => {
		var currMin = parseInt(timeNow / 60);
		var currSec = timeNow % 60;
		if (currSec < 10) {
			currSec = '0' + currSec;
		}
		var currTime = currMin + ':' + currSec;
		return currTime;
	};

	render() {
		let buttona = null;
		let setTitle = null;

		if (this.state.isTimerRunning === true) {
			buttona = (
				<button onClick={this.pause}>
					<p>{this.renderTitle(this.state.currentActive)}</p>
					{this.renderTime(this.state.startTime)}
				</button>
			);
		} else {
			buttona = (
				<button onClick={this.startSession}>
					<p>Session</p>
					{this.renderTime(this.state.currentSession)}
				</button>
			);
		}

		var length = this.state.startTime / this.state.currentSession * 100;
		return (
			<div
				style={{
					backgroundColor: 'grey',
					border: '1px solid white',
					borderRadius: 6,
					height: 30
				}}
				className="timer">
				{buttona}
				<svg height="210" width="500">
					<line
						x1="0"
						y1="0"
						x2={length}
						y2="0"
						style={{ stroke: 'red', strokeWidth: 2 }}
					/>
				</svg>{' '}
			</div>
			/*	<div>
				<button>{this.state.currentBreak}</button>
			</div> */
		);
	}
}

export default Timer;
