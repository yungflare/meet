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

})

