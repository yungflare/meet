import { render, within } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';


describe('<App /> component', () => {
    let AppDOM;
    beforeEach(() => {
        AppDOM = render(<App />).container.firstChild;
    });

    test('renders list of events', () => {
        expect(AppDOM.querySelector('#event-list')).toBeInTheDocument ();
    });

    test('render CitySearch', () => {
        expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
    });

    test('renders NumberOfEvents', () => {
        expect(AppDOM.querySelector('#numberOfEvents')).toBeInTheDocument();
    });

});

describe('<App />, integration', () => {
    test('renders a list of events with city selected', async() => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
        const CitySearchComponent = AppDOM.querySelector('#city-search');
        const textbox = within(CitySearchComponent).queryByRole('textbox');

        await user.type(textbox, 'Berlin');
        const berlinSuggestionItem = within(CitySearchComponent).queryByText('Berlin, Germany');
        await user.click(berlinSuggestionItem);
        const allEvents = await getEvents();
        const filteredEvents = allEvents.filter((event) => {
            return event.location == 'Berlin, Germany';
        });
        
        const eventListDOM = AppDOM.querySelector('#event-list');
        const renderedEvents = within(eventListDOM).queryAllByRole('listitem');
        expect(renderedEvents.length).toBe(filteredEvents.length);
    })
})