import { VacationTypeDropdown } from '../../components/Dropdown/VacationType';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { filterByType } from '../../redux/reducers/AbsencesSlice';

const typeOptions = ["all", "sickness", "vacation"];
test('renders VacationType dropdown', async () => {

    render(<Provider store={store}>
        <VacationTypeDropdown typeOptions={typeOptions} />
    </Provider>);

    const title = screen.getByTitle('Select Vacation Type');
    expect(title).toBeInTheDocument();

    const ariaLabel = screen.getByLabelText("vacation type");
    expect(ariaLabel).toBeInTheDocument();

    const selectElement = screen.getByLabelText('Type');
    expect(selectElement).toBeInTheDocument();

    expect(store.getState().absences.filterBy).toBe('all');

    userEvent.selectOptions(selectElement, 'vacation');
    expect((screen.getByText('all') as HTMLOptionElement).selected).toBeFalsy();
    expect((screen.getByText('sickness') as HTMLOptionElement).selected).toBeFalsy();
    expect((screen.getByText('vacation') as HTMLOptionElement).selected).toBeTruthy();

    expect(screen.getAllByRole('option').length).toBe(3);

    let typeFilterValue = store.getState().absences.filterBy;
    expect(typeFilterValue).toBe('vacation');
    expect(typeFilterValue).not.toBe('sickness');
    expect(typeFilterValue).not.toBe('all');
})

test('renders VacationType dropdown', async () => {
    store.dispatch(filterByType('sickness'));
       
    render(<Provider store={store}>
        <VacationTypeDropdown typeOptions={typeOptions} />
    </Provider>);
    
    expect(store.getState().absences.filterBy).toBe('sickness');
    expect(store.getState().absences.filterBy).not.toBe('vacation');
    expect(store.getState().absences.filterBy).not.toBe('all');
})

