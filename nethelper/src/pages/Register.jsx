import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Form from "@radix-ui/react-form";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("client");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleRoleChange = (value) => {
    setRole(value || "client");
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Имя обязательно";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Неверный email";
    if (!/^(?=.*[A-Z])(?=.*\d).{6,}$/.test(formData.password))
      newErrors.password =
        "Пароль должен содержать минимум 6 символов, заглавную букву и цифру";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Пароли не совпадают";
    if (formData.phone && !/^\+?[78][0-9]{10}$/.test(formData.phone)) {
      newErrors.phone =
        "Телефон должен начинаться с +7 или 8 и содержать 10 цифр (например, +79991234567)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Шаг 1: Регистрация через стандартный эндпоинт
        const registerData = {
          username: formData.name,
          email: formData.email,
          password: formData.password,
        };
        console.log("Registering with:", registerData);
        const registerResponse = await fetch(
          "http://localhost:1337/api/auth/local/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData),
          }
        );

        console.log("Register response status:", registerResponse.status);
        const contentType = registerResponse.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await registerResponse.text();
          throw new Error(`Unexpected response format: ${text}`);
        }

        const registerDataResult = await registerResponse.json();
        console.log("Register response:", registerDataResult);
        if (!registerResponse.ok)
          throw new Error(
            registerDataResult.error?.message || "Ошибка регистрации"
          );

        const jwt = registerDataResult.jwt;
        const userId = registerDataResult.user.id;

        // Шаг 2: Обновление пользователя с кастомными полями
        const phoneValue =
          formData.phone && /^\+?[78][0-9]{10}$/.test(formData.phone)
            ? formData.phone
            : null;
        const updateData = {
          phone: phoneValue,
          userType: role,
        };
        console.log("Updating user with:", { userId, updateData });
        const updateResponse = await fetch(
          `http://localhost:1337/api/users/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify(updateData),
          }
        );

        console.log("Update response status:", updateResponse.status);
        const updateDataResult = await updateResponse.json();
        console.log("Update response:", updateDataResult);
        if (!updateResponse.ok)
          throw new Error(
            updateDataResult.error?.message || "Ошибка обновления"
          );

        localStorage.setItem("token", jwt);
        setSuccessMessage("Вы успешно зарегистрировались! Перенаправление...");
        setTimeout(() => navigate("/dashboard"), 2000);
      } catch (error) {
        console.error("Registration error:", error);
        alert(error.message || "Ошибка регистрации. Попробуйте снова.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    if (name === "phone") {
      formattedValue = value.replace(/[^\d+]/g, "");
      if (formattedValue && !/^\+?[78][0-9]{0,10}$/.test(formattedValue)) {
        return;
      }
      if (formattedValue.length > 12) {
        return;
      }
    }
    setFormData({ ...formData, [name]: formattedValue });
    const newErrors = { ...errors };
    if (name === "name" && !value.trim()) newErrors.name = "Имя обязательно";
    else if (name === "name") delete newErrors.name;
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      newErrors.email = "Неверный email";
    else if (name === "email") delete newErrors.email;
    if (name === "password" && !/^(?=.*[A-Z])(?=.*\d).{6,}$/.test(value))
      newErrors.password =
        "Пароль должен содержать минимум 6 символов, заглавную букву и цифру";
    else if (name === "password") delete newErrors.password;
    if (name === "confirmPassword" && formData.password !== value)
      newErrors.confirmPassword = "Пароли не совпадают";
    else if (name === "confirmPassword") delete newErrors.confirmPassword;
    if (name === "phone" && value && !/^\+?[78][0-9]{10}$/.test(formattedValue))
      newErrors.phone =
        "Телефон должен начинаться с +7 или 8 и содержать 10 цифр (например, +79991234567)";
    else if (name === "phone") delete newErrors.phone;
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
                  <p className="text-red-700 bg-red-100 p-1 rounded mt-1 text-sm">
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
                  <p className="text-red-700 bg-red-100 p-1 rounded mt-1 text-sm">
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
                  <p className="text-red-700 bg-red-100 p-1 rounded mt-1 text-sm">
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
                  <p className="text-red-700 bg-red-100 p-1 rounded mt-1 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </Form.Field>
            <Form.Field name="phone">
              <div className="flex flex-col space-y-1">
                <Form.Label className="block text-sm sm:text-base font-medium text-textPrimary">
                  Телефон (опционально)
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
                  <p className="text-red-700 bg-red-100 p-1 rounded mt-1 text-sm">
                    {errors.phone}
                  </p>
                )}
              </div>
            </Form.Field>
            {successMessage && (
              <p className="text-green-700 bg-green-100 p-2 rounded mt-2 text-sm text-center">
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
