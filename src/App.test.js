import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('header is present', () => {
  render(<App />);
  const linkElement = screen.getByText(/all the dogs/i);
  expect(linkElement).toBeInTheDocument();
})

test('search bar present', () => {
  render(<App />);
  const linkElement = screen.getAllByPlaceholderText(/search/i);
  expect(linkElement).toHaveLength(1);
})

// test('first dog is found', async () => {
//   const { getAllByTestId } = await render(<App />);

//   await waitFor(() => {
//     expect(getAllByTestId(/dog-item/i)).toBeInTheDocument(1);
//   });
// })