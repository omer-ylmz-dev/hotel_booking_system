import { BookingProvider } from './context/BookingContext';
import { APP_CONFIG } from './config/app.config';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WizardController from './components/wizard/WizardController';

export default function App() {
  return (
    <>
      <title>{APP_CONFIG.title}</title>
      <meta name="description" content={APP_CONFIG.description} />

      <BookingProvider>
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
          <Header />
          <WizardController />
          <Footer />
        </div>
      </BookingProvider>
    </>
  );
}
