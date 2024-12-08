import { Plane, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white py-16" id="contact">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Plane className="text-yellow-400 h-8 w-8" />
              <span className="text-yellow-400 text-2xl font-bold">
                TripWise
              </span>
            </div>
            <p className="text-gray-400">
              Your ultimate travel companion for seamless journeys and great
              memories.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <Mail className="text-yellow-400 h-5 w-5" />
                <a
                  href="mailto:umangraj1004@gmail.com"
                  className="hover:text-yellow-300"
                >
                  umangraj1004@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="text-yellow-400 h-5 w-5" />
                <a href="tel:+917766014193" className="hover:text-yellow-300">
                  +91-7766014193
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="text-yellow-400 h-5 w-5" />
                <a
                  href="https://maps.app.goo.gl/XTpgEN1YqNkCB4CG6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-300"
                >
                  834001, Ranchi, Jharkhand, India
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-6">
              Follow Me
            </h3>
            <ul className="flex space-x-6">
              <li>
                <a
                  href="https://github.com/uraj1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300"
                >
                  <Github className="h-6 w-6" />
                </a>
              </li>
              <li>
                <a
                  href="https://in.linkedin.com/in/umang-raj-verma-538562283"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </li>
            </ul>
            {/* Tag with your name */}
            <p className="mt-4 text-lg">
              <span className="inline-block bg-yellow-400 text-black py-2 px-4 rounded-lg font-bold hover:bg-yellow-300 cursor-pointer transition-all duration-300">
                Developed by: <span className="font-semibold">Umang Raj</span>
              </span>
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} TripWise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
