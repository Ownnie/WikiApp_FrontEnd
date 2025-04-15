export default function Footer() {
  return (
    <footer className="bg-purple-500 text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Wiki.Dev. Todos los derechos reservados.</p>
        <div className="space-x-4 mt-2 md:mt-0">
          <a href="/about" className="hover:underline">
            Acerca de
          </a>
          <a href="/privacy" className="hover:underline">
            Privacidad
          </a>
          <a href="/contact" className="hover:underline">
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
}