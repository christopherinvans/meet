import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from "./NumberOfEvents";
import { extractLocations, getEvents, checkToken, getAccessToken } from "./api";
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
  };

  updateEvents = (location, eventCount) => {
    const numberOfEvents = eventCount || this.state.numberOfEvents;
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      const filteredEvents = locationEvents.slice(0, numberOfEvents);
      this.setState({
        events: filteredEvents,
        numberOfEvents: numberOfEvents,
      });
    });
  };

  updateNumberOfEvents(number) {
    this.setState({
      numberOfEvents: number,
    });
  }

  async componentDidMount() {
    this.mounted = true;
    const isLocal =
      window.location.href.startsWith("http://127.0.0.1") ||
      window.location.href.startsWith("http://localhost");
    if (navigator.onLine && !isLocal) {
      const accessToken = localStorage.getItem("access_token");
      const isTokenValid = (await checkToken(accessToken)).error ? false : true;
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      this.setState({ showWelcomeScreen: !(code || isTokenValid) });
      if ((code || isTokenValid) && this.mounted)
        getEvents().then((events) => {
          if (this.mounted) {
            this.setState({
              events: events.slice(0, this.state.numberOfEvents),
              locations: extractLocations(events),
            });
          }
        });
    } else {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            showWelcomeScreen: false,
            events: events.slice(0, this.state.numberOfEvents),
            locations: extractLocations(events),
          });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location)
        .length; //Maps the locations and filters events by each location to get the length of the resulting array
      const city = location.split(",").shift(); //Splits location at every comma to only return city
      return { city, number };
    });
    return data;
  };

  render() {
    return (
      <div className="App">
       <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateNumberOfEvents={(num) => this.updateNumberOfEvents(num)}
        />
      </div>
    );
  }
}

export default App;