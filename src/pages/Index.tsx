import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const NAV_ITEMS = [
  { id: 'home', label: 'Главная' },
  { id: 'about', label: 'О предприятии' },
  { id: 'directions', label: 'Направления' },
  { id: 'developments', label: 'Разработки' },
  { id: 'history', label: 'История' },
  { id: 'news', label: 'Новости' },
  { id: 'veterans', label: 'Ветераны' },
  { id: 'partners', label: 'Партнёры' },
  { id: 'production', label: 'Продукция' },
];

const DIRECTIONS = [
  { icon: 'Satellite', title: 'Космические системы', desc: 'Разработка бортовой аппаратуры и систем управления для космических аппаратов различного назначения', color: '#00AEEF' },
  { icon: 'Radio', title: 'Радиоэлектронная разведка', desc: 'Создание комплексов радиоэлектронной разведки и радиотехнической разведки', color: '#00D2C8' },
  { icon: 'Shield', title: 'Радиоэлектронная борьба', desc: 'Разработка систем РЭБ для подавления и защиты радиоэлектронных средств противника', color: '#00AEEF' },
  { icon: 'Plane', title: 'Авиационные комплексы', desc: 'Бортовые системы радиолокации, навигации и радиоэлектронной борьбы для авиации', color: '#00D2C8' },
  { icon: 'Radar', title: 'Радиолокационные системы', desc: 'Многофункциональные РЛС для обнаружения, сопровождения и идентификации целей', color: '#00AEEF' },
  { icon: 'FlaskConical', title: 'Научные исследования', desc: 'Фундаментальные и прикладные исследования в области электромагнетизма и радиофизики', color: '#00D2C8' },
];

const HISTORY = [
  { year: '1943', title: 'Основание института', desc: 'Создан в годы Великой Отечественной войны для решения задач радиоэлектронной разведки и противодействия.' },
  { year: '1950-е', title: 'Первые разработки РЭБ', desc: 'Созданы первые отечественные системы радиоэлектронной борьбы для нужд ВВС СССР.' },
  { year: '1960-е', title: 'Освоение космоса', desc: 'Участие в создании разведывательных космических систем. Разработка бортовой радиоэлектронной аппаратуры.' },
  { year: '1970-е', title: 'Серийные комплексы', desc: 'Постановка на серийное производство нескольких поколений комплексов РЭБ для всех родов войск.' },
  { year: '1980-е', title: 'Новое поколение систем', desc: 'Переход на цифровую элементную базу. Создание многофункциональных разведывательно-ударных комплексов.' },
  { year: '1993', title: '50 лет института', desc: 'Государственные награды сотрудникам. Предприятие удостоено Ордена Ленина за выдающиеся заслуги.' },
  { year: '2000-е', title: 'Вхождение в Алмаз-Антей', desc: 'Включение в структуру концерна ВКО «Алмаз-Антей» — крупнейшего производителя систем ПВО России.' },
  { year: 'Сегодня', title: 'Передовые разработки', desc: 'Более 80 лет создания систем нового поколения для обеспечения обороноспособности Российской Федерации.' },
];

const DEVELOPMENTS = [
  { icon: 'Satellite', title: 'Космические комплексы разведки', desc: 'Бортовая аппаратура радиотехнической и радиолокационной разведки для спутников серий «Лотос» и «Пион-НКС»', tag: 'Космос' },
  { icon: 'Shield', title: 'Комплексы РЭБ «Хибины»', desc: 'Авиационные комплексы индивидуальной защиты самолётов от ракет с радиолокационным наведением', tag: 'Авиация' },
  { icon: 'Radar', title: 'РЛС дальнего обнаружения', desc: 'Многофункциональные радиолокационные станции для обнаружения воздушных и космических целей', tag: 'РЛС' },
  { icon: 'Zap', title: 'Системы РЭБ наземного базирования', desc: 'Мобильные комплексы радиоэлектронного подавления тактического и оперативного уровней', tag: 'РЭБ' },
  { icon: 'Radio', title: 'Разведывательные комплексы', desc: 'Пассивные системы обнаружения и пеленгации источников радиоизлучений', tag: 'Разведка' },
  { icon: 'Cpu', title: 'Специальная аппаратура', desc: 'Цифровые системы обработки сигналов и управления для нужд специального назначения', tag: 'Спецназначение' },
];

