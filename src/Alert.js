import React, { Component } from "react";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null; //Color is null by default, as its children will override this
  }

  getStyle = () => {
    return {
      color: this.color,
    };
  };

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "blue";
  }
}

export { InfoAlert };

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "red";
  }
}

export { ErrorAlert };

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "yellow";
  }
}

export { WarningAlert };