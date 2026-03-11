const Footer = () => {
  return (
    <footer className="bg-[#3f372e] px-8 py-10 text-[#c9a27d]">

      {/* Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 border border-[#c9a27d]/40 p-6">

        {/* LEFT BOX (Navigation + Company Together) */}
        <div className="border border-[#c9a27d]/40 p-6">
          
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Main Navigation */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Navigation</h3>
              <ul className="space-y-2 text-lg font-light">
                <li className="cursor-pointer hover:opacity-70">Home</li>
                <li className="cursor-pointer hover:opacity-70">Projects</li>
                <li className="cursor-pointer hover:opacity-70">About</li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Our Story</li>
                <li>Careers</li>
                <li>Blogs</li>
                <li>Privacy Policy</li>
              </ul>
            </div>

          </div>
        </div>

        {/* RIGHT BOX */}
        <div className="border border-[#c9a27d]/40 p-6">

          {/* Social Icons */}
          <div className="flex gap-3 mb-6">
            {["A", "F", "in", "X", "O"].map((icon, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border border-[#c9a27d] flex items-center justify-center hover:bg-[#c9a27d] hover:text-[#3f372e] transition cursor-pointer text-xs"
              >
                {icon}
              </div>
            ))}
          </div>

          {/* Links Grid */}
          <div className="grid md:grid-cols-3 gap-6 text-sm mb-6">

            {/* Useful Links */}
            <div>
              <h3 className="text-sm font-semibold mb-2">Useful Links</h3>
              <ul className="space-y-1 opacity-80">
                <li>Returns</li>
                <li>Consultation</li>
                <li>Signature</li>
                <li>Store Locator</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold mb-2">Contact</h3>
              <p className="opacity-80 text-xs mb-2">
                +91 9971772611
              </p>
              <p className="text-xs opacity-70">
                76–86 Manners Street <br />
                Wellington 6140, New Zealand
              </p>
            </div>

            {/* Payments */}
            <div>
              <h3 className="text-sm font-semibold mb-2">We accept</h3>
              <div className="grid grid-cols-2 gap-1 text-xs opacity-80">
                <div>Visa</div>
                <div>Mastercard</div>
                <div>RuPay</div>
                <div>PayPal</div>
              </div>
            </div>

          </div>

          {/* Credits */}
          <div className="flex justify-between text-xs opacity-70">
            <p>© 2024 Urban Lights Luxury</p>
            <p>Future Things ↗</p>
          </div>

        </div>
      </div>

      {/* Big Branding Text */}
      <div className="mt-10 text-center">
        <h1 className="text-[8vw] leading-none font-serif opacity-90">
          Urban Lights Luxury
        </h1>
      </div>

    </footer>
  );
};

export default Footer;
