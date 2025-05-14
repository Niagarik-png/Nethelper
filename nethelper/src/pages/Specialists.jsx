import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SpecialistsPage = () => {
  const [specialists, setSpecialists] = useState([]);

  useEffect(() => {
    const mockSpecialists = [
      {
        id: 1,
        name: "Иван Петров",
        specialization: "Программное обеспечение",
        rating: 4.8,
        bio: "Опытный специалист по установке VPN, драйверов и антивирусов.",
      },
      {
        id: 2,
        name: "Алексей Смирнов",
        specialization: "Сборка ПК",
        rating: 4.6,
        bio: "Эксперт по сборке и апгрейду компьютеров.",
      },
    ];
    setSpecialists(mockSpecialists);
  }, []);

  return (
    <main className="flex-1 pt-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-cardBg rounded-lg shadow-md">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-textPrimary">
          Наши специалисты
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialists.map((specialist) => (
            <div
              key={specialist.id}
              className="bg-cardBg border border-borderPrimary p-4 rounded-lg hover:shadow-md"
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-textPrimary">
                {specialist.name}
              </h3>
              <p className="mb-2 text-textPrimary text-sm sm:text-base">
                Специализация: {specialist.specialization}
              </p>
              <p className="mb-2 text-textPrimary text-sm sm:text-base">
                Рейтинг: {specialist.rating}
              </p>
              <p className="mb-4 text-textPrimary text-sm sm:text-base">
                {specialist.bio}
              </p>
              <Link
                to="/booking"
                className="inline-block bg-hoverPrimary text-textPrimary font-semibold px-6 py-2 rounded-lg hover:bg-hoverSecondary hover:border-2"
              >
                Забронировать
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default SpecialistsPage;
