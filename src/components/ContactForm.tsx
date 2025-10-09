import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message cannot exceed 1000 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps = {}) {
  const shouldReduceMotion = useReducedMotion();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
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
    <motion.section
      id="contact"
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className={`py-16 md:py-24 px-4 md:px-8 bg-[#E8DCC8] ${className || ''}`}
      aria-label="Contact Form"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#1A1A1A]">Get In Touch</h2>

        {/* Success Message */}
        {submissionStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-[#6B8E23]/10 border border-[#6B8E23] rounded-md flex items-start gap-3"
            role="alert"
            aria-live="polite"
          >
            <CheckCircle2 className="h-5 w-5 text-[#6B8E23] flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div className="flex-1">
              <p className="text-[#6B8E23] font-medium">Thank you! We'll get back to you soon.</p>
            </div>
            <button
              onClick={() => setSubmissionStatus('idle')}
              className="text-[#6B8E23] hover:text-[#6B8E23]/70 transition-colors"
              aria-label="Dismiss success message"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}

        {/* Error Message */}
        {submissionStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-[#DC2626]/10 border border-[#DC2626] rounded-md flex items-start gap-3"
            role="alert"
            aria-live="polite"
          >
            <XCircle className="h-5 w-5 text-[#DC2626] flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div className="flex-1">
              <p className="text-[#DC2626] font-medium">
                Something went wrong. Please try again or call us at{' '}
                <a href="tel:+18138741508" className="underline hover:no-underline">
                  813-874-1508
                </a>
                .
              </p>
            </div>
            <button
              onClick={() => setSubmissionStatus('idle')}
              className="text-[#DC2626] hover:text-[#DC2626]/70 transition-colors"
              aria-label="Dismiss error message"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#1A1A1A]">
                    Name <span className="text-[#DC2626]">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Your full name"
                      autoComplete="name"
                      className="h-12 text-base border-[#2C3539] focus:border-[#B8935E] focus:ring-2 focus:ring-[#B8935E]/20 placeholder:text-[#8B6F47]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-[#DC2626]" />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#1A1A1A]">
                    Email <span className="text-[#DC2626]">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      autoComplete="email"
                      className="h-12 text-base border-[#2C3539] focus:border-[#B8935E] focus:ring-2 focus:ring-[#B8935E]/20 placeholder:text-[#8B6F47]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-[#DC2626]" />
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#1A1A1A]">Phone (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="(813) 555-0123"
                      autoComplete="tel"
                      className="h-12 text-base border-[#2C3539] focus:border-[#B8935E] focus:ring-2 focus:ring-[#B8935E]/20 placeholder:text-[#8B6F47]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-[#DC2626]" />
                </FormItem>
              )}
            />

            {/* Message Field */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#1A1A1A]">
                    Message <span className="text-[#DC2626]">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Tell us about your event or inquiry..."
                      className="text-base border-[#2C3539] focus:border-[#B8935E] focus:ring-2 focus:ring-[#B8935E]/20 placeholder:text-[#8B6F47] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-[#DC2626]" />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto bg-[#B8935E] hover:bg-[#A07D4A] text-[#1A1A1A] font-semibold px-8 py-3 h-12 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              aria-label={isSubmitting ? 'Sending message' : 'Send message'}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </motion.section>
  );
}
