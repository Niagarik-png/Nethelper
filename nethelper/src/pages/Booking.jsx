import { useState } from "react";
import { Link } from "react-router-dom";

const BookingPage = () => {
  const [specialist, setSpecialist] = useState("");
  const handleBooking = () => alert("Бронирование успешно!");

  return (
    <main className="flex-1 pt-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-cardBg rounded-lg shadow-md">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-textPrimary">
          Забронировать услугу
        </h2>
        <div className="bg-cardBg border border-borderPrimary p-4 rounded-lg max-w-md mx-auto hover:shadow-md">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="specialist"
                className="block text-sm sm:text-base font-medium text-textPrimary"
              >
                Специалист
              </label>
              <select
                id="specialist"
                className="w-full p-2 rounded-lg border border-borderPrimary text-textPrimary focus:border-hoverPrimary focus:outline-none"
                value={specialist}
                onChange={(e) => setSpecialist(e.target.value)}
              >
                <option value="">Выберите специалиста</option>
                <option value="Иван Петров">
                  Иван Петров (Программное обеспечение)
                </option>
                <option value="Алексей Смирнов">
                  Алексей Смирнов (Сборка ПК)
                </option>
              </select>
            </div>
            <button
              onClick={handleBooking}
              className="bg-hoverPrimary text-textPrimary font-semibold px-6 py-2 rounded-lg w-full hover:bg-hoverSecondary hover:border-2"
            >
              Забронировать
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BookingPage;
