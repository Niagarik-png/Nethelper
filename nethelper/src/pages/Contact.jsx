import { Link } from "react-router-dom";

const ContactPage = () => (
  <main className="flex-1 pt-16">
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-cardBg rounded-lg shadow-md">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-textPrimary">
        Свяжитесь с нами
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-cardBg border border-borderPrimary p-4 rounded-lg hover:shadow-md">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-textPrimary">
            Оставьте заявку
          </h3>
          <p className="mb-4 text-sm sm:text-base text-textPrimary">
            Пожалуйста, войдите в личный кабинет для отправки заявки.
          </p>
          <Link
            to="/dashboard"
            className="inline-block bg-hoverPrimary text-textPrimary font-semibold px-6 py-2 rounded-lg hover:bg-hoverSecondary"
          >
            Войти
          </Link>
        </div>
        <div className="bg-cardBg border border-borderPrimary p-4 rounded-lg hover:shadow-md">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-textPrimary">
            Контактная информация
          </h3>
          <ul className="space-y-2 text-sm sm:text-base text-textPrimary">
            <li>
              <strong>Email:</strong> info@nethelper.ru
            </li>
            <li>
              <strong>Telegram:</strong> @NetHelperIT
            </li>
          </ul>
        </div>
      </div>
    </section>
  </main>
);

export default ContactPage;
