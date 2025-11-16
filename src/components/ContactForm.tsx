import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, XCircle, X } from 'lucide-react';

/**
 * ContactForm Component
 *
 * Collects customer inquiries about private events, partnerships, or general questions.
 * Features client-side validation with React Hook Form and Zod schema validation.
 * Prepared for backend integration in Epic 3.
 *
 * @param className - Optional CSS classes to apply to the section
 */

// Validation schema with Zod
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|mil|co|uk|us|ca|au|de|fr|jp|cn|in|br|ru|solutions|tech|io|app|dev|ai|info|biz|xyz|online|store|site|website|cloud|digital|email|group|studio|agency|marketing|services|consulting|finance|health|legal|media|news|global|international|world|pro|tv|me|cc|fm|gg|be|it|es|nl|se|no|dk|fi|pl|ch|at|ie|nz|sg|hk|ae|sa|za|mx|ar|cl|pe|co\.uk|co\.nz|co\.za|com\.au|com\.br|com\.mx|org\.uk|net\.au)$/i,
      'Please enter a valid email address with a real domain'
    ),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\d\s\-\(\)\+]*$/.test(val),
      'Phone number can only contain numbers, spaces, dashes, parentheses, and +'
    )
    .refine(
      (val) => !val || val.replace(/[\s\-\(\)\+]/g, '').length >= 10,
      'Phone number must be at least 10 digits'
    ),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps = {}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmissionStatus('idle');

    try {
      // TODO Epic 3: Replace with actual API call to contactService.submitContactForm(data)
      console.log('Form data:', data);

      // Simulate API call (2 second delay)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmissionStatus('success');
      form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className={`py-6 md:py-12 px-4 md:px-8 bg-[#E8DCC8] ${className || ''}`}
      aria-label="Contact Form"
    >
      <div className="max-w-lg mx-auto">
        <h2 className="text-xl md:text-3xl font-bold mb-4 text-[#1A1A1A]">Request Service</h2>

        {/* Success Message */}
        {submissionStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 p-2.5 bg-[#6B8E23]/10 border border-[#6B8E23] rounded-lg flex items-center gap-2"
            role="alert"
            aria-live="polite"
          >
            <CheckCircle2 className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#6B8E23] flex-shrink-0" aria-hidden="true" />
            <div className="flex-1">
              <p className="text-xs md:text-sm text-[#6B8E23] font-medium">Service request received! We'll contact you shortly.</p>
            </div>
            <button
              onClick={() => setSubmissionStatus('idle')}
              className="text-[#6B8E23] hover:text-[#6B8E23]/70 transition-colors"
              aria-label="Dismiss success message"
            >
              <X className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </button>
          </motion.div>
        )}

        {/* Error Message */}
        {submissionStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 p-2.5 bg-[#DC2626]/10 border border-[#DC2626] rounded-lg flex items-center gap-2"
            role="alert"
            aria-live="polite"
          >
            <XCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#DC2626] flex-shrink-0" aria-hidden="true" />
            <div className="flex-1">
              <p className="text-xs md:text-sm text-[#DC2626] font-medium">
                Error submitting request. Call{' '}
                <a href="tel:+18138741508" className="underline hover:no-underline font-semibold">
                  813-874-1508
                </a>
              </p>
            </div>
            <button
              onClick={() => setSubmissionStatus('idle')}
              className="text-[#DC2626] hover:text-[#DC2626]/70 transition-colors"
              aria-label="Dismiss error message"
            >
              <X className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </button>
          </motion.div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {/* Name and Email Fields - Grid on desktop, stacked on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs md:text-sm font-medium text-[#1A1A1A]">
                      Name <span className="text-[#DC2626]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Your name"
                        autoComplete="name"
                        className="h-9 md:h-10 text-sm md:text-base border-[#2C3539] focus:border-[#B8935E] focus:ring-2 focus:ring-[#B8935E]/20 placeholder:text-[#8B6F47]/60"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-[#DC2626]" />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs md:text-sm font-medium text-[#1A1A1A]">
                      Email <span className="text-[#DC2626]">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        autoComplete="email"
                        className="h-9 md:h-10 text-sm md:text-base border-[#2C3539] focus:border-[#B8935E] focus:ring-2 focus:ring-[#B8935E]/20 placeholder:text-[#8B6F47]/60"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-[#DC2626]" />
                  </FormItem>
                )}
              />
            </div>

            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-medium text-[#1A1A1A]">
                    Phone <span className="text-[#6B8E23] text-xs">(Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="(813) 555-0123"
                      autoComplete="tel"
                      className="h-9 md:h-10 text-sm md:text-base border-[#2C3539] focus:border-[#B8935E] focus:ring-2 focus:ring-[#B8935E]/20 placeholder:text-[#8B6F47]/60"
                      onKeyDown={(e) => {
                        // Allow: backspace, delete, tab, escape, enter, arrows
                        if (
                          ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)
                        ) {
                          return;
                        }
                        // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                        if (e.ctrlKey || e.metaKey) {
                          return;
                        }
                        // Block: any key that is not a number, space, +, -, (, )
                        if (!/^[0-9\s\+\-\(\)]$/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        // Filter out any invalid characters from input/paste
                        const filteredValue = e.target.value.replace(/[^0-9\s\+\-\(\)]/g, '');
                        field.onChange(filteredValue);
                      }}
                      value={field.value}
                      name={field.name}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-[#DC2626]" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#B8935E] hover:bg-[#A07D4A] active:bg-[#8C6B3B] text-white font-semibold px-6 py-2 h-11 md:h-12 text-sm md:text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={isSubmitting ? 'Requesting service' : 'Request service'}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    Processing...
                  </>
                ) : (
                  'Request Service'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
