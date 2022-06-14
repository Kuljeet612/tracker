import {H3} from '../../components/CountHeader/H3';
import { render, screen } from '@testing-library/react';

test('renders an H3 element', () => {
    render(<H3 label='Total Count:' value={30} />)
    const h3Label = screen.getByText(/Total Count:/i);
    expect(h3Label).toBeInTheDocument();
})

