import { render, screen } from '@testing-library/react';
import App from './App';

test('renders initializing text', () => {
  render(<App />);
  const initializingText = screen.getByText(/initializing/i); // Adjusted text
  expect(initializingText).toBeInTheDocument();
});
