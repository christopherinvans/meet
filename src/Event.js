import React, { Component } from "react";

class Event extends Component {
  state = {
    isExpanded: false, //Event details are collapsed by default
  };

  //Toggles show/hide details
  handleButtonClick = () => {
    if (this.state.isExpanded === false) {
      this.setState({
        isExpanded: true,
      });
    } else
      this.setState({
        isExpanded: false,
      });
  };

  render() {
    const { event } = this.props;
    return (
      <div className="event">
        <h1 className="summary">{event.summary}</h1>
        <div>
          <p className="startDate">{event.start.dateTime}</p>
          <p className="timeZone">{event.start.timeZone}</p>
          <p className="location">{event.location}</p>

          {this.state.isExpanded && (
            <div className="expanded-event-details">
              <h1>About This Event:</h1>
              <a className="event-link" href={event.htmlLink}>
                See Details on Google Calendar
              </a>
              <p className="description">{event.description}</p>
            </div>
          )}

          <button className="showDetails" onClick={this.handleButtonClick}>
            {this.state.isExpanded ? "Hide Details" : "Show Details"}
          </button>
        </div>
      </div>
    );
  }
}

export default Event;