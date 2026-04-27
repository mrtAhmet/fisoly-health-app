import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend'; // Bunu kurmadıysan: npm install i18next-http-backend

i18n
    .use(Backend) // JSON dosyalarını dışarıdan yüklemek için
    .use(LanguageDetector) // Kullanıcının dilini (tarayıcıdan vb.) anlamak için
    .use(initReactI18next) // react-i18next ile bağlamak için
    .init({
        fallbackLng: 'en', // Dil bulunamazsa varsayılan dil
        debug: false, // Konsolda hata ayıklama mesajlarını görmek istemiyorsan false yap
        interpolation: {
            escapeValue: false, // React XSS koruması yaptığı için buna gerek yok
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json', // JSON dosyalarının yolu
        }
    });

export default i18n;