const NEWS = [
  { date: '28 мая 2025', title: 'ЦНИРТИ представил новейшие разработки на форуме «Армия-2025»', desc: 'На международном военно-техническом форуме институт представил перспективные образцы систем радиоэлектронной борьбы нового поколения.' },
  { date: '15 мая 2025', title: 'Подписано соглашение о сотрудничестве с ведущими университетами', desc: 'Расширение программ подготовки специалистов в области радиофизики.' },
  { date: '2 мая 2025', title: 'Государственная премия за разработки в области РЭБ', desc: 'Коллектив учёных удостоен высокой государственной награды.' },
  { date: '18 апр 2025', title: 'Успешные испытания бортового комплекса разведки', desc: 'Проведены лётные испытания новейшей бортовой аппаратуры.' },
];

const PARTNERS = [
  { name: 'Концерн ВКО «Алмаз-Антей»', role: 'Материнская структура', icon: 'Building2' },
  { name: 'КРЭТ', role: 'Радиоэлектронные технологии', icon: 'Cpu' },
  { name: 'Завод «Цветный сигнал»', role: 'Серийное производство', icon: 'Factory' },
  { name: 'Роскосмос', role: 'Космические программы', icon: 'Satellite' },
  { name: 'РТИ Системы', role: 'Радиолокационные системы', icon: 'Radar' },
  { name: 'МИРЭА — РТУ', role: 'Подготовка кадров', icon: 'GraduationCap' },
];

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.target.classList.toggle('visible', e.isIntersecting)),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal-section').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useCounter(target: number, visible: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);
  return count;
}

