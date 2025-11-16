import { motion, useReducedMotion } from 'framer-motion';

interface FancyHeadingProps {
  words: string[];
  className?: string;
  lineColor?: string;
  textColors?: string[];
  size?: 'small' | 'medium' | 'large';
  animationDelay?: number;
  align?: 'left' | 'center';
  noIndent?: boolean;
}

/**
 * FancyHeading Component (formerly FancyMobileHeading)
 *
 * Displays a fancy heading with:
 * - Vertical accent line on the left
 * - Stacked words with progressive indentation
 * - Alternating colors for visual interest
 * - Smooth entrance animation
 * - Responsive sizing for all screen sizes
 *
 * @param words - Array of words to display vertically
 * @param className - Additional CSS classes
 * @param lineColor - Color of the vertical accent line (default: amber-400/50)
 * @param textColors - Array of colors for the words (cycles through if fewer colors than words)
 * @param size - Size preset: small, medium, or large (responsive)
 * @param animationDelay - Delay before animation starts
 * @param align - Alignment: 'left' or 'center' (default: 'left')
 */
export function FancyHeading({
  words,
  className = '',
  lineColor = 'bg-amber-400/50',
  textColors = ['text-amber-400', 'text-amber-300'],
  size = 'medium',
  animationDelay = 0.2,
  align = 'left',
  noIndent = false
}: FancyHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  // Responsive size classes
  const sizeClasses = {
    small: {
      text: 'text-xl sm:text-2xl md:text-3xl lg:text-3xl',
      line: 'h-20 sm:h-24 md:h-28 lg:h-28',
      space: 'space-y-0.5 sm:space-y-1',
      indent: 0.75  // rem units for indentation
    },
    medium: {
      text: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
      line: 'h-24 sm:h-32 md:h-36 lg:h-40',
      space: 'space-y-1 sm:space-y-1.5 md:space-y-2',
      indent: 1  // rem units
    },
    large: {
      text: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
      line: 'h-28 sm:h-36 md:h-44 lg:h-48',
      space: 'space-y-1 sm:space-y-2 md:space-y-3',
      indent: 1.25  // rem units
    }
  };

  const currentSize = sizeClasses[size];
  const wrapperClass = align === 'center' ? 'flex justify-center' : '';

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: shouldReduceMotion ? 0 : animationDelay }}
      className={`relative ${wrapperClass} ${className}`}
    >
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <div className={`w-0.5 sm:w-1 ${currentSize.line} ${lineColor}`}></div>
        <div className={currentSize.space}>
          {words.map((word, index) => (
            <h1
              key={index}
              className={`${currentSize.text} font-bold ${textColors[index % textColors.length]} leading-none`}
              style={{
                paddingLeft: noIndent ? 0 : `${index * currentSize.indent}rem`
              }}
            >
              {word}
            </h1>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Keep the old export name for compatibility
export const FancyMobileHeading = FancyHeading;

/**
 * FancyMobileHeadingAlternate Component
 *
 * Alternative style with words on separate lines without indentation
 * but with a continuous vertical line and color variation
 */
export function FancyMobileHeadingAlternate({
  words,
  className = '',
  lineColor = 'bg-amber-400/50',
  textColors = ['text-amber-400', 'text-amber-300'],
  size = 'medium',
  animationDelay = 0.2
}: FancyHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  const sizeClasses: Record<'small' | 'medium' | 'large', string> = {
    small: 'text-2xl',
    medium: 'text-3xl',
    large: 'text-4xl'
  };

  const textSize = sizeClasses[size];

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: shouldReduceMotion ? 0 : animationDelay }}
      className={`sm:hidden relative ${className}`}
    >
      <div className="flex gap-3">
        <div className={`w-0.5 ${lineColor} self-stretch`}></div>
        <div className="space-y-2">
          {words.map((word: string, index: number) => (
            <motion.h2
              key={index}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: shouldReduceMotion ? 0 : animationDelay + (index * 0.1)
              }}
              className={`${textSize} font-bold ${textColors[index % textColors.length]} leading-tight`}
            >
              {word}
            </motion.h2>
          ))}
        </div>
      </div>
    </motion.div>
  );
}