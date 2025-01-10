import React from "react";

const Footer = () => {
  return (
    <div className="text-center p-6 bg-gray-100">
      <a href="#" className="flex items-center justify-center mb-5 text-2xl font-semibold text-gray-900">
        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVuaXZlcnNpdHkiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTAiIHI9IjEiLz48cGF0aCBkPSJNMjIgMjBWOGgtNGwtNi00LTYgNEgydjEyYTIgMiAwIDAgMCAyIDJoMTZhMiAyIDAgMCAwIDItMiIvPjxwYXRoIGQ9Ik02IDE3di4wMSIvPjxwYXRoIGQ9Ik02IDEzdi4wMSIvPjxwYXRoIGQ9Ik0xOCAxN3YuMDEiLz48cGF0aCBkPSJNMTggMTN2LjAxIi8+PHBhdGggZD0iTTE0IDIydi01YTIgMiAwIDAgMC0yLTJhMiAyIDAgMCAwLTIgMnY1Ii8+PC9zdmc+" className="h-12 mr-3 sm:h-9" alt="university Logo" />
        UniHub.
      </a>
      <span className="block text-sm text-gray-500">
        © Amit is god. All Rights Reserved. Built with
        <a href="https://tailwindcss.com" className="text-purple-600 hover:underline"> Tailwind CSS </a>.
      </span>
      <ul className="flex justify-center mt-5 space-x-5">
        {socialLinks.map((link, index) => (
          <li key={index}>
            <a href={link.href} className="text-gray-500 hover:text-gray-900">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d={link.iconPath} clipRule="evenodd"></path>
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// add social media , github later 

const socialLinks = [
  {
    href: "#",
    iconPath:
      "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
  },
  {
    href: "#",
    iconPath:
      "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z",
  },
];

export default Footer;
