import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";

import chandelier from "../assets/chandelier.jpg";
import banner from "../assets/bann.jpg";

/* Collection Images */
import chandelierImg from "../assets/collection/chandelier1.jpg";
import wallImg from "../assets/collection/wall lamps.jpg";
import pendantImg from "../assets/collection/pendant.jpg";
import duplexImg from "../assets/collection/Duplex.jpg";
import outdoorImg from "../assets/collection/Outdoor.jpg";
import fansImg from "../assets/collection/Fans.jpg";
import lampImg from "../assets/collection/Lamp.jpg";
import spotlightsImg from "../assets/collection/Spotlights.jpg";
import artifactsImg from "../assets/collection/Artifacts.jpg";

/* Explore Images */
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
  { name: "Architecter Lights", image: spotlightsImg },
  { name: "Artifacts", image: artifactsImg },
];

const testimonials = [
  {
    text: "Exceptional craftsmanship and luxury finish. The lighting completely changed our home.",
    author: "Luxury Villa Client",
  },
  {
    text: "Premium quality and elegant designs. Urban Lights Luxury exceeded our expectations.",
    author: "Interior Designer",
  },
  {
    text: "From consultation to installation, everything was smooth and professional.",
    author: "Hotel Project Client",
  },
];

const Hero = () => {

  const exploreImages = [Explore1, Explore2, Explore3, Explore4, Explore5, Explore6];

  const dispatch = useDispatch();
  const { items: products } = useSelector((state) => state.products || { items: [] });
  const featuredProducts = (products || []).filter(p => !!p?.isFeatured).slice(0, 6);

  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts({ featured: true }));

    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <>

      {/* ================= HERO ================= */}


      <section
        className="relative min-h-[80vh] md:min-h-screen flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${chandelier})` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        {/* LEFT SIDE CONTENT */}
        <div className="relative z-10 w-full px-8 md:px-20 lg:px-28 py-20 flex justify-start">

          <div className="max-w-xl">

            <h1 className="text-white font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">

              Urban Lights Luxury <br />

              <span className="text-[#c9a27d]">Illuminate Your</span> <br />

              Space in Style

            </h1>

            {/* Button Link */}

            <Link to="/products">

              <button className="mt-8 bg-[#c9a27d] px-8 py-3 text-black font-semibold rounded-md hover:bg-[#c9a635] transition">

                Shop Chandeliers

              </button>

            </Link>

          </div>

        </div>

      </section>

      {/* ================= COLLECTION ================= */}

      <section className="bg-black py-16 md:py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-10 place-items-center">

            {collections.map((item, index) => (
              <Link to={`/category/${item.name}`} key={index} className="text-center group cursor-pointer block">
                <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden group-hover:scale-105 transition border-2 border-transparent group-hover:border-[#c9a27d]/20">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>
                <p className="mt-4 text-white text-xs md:text-sm tracking-[0.2em] uppercase font-light group-hover:text-[#c9a27d] transition-colors">
                  {item.name}
                </p>
              </Link>
            ))}

          </div>

        </div>

      </section>


      {/* ================= EXPLORE ================= */}

      <section className="bg-[#3f372e] py-20 text-white">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-5xl font-serif text-[#c9a27d] mb-6">
            Explore Urban Lights Luxury
          </h2>

          <p className="max-w-xl mx-auto text-gray-300 mb-14">
            Discover our premium lighting collection crafted for luxury interiors.
          </p>


          {/* MOBILE SLIDER */}
          <div className="flex md:hidden gap-6 overflow-x-auto pb-4 scroll-smooth px-4">
            {exploreImages.map((img, i) => (
              <div key={i} className="min-w-[80%] bg-transparent text-left">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={img}
                    alt="Luxury Lighting"
                    className="w-full h-72 object-cover border border-[#c9a27d]/10"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a27d] font-bold">
                    product
                  </p>
                  <h3 className="text-lg font-light text-white tracking-wide">
                    Luxury Lighting Collection
                  </h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    Elegant lighting solutions designed for modern spaces.
                  </p>
                  <p className="text-base font-semibold text-[#c9a27d] pt-1">
                    Rs 1200
                  </p>
                </div>
              </div>
            ))}
          </div>


          {/* DESKTOP GRID */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-10">
            {exploreImages.map((img, i) => (
              <div key={i} className="group text-left">
                <div className="overflow-hidden h-72 md:h-80 bg-[#1a1a1a] rounded-sm relative">
                  <img
                    src={img}
                    alt="Luxury Lighting"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out grayscale-[0.2] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <div className="mt-6 space-y-1.5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a27d] font-bold group-hover:text-white transition-colors">
                    product
                  </p>
                  <h3 className="text-xl font-light text-white tracking-widest leading-tight">
                    Luxury Lighting Collection
                  </h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed line-clamp-2">
                    Elegant lighting solutions designed for modern spaces.
                  </p>
                  <p className="text-lg font-medium text-white/90 pt-1">
                    Rs 1200
                  </p>
                </div>
              </div>
            ))}
          </div>


          {/* Explore More Button */}

          <div className="mt-14">

            <Link to="/products">

              <button className="bg-[#c9a27d] text-black px-10 py-3 rounded-full font-semibold hover:bg-[#d8b48a] transition">

                Explore More

              </button>

            </Link>

          </div>

        </div>

      </section>


      {/* ================= PREMIUM SPLIT ================= */}

      <section className="flex flex-col lg:flex-row">

        <div className="lg:w-1/2 bg-[#b89572] flex items-center">

          <div className="px-8 md:px-16 py-16">

            <h1 className="text-3xl md:text-5xl font-semibold text-[#3b342d] leading-tight mb-6">

              Premium Lighting <br /> & Chandeliers

            </h1>

            <p className="text-[#3b342d] max-w-md">

              From modern homes to luxury hotels, we design lighting that brings warmth and elegance.

            </p>

          </div>

        </div>

        <div className="lg:w-1/2">

          <img
            src={banner}
            className="w-full h-[350px] md:h-[500px] lg:h-[650px] object-cover"
          />

        </div>

      </section>


      {/* ================= TESTIMONIAL ================= */}

      <section className="bg-[#3f372e] py-20">

        <div className="max-w-4xl mx-auto px-6 text-center">

          <h2 className="text-3xl md:text-5xl font-serif text-[#c9a27d] mb-12">
            What Our Clients Say
          </h2>

          <AnimatePresence mode="wait">

            <motion.div
              key={testimonialIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              className="border border-[#c9a27d]/40 p-8 text-white"
            >

              <p className="italic mb-4">

                “{testimonials[testimonialIndex].text}”

              </p>

              <p className="text-[#c9a27d] text-sm">

                — {testimonials[testimonialIndex].author}

              </p>

            </motion.div>

          </AnimatePresence>

        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="bg-black py-24">

        <div className="max-w-3xl mx-auto text-center px-6">

          <h2 className="text-3xl md:text-5xl text-white font-serif mb-6">

            Let’s Light Up Your Space

          </h2>

          <p className="text-gray-400 mb-8">

            Connect with us to design lighting that defines luxury and elegance.

          </p>

          <button className="bg-[#c9a27d] px-10 py-3 rounded-full text-black font-semibold">

            Contact Us

          </button>

        </div>

      </section>

    </>
  );
};

export default Hero;