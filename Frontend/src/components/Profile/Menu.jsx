import React from 'react';
import { useTranslation } from 'react-i18next';

const Menu = ({ activePage, setActivePage, color, changeLanguage }) => {
  const { t } = useTranslation();

  const menuItems = [
    { name: 'Introductory', label: t('sidebar.myProfile') },
    { name: 'Notifications', label: t('sidebar.suggestions') },
    { name: 'Friends', label: t('sidebar.friends') },
    { name: 'Settings', label: t('sidebar.settings') },
    // يمكنك إضافة صفحات إضافية هنا
  ];

  return (
    <aside className="w-full md:w-64 h-full bg-white rounded-2xl shadow-md p-6 mr-4">
      <nav>
        <ul className="space-y-4">
          {menuItems.map(item => (
            <li key={item.name}>
              <button
                onClick={() => setActivePage(item.name)}
                className={`block w-full text-left text-lg px-4 py-2 rounded-lg transition 
                  ${activePage === item.name
                    ? `text-white`
                    : `text-gray-600 hover:bg-blue-400`}`}
                style={{
                  backgroundColor: activePage === item.name ? color : "transparent"
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Menu;
