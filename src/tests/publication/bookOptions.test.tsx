import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import BookOptions from './bookOptions';

describe('BookOptions Component', () => {
  const mockBooks = [
    { id: '1', title: 'Book 1', image: 'url1', author: 'Author 1' },
    { id: '2', title: 'Book 2', image: 'url2', author: 'Author 2' },
  ];
  const mockOnSelectBook = jest.fn();

  it('should be visible when visible prop is true', () => {
    render(<BookOptions books={[]} visible={true} onSelectBook={mockOnSelectBook} loadingSearch={false} />);
    expect(screen.getByRole('presentation')).toHaveStyle('visibility: visible');
  });

  it('should be visible when loadingSearch prop is true', () => {
    render(<BookOptions books={[]} visible={false} onSelectBook={mockOnSelectBook} loadingSearch={true} />);
    expect(screen.getByRole('presentation')).toHaveStyle('visibility: visible');
  });

  it('should display loading indicator when loadingSearch is true', () => {
    render(<BookOptions books={[]} visible={true} onSelectBook={mockOnSelectBook} loadingSearch={true} />);
    expect(screen.getByText('Cargando...')).toBeInTheDocument();
  });

  it('should render the list of books correctly', () => {
    render(<BookOptions books={mockBooks} visible={true} onSelectBook={mockOnSelectBook} loadingSearch={false} />);
    mockBooks.forEach(book => {
      expect(screen.getByText(book.title)).toBeInTheDocument();
      expect(screen.getByText(book.author)).toBeInTheDocument();
    });
  });

  it('should call onSelectBook with the correct ID when a book is clicked', () => {
    render(<BookOptions books={mockBooks} visible={true} onSelectBook={mockOnSelectBook} loadingSearch={false} />);
    fireEvent.click(screen.getByText('Book 1'));
    expect(mockOnSelectBook).toHaveBeenCalledWith('1');
  });
});