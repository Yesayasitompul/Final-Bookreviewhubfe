import { Disclosure } from "@headlessui/react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import {
  LogoutOutlined,
  BellOutlined,
  MenuOutlined,
  CloseOutlined,
  BookOutlined
} from "@ant-design/icons";

// Definisi tipe untuk item navigasi
interface NavigationItem {
  name: string;
  to: string;
}

// Daftar navigasi yang terpisah untuk mempermudah pengelolaan
const NAVIGATION_ITEMS: NavigationItem[] = [
  { name: "Books", to: "/books" },
  { name: "Categories", to: "/categories" },
  { name: "Review", to: "/review" }
];

// Fungsi utilitas untuk menggabungkan kelas CSS
const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const Navbar = () => {
  const { logout } = useAuth();

  // Komponen untuk item navigasi - meningkatkan keterbacaan
  const NavigationItem = ({ item }: { item: NavigationItem }) => (
    <NavLink
      to={item.to}
      key={item.name}
      className={({ isActive }) =>
        classNames(
          isActive
            ? "text-indigo-600 border-b-2 border-indigo-600 dark:text-white dark:border-white"
            : "text-gray-500 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-600 dark:text-gray-300 dark:hover:text-white dark:hover:border-white",
          "px-3 py-2 text-sm font-medium"
        )
      }
    >
      {item.name}
    </NavLink>
  );

  // Komponen untuk item navigasi mobile
  const MobileNavigationItem = ({ item }: { item: NavigationItem }) => (
    <NavLink
      to={item.to}
      key={item.name}
      className={({ isActive }) =>
        classNames(
          isActive
            ? "text-indigo-600 bg-gray-100 dark:bg-gray-700 dark:text-white"
            : "text-gray-500 hover:bg-gray-100 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
          "block px-3 py-2 rounded-md text-base font-medium"
        )
      }
    >
      {item.name}
    </NavLink>
  );

  return (
    <Disclosure as="nav" className="bg-white shadow-sm dark:bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <CloseOutlined
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <MenuOutlined
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>

              {/* Logo dan navigasi desktop */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <BookOutlined className="text-2xl text-indigo-600 dark:text-white" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {NAVIGATION_ITEMS.map((item) => (
                      <NavigationItem key={item.name} item={item} />
                    ))}
                  </div>
                </div>
              </div>

              {/* User actions area */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-3">
                {/* Notification button */}
                <button
                  type="button"
                  className="relative p-1 text-gray-500 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  aria-label="View notifications"
                >
                  <BellOutlined className="text-xl" />
                </button>

                {/* Logout button */}
                <button
                  onClick={logout}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  aria-label="Logout"
                >
                  <LogoutOutlined className="mr-1" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {NAVIGATION_ITEMS.map((item) => (
                <MobileNavigationItem key={item.name} item={item} />
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
