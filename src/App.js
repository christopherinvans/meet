import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from "./NumberOfEvents";
import { extractLocations, getEvents, checkToken, getAccessToken } from "./api";
import './nprogress.css';
import { InfoAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    selectedLocation: 'all',
    showWelcomeScreen: undefined,
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false :
    true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
    getEvents().then((events) => {
    if (this.mounted) {
    this.setState({ events, locations: extractLocations(events) });
    }
    });
    }
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

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    const numberOfEvents = eventCount || this.state.numberOfEvents;
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
          const filteredEvents = (locationEvents.length === 0) ? events.slice(0, numberOfEvents) : locationEvents.slice(0, numberOfEvents)
      this.setState({
        events: filteredEvents,
        numberOfEvents: numberOfEvents,
      });
    });
  };

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div
className="App" />
    const { locations, numberOfEvents, events } = this.state;
    return (
      <div className="App">
        <h1>Meet App</h1>
        <h4>Choose your nearest city</h4>
        <div>
          {!navigator.onLine && (
            <InfoAlert
              className="alert-centered"
              text="App is currently offline. You are seeing your cached data."
            />
          )}
        </div>
       <CitySearch updateEvents={this.updateEvents} locations={locations} />
       <EventList events={events} />
        <NumberOfEvents
          updateEvents={this.updateEvents}
          numberOfEvents={numberOfEvents}
        />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen}
getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;