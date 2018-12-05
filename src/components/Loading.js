import React from 'react';
import { dark, white } from '../util/color';

class Loading extends React.Component {
  state = {
    background: null,
    groups: [
      {
        alt: 'Runebear Logo',
        backgroundColor: dark,
        color: white,
        image: '/runebear-logo.png'
      },
      {
        alt: 'Runebear Word',
        backgroundColor: white,
        color: dark,
        image: '/runebear-word.png'
      }
    ],
    backgroundInterval: null,
    color: null,
    height: null,
    image: null,
    text: 'Loading.',
    textInterval: null,
    width: null
  };

  componentDidMount() {
    const i = Math.round(Math.random());

    this.setState({
      background: this.state.groups[i].backgroundColor,
      color: this.state.groups[i].color,
      image: this.state.groups[i].image
    });

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
      backgroundInterval: setInterval(this.backgroundTimer, 20),
      textInterval: setInterval(this.textTimer, 500)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.backgroundInterval);
    clearInterval(this.state.textInterval);
  }

  backgroundTimer = () => {
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

  textTimer = () => {
    this.setState({
      text:
        this.state.text !== 'Loading...' ? this.state.text + '.' : 'Loading...'
    });
  };

  render() {
    return (
      <div
        className="loading-screen"
        style={{ background: this.state.background }}
      >
        <img
          style={{ width: this.state.width, height: this.state.height }}
          src={this.state.image}
          alt="Runebear Logo"
        />
        <h2 style={{ color: this.state.color }}>{this.state.text}</h2>
      </div>
    );
  }
}

export default Loading;
