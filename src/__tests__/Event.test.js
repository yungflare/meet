import userEvent from '@testing-library/user-event';
import { render } from "@testing-library/react";
import Event from "../components/Event";
import mockData from '../mock-data';
import { getEvents } from '../api';


describe('<Event /> component', () => {
    let EventComponent;
    const event = mockData[0];
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
        expect(EventComponent.queryByText('show details')).toBeInTheDocument();
    });
});

