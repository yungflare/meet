import { useState } from 'react';


const Event = ({event}) => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <li className='event'>
            <h1>{event.summary}</h1>
            <p>{event.created}</p>
            <p>{event.location}</p>
            <button className='showDetailsButton'
                onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
            {showDetails ? (
                <div className='details'>
                    <h2>Event Details</h2>
                    <p>{event.details}</p>
                </div>) : null}
        </li>
    );
}

export default Event;