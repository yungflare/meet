import userEvent from '@testing-library/user-event';
import { render } from "@testing-library/react";
import Event from "../components/Event";
import mockData from '../mock-data';
import { getEvents } from '../api';


describe('<Event /> component', () => {
    let EventComponent;
    const event = mockData[0].item[0];
    beforeEach(() => {
        EventComponent = render(<Event event={event} />);
    });

    test('renders event title', () => {
        expect(EventComponent.queryByText(event.summary)).toBeInTheDocument();
    });

    test('renders event start time', () => {
        expect(EventComponent.queryByText(event.created)).toBeInTheDocument();
    });

    test('renders event location', () => {
        expect(EventComponent.queryByText(event.location)).toBeInTheDocument();
    });

    test('renders show details button', () => {
        expect(EventComponent.queryByText('Show Details')).toBeInTheDocument();
    });

    test('event details should be hidden by default', () => {
        const details = EventComponent.container.querySelector('.details');
        expect(details).not.toBeInTheDocument();
    });

    test('show details when user clicks show details button', async() => {
        const user = userEvent.setup();
        const button = EventComponent.queryByText('Show Details');
        await user.click(button);
        const details = EventComponent.container.querySelector('.details');
        expect(details).toBeInTheDocument();
    });

    test('hide details when user clicks hide details button', async() => {
        const user = userEvent.setup();
        const showButton = EventComponent.queryByText('Show Details');
        const hideButton = EventComponent.queryByText('Hide Details');
        user.click(hideButton);
        expect(showButton).toBeInTheDocument();
        expect(hideButton).toBeInTheDocument();
    })
    
});

