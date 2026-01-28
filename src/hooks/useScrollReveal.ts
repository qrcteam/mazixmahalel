"use client";

import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    // ========================================
    // SECTION REVEAL (fade up, left, right)
    // ========================================
    const revealOnScroll = () => {
      const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;

        // Reveal when element enters viewport
        if (elementTop < windowHeight - 100 && elementBottom > 100) {
          element.classList.add('visible');
        } else {
          // Hide when element leaves viewport (reverse on scroll up)
          element.classList.remove('visible');
        }
      });
    };

    // ========================================
    // QUOTE WORD-BY-WORD REVEAL
    // ========================================
    const initScrollRevealQuote = () => {
      const textElements = document.querySelectorAll('.scroll-reveal-text');

      textElements.forEach(textElement => {
        // Check if already initialized (words already wrapped)
        if (textElement.querySelector('.word')) return;

        // Get the original text and split into words
        const text = textElement.textContent?.trim() || '';
        const words = text.split(/\s+/);

        // Clear the element and wrap each word in a span
        textElement.innerHTML = '';
        words.forEach((word, index) => {
          const span = document.createElement('span');
          span.className = 'word';
          span.textContent = word;
          span.dataset.index = String(index);
          textElement.appendChild(span);

          // Add space after each word (except last)
          if (index < words.length - 1) {
            textElement.appendChild(document.createTextNode(' '));
          }
        });
      });
    };

    const updateQuoteReveal = () => {
      const textElements = document.querySelectorAll('.scroll-reveal-text');

      textElements.forEach(textElement => {
        const wordSpans = textElement.querySelectorAll('.word');
        const totalWords = wordSpans.length;
        if (totalWords === 0) return;

        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const rect = textElement.getBoundingClientRect();
        const elementTop = rect.top;

        // ===========================================
        // CONFIGURABLE: Adjust these values
        // ===========================================
        // Values are percentage of viewport height from TOP
        // Lower number = higher on screen = more delay before reveal starts
        //
        // DESKTOP (screens > 968px)
        const desktopStart = 0.70;  // Start reveal at 70% down (30% into viewport)
        const desktopEnd = 0.25;    // Finish reveal at 25% down (near top)
        //
        // MOBILE (screens <= 968px)
        const mobileStart = 0.65;   // Start reveal at 65% down (35% into viewport)
        const mobileEnd = 0.20;     // Finish reveal at 20% down
        // ===========================================

        // Use appropriate values based on screen width
        const isMobile = windowWidth <= 968;
        const startPoint = windowHeight * (isMobile ? mobileStart : desktopStart);
        const endPoint = windowHeight * (isMobile ? mobileEnd : desktopEnd);

        // Calculate progress (0 to 1)
        let progress = (startPoint - elementTop) / (startPoint - endPoint);
        progress = Math.max(0, Math.min(1, progress));

        // Calculate how many words should be revealed
        const wordsToReveal = Math.floor(progress * totalWords);

        // Update each word's state
        wordSpans.forEach((span, index) => {
          if (index < wordsToReveal) {
            span.classList.add('revealed');
          } else {
            span.classList.remove('revealed');
          }
        });
      });
    };

    // Initialize quote word wrapping
    initScrollRevealQuote();

    // Use requestAnimationFrame for smooth performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          revealOnScroll();
          updateQuoteReveal();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Trigger after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      revealOnScroll();
      updateQuoteReveal();
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);
}
