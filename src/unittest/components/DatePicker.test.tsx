import { DatePicker } from '../../components/DatePicker/DatePicker';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

test('renders an H3 element', () => {
    render(<Provider store={store}>
        <DatePicker />
    </Provider>);

    const title = screen.getByTitle('Select a from date');
    expect(title).toBeInTheDocument();

    const ariaLabel = screen.getByLabelText("from date");
    expect(ariaLabel).toBeInTheDocument();
})

