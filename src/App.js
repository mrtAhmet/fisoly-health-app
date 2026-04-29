import { BrowserRouter } from 'react-router-dom';
import './css/App.css';
import HeaderSection from './components/Header/HeaderSection';
import MainContent from './layout/MainContent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ScrollToTop from './components/ScrollToTop';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  const { t } = useTranslation();

  const [lang, setLang] = useState(t('language'));

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className='Layout'>
        <HeaderSection lang={lang} setLang={setLang} />
        <div className='Content'>
          <MainContent lang={lang} />
        </div>
        <ToastContainer position='top-right' theme='dark' />
      </div>
    </BrowserRouter>
  );
}

export default App;
