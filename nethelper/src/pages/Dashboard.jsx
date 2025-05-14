import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Form from "@radix-ui/react-form";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token);
      fetchBookings(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch("http://localhost:1337/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setUser({
          id: data.id,
          email: data.email,
          role: data.role,
          isAuthenticated: true,
        });
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Ошибка загрузки данных пользователя:", error);
      localStorage.removeItem("token");
    }
  };

  const fetchBookings = async (token) => {
    try {
      const response = await fetch(
        "http://localhost:1337/api/bookings?filters[client_id][$eq]=me&populate=*",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setBookings(
          data.data.map((booking) => ({
            id: booking.id,
            specialist: booking.attributes.specialist.data.attributes.name,
            date: booking.attributes.date,
            service: booking.attributes.service.data.attributes.title,
          }))
        );
      }
    } catch (error) {
      console.error("Ошибка загрузки бронирований:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, password }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error?.message || "Неверные данные");
      setUser({
        id: data.user.id,
        email: data.user.email,
        role: data.user.role,
        isAuthenticated: true,
      });
      localStorage.setItem("token", data.jwt);
      fetchBookings(data.jwt);
      navigate("/dashboard");
    } catch {
      alert("Неверный email или пароль. Попробуйте снова.");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    setBookings([]);
    navigate("/dashboard");
  };

  if (!user) {
    return (
      <main className="flex-1 pt-16">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-cardBg rounded-lg shadow-md">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-textPrimary">
            Личный кабинет
          </h2>
          <div className="bg-cardBg border border-borderPrimary p-4 rounded-lg max-w-md mx-auto hover:shadow-md">
            <Form.Root
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="space-y-4"
            >
              <Form.Field name="email">
                <div className="flex flex-col space-y-1">
                  <Form.Label className="block text-sm sm:text-base font-medium text-textPrimary">
                    Email
                  </Form.Label>
                  <Form.Control asChild>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-2 rounded-lg border text-textPrimary focus:outline-none focus:ring-2 focus:ring-hoverPrimary border-borderPrimary focus:border-hoverPrimary"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Control>
                </div>
              </Form.Field>
              <Form.Field name="password">
                <div className="flex flex-col space-y-1">
                  <Form.Label className="block text-sm sm:text-base font-medium text-textPrimary">
                    Пароль
                  </Form.Label>
                  <div className="relative">
                    <Form.Control asChild>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="w-full p-2 rounded-lg border text-textPrimary focus:outline-none focus:ring-2 focus:ring-hoverPrimary border-borderPrimary focus:border-hoverPrimary"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Control>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-textPrimary hover:text-hoverPrimary"
                    >
                      {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                    </button>
                  </div>
                </div>
              </Form.Field>
              <Form.Submit asChild>
                <button className="w-full bg-hoverPrimary text-textPrimary font-semibold px-6 py-2 rounded-lg hover:bg-hoverSecondary focus:ring-2 focus:ring-hoverPrimary focus:outline-none">
                  Войти
                </button>
              </Form.Submit>
              <p className="text-sm text-textPrimary text-center">
                Тест: test@test.com / Test123
              </p>
              <p className="text-sm text-textPrimary text-center">
                Нет аккаунта?{" "}
                <Link
                  to="/register"
                  className="text-hoverPrimary hover:underline"
                >
                  Зарегистрироваться
                </Link>
              </p>
            </Form.Root>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="flex-1 pt-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-cardBg rounded-lg shadow-md">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-textPrimary">
          Личный кабинет
        </h2>
        <div className="bg-cardBg border border-borderPrimary p-4 rounded-lg hover:shadow-md">
          <h3 className="text-xl sm:text-2xl font-semibold text-center text-textPrimary">
            Привет, {user.email}!
          </h3>
          <p className="text-center text-sm sm:text-base text-textPrimary mb-4">
            Роль: {user.role}
          </p>
          {user.role === "admin" && (
            <Link
              to="/admin"
              className="block text-center bg-hoverPrimary text-textPrimary font-semibold px-6 py-2 rounded-lg hover:bg-hoverSecondary mb-4"
            >
              Перейти в админ-панель
            </Link>
          )}
          {user.role === "client" && (
            <Link
              to="/booking"
              className="block text-center bg-hoverPrimary text-textPrimary font-semibold px-6 py-2 rounded-lg hover:bg-hoverSecondary mb-4"
            >
              Записаться на консультацию
            </Link>
          )}
          <h4 className="text-lg sm:text-xl font-medium mb-2 text-textPrimary">
            Ваши бронирования
          </h4>
          {bookings.length > 0 ? (
            <ul className="space-y-2">
              {bookings.map((booking) => (
                <li
                  key={booking.id}
                  className="p-2 border border-borderPrimary rounded-lg"
                >
                  <p>Специалист: {booking.specialist}</p>
                  <p>Дата: {new Date(booking.date).toLocaleString()}</p>
                  <p>Услуга: {booking.service}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-sm sm:text-base text-textPrimary">
              У вас нет бронирований.
            </p>
          )}
          <button
            onClick={handleLogout}
            className="mt-4 bg-hoverPrimary text-textPrimary font-semibold px-6 py-2 rounded-lg hover:bg-hoverSecondary"
          >
            Выйти
          </button>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
