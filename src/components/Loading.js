import React from 'react';

class Loading extends React.Component {
  state = {
    height: null,
    width: null
  };

  componentDidMount() {
    if (window.innerWidth <= 1024) {
      this.setState({
        height: 150,
        width: 150
      });
    } else {
      this.setState({
        height: 250,
        width: 250
      });
    }

    this.setState({
      intervalId: setInterval(this.timer, 20)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  timer = () => {
    const runTimer = () => {
      this.setState({
        height: this.state.height + 1,
        width: this.state.width + 1
      });
    };

    if (window.innerWidth <= 1024) {
      if (this.state.width <= 200) {
        runTimer();
      }
    } else if (this.state.width <= 300) {
      runTimer();
    }
  };

  render() {
    return (
      <div className="loading-screen">
        <img
          style={{ width: this.state.width, height: this.state.height }}
          src="runebear-logo.png"
          alt="Runebear Logo"
        />
        <h2>Loading...</h2>
      </div>
    );
  }
}

export default Loading;
