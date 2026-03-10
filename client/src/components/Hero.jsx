import { AnimatePresence } from "framer-motion";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";
import chandelier from "../assets/chandelier.jpg";
import banner from "../assets/bann.jpg";

// Collection Images
import chandelierImg from "../assets/collection/chandelier1.jpg";
import wallImg from "../assets/collection/wall lamps.jpg";
import pendantImg from "../assets/collection/pendant.jpg";
import duplexImg from "../assets/collection/Duplex.jpg";
import outdoorImg from "../assets/collection/Outdoor.jpg";
import fansImg from "../assets/collection/Fans.jpg";
import lampImg from "../assets/collection/Lamp.jpg";
import spotlightsImg from "../assets/collection/Spotlights.jpg";
import artifactsImg from "../assets/collection/Artifacts.jpg";

// Explore Images
import Explore1 from "../assets/Explore/Explore1.jpg";
import Explore2 from "../assets/Explore/Explore2.jpg";
import Explore3 from "../assets/Explore/Explore3.jpg";
import Explore4 from "../assets/Explore/Explore4.jpg";
import Explore5 from "../assets/Explore/Explore5.jpg";
import Explore6 from "../assets/Explore/Explore6.jpg";

const collections = [
  { name: "Chandeliers", image: chandelierImg },
  { name: "Wall Lights", image: wallImg },
  { name: "Pendants", image: pendantImg },
  { name: "Duplex", image: duplexImg },
  { name: "Outdoor", image: outdoorImg },
  { name: "Fans", image: fansImg },
  { name: "Lamps", image: lampImg },
  { name: "Spotlights", image: spotlightsImg },
  { name: "Artifacts", image: artifactsImg },
];

// ================= TESTIMONIAL DATA =================
const testimonials = [
  {
    text:
      "Exceptional craftsmanship and luxury finish. The lighting completely changed our home.",
    author: "Luxury Villa Client",
  },
  {
    text:
      "Premium quality and elegant designs. Urban Lights exceeded our expectations.",
    author: "Interior Designer",
  },
  {
    text:
      "From consultation to installation, everything was smooth and professional.",
    author: "Hotel Project Client",
  },
];

const Hero = () => {
  const exploreImages = [
    Explore1,
    Explore2,
    Explore3,
    Explore4,
    Explore5,
    Explore6,
  ];

  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 3;

  const [visibleSections, setVisibleSections] = useState({});

  // Auto slider
  useEffect(() => {
  const timer = setInterval(() => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  }, 4000);

  return () => clearInterval(timer);
}, []);

  

  // Scroll reveal animation
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".reveal");

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setVisibleSections((prev) => ({
            ...prev,
            [section.dataset.id]: true,
          }));
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden bg-center bg-cover"
        style={{ backgroundImage: `url(${chandelier})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20 z-10"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full">

          <h1 className="font-serif text-white text-4xl md:text-5xl xl:text-6xl leading-tight">
            Urban Lights <br />
            <span className="text-[#c9a27d]">Illuminate Your</span> <br />
            Space in Style
          </h1>

          <button className="mt-10 bg-[#c9a27d] text-black px-10 py-4 rounded-md font-semibold tracking-wide hover:bg-[#c9a635] transition">
            Shop Chandeliers
          </button>
        </div>
      </section>

      {/* ================= COLLECTION SECTION ================= */}
      <section className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-10 place-items-center">
            {collections.map((item, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="w-64 h-64 rounded-full overflow-hidden transition duration-500 group-hover:scale-105">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>
                <p className="mt-5 text-white tracking-wide text-sm">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXPLORE SECTION ================= */}
      <section className="bg-[#3f372e] py-28 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#c9a27d] mb-6">
            Explore Urban Lights
          </h2>

          <p className="max-w-2xl mx-auto text-gray-200 mb-16">
            Discover our premium lighting collection crafted for luxury interiors.
          </p>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
              }}
            >
              {exploreImages.map((img, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 lg:w-1/3 px-4 flex-shrink-0"
                >
                  <div className="overflow-hidden">
                    <img
                      src={img}
                      alt={`Explore ${index}`}
                      className="w-full h-[400px] object-cover hover:scale-105 transition duration-500"
                    />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    Luxury Lighting Collection
                  </h3>

                  <p className="text-gray-300 text-sm mt-2">
                    Elegant lighting solutions designed for modern spaces.
                  </p>

                  <p className="mt-3 text-sm">Rs 1200</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <button className="bg-[#c9a27d] text-black px-8 py-3 rounded-full hover:bg-[#c9a635] transition">
              ✦ Explore More
            </button>
          </div>
        </div>
      </section>

      {/* ================= PREMIUM SPLIT SECTION ================= */}
      <section className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 bg-[#b89572] flex items-center">
          <div className="max-w-xl px-10 lg:px-20 py-16">
            <p className="text-lg font-medium text-[#3b342d] mb-6">
              UrbanLights
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#3b342d] leading-tight mb-6">
              Premium Lighting <br />
              & Chandeliers
            </h1>

            <p className="text-[#3b342d] text-base leading-relaxed max-w-md">
              From modern homes to luxury hotels, we design lighting that
              brings life, warmth, and elegance to every corner.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <img
            src={banner}
            alt="Premium Lighting"
            className="w-full h-[520px] object-cover lg:h-[700px]"
          />
        </div>
      </section>
    
      {/* ================= TESTIMONIAL SECTION ================= */}
      <section className="bg-[#3f372e] py-28">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-[#c9a27d] mb-20">
            What Our Clients Say
          </h2>

          <div className="relative h-[220px] flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8 }}
                className="border border-[#c9a27d]/40 p-10 max-w-xl text-white"
              >
                <p className="italic text-sm leading-relaxed mb-6">
                  “{testimonials[testimonialIndex].text}”
                </p>

                <p className="text-[#c9a27d] text-sm">
                  — {testimonials[testimonialIndex].author}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-3 mt-10">
            {testimonials.map((_, i) => (
              <span
                key={i}
                className={`w-2.5 h-2.5 rounded-full ${
                  testimonialIndex === i
                    ? "bg-[#c9a27d]"
                    : "bg-[#c9a27d]/40"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </section>
      

      {/* ================= CTA SECTION ================= */}
      <section className="bg-black py-32">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">
            Let’s Light Up Your Space
          </h2>

          <p className="text-gray-400 mb-10">
            Connect with us to design lighting that defines luxury and elegance.
          </p>

          <button className="bg-[#c9a27d] text-black px-12 py-4 rounded-full font-semibold hover:opacity-90 transition">
            Contact Us
          </button>
        </div>
      </section>
      

    </>
  );
};

export default Hero;
