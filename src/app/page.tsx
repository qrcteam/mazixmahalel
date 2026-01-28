"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

declare global {
  interface Window {
    Vimeo?: {
      Player: new (element: HTMLIFrameElement) => {
        on: (event: string, callback: () => void) => void;
      };
    };
  }
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Initialize scroll reveal (handles both section reveals and quote word-by-word)
  useScrollReveal();

  useEffect(() => {
    const iframe = document.getElementById(
      "vimeo-player"
    ) as HTMLIFrameElement | null;
    const container = document.getElementById("video-container");

    if (iframe && container && window.Vimeo) {
      const player = new window.Vimeo.Player(iframe);
      player.on("playing", () => {
        container.classList.add("loaded");
      });
      setTimeout(() => {
        if (!container.classList.contains("loaded")) {
          container.classList.add("loaded");
        }
      }, 2000);
    } else {
      setTimeout(() => {
        if (container) container.classList.add("loaded");
      }, 1500);
    }
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [modalOpen]);

  const scrollAndOpenModal = () => {
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setModalOpen(true), 600);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setFormSubmitted(true);
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setSubmitting(false);
      alert("Something went wrong. Please try again or email directly.");
    }
  };

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <a
            href="#"
            className="font-[family-name:var(--font-cinzel)] text-xl tracking-[0.2em] text-gold"
          >
            MAZIX MAHALEL
          </a>
          <div className="hidden md:flex items-center gap-12">
            <a
              href="#philosophy"
              className="text-sm tracking-[0.2em] uppercase text-white font-medium hover:text-gold transition-colors"
            >
              Philosophy
            </a>
            <a
              href="#transformation"
              className="text-sm tracking-[0.2em] uppercase text-white font-medium hover:text-gold transition-colors"
            >
              Transformation
            </a>
            <a
              href="#speaking"
              className="text-sm tracking-[0.2em] uppercase text-white font-medium hover:text-gold transition-colors"
            >
              Speaking
            </a>
            <a
              href="#investment"
              className="text-sm tracking-[0.2em] uppercase text-white font-medium hover:text-gold transition-colors"
            >
              Investment
            </a>
          </div>
          <button
            onClick={scrollAndOpenModal}
            className="text-sm font-semibold tracking-[0.2em] uppercase border border-gold/50 px-6 py-3 text-gold hover:bg-gold hover:text-black transition-all cursor-pointer"
          >
            Apply
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
        <div className="video-fallback"></div>

        <div id="video-container" className="video-bg-container">
          <iframe
            id="vimeo-player"
            src="https://player.vimeo.com/video/1157124649?background=1&autoplay=1&loop=1&muted=1&badge=0&autopause=0&player_id=0&app_id=58479"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            title="gold-mazix-background"
          ></iframe>
        </div>

        <div className="absolute inset-0 hero-overlay"></div>

        <div className="relative z-10 text-center px-8 max-w-5xl mx-auto pt-32">
          <p className="font-[family-name:var(--font-raleway)] text-xs tracking-[0.4em] uppercase text-gold mb-8 animate-fade-up">
            For Those Who Know There&apos;s More
          </p>
          <h1
            className="font-[family-name:var(--font-cinzel)] text-5xl md:text-7xl lg:text-8xl tracking-wide mb-8 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            THE FREQUENCY
            <br />
            <span className="gradient-gold">ARCHITECT</span>
          </h1>
          <div
            className="line-gold w-32 mx-auto mb-8 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          ></div>
          <p
            className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl lg:text-4xl text-text-light max-w-2xl mx-auto leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            Your body is the instrument.
            <br />
            Frequency is the music.
            <br />
            <em className="text-gold">
              I don&apos;t teach. I transmit. You remember.
            </em>
          </p>
          <button
            onClick={scrollAndOpenModal}
            className="mt-12 px-12 py-5 border border-gold text-gold font-[family-name:var(--font-raleway)] text-sm font-semibold tracking-[0.3em] uppercase hover:bg-gold hover:text-black transition-all animate-fade-up cursor-pointer"
            style={{ animationDelay: "0.8s" }}
          >
            Begin the Conversation
          </button>

          <a
            href="#philosophy"
            className="mt-16 flex flex-col items-center gap-3 cursor-pointer hover:text-gold transition-colors animate-fade-up"
            style={{ animationDelay: "1s" }}
          >
            <span className="text-xs tracking-[0.2em] uppercase text-text-light hover:text-gold transition-colors">
              Scroll
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent"></div>
          </a>
        </div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="py-32 px-8 bg-black-soft">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="reveal-left">
              <p className="font-[family-name:var(--font-raleway)] text-xs tracking-[0.4em] uppercase text-gold mb-6">
                The Truth
              </p>
              <h2 className="font-[family-name:var(--font-cinzel)] text-4xl md:text-5xl mb-8 leading-tight">
                You Were Never
                <br />
                Meant to <span className="gradient-gold">Push</span>
              </h2>
              <div className="space-y-6 text-text-light leading-relaxed">
                <p>
                  The world taught you that success requires force. Hustle.
                  Grind. Sacrifice.
                </p>
                <p>
                  But you&apos;ve felt it—those rare moments when everything
                  flows. When opportunities appear without effort. When the
                  right people find you. When money moves toward you like water
                  finding its level.
                </p>
                <p className="text-cream">
                  <strong>That wasn&apos;t luck. That was frequency.</strong>
                </p>
                <p>
                  Your body holds electromagnetic patterns—some inherited, some
                  absorbed, most unconscious. These patterns broadcast a signal
                  that shapes every aspect of your reality: what you attract,
                  what repels, what&apos;s possible.
                </p>
                <p className="text-xl font-[family-name:var(--font-cormorant)] text-gold italic">
                  I don&apos;t teach you to work harder. I teach you to become a
                  different signal.
                </p>
              </div>
            </div>
            <div className="reveal-right">
              <Image
                src="/images/mazix-transparent-solo.png"
                alt="Mazix Mahalel"
                width={600}
                height={800}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statement Section */}
      <section className="py-24 px-8 border-y border-gold/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="scroll-reveal-text font-[family-name:var(--font-cinzel)] text-3xl md:text-4xl lg:text-5xl leading-relaxed text-cream">
            &ldquo;When you master your frequency, you don&apos;t chase abundance—abundance recognizes you as home.&rdquo;
          </p>
          <p className="mt-8 text-xs tracking-[0.3em] uppercase text-gold reveal">
            — Mazix Mahalel
          </p>
        </div>
      </section>

      {/* Transformation Section */}
      <section id="transformation" className="py-32 px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 reveal">
            <p className="font-[family-name:var(--font-raleway)] text-xs tracking-[0.4em] uppercase text-gold mb-6">
              The Work
            </p>
            <h2 className="font-[family-name:var(--font-cinzel)] text-4xl md:text-5xl mb-6">
              Frequency Architecture
            </h2>
            <p className="font-[family-name:var(--font-cormorant)] text-xl text-text-light max-w-2xl mx-auto">
              A complete recalibration of your energetic signature at the
              cellular level.
            </p>
          </div>

          <div className="fluid-columns reveal">
            <article className="fluid-column">
              <div className="fluid-column-image">
                <Image
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=640&h=800&fit=crop"
                  alt="Decode"
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover"
                />
              </div>
              <div className="fluid-column-content">
                <h3 className="fluid-column-title">Decode</h3>
                <p className="fluid-column-description">
                  We map the unconscious frequency patterns running your nervous
                  system—the inherited beliefs, suppressed emotions, and energetic
                  blocks that keep you broadcasting limitation.
                </p>
                <div className="fluid-column-bottom">
                  <span className="fluid-column-dot"></span>
                  <span className="fluid-column-link">Explore</span>
                </div>
              </div>
            </article>

            <article className="fluid-column">
              <div className="fluid-column-image">
                <Image
                  src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=640&h=800&fit=crop"
                  alt="Dissolve"
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover"
                />
              </div>
              <div className="fluid-column-content">
                <h3 className="fluid-column-title">Dissolve</h3>
                <p className="fluid-column-description">
                  Through quantum energetic activation, we release the density
                  stored in your body. Not through force—through frequency. What
                  took years to accumulate can shift in moments.
                </p>
                <div className="fluid-column-bottom">
                  <span className="fluid-column-dot"></span>
                  <span className="fluid-column-link">Explore</span>
                </div>
              </div>
            </article>

            <article className="fluid-column">
              <div className="fluid-column-image">
                <Image
                  src="https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=640&h=800&fit=crop"
                  alt="Embody"
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="object-cover"
                />
              </div>
              <div className="fluid-column-content">
                <h3 className="fluid-column-title">Embody</h3>
                <p className="fluid-column-description">
                  You don&apos;t just clear the old—you architect the new. We
                  calibrate your system to the frequency of the reality
                  you&apos;re creating, until it becomes your natural state.
                </p>
                <div className="fluid-column-bottom">
                  <span className="fluid-column-dot"></span>
                  <span className="fluid-column-link">Explore</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section style={{ backgroundColor: "#000000" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 min-h-[700px]">
            <div className="relative h-64 md:h-auto reveal-left">
              <Image
                src="/images/frequency.jpg"
                alt="Frequency alignment"
                fill
                className="object-cover object-center"
              />
            </div>
            <div className="flex items-center px-8 md:px-16 py-20">
              <div className="reveal-right">
                <p className="font-[family-name:var(--font-raleway)] text-xs tracking-[0.4em] uppercase text-gold mb-6">
                  The Result
                </p>
                <h2 className="font-[family-name:var(--font-cinzel)] text-4xl md:text-5xl mb-8 leading-tight">
                  When Body & Frequency{" "}
                  <span className="gradient-gold">Align</span>
                </h2>
                <div className="space-y-4 mb-10">
                  {[
                    "Decisions become instant and clear—no more second-guessing",
                    "Money flows without the energetic residue of struggle",
                    "Relationships recalibrate—some deepen, others naturally release",
                    "Your physical body responds—chronic patterns often dissolve",
                    "Opportunities appear that match your new frequency",
                    "You stop efforting and start receiving",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-text-light">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-32 px-8 bg-black-soft border-y border-gold/10">
        <div className="max-w-5xl mx-auto">
          <header className="text-center mb-20 reveal">
            <p className="font-[family-name:var(--font-raleway)] text-xs tracking-[0.4em] uppercase text-gold mb-6">
              Transformations
            </p>
            <h2 className="font-[family-name:var(--font-cinzel)] text-4xl md:text-5xl">
              Those Who&apos;ve <span className="gradient-gold">Transformed</span>
            </h2>
          </header>

          {/* Testimonial 1 */}
          <article className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="aspect-[4/5] rounded-lg overflow-hidden relative reveal-left">
              <Image
                src="/images/james-orsulak.jpg"
                alt="James Orsulak"
                fill
                className="object-cover"
              />
            </div>
            <div className="reveal-right">
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl text-cream leading-snug mb-6">
                &ldquo;Her ability to help me recognize my own strengths and
                potential has been{" "}
                <em className="text-gold">transformative</em>.&rdquo;
              </h3>
              <p className="text-text-light leading-relaxed mb-4">
                Working with Mazix has been one of the most profound and
                transformative experiences of my life. She is a spectacular
                guide who has helped me navigate the complexities of the
                universe with ease and grace.
              </p>
              <p className="text-text-light leading-relaxed mb-6">
                What sets Mazix apart is the depth of her emotional connection
                with her clients. She has been a true friend and confidante, and
                I can honestly say that I am a better, more confident person
                because of her guidance. I highly recommend Mazix to anyone
                looking for a compassionate, skilled guide on their spiritual
                journey.
              </p>
              <p className="font-[family-name:var(--font-cormorant)] text-xl text-cream">
                James Orsulak
              </p>
              <p className="text-gold text-xs tracking-[0.2em] uppercase mt-1">
                Entrepreneur & Visionary Innovator
              </p>
            </div>
          </article>

          {/* Testimonial 2 */}
          <article className="grid md:grid-cols-2 gap-12 items-center mb-24">
            <div className="md:order-2 aspect-[4/5] rounded-lg overflow-hidden relative reveal-right">
              <Image
                src="/images/natalia-levey.jpg"
                alt="Natalia Levey"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:order-1 reveal-left">
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl text-cream leading-snug mb-6">
                &ldquo;The depth of Mazix&apos;s soulful insights is{" "}
                <em className="text-gold">astonishing</em>.&rdquo;
              </h3>
              <p className="text-text-light leading-relaxed mb-4">
                Mazix has an incredible capacity for love, and is totally
                non-judgmental. In our time together, I was able to release
                self-doubt. I now know I don&apos;t have to hold on to life
                patterns that were established generations ago and are no longer
                serving me.
              </p>
              <p className="text-text-light leading-relaxed mb-6">
                I felt like she held the most sacred space for me, allowing for
                vulnerability and deep exploration of ancestral patterns. Being
                able to let go of the nagging feeling of low self worth was
                freeing.
              </p>
              <p className="font-[family-name:var(--font-cormorant)] text-xl text-cream">
                Natalia Levey
              </p>
              <p className="text-gold text-xs tracking-[0.2em] uppercase mt-1">
                Celebrity Chef & Restaurateur
              </p>
            </div>
          </article>

          {/* Testimonial 3 */}
          <article className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/5] rounded-lg overflow-hidden relative reveal-left">
              <Image
                src="/images/veena-sidhu.jpg"
                alt="Veena Sidhu"
                fill
                className="object-cover"
              />
            </div>
            <div className="reveal-right">
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl text-cream leading-snug mb-6">
                &ldquo;She&apos;s led me closer to my{" "}
                <em className="text-gold">purpose</em>.&rdquo;
              </h3>
              <p className="text-text-light leading-relaxed mb-4">
                On my first call with Mazix, she pushed me on my purpose. She
                said there was more I was supposed to do that I wasn&apos;t
                doing. She unblocked an unconscious fear for me. About 48 hours
                later, I had a download and a vision of something I was supposed
                to build that connected all the dots.
              </p>
              <p className="text-text-light leading-relaxed mb-6">
                In 2 short months, this vision materialized, and I&apos;m moving
                full steam ahead with newfound passion and purpose. My ability
                to feel passion, joy and become truly magnetic has expanded
                tenfold! What&apos;s more important is to see these changes
                spill into my family and my clients, whom I truly cherish.
              </p>
              <p className="font-[family-name:var(--font-cormorant)] text-xl text-cream">
                Veena Sidhu
              </p>
              <p className="text-gold text-xs tracking-[0.2em] uppercase mt-1">
                Business Strategy & Innovation Consultant
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Speaking Section */}
      <section id="speaking" className="py-32 px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="font-[family-name:var(--font-raleway)] text-xs tracking-[0.4em] uppercase text-gold mb-6">
              Collaborate
            </p>
            <h2 className="font-[family-name:var(--font-cinzel)] text-4xl md:text-5xl mb-6">
              Book <span className="gradient-gold">Mazix</span>
            </h2>
            <p className="font-[family-name:var(--font-cormorant)] text-xl text-text-light max-w-2xl mx-auto">
              Activating audiences worldwide through keynotes, podcasts,
              summits, and immersive experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
            <div className="reveal-left">
              <div className="aspect-[4/5] rounded-lg overflow-hidden relative">
                <Image
                  src="/images/mazix-speaker.jpg"
                  alt="Mazix Mahalel - Speaker"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="reveal-right">
              <p className="font-[family-name:var(--font-raleway)] text-xs tracking-[0.4em] uppercase text-gold mb-6">
                Signature Topics
              </p>
              <p className="text-text-light text-sm mb-8">
                Mazix speaks on the following topics or can design something
                tailored to your audience:
              </p>

              <div className="space-y-4 mb-10">
                {[
                  "Awaken Your Multidimensional Power for Greater Success & Impact",
                  "Nervous System Mastery for High-Performing Leaders",
                  "Quantum Manifestation: From Frequency to Financial Flow",
                  "Embodied Leadership in the Age of AI & Uncertainty",
                  "The Key to Your Most Authentic Self: Becoming Ultra Magnetic",
                  "Masculine & Feminine Energy Integration for Divine Union",
                  "Burnout to Breakthrough: Reclaiming Your Energy as a High Achiever",
                  "Becoming a New World Leader: Creating the New Earth",
                ].map((topic, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                    <p className="text-cream">{topic}</p>
                  </div>
                ))}
              </div>

              <div className="line-gold w-full mb-8"></div>

              <p className="text-text-light text-sm italic mb-6">
                &ldquo;Her guidance is more profound than any other work
                I&apos;ve ever done in my entire life... COMBINED!&rdquo;
                <span className="block mt-2 text-gold not-italic">
                  — Anastasia Dadashpour, Author & Hotel Owner
                </span>
              </p>
            </div>
          </div>

          {/* Speaking CTA */}
          <div className="bg-black-soft border border-gold/20 p-10 md:p-12 glow reveal">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="font-[family-name:var(--font-cinzel)] text-2xl md:text-3xl mb-4 text-cream">
                  Ready to Elevate Your Event?
                </p>
                <p className="text-text-light mb-6">
                  Mazix delivers transmissions—not just talks. Your audience
                  will leave activated, not just informed.
                </p>
                <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">
                  Book Mazix As Your
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Podcast Guest",
                    "Keynote Speaker",
                    "Summit Speaker",
                    "Retreat Facilitator",
                    "Workshop Leader",
                    "Festival Facilitator",
                  ].map((role, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-gold text-xs">&#9670;</span>
                      <span className="text-text-light text-sm">{role}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center md:text-right">
                <a
                  href="mailto:team@mazixmahalel.com?subject=Speaking%20Inquiry"
                  className="inline-block px-12 py-5 bg-gold text-black font-[family-name:var(--font-raleway)] text-xs tracking-[0.3em] uppercase hover:bg-gold-light transition-colors mb-4"
                >
                  Submit Inquiry
                </a>
                <p className="text-text-light text-sm">
                  Or email directly:
                  <br />
                  <a
                    href="mailto:team@mazixmahalel.com"
                    className="text-gold hover:text-gold-light transition-colors"
                  >
                    team@mazixmahalel.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section id="investment" className="py-32 px-8 bg-black-soft">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="font-[family-name:var(--font-raleway)] text-xs tracking-[0.4em] uppercase text-gold mb-6">
              The Investment
            </p>
            <h2 className="font-[family-name:var(--font-cinzel)] text-4xl md:text-5xl mb-8">
              The Private Partnership
            </h2>
            <p className="font-[family-name:var(--font-cormorant)] text-xl text-text-light max-w-2xl mx-auto">
              An intimate six-month container for complete energetic
              restructuring. This is not coaching. This is transmission.
            </p>
          </div>

          <div className="bg-black border border-gold/20 p-10 md:p-16 glow reveal">
            <div className="text-center mb-12">
              <p className="font-[family-name:var(--font-cinzel)] text-5xl md:text-6xl gradient-gold mb-4">
                $100,000
              </p>
              <p className="text-text-light text-sm">
                Six-Month Private Container
              </p>
            </div>

            <div className="line-gold w-32 mx-auto mb-12"></div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4 mb-12">
              <div className="space-y-4">
                <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">
                  Private Sessions & Support
                </p>
                {[
                  "Weekly 90-minute private transmission sessions",
                  "Unlimited voice & text access between sessions",
                  "Emergency support calls when needed",
                  "Session recordings for integration",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-gold mt-0.5">✦</span>
                    <p className="text-text-light text-sm">{item}</p>
                  </div>
                ))}

                <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 pt-6">
                  In-Person Immersions
                </p>
                {[
                  "Two 2-day private immersion retreats",
                  "Luxury accommodations included",
                  "Personalized somatic & energetic bodywork",
                  "Private chef & wellness concierge",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-gold mt-0.5">✦</span>
                    <p className="text-text-light text-sm">{item}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4">
                  Custom Protocols & Tools
                </p>
                {[
                  "Personalized frequency calibration protocols",
                  "Custom audio transmissions for daily use",
                  "Nervous system regulation toolkit",
                  "Energetic architecture blueprint",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-gold mt-0.5">✦</span>
                    <p className="text-text-light text-sm">{item}</p>
                  </div>
                ))}

                <p className="text-gold text-xs tracking-[0.2em] uppercase mb-4 pt-6">
                  Ongoing & Lifetime Access
                </p>
                {[
                  "Priority access for future work together",
                  "Lifetime access to private resource vault",
                  "Alumni circle for continued integration",
                  "One year of quarterly check-in calls post-container",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-gold mt-0.5">✦</span>
                    <p className="text-text-light text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center pt-6 border-t border-gold/10">
              <p className="text-xs text-text-light italic">
                Limited to 4 clients per year. Application & conversation
                required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section id="apply" className="py-32 px-8 bg-black relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto text-center reveal">
          <p className="font-[family-name:var(--font-raleway)] text-xs tracking-[0.4em] uppercase text-gold mb-6">
            Begin
          </p>
          <h2 className="font-[family-name:var(--font-cinzel)] text-4xl md:text-6xl mb-8">
            The Signal Has <span className="gradient-gold">Found You</span>
          </h2>
          <p className="font-[family-name:var(--font-cormorant)] text-xl text-text-light max-w-xl mx-auto mb-12">
            This page found its way to you for a reason. If something in these
            words activated recognition—not just interest, but{" "}
            <em>knowing</em>—then we should speak.
          </p>

          <button
            onClick={() => setModalOpen(true)}
            className="px-16 py-6 bg-gold text-black font-[family-name:var(--font-raleway)] text-sm tracking-[0.3em] uppercase hover:bg-gold-light transition-colors cursor-pointer"
          >
            Begin the Conversation
          </button>

          <p className="mt-8 text-text-light text-sm">
            Applications reviewed within 48 hours. Not everyone is accepted.
          </p>
        </div>
      </section>

      {/* Application Modal */}
      <div
        className={`modal-overlay ${modalOpen ? "active" : ""}`}
        onClick={() => setModalOpen(false)}
      ></div>
      <div className={`modal-container ${modalOpen ? "active" : ""}`}>
        <div className="modal-content relative">
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-4 right-4 text-text-light hover:text-gold transition-colors text-2xl leading-none"
          >
            &times;
          </button>

          <div className="text-center mb-8">
            <p className="font-[family-name:var(--font-raleway)] text-xs tracking-[0.4em] uppercase text-gold mb-4">
              Private Partnership Application
            </p>
            <h3 className="font-[family-name:var(--font-cinzel)] text-2xl md:text-3xl mb-3">
              Begin the Conversation
            </h3>
            <p className="font-[family-name:var(--font-raleway)] text-sm text-text-light">
              This is the first step. Share what&apos;s calling you forward.
            </p>
          </div>

          {formSubmitted ? (
            <div className="text-center py-8">
              <p className="font-[family-name:var(--font-cinzel)] text-2xl text-gold mb-4">
                Application Received
              </p>
              <p className="text-text-light">
                Thank you. We&apos;ll be in touch within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="hidden"
                name="access_key"
                value="7da4236b-2008-4d2f-9487-279550333c0f"
              />
              <input
                type="hidden"
                name="subject"
                value="New Private Partnership Application - Mazix Mahalel"
              />
              <input type="hidden" name="from_name" value="Mazix Website" />

              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="form-input"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="form-input"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone (optional)"
                  className="form-input"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="What's shifting in your life right now? What are you ready to create?"
                  required
                  className="form-input form-textarea"
                ></textarea>
              </div>
              <div>
                <textarea
                  name="why"
                  placeholder="Why does this work call to you?"
                  className="form-input form-textarea"
                  style={{ minHeight: "80px" }}
                ></textarea>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-5 bg-gold text-black font-[family-name:var(--font-raleway)] text-sm tracking-[0.3em] uppercase hover:bg-gold-light transition-colors disabled:opacity-50"
                >
                  {submitting ? "Sending..." : "Submit Application"}
                </button>
              </div>
            </form>
          )}

          <p className="text-center text-xs text-text-light mt-6">
            Your information is held sacred and never shared.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-16 px-8 bg-black-soft border-t border-gold/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="font-[family-name:var(--font-cinzel)] text-2xl tracking-[0.3em] text-gold mb-2">
              MAZIX MAHALEL
            </p>
            <p className="text-text-light text-sm">The Frequency Architect</p>
          </div>
          <div className="flex gap-8">
            <a
              href="#"
              className="text-text-light hover:text-gold transition-colors text-sm"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-text-light hover:text-gold transition-colors text-sm"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-text-light hover:text-gold transition-colors text-sm"
            >
              Contact
            </a>
          </div>
          <p className="text-text-light text-xs">
            © 2026 Mazix Mahalel. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
