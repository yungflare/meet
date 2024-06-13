import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import App from "../App";
import { extractLocations, getEvents } from "../api";

describe('<CitySearch /> component', () => {
    let CitySearchComponent;
    // const setCurrentCity = jest.fn();

    beforeEach(() => {
        CitySearchComponent = render(<CitySearch allLocations={[]} />);
    });

    test('renders text input', () => {
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });

    test('suggestions list is hidden by default', () => {
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).not.toBeInTheDocument();
    });

    test('renders a list of suggestions when city textbox gains focus', async () => {
        const user = userEvent.setup();
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.click(cityTextBox);
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).toBeInTheDocument();
        expect(suggestionList).toHaveClass('suggestions');
    });

    test('updates list of suggestions correctly when user types in city textbox', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, "Berlin");
        const suggestions = allLocations? allLocations.filter((location) => {
        return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
        }): [];
        const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
        expect(suggestionListItems).toHaveLength(suggestions.length + 1);
        for (let i = 0; i < suggestions.length; i += 1) {
        expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents(); 
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations}  />);

    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");
    const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];

    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
    expect(setCurrentCity).toHaveBeenCalledWith(BerlinGermanySuggestion.textContent);
  });
    
});

describe('<CitySearch />, integration', () => {
    test('renders suggestionList when app is rendered and user focus in textbox', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const CitySearchDom = AppDOM.querySelector('#city-search');
        const textbox = within(CitySearchDom).queryByRole('textbox');
        await user.click(textbox);

        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);

        const suggestionList = within(CitySearchDom).queryAllByRole('listitem');
        expect(suggestionList.length).toBe(allLocations.length + 1);
    });
});