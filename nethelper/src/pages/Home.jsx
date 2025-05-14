import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/specialists");
  };

  return (
    <main className="flex-1 pt-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-cardBg rounded-lg shadow-md">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-center text-textPrimary">
          Ваши ИТ-решения — наша забота
        </h2>
        <p className="text-lg sm:text-xl mb-6 text-center text-textPrimary max-w-2xl mx-auto">
          От установки VPN до сборки ПК — профессиональные услуги для ваших
          устройств
        </p>
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
        >
          <input
            type="text"
            name="search"
            placeholder="Поиск специалистов..."
            className="w-full p-3 rounded-lg border border-borderPrimary text-textPrimary focus:border-hoverPrimary focus:outline-none"
          />
          <button
            type="submit"
            class="bg-hoverPrimary text-textPrimary font-semibold px-6 py-3 rounded-lg hover:bg-hoverSecondary hover:border-2"
          >
            Найти
          </button>
        </form>
        <section className="mt-12">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-center text-textPrimary">
            Наши услуги
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-cardBg border border-borderPrimary p-4 rounded-lg hover:shadow-md">
              <h4 className="text-lg font-medium mb-2 text-textPrimary">
                Настройка и установка ПО
              </h4>
              <p className="text-textPrimary">
                VPN, драйверы, Microsoft Office, Adobe, антивирусы, браузеры,
                игры, стриминг
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default HomePage;
