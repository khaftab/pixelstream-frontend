import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 px-4 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-400">
              TranscodePro is a powerful video transcoding tool designed to help you convert and
              optimize videos effortlessly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-500 transition duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-500 transition duration-300">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-500 transition duration-300">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-500 transition duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="text-gray-400 space-y-2">
              <li>Email: support@transcodepro.com</li>
              <li>Phone: +1 (123) 456-7890</li>
              <li>Address: 123 Tech Street, Silicon Valley</li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-500 transition duration-300">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 4.56v14.91c0 .97-.79 1.76-1.76 1.76H1.76C.79 21.23 0 20.44 0 19.47V4.56C0 3.59.79 2.8 1.76 2.8h20.48c.97 0 1.76.79 1.76 1.76zM9.6 17.28v-6.72H7.2v6.72h2.4zm-1.2-7.68c.79 0 1.44-.65 1.44-1.44 0-.79-.65-1.44-1.44-1.44-.79 0-1.44.65-1.44 1.44 0 .79.65 1.44 1.44 1.44zm10.08 7.68v-3.84c0-2.05-.44-3.6-2.81-3.6-1.14 0-1.9.62-2.21 1.22h-.03v-1.04H11.2v6.72h2.4v-3.36c0-.89.17-1.76 1.28-1.76 1.11 0 1.12 1.04 1.12 1.81v3.31H18.4z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition duration-300">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22.23 5.924c-.806.358-1.67.6-2.577.708a4.515 4.515 0 001.98-2.49 9.022 9.022 0 01-2.86 1.09 4.507 4.507 0 00-7.677 4.108 12.8 12.8 0 01-9.29-4.71 4.507 4.507 0 001.394 6.014 4.48 4.48 0 01-2.04-.563v.057a4.507 4.507 0 003.616 4.415 4.52 4.52 0 01-2.034.077 4.507 4.507 0 004.21 3.13 9.038 9.038 0 01-5.6 1.93c-.364 0-.724-.022-1.08-.063a12.78 12.78 0 006.92 2.03c8.3 0 12.84-6.88 12.84-12.84 0-.195-.004-.39-.013-.584a9.172 9.172 0 002.26-2.34z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-500 transition duration-300">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 5.5 4.46 9.96 9.96 9.96 5.5 0 9.96-4.46 9.96-9.96 0-5.5-4.46-9.96-9.96-9.96zm0 1.5c4.69 0 8.46 3.77 8.46 8.46 0 4.69-3.77 8.46-8.46 8.46-4.69 0-8.46-3.77-8.46-8.46 0-4.69 3.77-8.46 8.46-8.46zm-2.77 3.31v8.3h2.77v-8.3h-2.77zm1.38 4.15c-.9 0-1.63-.73-1.63-1.63 0-.9.73-1.63 1.63-1.63.9 0 1.63.73 1.63 1.63 0 .9-.73 1.63-1.63 1.63zm5.54 4.15v-4.64c0-2.48-1.35-3.64-3.15-3.64-1.45 0-2.1.8-2.46 1.36v-1.16h-2.77v8.3h2.77v-4.13c0-1.08.2-2.13 1.55-2.13 1.33 0 1.34 1.24 1.34 2.2v4.06h2.77z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          &copy; {new Date().getFullYear()} TranscodePro. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
