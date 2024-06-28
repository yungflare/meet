import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import './App.css';
import { extractLocations, getEvents } from './api';

function App () {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState('See All Cities');
  
  const fetchData = async () => {
    const allEvents = await getEvents();

    const filteredEvents = currentCity === 'See All Cities'
     ? allEvents : allEvents.filter(event => event.location === currentCity);
     setEvents(filteredEvents.slice(0, currentNOE));
     setAllLocations(extractLocations(allEvents));
  }

  useEffect(() => {
    fetchData();
  }, [currentCity]);

  return ( 
  <div className = "App">
    <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
    <EventList events={events} />
    <NumberOfEvents />
    </div>
  );
}

export default App;