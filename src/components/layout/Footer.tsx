import { APP_CONFIG } from '../../config/app.config';

export default function Footer() {
  const { name, site } = APP_CONFIG.developer;

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-4 text-center">
        <a
          href={site}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-black hover:underline"
        >
          Developed by {name}
        </a>
      </div>
    </footer>
  );
}
