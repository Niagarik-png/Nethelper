import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Form from "@radix-ui/react-form";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

const RegisterPage = () => {
  const [role, setRole] = useState("client");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    specialization: "",
    bio: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (value) => {
    setRole(value || "client");
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      specialization: "",
      bio: "",
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Пароль должен быть минимум 6 символов, содержать заглавную букву и цифру";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Пароли не совпадают";
    }

    if (role === "client" && formData.phone) {
      const phoneRegex = /^\+?[78][0-9]{10}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone =
          "Введите корректный номер телефона (например, +79991234567)";
      }
    }

    if (role === "specialist") {
      if (!formData.specialization.trim()) {
        newErrors.specialization = "Специализация обязательна";
      }
      if (!formData.bio.trim()) {
        newErrors.bio = "Биография обязательна";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      try {
        const response = await fetch(
          "http://localhost:1337/api/auth/local/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: formData.name,
              email: formData.email,
              password: formData.password,
              role: role === "client" ? "Public" : "Specialist", // Передаём роль
              phone: formData.phone || undefined,
              specialization: formData.specialization || undefined,
              bio: formData.bio || undefined,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error?.message || "Ошибка регистрации");
        }

        setSuccessMessage("Вы успешно зарегистрировались! Перенаправление...");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } catch (error) {
        alert(error.message || "Ошибка регистрации. Попробуйте снова.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const newErrors = { ...errors };

    if (name === "name" && !value.trim()) {
      newErrors.name = "Имя обязательно";
    } else if (name === "name") {
      delete newErrors.name;
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        newErrors.email = "Введите корректный email";
      } else {
        delete newErrors.email;
      }
    }

    if (name === "password") {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
      if (!passwordRegex.test(value)) {
        newErrors.password =
          "Пароль должен быть минимум 6 символов, содержать заглавную букву и цифру";
      } else {
        delete newErrors.password;
      }
      if (formData.confirmPassword && value !== formData.confirmPassword) {
        newErrors.confirmPassword = "Пароли не совпадают";
      } else {
        delete newErrors.confirmPassword;
      }
    }

    if (name === "confirmPassword") {
      if (formData.password !== value) {
        newErrors.confirmPassword = "Пароли не совпадают";
      } else {
        delete newErrors.confirmPassword;
      }
    }

    if (name === "phone" && role === "client" && value) {
      const phoneRegex = /^\+?[78][0-9]{10}$/;
      if (!phoneRegex.test(value)) {
        newErrors.phone =
          "Введите корректный номер телефона (например, +79991234567)";
      } else {
        delete newErrors.phone;
      }
    } else if (name === "phone") {
      delete newErrors.phone;
    }

    if (name === "specialization" && role === "specialist" && !value.trim()) {
      newErrors.specialization = "Специализация обязательна";
    } else if (name === "specialization") {
      delete newErrors.specialization;
    }

    if (name === "bio" && role === "specialist" && !value.trim()) {
      newErrors.bio = "Биография обязательна";
    } else if (name === "bio") {
      delete newErrors.bio;
    }

    setErrors(newErrors);
  };

  return (
    <main className="flex-1 pt-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-cardBg rounded-lg shadow-md">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-textPrimary">
          Регистрация
        </h2>
        <div className="max-w-md mx-auto">
          <ToggleGroup.Root
            type="single"
            value={role}
            onValueChange={handleRoleChange}
            className="mb-6 flex justify-center gap-4"
            aria-label="Выберите роль"
          >
            <ToggleGroup.Item
              value="client"
              className={`px-4 py-2 rounded-lg border border-borderPrimary text-textPrimary focus:ring-2 focus:ring-hoverPrimary ${
                role === "client"
                  ? "bg-hoverPrimary text-textPrimary"
                  : "bg-cardBg"
              }`}
            >
              Клиент
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="specialist"
              className={`px-4 py-2 rounded-lg border border-borderPrimary text-textPrimary focus:ring-2 focus:ring-hoverPrimary ${
                role === "specialist"
                  ? "bg-hoverPrimary text-textPrimary"
                  : "bg-cardBg"
              }`}
            >
              Специалист
            </ToggleGroup.Item>
          </ToggleGroup.Root>

          <Form.Root onSubmit={handleSubmit} className="space-y-4">
            <Form.Field name="name">
              <div className="flex flex-col space-y-1">
                <Form.Label className="block text-sm sm:text-base font-medium text-textPrimary">
                  Имя
                </Form.Label>
                <Form.Control asChild>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-2 rounded-lg border text-textPrimary focus:outline-none focus:ring-2 focus:ring-hoverPrimary ${
                      errors.name
                        ? "border-red-500"
                        : "border-borderPrimary focus:border-hoverPrimary"
                    }`}
                    required
                  />
                </Form.Control>
                {errors.name && (
                  <p className="text-red-700 bg-red-100 p-1 rounded mt-1 text-sm transition-opacity duration-300">
                    {errors.name}
                  </p>
                )}
              </div>
            </Form.Field>

            <Form.Field name="email">
              <div className="flex flex-col space-y-1">
                <Form.Label className="block text-sm sm:text-base font-medium text-textPrimary">
                  Email
                </Form.Label>
                <Form.Control asChild>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-2 rounded-lg border text-textPrimary focus:outline-none focus:ring-2 focus:ring-hoverPrimary ${
                      errors.email
                        ? "border-red-500"
                        : "border-borderPrimary focus:border-hoverPrimary"
                    }`}
                    required
                  />
                </Form.Control>
                {errors.email && (
                  <p className="text-red-700 bg-red-100 p-1 rounded mt-1 text-sm transition-opacity duration-300">
                    {errors.email}
                  </p>
                )}
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
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full p-2 rounded-lg border text-textPrimary focus:outline-none focus:ring-2 focus:ring-hoverPrimary ${
                        errors.password
                          ? "border-red-500"
                          : "border-borderPrimary focus:border-hoverPrimary"
                      }`}
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
                {errors.password && (
                  <p className="text-red-700 bg-red-100 p-1 rounded mt-1 text-sm transition-opacity duration-300">
                    {errors.password}
                  </p>
                )}
              </div>
            </Form.Field>

            <Form.Field name="confirmPassword">
              <div className="flex flex-col space-y-1">
                <Form.Label className="block text-sm sm:text-base font-medium text-textPrimary">
                  Подтверждение пароля
                </Form.Label>
                <div className="relative">
                  <Form.Control asChild>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full p-2 rounded-lg border text-textPrimary focus:outline-none focus:ring-2 focus:ring-hoverPrimary ${
                        errors.confirmPassword
                          ? "border-red-500"
                          : "border-borderPrimary focus:border-hoverPrimary"
                      }`}
                      required
                    />
                  </Form.Control>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-textPrimary hover:text-hoverPrimary"
                  >
                    {showConfirmPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-700 bg-red-100 p-1 rounded mt-1 text-sm transition-opacity duration-300">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </Form.Field>

            {role === "client" && (
              <Form.Field name="phone">
                <div className="flex flex-col space-y-1">
                  <Form.Label className="block text-sm sm:text-base font-medium text-textPrimary">
                    Номер телефона (опционально)
                  </Form.Label>
                  <Form.Control asChild>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full p-2 rounded-lg border text-textPrimary focus:outline-none focus:ring-2 focus:ring-hoverPrimary ${
                        errors.phone
                          ? "border-red-500"
                          : "border-borderPrimary focus:border-hoverPrimary"
                      }`}
                    />
                  </Form.Control>
                  {errors.phone && (
                    <p className="text-red-700 bg-red-100 p-1 rounded mt-1 text-sm transition-opacity duration-300">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </Form.Field>
            )}

            {role === "specialist" && (
              <>
                <Form.Field name="specialization">
                  <div className="flex flex-col space-y-1">
                    <Form.Label className="block text-sm sm:text-base font-medium text-textPrimary">
                      Специализация
                    </Form.Label>
                    <Form.Control asChild>
                      <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        className={`w-full p-2 rounded-lg border text-textPrimary focus:outline-none focus:ring-2 focus:ring-hoverPrimary ${
                          errors.specialization
                            ? "border-red-500"
                            : "border-borderPrimary focus:border-hoverPrimary"
                        }`}
                        required
                      />
                    </Form.Control>
                    {errors.specialization && (
                      <p className="text-red-700 bg-red-100 p-1 rounded mt-1 text-sm transition-opacity duration-300">
                        {errors.specialization}
                      </p>
                    )}
                  </div>
                </Form.Field>
                <Form.Field name="bio">
                  <div className="flex flex-col space-y-1">
                    <Form.Label className="block text-sm sm:text-base font-medium text-textPrimary">
                      Биография
                    </Form.Label>
                    <Form.Control asChild>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className={`w-full p-2 rounded-lg border text-textPrimary focus:outline-none focus:ring-2 focus:ring-hoverPrimary ${
                          errors.bio
                            ? "border-red-500"
                            : "border-borderPrimary focus:border-hoverPrimary"
                        }`}
                        required
                      />
                    </Form.Control>
                    {errors.bio && (
                      <p className="text-red-700 bg-red-100 p-1 rounded mt-1 text-sm transition-opacity duration-300">
                        {errors.bio}
                      </p>
                    )}
                  </div>
                </Form.Field>
              </>
            )}

            {successMessage && (
              <p className="text-green-700 bg-green-100 p-2 rounded mt-2 text-sm text-center transition-opacity duration-300">
                {successMessage}
              </p>
            )}

            <Form.Submit asChild>
              <button className="w-full bg-hoverPrimary text-textPrimary font-semibold px-6 py-2 rounded-lg hover:bg-hoverSecondary focus:ring-2 focus:ring-hoverPrimary focus:outline-none">
                Зарегистрироваться
              </button>
            </Form.Submit>
          </Form.Root>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
