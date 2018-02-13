import React, { Component } from 'react';

class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentSession: 25 * 60,
			currentBreak: 0,
			startTime: 0,
			currentActive: 'session',
			isTimerRunning: false
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			currentSession: nextProps.session * 60,
			currentBreak: nextProps.break * 60
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
		if (this.state.startTime === 0) {
		} else {
			this.setState({ startTime: this.state.startTime - 1 });
		}
		console.log(this.state.startTime);

		if (this.state.startTime === 0 && this.state.currentActive === 'break') {
			clearInterval(this.timer);
			this.startSession();
		} else if (
			this.state.startTime === 0 &&
			this.state.currentActive === 'session'
		) {
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
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = false;
		} else {
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
		var currMin = parseInt(timeNow / 60, 10);
		var currSec = timeNow % 60;
		if (currSec < 10) {
			currSec = '0' + currSec;
		}
		var currTime = currMin + ':' + currSec;
		console.log(currTime);
		return currTime;
	};

	render() {
		let buttona = null;

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

		// var length = this.state.startTime / this.state.currentSession * 100;
		return (
			<div className="timer">{buttona}</div>
			/*	<div>
				<button>{this.state.currentBreak}</button>
			</div> */
		);
	}
}

export default Timer;
