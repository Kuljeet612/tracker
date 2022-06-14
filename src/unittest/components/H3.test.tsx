import {H3} from '../../components/CountHeader/H3';
import { render, screen } from '@testing-library/react';

test('renders an H3 component that displays total count', () => {
    render(<H3 label='Total Count:' value={42} />)
    const h3CountLabel = screen.getByText(/Total Count:/i);
    expect(h3CountLabel).toBeInTheDocument();
    const h3CountValue = screen.getByText(/42/);
    expect(h3CountValue).toBeInTheDocument();
})

