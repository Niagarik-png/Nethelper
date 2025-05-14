import { Link } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useAuth } from "../context/Auth.jsx";

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className="shadow-md fixed top-0 left-0 w-full z-99 min-h-16 bg-transparent 
      backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-textPrimary">NetHelper</h1>

        {/* Навигация для больших экранов */}
        <nav className="hidden sm:flex sm:space-x-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-textPrimary hover:text-hoverPrimary">
                Главная
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="text-textPrimary hover:text-hoverPrimary"
              >
                Услуги
              </Link>
            </li>
            <li>
              <Link
                to="/specialists"
                className="text-textPrimary hover:text-hoverPrimary"
              >
                Специалисты
              </Link>
            </li>
            <li>
              <Link
                to="/booking"
                className="text-textPrimary hover:text-hoverPrimary"
              >
                Забронировать
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-textPrimary hover:text-hoverPrimary"
              >
                Контакты
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-textPrimary hover:text-hoverPrimary"
              >
                О нас
              </Link>
            </li>
            {user && (
              <>
                <li>
                  <Link
                    to="/dashboard"
                    className="text-textPrimary hover:text-hoverPrimary"
                  >
                    Личный кабинет
                  </Link>
                </li>
                {user.role === "admin" && (
                  <li>
                    <Link
                      to="/admin"
                      className="text-textPrimary hover:text-hoverPrimary"
                    >
                      Админ-панель
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    onClick={logout}
                    className="text-textPrimary hover:text-hoverPrimary"
                  >
                    Выйти
                  </button>
                </li>
              </>
            )}
            {!user && (
              <li>
                <Link
                  to="/dashboard"
                  className="text-textPrimary hover:text-hoverPrimary"
                >
                  Войти
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Выпадающее меню для мобильных устройств с Radix UI */}
        <div className="sm:hidden">
          <DropdownMenu.Root open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenu.Trigger asChild>
              <button
                className="text-textPrimary focus:outline-none focus:ring-2 focus:ring-hoverPrimary rounded-md p-1"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <Cross1Icon className="w-6 h-6" />
                ) : (
                  <HamburgerMenuIcon className="w-6 h-6" />
                )}
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="bg-cardBg shadow-md rounded-lg p-4 w-48 mt-2 mr-4 z-20 border border-borderPrimary"
                sideOffset={5}
                align="end"
              >
                <DropdownMenu.Item asChild>
                  <Link
                    to="/"
                    className="block text-textPrimary hover:text-hoverPrimary py-2"
                    onClick={toggleMenu}
                  >
                    Главная
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link
                    to="/services"
                    className="block text-textPrimary hover:text-hoverPrimary py-2"
                    onClick={toggleMenu}
                  >
                    Услуги
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link
                    to="/specialists"
                    className="block text-textPrimary hover:text-hoverPrimary py-2"
                    onClick={toggleMenu}
                  >
                    Специалисты
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link
                    to="/booling"
                    className="block text-textPrimary hover:text-hoverPrimary py-2"
                    onClick={toggleMenu}
                  >
                    Забронировать
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link
                    to="/contact"
                    className="block text-textPrimary hover:text-hoverPrimary py-2"
                    onClick={toggleMenu}
                  >
                    Контакты
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                  <Link
                    to="/about"
                    className="block text-textPrimary hover:text-hoverPrimary py-2"
                    onClick={toggleMenu}
                  >
                    О нас
                  </Link>
                </DropdownMenu.Item>
                {user && (
                  <>
                    <DropdownMenu.Item asChild>
                      <Link
                        to="/dashboard"
                        className="block text-textPrimary hover:text-hoverPrimary py-2"
                        onClick={toggleMenu}
                      >
                        Личный кабинет
                      </Link>
                    </DropdownMenu.Item>
                    {user.role === "admin" && (
                      <DropdownMenu.Item asChild>
                        <Link
                          to="/admin"
                          className="block text-textPrimary hover:text-hoverPrimary py-2"
                          onClick={toggleMenu}
                        >
                          Админ-панель
                        </Link>
                      </DropdownMenu.Item>
                    )}
                    <DropdownMenu.Item asChild>
                      <button
                        onClick={() => {
                          logout();
                          toggleMenu();
                        }}
                        className="block text-textPrimary hover:text-hoverPrimary py-2 w-full text-left"
                      >
                        Выйти
                      </button>
                    </DropdownMenu.Item>
                  </>
                )}
                {!user && (
                  <DropdownMenu.Item asChild>
                    <Link
                      to="/dashboard"
                      className="block text-textPrimary hover:text-hoverPrimary py-2"
                      onClick={toggleMenu}
                    >
                      Войти
                    </Link>
                  </DropdownMenu.Item>
                )}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </header>
  );
};

export default Header;
