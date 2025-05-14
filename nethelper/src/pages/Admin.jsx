import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const [specialists, setSpecialists] = useState([]);
  const [newSpecialist, setNewSpecialist] = useState({
    name: "",
    specialization: "",
    bio: "",
    rating: "",
  });

  useEffect(() => {
    // Моковые данные
    setSpecialists([
      {
        id: 1,
        name: "Иван Петров",
        specialization: "Программное обеспечение",
        bio: "Установка VPN",
        rating: 4.8,
      },
      {
        id: 2,
        name: "Алексей Смирнов",
        specialization: "Сборка ПК",
        bio: "Апгрейд ПК",
        rating: 4.6,
      },
    ]);
  }, []);

  const handleAddSpecialist = (e) => {
    e.preventDefault();
    setSpecialists([
      ...specialists,
      {
        ...newSpecialist,
        id: specialists.length + 1,
        rating: parseFloat(newSpecialist.rating) || 0,
      },
    ]);
    setNewSpecialist({ name: "", specialization: "", bio: "", rating: "" });
  };

  const handleDeleteSpecialist = (id) => {
    setSpecialists(specialists.filter((s) => s.id !== id));
  };

  return (
    <main className="flex-1 pt-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-cardBg rounded-lg shadow-md">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-textPrimary">
          Админ-панель
        </h2>
        <div className="space-y-6">
          <h3 className="text-xl sm:text-2xl font-semibold text-textPrimary">
            Добавить специалиста
          </h3>
          <form onSubmit={handleAddSpecialist} className="space-y-4">
            <div>
              <label className="block text-sm sm:text-base font-medium text-textPrimary">
                Имя
              </label>
              <input
                type="text"
                value={newSpecialist.name}
                onChange={(e) =>
                  setNewSpecialist({ ...newSpecialist, name: e.target.value })
                }
                className="w-full p-2 rounded-lg border border-borderPrimary text-textPrimary focus:border-hoverPrimary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-medium text-textPrimary">
                Специализация
              </label>
              <input
                type="text"
                value={newSpecialist.specialization}
                onChange={(e) =>
                  setNewSpecialist({
                    ...newSpecialist,
                    specialization: e.target.value,
                  })
                }
                className="w-full p-2 rounded-lg border border-borderPrimary text-textPrimary focus:border-hoverPrimary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-medium text-textPrimary">
                Биография
              </label>
              <input
                type="text"
                value={newSpecialist.bio}
                onChange={(e) =>
                  setNewSpecialist({ ...newSpecialist, bio: e.target.value })
                }
                className="w-full p-2 rounded-lg border border-borderPrimary text-textPrimary focus:border-hoverPrimary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm sm:text-base font-medium text-textPrimary">
                Рейтинг
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={newSpecialist.rating}
                onChange={(e) =>
                  setNewSpecialist({ ...newSpecialist, rating: e.target.value })
                }
                className="w-full p-2 rounded-lg border border-borderPrimary text-textPrimary focus:border-hoverPrimary focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-hoverPrimary text-textPrimary font-semibold px-6 py-2 rounded-lg hover:bg-hoverSecondary"
            >
              Добавить
            </button>
          </form>
          <h3 className="text-xl sm:text-2xl font-semibold text-textPrimary">
            Список специалистов
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {specialists.map((specialist) => (
              <div
                key={specialist.id}
                className="bg-cardBg border border-borderPrimary p-4 rounded-lg hover:shadow-md"
              >
                <h4 className="text-lg font-medium text-textPrimary">
                  {specialist.name}
                </h4>
                <p className="text-sm sm:text-base text-textPrimary">
                  Специализация: {specialist.specialization}
                </p>
                <p className="text-sm sm:text-base text-textPrimary">
                  Био: {specialist.bio}
                </p>
                <p className="text-sm sm:text-base text-textPrimary">
                  Рейтинг: {specialist.rating}
                </p>
                <button
                  onClick={() => handleDeleteSpecialist(specialist.id)}
                  className="mt-2 bg-red-500 text-white font-semibold px-4 py-1 rounded-lg hover:bg-red-600"
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
          <Link
            to="/dashboard"
            className="block text-center bg-hoverPrimary text-textPrimary font-semibold px-6 py-2 rounded-lg hover:bg-hoverSecondary"
          >
            Назад
          </Link>
        </div>
      </section>
    </main>
  );
};

export default AdminPanel;
