import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import PublicationForm from '../../publication/publicationUpdate';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    publicationId: '123',
  }),
}));

describe('PublicationForm', () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({
      data: {
        title: 'Test Title',
        author: 'Test Author',
        genre: 'Test Genre',
        description: 'Test Description',
        state: 'Nuevo',
        type: 'Venta',
        language: 'Español',
        price: '100',
      },
    });
    mockedAxios.put.mockResolvedValue({});
  });

  it('renders without crashing', async () => {
    render(
      <MemoryRouter>
        <PublicationForm />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Título')).toBeInTheDocument();
    });
  });

  it('fetches data and populates form fields', async () => {
    render(
      <MemoryRouter>
        <PublicationForm />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Title')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test Author')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test Genre')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Español')).toBeInTheDocument();
      expect(screen.getByDisplayValue('100')).toBeInTheDocument();
    });
  });

  it('updates data on form submission', async () => {
    render(
      <MemoryRouter>
        <PublicationForm />
      </MemoryRouter>
    );

    await waitFor(() => fireEvent.submit(screen.getByRole('button')));

    expect(mockedAxios.put).toHaveBeenCalledWith('/publications/123', expect.anything());
  });
});