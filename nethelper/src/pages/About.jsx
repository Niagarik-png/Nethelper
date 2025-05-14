import { Link } from "react-router-dom";

const AboutPage = () => (
  <main className="flex-1 pt-16">
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-cardBg rounded-lg shadow-md">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-textPrimary">
        О нас
      </h2>
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-lg sm:text-xl mb-6 text-textPrimary">
          NetHelper — это команда профессионалов, которые делают ИТ-технологии
          доступными для каждого. Мы начали в 2023 году с миссией упростить
          настройку, ремонт и разработку для наших клиентов.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-hoverPrimary text-textPrimary font-semibold px-8 py-3 rounded-lg hover:bg-hoverSecondary"
        >
          Связаться с нами
        </Link>
      </div>
    </section>
  </main>
);

export default AboutPage;
