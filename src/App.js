import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import './App.css';
import { extractLocations, getEvents } from './api';

function App () {
  const [events, setEvents] = useState([]);
  const [noe, setNoe] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState('See All Cities');
  
  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === 'See All Cities'
     ? allEvents : allEvents.filter((event) => event.location === currentCity);
     setEvents(filteredEvents.slice(0, noe));
     setAllLocations(extractLocations(allEvents));
  };

  useEffect(() => {
    fetchData();
  }, [currentCity, noe]);

  return ( 
  <div className = "App">
    <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
    <EventList events={events} />
    <NumberOfEvents setNoe={setNoe} />
    </div>
  );
}

export default App;