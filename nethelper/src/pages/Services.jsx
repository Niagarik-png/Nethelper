import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  MagnifyingGlassIcon,
  CheckIcon,
  LaptopIcon,
  GearIcon,
  DownloadIcon,
} from "@radix-ui/react-icons";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const mockServices = [
      {
        id: 1,
        title: "Настройка и установка ПО",
        description:
          "Установка VPN, драйверов, Microsoft Office, Adobe, антивирусов, браузеров, игр, стриминга.",
        category: "ПО",
        icon: <DownloadIcon className="w-6 h-6 text-textPrimary" />,
      },
      {
        id: 2,
        title: "Сборка и апгрейд ПК",
        description:
          "Профессиональная сборка компьютеров, подбор комплектующих, апгрейд старых систем.",
        category: "Апгрейд",
        icon: <LaptopIcon className="w-6 h-6 text-textPrimary" />,
      },
      {
        id: 3,
        title: "Диагностика и ремонт",
        description:
          "Диагностика неисправностей, ремонт компьютеров и ноутбуков, восстановление данных.",
        category: "Ремонт",
        icon: <GearIcon className="w-6 h-6 text-textPrimary" />,
      },
    ];
    setServices(mockServices);
  }, []);

  const filteredServices =
    filter === "all"
      ? services
      : services.filter((service) => service.category === filter);

  return (
    <main className="flex-1 pt-16">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-cardBg rounded-lg shadow-md">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-textPrimary">
          Наши услуги
        </h2>

        {/* Фильтр услуг */}
        <div className="mb-6">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="bg-cardBg border border-borderPrimary text-textPrimary px-4 py-2 rounded-lg flex items-center hover:bg-hoverPrimary focus:ring-2 focus:ring-hoverPrimary focus:outline-none">
                <MagnifyingGlassIcon className="mr-2 w-5 h-5" /> Фильтр
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="bg-cardBg shadow-md rounded-lg p-2 w-48 border border-borderPrimary mt-2 z-20"
                sideOffset={5}
                align="start"
              >
                <DropdownMenu.Item
                  className="flex items-center text-textPrimary hover:text-hoverPrimary py-2 px-2 rounded cursor-pointer focus:bg-hoverPrimary focus:text-textPrimary"
                  onSelect={() => setFilter("all")}
                >
                  {filter === "all" && <CheckIcon className="mr-2 w-4 h-4" />}{" "}
                  Все
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className="flex items-center text-textPrimary hover:text-hoverPrimary py-2 px-2 rounded cursor-pointer focus:bg-hoverPrimary focus:text-textPrimary"
                  onSelect={() => setFilter("ПО")}
                >
                  {filter === "ПО" && <CheckIcon className="mr-2 w-4 h-4" />} ПО
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className="flex items-center text-textPrimary hover:text-hoverPrimary py-2 px-2 rounded cursor-pointer focus:bg-hoverPrimary focus:text-textPrimary"
                  onSelect={() => setFilter("Апгрейд")}
                >
                  {filter === "Апгрейд" && (
                    <CheckIcon className="mr-2 w-4 h-4" />
                  )}{" "}
                  Апгрейд
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className="flex items-center text-textPrimary hover:text-hoverPrimary py-2 px-2 rounded cursor-pointer focus:bg-hoverPrimary focus:text-textPrimary"
                  onSelect={() => setFilter("Ремонт")}
                >
                  {filter === "Ремонт" && (
                    <CheckIcon className="mr-2 w-4 h-4" />
                  )}{" "}
                  Ремонт
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>

        {/* Список услуг */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-cardBg border border-borderPrimary p-4 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-2">
                {service.icon}
                <h3 className="text-xl sm:text-2xl font-semibold ml-2 text-textPrimary">
                  {service.title}
                </h3>
              </div>
              <p className="mb-4 text-textPrimary text-sm sm:text-base">
                {service.description}
              </p>
              <Link
                to="/booking"
                className="inline-block bg-hoverPrimary text-textPrimary font-semibold px-6 py-2 rounded-lg hover:bg-hoverSecondary focus:ring-2 focus:ring-hoverPrimary focus:outline-none hover:border-2"
              >
                Заказать
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
