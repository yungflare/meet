import { useState } from 'react';


const Event = ({event}) => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <li className='event'>
            <h1>{event.summary}</h1>
            <p>{event.created}</p>
            <p>{event.location}</p>
            <button>
                show details
            </button>

        </li>
    );
}

export default Event;