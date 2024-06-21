import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../common/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import '@testing-library/jest-dom'

jest.mock('../auth/useAuth');
const mockUseAuth = useAuth as jest.Mock;

describe('Navbar', () => {
  it('shows login when not authenticated', () => {
    mockUseAuth.mockReturnValue({ token: null, logout: jest.fn() });

    render(
      <Router>
        <Navbar />
      </Router>
    );

    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
    expect(screen.queryByText('Publicar')).not.toBeInTheDocument();
    expect(screen.queryByText('Mi cuenta')).not.toBeInTheDocument();
  });

  it('shows logout, publish, and my account when authenticated', () => {
    mockUseAuth.mockReturnValue({ token: 'fake-token', logout: jest.fn() });

    render(
      <Router>
        <Navbar />
      </Router>
    );

    expect(screen.getByText('Cerrar sesión')).toBeInTheDocument();
    expect(screen.getByText('Publicar')).toBeInTheDocument();
    expect(screen.getByText('Mi cuenta')).toBeInTheDocument();
    expect(screen.queryByText('Iniciar sesión')).not.toBeInTheDocument();
  });

  it('calls logout on logout click when authenticated', () => {
    const mockLogout = jest.fn();
    mockUseAuth.mockReturnValue({ token: 'fake-token', logout: mockLogout });

    render(
      <Router>
        <Navbar />
      </Router>
    );

    fireEvent.click(screen.getByText('Cerrar sesión'));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});