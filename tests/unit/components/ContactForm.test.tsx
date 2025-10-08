import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ContactForm } from '@/components/ContactForm';

describe('ContactForm Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    it('renders section heading', () => {
      render(<ContactForm />);
      expect(screen.getByRole('heading', { name: /get in touch/i, level: 2 })).toBeInTheDocument();
    });

    it('renders name input field with label', () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/your full name/i)).toBeInTheDocument();
    });

    it('renders email input field with label', () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/your.email@example.com/i)).toBeInTheDocument();
    });

    it('renders phone input field with label (optional)', () => {
      render(<ContactForm />);
      expect(screen.getByLabelText(/phone \(optional\)/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/\(813\) 555-0123/i)).toBeInTheDocument();
    });

    it('renders message textarea with label', () => {
      render(<ContactForm />);
      expect(screen.getByPlaceholderText(/tell us about your event or inquiry/i)).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /message/i })).toBeInTheDocument();
    });

    it('renders submit button with correct text', () => {
      render(<ContactForm />);
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    });

    it('marks required fields with asterisk', () => {
      const { container } = render(<ContactForm />);
      const labels = container.querySelectorAll('label');

      // Name, Email, and Message should have asterisks
      const nameLabel = Array.from(labels).find(label => label.textContent?.includes('Name'));
      const emailLabel = Array.from(labels).find(label => label.textContent?.includes('Email'));
      const messageLabel = Array.from(labels).find(label => label.textContent?.includes('Message'));

      expect(nameLabel?.textContent).toContain('*');
      expect(emailLabel?.textContent).toContain('*');
      expect(messageLabel?.textContent).toContain('*');
    });
  });

  describe('Validation Tests', () => {
    it('shows validation error for empty name field on blur', async () => {
      render(<ContactForm />);
      const nameInput = screen.getByLabelText(/name/i);

      fireEvent.blur(nameInput);

      await waitFor(() => {
        expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      });
    });

    it('shows validation error for name with less than 2 characters', async () => {
      render(<ContactForm />);
      const nameInput = screen.getByLabelText(/name/i);

      fireEvent.change(nameInput, { target: { value: 'A' } });
      fireEvent.blur(nameInput);

      await waitFor(() => {
        expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
      });
    });

    it('shows validation error for invalid email format', async () => {
      render(<ContactForm />);
      const emailInput = screen.getByLabelText(/email/i);

      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      });
    });

    it('shows validation error for empty email field', async () => {
      render(<ContactForm />);
      const emailInput = screen.getByLabelText(/email/i);

      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
      });
    });

    it('shows validation error for message less than 10 characters', async () => {
      render(<ContactForm />);
      const messageInput = screen.getByRole('textbox', { name: /message/i });

      fireEvent.change(messageInput, { target: { value: 'Short' } });
      fireEvent.blur(messageInput);

      await waitFor(() => {
        expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
      });
    });

    it('shows validation error for message exceeding 1000 characters', async () => {
      render(<ContactForm />);
      const messageInput = screen.getByRole('textbox', { name: /message/i });
      const longMessage = 'a'.repeat(1001);

      fireEvent.change(messageInput, { target: { value: longMessage } });
      fireEvent.blur(messageInput);

      await waitFor(() => {
        expect(screen.getByText(/message cannot exceed 1000 characters/i)).toBeInTheDocument();
      });
    });

    it('does not show validation errors for valid inputs', async () => {
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByRole('textbox', { name: /message/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.blur(nameInput);

      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.blur(emailInput);

      fireEvent.change(messageInput, { target: { value: 'This is a valid message with enough characters.' } });
      fireEvent.blur(messageInput);

      await waitFor(() => {
        expect(screen.queryByText(/name must be/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/please enter a valid email/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/message must be/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Submission Tests', () => {
    it('submits form with valid data and logs to console', async () => {
      const consoleSpy = vi.spyOn(console, 'log');
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByRole('textbox', { name: /message/i });
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'This is a test message for the contact form.' } });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Form data:', expect.objectContaining({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'This is a test message for the contact form.',
        }));
      });
    });

    it('shows loading state during submission', async () => {
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByRole('textbox', { name: /message/i });
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'This is a test message.' } });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/sending\.\.\./i)).toBeInTheDocument();
      });
      expect(submitButton).toBeDisabled();
    });

    it('shows success message after successful submission', async () => {
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByRole('textbox', { name: /message/i });
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'This is a test message.' } });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/thank you! we'll get back to you soon/i)).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('resets form after successful submission', async () => {
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      const messageInput = screen.getByRole('textbox', { name: /message/i }) as HTMLTextAreaElement;
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'This is a test message.' } });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/thank you/i)).toBeInTheDocument();
      }, { timeout: 3000 });

      // Check form is reset
      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(messageInput.value).toBe('');
    });

    it('allows dismissing success message', async () => {
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByRole('textbox', { name: /message/i });
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'This is a test message.' } });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/thank you/i)).toBeInTheDocument();
      }, { timeout: 3000 });

      const dismissButton = screen.getByLabelText(/dismiss success message/i);
      fireEvent.click(dismissButton);

      expect(screen.queryByText(/thank you/i)).not.toBeInTheDocument();
    });
  });

  describe('Accessibility Tests', () => {
    it('has semantic HTML structure', () => {
      const { container } = render(<ContactForm />);

      const section = container.querySelector('section');
      const heading = container.querySelector('h2');
      const form = container.querySelector('form');
      const labels = container.querySelectorAll('label');
      const inputs = container.querySelectorAll('input');
      const textarea = container.querySelector('textarea');

      expect(section).toBeInTheDocument();
      expect(heading).toBeInTheDocument();
      expect(form).toBeInTheDocument();
      expect(labels.length).toBeGreaterThan(0);
      expect(inputs.length).toBeGreaterThan(0);
      expect(textarea).toBeInTheDocument();
    });

    it('has proper ARIA label on section', () => {
      const { container } = render(<ContactForm />);
      const section = container.querySelector('section');
      expect(section).toHaveAttribute('aria-label', 'Contact Form');
    });

    it('has autocomplete attributes on inputs', () => {
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const phoneInput = screen.getByLabelText(/phone/i);

      expect(nameInput).toHaveAttribute('autocomplete', 'name');
      expect(emailInput).toHaveAttribute('autocomplete', 'email');
      expect(phoneInput).toHaveAttribute('autocomplete', 'tel');
    });

    it('has descriptive aria-label on submit button during loading', async () => {
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByRole('textbox', { name: /message/i });
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'This is a test message.' } });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /sending message/i })).toBeInTheDocument();
      });
    });

    it('has aria-live region for success message', async () => {
      render(<ContactForm />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByRole('textbox', { name: /message/i });
      const submitButton = screen.getByRole('button', { name: /send message/i });

      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
      fireEvent.change(messageInput, { target: { value: 'This is a test message.' } });

      fireEvent.click(submitButton);

      await waitFor(() => {
        const successAlert = screen.getByRole('alert');
        expect(successAlert).toHaveAttribute('aria-live', 'polite');
      }, { timeout: 3000 });
    });
  });

  describe('Responsive Tests', () => {
    it('has responsive classes for form layout', () => {
      const { container } = render(<ContactForm />);

      const section = container.querySelector('section');
      expect(section?.className).toContain('py-16');
      expect(section?.className).toContain('md:py-24');
      expect(section?.className).toContain('px-4');
      expect(section?.className).toContain('md:px-8');
    });

    it('has responsive classes for submit button', () => {
      render(<ContactForm />);

      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton.className).toContain('w-full');
      expect(submitButton.className).toContain('md:w-auto');
    });

    it('has responsive classes for heading', () => {
      const { container } = render(<ContactForm />);

      const heading = container.querySelector('h2');
      expect(heading?.className).toContain('text-3xl');
      expect(heading?.className).toContain('md:text-4xl');
    });
  });
});
