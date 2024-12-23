import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SignInForm from '../SignInForm';

vi.mock('../../lib/authService', () => {
  return {
    authService: {
      signIn: vi.fn(),
    },
  };
});

describe('SignInForm Component', () => {
  it('should render the form correctly', () => {
    // Given
    render(<SignInForm />);

    // Then
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Sign In/i })
    ).toBeInTheDocument();
  });

  it('should show validation errors if the input is invalid', async () => {
    // Given
    render(<SignInForm />);

    // When
    const signInButton = screen.getByRole('button', { name: /Sign In/i });
    fireEvent.click(signInButton);

    // Then
    await waitFor(() => {
      expect(
        screen.getByText('Username must have at least 8 characters.')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Password must have at least 8 characters.')
      ).toBeInTheDocument();
    });
  });
});
