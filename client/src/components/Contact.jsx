import { motion } from "framer-motion";
import contactHero from "../assets/contact.png";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const Contact = () => {
  return (
    <div className="text-white overflow-hidden">

      {/* ============== HERO SECTION ================= */}
      <section className="min-h-[95vh] bg-black flex items-center px-6 md:px-20">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">

          {/* LEFT - TEXT */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <p className="text-[#c9a27d] text-lg leading-relaxed">
              Contact Us
            </p>
            
            <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-wide leading-tight">
              Let’s Illuminate Your Vision
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Whether you're designing a home, office, or commercial space,
              Urban Lights Luxury is here to bring brilliance and elegance to your project.
              Connect with us and let’s create something extraordinary together.
            </p>
          </motion.div>

          {/* RIGHT - IMAGE */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex justify-center md:justify-end"
          >
            <img
              src={contactHero}
              alt="Contact Urban Lights Luxury"
              className="w-full max-w-md md:max-w-lg object-contain drop-shadow-2xl"
            />
          </motion.div>

        </div>
      </section>

      {/* ================= CONTACT FORM SECTION ================= */}
      <section className="bg-[#4b3b2c] py-24 px-6 md:px-20">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* LEFT - CONTACT INFO */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-8 text-white">
              Get In Touch
            </h2>

            <div className="space-y-6 text-gray-200">
              <div>
                <h3 className="text-xl mb-2">Visit Our Showroom</h3>
                <p>1st floor Skyline building, kadru, Ranchi-834002</p>
              </div>


              <div>
                <h3 className="text-xl mb-2">Call Us</h3>
                <p>+91 9835905906</p>
              </div>

              <div>
                <h3 className="text-xl mb-2">Email</h3>
                <p>UrbanLightsranchi@gmail.com</p>
              </div>

              <div>
                <h3 className="text-xl mb-2">Working Hours</h3>
                <p>Monday – Saturday : 10:00 AM – 7:00 PM</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT - FORM */}
          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-4 bg-black/30 border border-gray-400 rounded-lg focus:outline-none focus:border-white"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-4 bg-black/30 border border-gray-400 rounded-lg focus:outline-none focus:border-white"
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full p-4 bg-black/30 border border-gray-400 rounded-lg focus:outline-none focus:border-white"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full p-4 bg-black/30 border border-gray-400 rounded-lg focus:outline-none focus:border-white"
            ></textarea>

            <button
              type="submit"
              className="bg-black text-white px-8 py-4 rounded-lg hover:bg-white hover:text-black transition duration-300"
            >
              Send Message
            </button>
          </motion.form>

        </div>
      </section>

      {/* ================= CTA / LOCATION SECTION ================= */}
      <section className="bg-black py-24 px-6 md:px-20 text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl mb-6">
            Experience Luxury Lighting Firsthand
          </h2>

          <p className="text-gray-400 mb-8 leading-relaxed">
            Visit our showroom to explore our exclusive collection of
            handcrafted lighting designs and discover how we can transform
            your space with timeless elegance.
          </p>

          <button className="border border-white px-8 py-4 rounded-lg hover:bg-white hover:text-black transition duration-300">
            Visit Showroom
          </button>
        </motion.div>
      </section>

    </div>
  );
};

export default Contact;