function StatCard({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCounter(value, visible);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="corner-bracket text-center p-6 bg-[#0D1118] border border-[#23364D]/60 rounded-lg">
      <div className="font-oswald text-5xl font-bold text-[#00AEEF] text-glow-blue mb-2">
        {count}{suffix}
      </div>
      <div className="text-[#E8EDF3]/60 font-golos text-xs uppercase tracking-widest">{label}</div>
    </div>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [slideIndex, setSlideIndex] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);

  useScrollReveal();

  const slides = [
    {
      img: 'https://cdn.poehali.dev/projects/0833db77-0520-48be-9825-336c22693464/files/63cd6c27-0ea0-4daf-ab9d-8a9f413f0183.jpg',
      title: 'Космические системы нового поколения',
      sub: 'Бортовая аппаратура для спутников разведки'
    },
    {
      img: 'https://cdn.poehali.dev/projects/0833db77-0520-48be-9825-336c22693464/files/6990f051-c328-4357-a5ea-4b00e0881154.jpg',
      title: 'ЦНИРТИ — 80 лет в авангарде науки',
      sub: 'Основан в 1943 году, г. Москва'
    },
    {
      img: 'https://cdn.poehali.dev/projects/0833db77-0520-48be-9825-336c22693464/files/ede7ef3f-4f49-4aad-8ebb-bc4cf1f5133c.jpg',
      title: 'Передовые разработки в области РЭБ',
      sub: 'Защита и превосходство в радиоэлектронном пространстве'
    },
  ];

  useEffect(() => {
    const t = setInterval(() => setSlideIndex(i => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [slides.length]);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenu(false);
  };

  return (
    <div className="min-h-screen bg-[#071827] text-[#E8EDF3] font-golos">

      {/* ── NAVIGATION ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#071827]/95 backdrop-blur-md border-b border-[#23364D]/60">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('home')}>
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#00AEEF] to-[#00D2C8] flex items-center justify-center">
              <Icon name="Radar" size={16} className="text-white" />
            </div>
            <div>
              <div className="font-oswald text-sm font-bold tracking-wider text-white leading-none">ЦНИРТИ</div>
              <div className="text-[9px] text-[#00AEEF] tracking-widest leading-none mt-0.5">ИМ. АКАДЕМИКА БЕРГА</div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link px-3 py-2 text-[11px] font-golos font-medium tracking-wider uppercase transition-colors ${activeSection === item.id ? 'text-[#00AEEF] active' : 'text-[#E8EDF3]/60 hover:text-[#E8EDF3]'}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button className="lg:hidden text-[#E8EDF3]" onClick={() => setMobileMenu(!mobileMenu)}>
            <Icon name={mobileMenu ? 'X' : 'Menu'} size={22} />
          </button>
        </div>

        {mobileMenu && (
          <div className="lg:hidden bg-[#0D1118] border-t border-[#23364D]/60 px-6 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className="text-left text-sm text-[#E8EDF3]/70 hover:text-[#00AEEF] py-2.5 border-b border-[#23364D]/30 last:border-0 transition-colors">
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden radar-grid scan-overlay pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#071827] via-[#071827]/97 to-[#0D1118]" />
        {/* Satellite background */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 lg:w-[58%] pointer-events-none">
          <img
            src="https://cdn.poehali.dev/projects/0833db77-0520-48be-9825-336c22693464/files/2eb69c13-0035-42a4-b089-5530d3f500ba.jpg"
            className="w-full h-full object-cover object-center opacity-55"
            style={{ animation: 'satellite-float 8s ease-in-out infinite' }}
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071827] via-[#071827]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/60 via-transparent to-[#071827]/20" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,rgba(0,174,239,0.07)_0%,transparent_65%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center py-20">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#00AEEF]/10 border border-[#00AEEF]/20 rounded-full px-4 py-1.5 mb-8"
              style={{ animation: 'fade-up 0.6s ease-out forwards' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#00D2C8] animate-pulse" />
              <span className="text-[#00D2C8] text-[10px] font-medium tracking-widest uppercase">Концерн ВКО «Алмаз-Антей»</span>
            </div>

            <h1 className="font-oswald text-4xl lg:text-6xl font-bold text-white leading-[1.1] mb-5">
              АО «ЦНИРТИ<br />
              <span className="text-[#00AEEF] text-glow-blue">имени академика</span><br />
              А.И. Берга»
            </h1>

            <p className="text-[#E8EDF3]/65 text-base lg:text-lg leading-relaxed mb-8 max-w-lg">
              Ведущий научно-исследовательский институт в области радиоэлектронной разведки, радиоэлектронной борьбы и космических систем. С 1943 года — на защите страны.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <button onClick={() => scrollTo('about')}
                className="bg-[#00AEEF] hover:bg-[#0099d4] text-white font-medium px-7 py-3 rounded text-sm tracking-wide transition-all glow-blue hover:scale-105">
                О предприятии
              </button>
              <button onClick={() => scrollTo('directions')}
                className="border border-[#00AEEF]/40 hover:border-[#00AEEF] text-[#00AEEF] font-medium px-7 py-3 rounded text-sm tracking-wide transition-all hover:bg-[#00AEEF]/10">
                Направления деятельности
              </button>
            </div>

            <div className="flex items-center gap-6">
              {[{ val: '1943', label: 'Год основания' }, { val: '80+', label: 'Лет разработок' }, { val: '50+', label: 'Проектов' }].map((s, i) => (
                <div key={i} className="flex items-center gap-6">
                  {i > 0 && <div className="w-px h-10 bg-[#23364D]" />}
                  <div className="text-center">
                    <div className="font-oswald text-2xl font-bold text-[#00AEEF]">{s.val}</div>
                    <div className="text-[10px] text-[#E8EDF3]/45 uppercase tracking-widest">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block" />
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
          <div className="text-[10px] tracking-widest uppercase text-[#E8EDF3]/60">Scroll</div>
          <Icon name="ChevronDown" size={14} className="text-[#00AEEF] animate-bounce" />
        </div>
      </section>

      {/* ── SLIDESHOW ── */}
      <section className="relative h-72 overflow-hidden">
        {slides.map((s, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === slideIndex ? 'opacity-100' : 'opacity-0'}`}>
            <img src={s.img} className="w-full h-full object-cover" alt={s.title} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071827]/92 via-[#071827]/55 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/50 to-transparent" />
            <div className="absolute bottom-10 left-10">
              <div className="font-oswald text-2xl font-bold text-white mb-1">{s.title}</div>
              <div className="text-[#00AEEF] text-sm">{s.sub}</div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-5 right-8 flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setSlideIndex(i)}
              className={`h-0.5 transition-all duration-300 rounded-full ${i === slideIndex ? 'w-8 bg-[#00AEEF]' : 'w-4 bg-[#23364D]'}`} />
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-6 reveal-section">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-[#00AEEF] text-[11px] font-medium tracking-widest uppercase mb-3">О предприятии</div>
            <h2 className="font-oswald text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.1]">
              Передовой центр<br />
              <span className="text-[#00D2C8]">радиоэлектронных</span><br />
              технологий
            </h2>
            <p className="text-[#E8EDF3]/65 leading-relaxed mb-5 text-sm">
              АО «ЦНИРТИ имени академика А.И. Берга» — один из старейших и наиболее авторитетных научно-исследовательских институтов России в области радиоэлектронных систем. Основанное в 1943 году, предприятие внесло значительный вклад в создание систем радиоэлектронной разведки, борьбы и космических технологий.
            </p>
            <p className="text-[#E8EDF3]/65 leading-relaxed mb-8 text-sm">
              Входит в состав концерна ВКО «Алмаз-Антей» — крупнейшего в России производителя систем противовоздушной и противоракетной обороны. Награждено Орденом Ленина за выдающиеся заслуги перед Отечеством.
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="bg-[#00AEEF]/10 border border-[#00AEEF]/25 rounded px-3 py-1.5 text-[#00AEEF] text-xs">🏅 Орден Ленина</div>
              <div className="bg-[#00D2C8]/10 border border-[#00D2C8]/25 rounded px-3 py-1.5 text-[#00D2C8] text-xs">Концерн «Алмаз-Антей»</div>
              <div className="bg-[#23364D]/50 border border-[#23364D] rounded px-3 py-1.5 text-[#E8EDF3]/60 text-xs">📍 Москва, с 1943 г.</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <StatCard value={1943} label="Год основания" />
            <StatCard value={80} label="Лет исследований" suffix="+" />
            <StatCard value={50} label="Реализованных проектов" suffix="+" />
            <StatCard value={3000} label="Специалистов" suffix="+" />
          </div>
        </div>
      </section>

      {/* ── DIRECTIONS ── */}
      <section id="directions" className="py-24 bg-[#0D1118] reveal-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-[#00AEEF] text-[11px] font-medium tracking-widest uppercase mb-3">Чем мы занимаемся</div>
            <h2 className="font-oswald text-4xl lg:text-5xl font-bold text-white">Направления деятельности</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DIRECTIONS.map((d, i) => (
              <div key={i} className="tech-card bg-[#071827] rounded-lg p-6 cursor-pointer group">
                <div className="w-12 h-12 rounded-lg mb-5 flex items-center justify-center"
                  style={{ background: `${d.color}12`, border: `1px solid ${d.color}28` }}>
                  <Icon name={d.icon} size={22} style={{ color: d.color }} />
                </div>
                <h3 className="font-oswald text-lg font-semibold text-white mb-3 group-hover:text-[#00AEEF] transition-colors">{d.title}</h3>
                <p className="text-[#E8EDF3]/55 text-sm leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEVELOPMENTS ── */}
      <section id="developments" className="py-24 max-w-7xl mx-auto px-6 reveal-section">
        <div className="text-center mb-14">
          <div className="text-[#00AEEF] text-[11px] font-medium tracking-widest uppercase mb-3">Портфель разработок</div>
          <h2 className="font-oswald text-4xl lg:text-5xl font-bold text-white">Разработки и достижения</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEVELOPMENTS.map((d, i) => (
            <div key={i} className="tech-card bg-[#0D1118] rounded-lg overflow-hidden cursor-pointer group">
              <div className="h-0.5 bg-gradient-to-r from-[#00AEEF] to-[#00D2C8] opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded bg-[#00AEEF]/10 border border-[#00AEEF]/20 flex items-center justify-center">
                    <Icon name={d.icon} size={17} className="text-[#00AEEF]" />
                  </div>
                  <span className="text-[10px] tracking-widest uppercase text-[#00D2C8] bg-[#00D2C8]/10 border border-[#00D2C8]/20 rounded-full px-2 py-0.5">{d.tag}</span>
                </div>
                <h3 className="font-oswald text-base font-semibold text-white mb-2 group-hover:text-[#00AEEF] transition-colors">{d.title}</h3>
                <p className="text-[#E8EDF3]/50 text-sm leading-relaxed">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HISTORY ── */}
      <section id="history" className="py-24 bg-[#0D1118] reveal-section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-[#00AEEF] text-[11px] font-medium tracking-widest uppercase mb-3">Хронология</div>
            <h2 className="font-oswald text-4xl lg:text-5xl font-bold text-white">История предприятия</h2>
          </div>
          <div className="relative pl-8 border-l border-[#23364D]">
            {HISTORY.map((h, i) => (
              <div key={i} className="timeline-line mb-10 last:mb-0 pl-6 relative">
                <div className="font-oswald text-2xl font-bold text-[#00AEEF] mb-1">{h.year}</div>
                <div className="font-semibold text-white mb-2 text-sm">{h.title}</div>
                <div className="text-[#E8EDF3]/55 text-sm leading-relaxed">{h.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWS ── */}
      <section id="news" className="py-24 max-w-7xl mx-auto px-6 reveal-section">
        <div className="flex items-end justify-between mb-14">
          <div>
            <div className="text-[#00AEEF] text-[11px] font-medium tracking-widest uppercase mb-3">Актуально</div>
            <h2 className="font-oswald text-4xl lg:text-5xl font-bold text-white">Новости</h2>
          </div>
          <button className="text-[#00AEEF] text-sm hover:underline hidden md:block">Все новости →</button>
        </div>
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 tech-card bg-[#0D1118] rounded-lg overflow-hidden cursor-pointer group">
            <img src="https://cdn.poehali.dev/projects/0833db77-0520-48be-9825-336c22693464/files/ede7ef3f-4f49-4aad-8ebb-bc4cf1f5133c.jpg"
              className="w-full h-52 object-cover opacity-75 group-hover:opacity-95 transition-opacity" alt="news" />
            <div className="p-6">
              <div className="text-[#00AEEF] text-xs mb-2">{NEWS[0].date}</div>
              <h3 className="font-oswald text-xl font-bold text-white mb-3 group-hover:text-[#00AEEF] transition-colors">{NEWS[0].title}</h3>
              <p className="text-[#E8EDF3]/55 text-sm leading-relaxed">{NEWS[0].desc}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {NEWS.slice(1).map((n, i) => (
              <div key={i} className="tech-card bg-[#0D1118] rounded-lg p-5 cursor-pointer group flex-1">
                <div className="text-[#00AEEF] text-xs mb-2">{n.date}</div>
                <h3 className="font-semibold text-white text-sm mb-2 group-hover:text-[#00AEEF] transition-colors leading-snug">{n.title}</h3>
                <p className="text-[#E8EDF3]/50 text-xs leading-relaxed">{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AWARDS & VETERANS ── */}
      <section id="veterans" className="py-24 reveal-section">
        <div className="max-w-7xl mx-auto px-6">

          {/* Награды */}
          <div className="text-center mb-14">
            <div className="text-[#00AEEF] text-[11px] font-medium tracking-widest uppercase mb-3">Признание государства</div>
            <h2 className="font-oswald text-4xl lg:text-5xl font-bold text-white">Государственные награды</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-20">
            {/* Орден Ленина */}
            <div className="relative rounded-xl overflow-hidden border border-[#FFD700]/20 bg-[#0D1118] group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent pointer-events-none" />
              <div className="flex gap-0 flex-col md:flex-row">
                <div className="md:w-48 flex-shrink-0">
                  <img
                    src="https://cdn.poehali.dev/projects/0833db77-0520-48be-9825-336c22693464/files/b95168b2-354c-4773-b6a5-a8d7159e3c1e.jpg"
                    className="w-full h-48 md:h-full object-cover"
                    alt="Орден Ленина"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span className="text-[#FFD700] text-lg">★</span>
                    <span className="text-[#FFD700] text-[10px] font-medium tracking-widest uppercase">Высшая награда СССР</span>
                  </div>
                  <h3 className="font-oswald text-2xl font-bold text-white mb-2">Орден Ленина</h3>
                  <p className="text-[#E8EDF3]/60 text-sm leading-relaxed mb-4">
                    Предприятие удостоено высшей государственной награды СССР — Ордена Ленина — за выдающийся вклад в укрепление обороноспособности страны и создание передовых систем радиоэлектронной борьбы.
                  </p>
                  <div className="flex items-center gap-2 text-[#FFD700]/70 text-xs">
                    <Icon name="Award" size={13} />
                    <span>Вручение: 1993 год · Москва, Кремль</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Благодарность Государственной Думы */}
            <div className="relative rounded-xl overflow-hidden border border-[#00AEEF]/20 bg-[#0D1118] group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00AEEF]/5 to-transparent pointer-events-none" />
              <div className="p-7 h-full flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded bg-[#00AEEF]/15 border border-[#00AEEF]/30 flex items-center justify-center">
                      <Icon name="Landmark" size={15} className="text-[#00AEEF]" />
                    </div>
                    <span className="text-[#00AEEF] text-[10px] font-medium tracking-widest uppercase">Государственная Дума РФ</span>
                  </div>
                  <h3 className="font-oswald text-2xl font-bold text-white mb-3">Благодарность<br />Государственной Думы</h3>
                  <p className="text-[#E8EDF3]/60 text-sm leading-relaxed">
                    Коллектив института отмечен официальной благодарностью Государственной Думы Федерального Собрания Российской Федерации за многолетний вклад в развитие отечественной радиоэлектронной промышленности и обеспечение обороноспособности государства.
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {['Национальная безопасность', 'Оборонная промышленность', 'Радиоэлектроника'].map(t => (
                    <span key={t} className="text-[10px] text-[#00AEEF] bg-[#00AEEF]/8 border border-[#00AEEF]/20 rounded px-2 py-1">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Своих не бросаем */}
          <div className="relative rounded-2xl overflow-hidden mb-6">
            <img
              src="https://cdn.poehali.dev/projects/0833db77-0520-48be-9825-336c22693464/files/3eb00f08-fe4f-46ba-8183-dc79376fdce3.jpg"
              className="w-full h-80 object-cover object-top"
              alt="Своих не бросаем"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071827]/97 via-[#071827]/75 to-[#071827]/30" />
            <div className="absolute inset-0 flex items-center">
              <div className="px-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-[#C0392B]/15 border border-[#C0392B]/40 rounded-full px-4 py-1.5 mb-5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C0392B] animate-pulse" />
                  <span className="text-[#FF6B6B] text-[10px] font-medium tracking-widest uppercase">Патриотический проект</span>
                </div>
                <h3 className="font-oswald text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  «Своих<br />не бросаем»
                </h3>
                <p className="text-[#E8EDF3]/70 text-sm leading-relaxed mb-6 max-w-lg">
                  Совет ветеранов ЦНИРТИ реализует программу поддержки участников специальной военной операции, ветеранов предприятия и их семей. Мы помним и чтим каждого, кто отдал годы жизни служению Родине и нашему институту.
                </p>
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: 'Heart', label: 'Поддержка ветеранов СВО' },
                    { icon: 'Users', label: 'Помощь семьям' },
                    { icon: 'Star', label: 'Сохранение памяти' },
                  ].map((i, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[#E8EDF3]/80 text-xs">
                      <Icon name={i.icon} size={13} className="text-[#FF6B6B]" />
                      <span>{i.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Совет ветеранов — карточки */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: 'Medal',
                title: 'Совет ветеранов',
                desc: 'Объединяет ветеранов предприятия, организует встречи, памятные мероприятия и сохраняет историческую память о достижениях ЦНИРТИ.',
                color: '#FFD700',
                action: 'Присоединиться',
              },
              {
                icon: 'HeartHandshake',
                title: 'Шефская помощь',
                desc: 'Материальная и моральная поддержка семей сотрудников, участвующих в СВО. Горячая линия работает круглосуточно.',
                color: '#FF6B6B',
                action: 'Обратиться за помощью',
              },
              {
                icon: 'BookOpen',
                title: 'Книга памяти',
                desc: 'Живая летопись предприятия — биографии, достижения и воспоминания ветеранов, передающих опыт молодым специалистам.',
                color: '#00AEEF',
                action: 'Читать книгу',
              },
            ].map((c, i) => (
              <div key={i} className="tech-card bg-[#0D1118] rounded-xl p-6 cursor-pointer group"
                style={{ borderColor: `${c.color}18` }}>
                <div className="w-11 h-11 rounded-lg mb-4 flex items-center justify-center"
                  style={{ background: `${c.color}12`, border: `1px solid ${c.color}30` }}>
                  <Icon name={c.icon} size={20} style={{ color: c.color }} />
                </div>
                <h4 className="font-oswald text-lg font-bold text-white mb-2 group-hover:text-[#00AEEF] transition-colors">{c.title}</h4>
                <p className="text-[#E8EDF3]/55 text-sm leading-relaxed mb-4">{c.desc}</p>
                <button className="text-xs font-medium flex items-center gap-1 transition-colors"
                  style={{ color: c.color }}>
                  {c.action} <Icon name="ArrowRight" size={11} />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── PARTNERS & CONTACTS ── */}
      <section id="partners" className="py-24 bg-[#0D1118] reveal-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-[#00AEEF] text-[11px] font-medium tracking-widest uppercase mb-3">Экосистема</div>
            <h2 className="font-oswald text-4xl lg:text-5xl font-bold text-white">Партнёры и контакты</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {PARTNERS.map((p, i) => (
              <div key={i} className="tech-card bg-[#071827] rounded-lg p-5 flex items-center gap-4 cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-[#00AEEF]/10 border border-[#00AEEF]/20 flex items-center justify-center flex-shrink-0">
                  <Icon name={p.icon} size={17} className="text-[#00AEEF]" />
                </div>
                <div>
                  <div className="font-medium text-white text-sm group-hover:text-[#00AEEF] transition-colors">{p.name}</div>
                  <div className="text-[#E8EDF3]/45 text-xs mt-0.5">{p.role}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6 border-t border-[#23364D]/60 pt-12">
            {[
              { icon: 'MapPin', label: 'Адрес', val: '107078, Москва, ул. Садово-Черногрязская, д. 13' },
              { icon: 'Phone', label: 'Телефон', val: '+7 (495) 625-10-00' },
              { icon: 'Mail', label: 'E-mail', val: 'info@cniirti.ru' },
            ].map((c, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#00AEEF]/10 border border-[#00AEEF]/20 flex items-center justify-center flex-shrink-0">
                  <Icon name={c.icon} size={17} className="text-[#00AEEF]" />
                </div>
                <div>
                  <div className="text-[#E8EDF3]/45 text-[10px] uppercase tracking-wider mb-1">{c.label}</div>
                  <div className="text-[#E8EDF3] text-sm">{c.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTION & PRODUCT SHOWCASE ── */}
      <section id="production" className="py-24 bg-[#0D1118] reveal-section">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-14">
            <div className="text-[#00AEEF] text-[11px] font-medium tracking-widest uppercase mb-3">Производство и продукция</div>
            <h2 className="font-oswald text-4xl lg:text-5xl font-bold text-white mb-4">Наши возможности</h2>
            <p className="text-[#E8EDF3]/50 text-sm max-w-2xl mx-auto">
              Полный цикл разработки и производства: от научных исследований до серийного выпуска. Современные цеха, испытательные комплексы и уникальные технологии.
            </p>
          </div>

          {/* Featured product promo — full width */}
          <div className="relative rounded-xl overflow-hidden mb-6 group cursor-pointer">
            <img
              src="https://cdn.poehali.dev/projects/0833db77-0520-48be-9825-336c22693464/files/25b235fd-67f6-4641-a1a6-1fa322f4f715.jpg"
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              alt="Радиолокационные системы"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071827]/95 via-[#071827]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/70 to-transparent" />
            {/* Scan line on hover */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00AEEF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 flex items-center">
              <div className="px-10 max-w-xl">
                <div className="inline-flex items-center gap-2 bg-[#00AEEF]/15 border border-[#00AEEF]/30 rounded-full px-3 py-1 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00AEEF] animate-pulse" />
                  <span className="text-[#00AEEF] text-[10px] tracking-widest uppercase font-medium">Флагманская разработка</span>
                </div>
                <h3 className="font-oswald text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                  Радиолокационные комплексы<br />
                  <span className="text-[#00AEEF]">нового поколения</span>
                </h3>
                <p className="text-[#E8EDF3]/70 text-sm leading-relaxed mb-5">
                  Многофункциональные РЛС с фазированной антенной решёткой для обнаружения, сопровождения и классификации воздушных и космических объектов на дальних дистанциях.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Дальность 400+ км', 'Фазированная АР', 'Цифровая обработка', 'Многоцелевое сопровождение'].map(f => (
                    <span key={f} className="text-[10px] text-[#00D2C8] border border-[#00D2C8]/25 bg-[#00D2C8]/8 rounded px-2 py-0.5">{f}</span>
                  ))}
                </div>
                <button className="bg-[#00AEEF] hover:bg-[#0099d4] text-white font-medium px-6 py-2.5 rounded text-sm tracking-wide transition-all glow-blue">
                  Запросить коммерческое предложение
                </button>
              </div>
            </div>
          </div>

          {/* 2-col product cards */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Card 1 */}
            <div className="relative rounded-xl overflow-hidden group cursor-pointer">
              <img
                src="https://cdn.poehali.dev/projects/0833db77-0520-48be-9825-336c22693464/files/d2674a40-3fb2-4874-92ff-6275578eccb7.jpg"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Комплексы РЭБ"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071827] via-[#071827]/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-[#00D2C8] text-[10px] tracking-widest uppercase mb-1">Авиационное применение</div>
                <h3 className="font-oswald text-xl font-bold text-white mb-2">Комплексы РЭБ «Хибины»</h3>
                <p className="text-[#E8EDF3]/60 text-xs leading-relaxed mb-4">
                  Бортовые системы индивидуальной защиты самолётов от ракет с радиолокационным самонаведением. Сертифицированы для Су-34, Су-35, Су-30СМ.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {['Су-34', 'Су-35', 'Су-30СМ'].map(p => (
                      <span key={p} className="text-[10px] text-[#00AEEF] bg-[#00AEEF]/10 border border-[#00AEEF]/20 rounded px-2 py-0.5">{p}</span>
                    ))}
                  </div>
                  <button className="text-[#00AEEF] text-xs hover:underline flex items-center gap-1">
                    Подробнее <Icon name="ArrowRight" size={12} />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative rounded-xl overflow-hidden group cursor-pointer">
              <img
                src="https://cdn.poehali.dev/projects/0833db77-0520-48be-9825-336c22693464/files/2686a37a-2acd-44d2-b86d-8489e050ae23.jpg"
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Космические системы"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071827] via-[#071827]/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-[#00D2C8] text-[10px] tracking-widest uppercase mb-1">Космическое применение</div>
                <h3 className="font-oswald text-xl font-bold text-white mb-2">Бортовая аппаратура КА</h3>
                <p className="text-[#E8EDF3]/60 text-xs leading-relaxed mb-4">
                  Радиотехническая и радиолокационная аппаратура для космических аппаратов серий «Лотос», «Пион-НКС». Диапазон частот 0.1–40 ГГц.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {['«Лотос»', '«Пион-НКС»'].map(p => (
                      <span key={p} className="text-[10px] text-[#00AEEF] bg-[#00AEEF]/10 border border-[#00AEEF]/20 rounded px-2 py-0.5">{p}</span>
                    ))}
                  </div>
                  <button className="text-[#00AEEF] text-xs hover:underline flex items-center gap-1">
                    Подробнее <Icon name="ArrowRight" size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* PRODUCTION GALLERY — цеха */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-[#00AEEF]" />
              <span className="font-oswald text-lg font-semibold text-white tracking-wide">Производственные мощности</span>
              <div className="flex-1 h-px bg-[#23364D]" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { img: 'https://cdn.poehali.dev/projects/0833db77-0520-48be-9825-336c22693464/files/221e670a-98a2-4313-98cc-5a7b7a6815e7.jpg', label: 'Сборочный цех', sub: 'Прецизионная сборка' },
                { img: 'https://cdn.poehali.dev/projects/0833db77-0520-48be-9825-336c22693464/files/7f793f9d-4f5f-4a82-a8e9-4e2477c0c01e.jpg', label: 'Испытательный комплекс', sub: 'Измерительное оборудование' },
                { img: 'https://cdn.poehali.dev/projects/0833db77-0520-48be-9825-336c22693464/files/63cd6c27-0ea0-4daf-ab9d-8a9f413f0183.jpg', label: 'Испытания в космосе', sub: 'Орбитальные системы' },
              ].map((g, i) => (
                <div key={i} className="relative rounded-lg overflow-hidden group cursor-pointer aspect-video">
                  <img src={g.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={g.label} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 transition-transform">
                    <div className="font-medium text-white text-xs">{g.label}</div>
                    <div className="text-[#00AEEF] text-[10px] mt-0.5">{g.sub}</div>
                  </div>
                  {/* Corner bracket */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#00AEEF]/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#00AEEF]/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* CTA strip */}
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-[#071827] to-[#0D1118] border border-[#00AEEF]/20 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute inset-0 radar-grid opacity-40" />
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#00AEEF]/5 to-transparent" />
            <div className="relative">
              <h3 className="font-oswald text-2xl font-bold text-white mb-2">Заинтересованы в сотрудничестве?</h3>
              <p className="text-[#E8EDF3]/55 text-sm">Направьте запрос — наши специалисты подготовят техническое предложение</p>
            </div>
            <div className="relative flex gap-3 flex-shrink-0">
              <button className="bg-[#00AEEF] hover:bg-[#0099d4] text-white font-medium px-6 py-3 rounded text-sm tracking-wide transition-all glow-blue whitespace-nowrap">
                Связаться с нами
              </button>
              <button className="border border-[#00AEEF]/35 hover:border-[#00AEEF] text-[#00AEEF] px-6 py-3 rounded text-sm transition-all whitespace-nowrap">
                Каталог продукции
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0D1118] border-t border-[#23364D]/60 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-[#00AEEF] to-[#00D2C8] flex items-center justify-center">
                  <Icon name="Radar" size={16} className="text-white" />
                </div>
                <div>
                  <div className="font-oswald text-sm font-semibold text-white">АО «ЦНИРТИ»</div>
                  <div className="text-[9px] text-[#00AEEF] tracking-widest">ИМ. АКАДЕМИКА А.И. БЕРГА</div>
                </div>
              </div>
              <p className="text-[#E8EDF3]/45 text-xs leading-relaxed max-w-xs">
                Центральный научно-исследовательский институт радиоэлектронных технологий и информации. Входит в структуру концерна ВКО «Алмаз-Антей».
              </p>
            </div>
            <div>
              <div className="font-oswald text-sm font-semibold text-white mb-4 tracking-wider">Разделы</div>
              <div className="space-y-2">
                {NAV_ITEMS.slice(0, 5).map(n => (
                  <button key={n.id} onClick={() => scrollTo(n.id)}
                    className="block text-xs text-[#E8EDF3]/45 hover:text-[#00AEEF] transition-colors text-left">{n.label}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="font-oswald text-sm font-semibold text-white mb-4 tracking-wider">Документы</div>
              <div className="space-y-2">
                {['Устав предприятия', 'Политика качества', 'Закупочная деятельность', 'Антикоррупционная политика'].map(d => (
                  <div key={d} className="text-xs text-[#E8EDF3]/45 hover:text-[#00AEEF] cursor-pointer transition-colors">{d}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-[#23364D]/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-xs text-[#E8EDF3]/25">© 2025 АО «ЦНИРТИ имени академика А.И. Берга». Все права защищены.</div>
            <div className="text-xs text-[#E8EDF3]/25">Концерн ВКО «Алмаз-Антей» · г. Москва</div>
          </div>
        </div>
      </footer>
    </div>
  );
}