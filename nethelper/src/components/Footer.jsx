import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-footerBg text-footerText py-4 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="mb-2">© 2025 NetHelper. Все права защищены.</p>
      <div className="flex justify-center gap-4">
        <Link
          to="/contact"
          className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset"
        >
          Telegram
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-textPrimary ring-1 ring-blue-700/0 ring-inset"
        >
          Email
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
