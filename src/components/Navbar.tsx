import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial theme preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Habilidades', href: '#habilidades' },
    { name: 'Projetos', href: '#projetos' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[1000] transition-all duration-500 ease-in-out ${
      isScrolled 
        ? 'bg-white/80 dark:bg-[#050505]/80 backdrop-blur-lg border-b border-slate-200/60 dark:border-slate-800/60 shadow-[0_4px_30px_rgba(0,0,0,0.03)] py-3' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#inicio" className="text-xl font-extrabold tracking-tighter text-navy dark:text-white flex items-center gap-1">
          <span className="text-blue-500 bg-blue-50 dark:bg-blue-500/10 px-1.5 py-0.5 rounded-md text-lg">&lt;/&gt;</span> E.D
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`relative text-sm font-semibold transition-colors py-1 hover:text-blue-500 dark:hover:text-white ${
                  activeSection === link.href.substring(1)
                    ? 'text-blue-500 dark:text-white'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-full h-[2px] bg-blue-500 dark:bg-white rounded-full transition-transform duration-300 origin-left ${
                  activeSection === link.href.substring(1) ? 'scale-x-100' : 'scale-x-0'
                }`}></span>
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-8">
            <button 
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full border border-transparent dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-500 dark:hover:text-white dark:hover:bg-slate-800 transition-all"
              title={isDarkMode ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
            >
              <i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            <a href="#" className="w-9 h-9 rounded-full border border-transparent dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 dark:hover:bg-slate-800 transition-all" title="Baixar CV">
              <i className="fa-solid fa-file-pdf"></i>
            </a>
            <a href="https://github.com/euller-ds" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-transparent dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-navy dark:hover:text-white dark:hover:bg-slate-800 transition-all">
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-slate-600 dark:text-slate-300 text-2xl hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-[#050505]/95 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${
        mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="flex flex-col gap-2 py-4 px-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base py-3 px-4 rounded-xl transition-colors ${
                activeSection === link.href.substring(1)
                  ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold'
                  : 'text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center gap-4 pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 px-4">
            <button 
              onClick={() => { toggleTheme(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              <i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i> Tema
            </button>
            <a href="#" className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors ml-auto">
              <i className="fa-solid fa-file-pdf"></i> Currículo
            </a>
            <a href="https://github.com/euller-ds" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-navy dark:hover:text-white transition-colors ml-auto">
              <i className="fa-brands fa-github"></i> GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
