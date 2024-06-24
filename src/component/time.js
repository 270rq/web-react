import React from 'react';

class CurrentDateTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: this.getCurrentTime(),
      currentDate: this.getCurrentDate()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      60000 // Обновление времени каждую минуту (60000 миллисекунд)
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      currentTime: this.getCurrentTime(),
      currentDate: this.getCurrentDate()
    });
  }

  getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  getCurrentDate = () => {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayOfWeek = days[now.getDay()];
    const month = months[now.getMonth()];
    const day = now.getDate();

    return `${dayOfWeek}, ${day} ${month.slice(0, 3)}`;
  }

  render() {
    return (
      <div>
        <div className="font time">{this.state.currentTime}</div>
        <div className="font date">{this.state.currentDate}</div>
      </div>
    );
  }
}

export default CurrentDateTime;