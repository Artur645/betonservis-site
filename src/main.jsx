import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Award,
  Calculator,
  CheckCircle2,
  Clock,
  Factory,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Send,
  ShieldCheck,
  Star,
  Truck,
} from 'lucide-react';
import './styles.css';

const prices = {
  M100: 4500,
  M150: 4700,
  M200: 5200,
  M250: 5600,
  M300: 6000,
  M350: 6500,
  M400: 7500,
};

const mortarPrices = [
  { name: 'Раствор известковый', price: 5200 },A
  { name: 'Раствор сложный М-25', price: 5250 },
  { name: 'Раствор сложный М-50', price: 5600 },
  { name: 'Раствор сложный М-75', price: 6000 },
  { name: 'Раствор сложный М-100', price: 6300 },
  { name: 'Раствор цементный М-50', price: 5300 },
  { name: 'Раствор цементный М-75', price: 5850 },
  { name: 'Раствор цементный М-100', price: 7000 },
  { name: 'Раствор цементный М-150', price: 7250 },
  { name: 'Раствор цементный М-200', price: 7700 },
];

const reviews = [
  {
    name: 'Ильдар, частный дом',
    text: 'Заказывали бетон на фундамент. Привезли вовремя, водитель помог правильно подъехать к месту заливки.',
  },
  {
    name: 'Ринат, строительная бригада',
    text: 'Берём бетон и раствор для объектов в Стерлитамаке. Удобно, что можно быстро согласовать объём и время подачи.',
  },
  {
    name: 'ООО, подрядная организация',
    text: 'Работаем с документами, закрывающими актами и стабильными поставками. Для юрлиц удобно.',
  },
];

function formatRub(value) {
  return value.toLocaleString('ru-RU');
}

function getDeliveryPrice(distance) {
  const safeDistance = Number.isFinite(distance) && distance > 0 ? distance : 1;
  return safeDistance <= 10 ? 4000 : 4000 + (safeDistance - 10) * 120;
}

function Button({ children, variant = 'primary', className = '', ...props }) {
  return (
    <button className={`btn btn-${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}

function Card({ children, className = '' }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function App() {
  const [volume, setVolume] = useState(10);
  const [grade, setGrade] = useState('M300');
  const [distance, setDistance] = useState(10);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const estimated = useMemo(() => volume * prices[grade], [volume, grade]);
  const deliveryPrice = useMemo(() => getDeliveryPrice(distance), [distance]);
  const totalWithDelivery = estimated + deliveryPrice;

  const sendTelegram = async () => {
    try {
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          grade,
          address: form.address,
        }),
      });

      if (!response.ok) {
        throw new Error('Send error');
      }

      alert('Заявка отправлена!');
      setForm({ name: '', phone: '', address: '' });
    } catch (error) {
      alert('Ошибка отправки заявки');
    }
  };

  return (
    <div className="site">
      <header className="header">
        <div className="container header-inner">
          <div className="brand">
            <div className="brand-icon">Б</div>
            <div>
              <p className="brand-title">Бетонсервис</p>
              <p className="brand-subtitle">Стерлитамак и Республика Башкортостан</p>
            </div>
          </div>

          <nav className="nav">
            <a href="#prices">Цены</a>
            <a href="#fleet">Автопарк</a>
            <a href="#calc">Расчёт</a>
            <a href="#delivery">Доставка</a>
            <a href="#contacts">Контакты</a>
          </nav>

          <a className="call-link" href="tel:+73473214585">
            <Phone size={18} />
            8 (3473) 21-45-85
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-bg" />
          <div className="container hero-grid">
            <div>
              <div className="badge">
                <Truck size={16} />
                Собственное производство бетона
              </div>

              <h1>Бетон и раствор с доставкой в Стерлитамаке</h1>

              <p className="hero-text">
                Производство и доставка бетона по Стерлитамаку и Республике Башкортостан.
                Работаем с частными клиентами, застройщиками и юридическими лицами.
              </p>

              <div className="hero-actions">
                <Button onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}>
                  Получить расчёт цены
                </Button>
                <Button variant="outline" onClick={() => window.open('https://t.me/Zartur25', '_blank')}>
                  <Send size={18} />
                  Написать в Telegram
                </Button>
              </div>

              <div className="stats">
                <div><strong>20+</strong><span>позиций в прайсе</span></div>
                <div><strong>24/7</strong><span>приём заявок</span></div>
                <div><strong>от 1 м³</strong><span>любой объём</span></div>
              </div>
            </div>

            <Card className="form-card" id="form">
              <h2>Заявка на расчёт</h2>
              <p>Оставьте телефон — менеджер уточнит адрес, объём и марку бетона.</p>

              <div className="form-stack">
                <input
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  placeholder="Телефон или Telegram"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                  {Object.keys(prices).map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
                <textarea
                  placeholder="Адрес объекта и примерный объём"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
                <Button onClick={sendTelegram}>
                  <Send size={18} />
                  Отправить заявку в Telegram
                </Button>
                <small>Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</small>
              </div>
            </Card>
          </div>
        </section>

        <section className="container section">
          <div className="features">
            {[
              [Factory, 'Собственное производство', 'Собственный завод и контроль качества каждой партии.'],
              [Clock, 'Подача точно ко времени', 'Согласуем интервал доставки под заливку.'],
              [ShieldCheck, 'Работа с юрлицами', 'Работаем по договору и предоставляем документы.'],
              [MapPin, 'Доставка по региону', 'Привезём на частный или коммерческий объект.'],
            ].map(([Icon, title, text]) => (
              <Card key={title} className="feature-card">
                <Icon size={32} />
                <h3>{title}</h3>
                <p>{text}</p>
              </Card>
            ))}
          </div>
        </section>

        <section id="prices" className="section section-dark">
          <div className="container">
            <div className="section-title">
              <p>Прайс</p>
              <h2>Цены на бетон и раствор</h2>
            </div>

            <div className="price-grid">
              <Card>
                <h3>Бетон</h3>
                {Object.entries(prices).map(([mark, price]) => (
                  <div className="price-row" key={mark}>
                    <span>{mark}</span>
                    <strong>{formatRub(price)} ₽/м³</strong>
                  </div>
                ))}
              </Card>

              <Card>
                <h3>Раствор</h3>
                {mortarPrices.map((item) => (
                  <div className="price-row" key={item.name}>
                    <span>{item.name}</span>
                    <strong>{formatRub(item.price)} ₽/м³</strong>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        </section>

        <section id="calc" className="container section">
          <div className="section-title">
            <p>Калькулятор</p>
            <h2>Предварительный расчёт стоимости</h2>
          </div>

          <Card className="calculator-card">
            <div className="calc-grid">
              <label>
                Объём, м³
                <input type="number" value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
              </label>

              <label>
                Марка бетона
                <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                  {Object.keys(prices).map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label>
                Расстояние, км
                <input type="number" value={distance} onChange={(e) => setDistance(Number(e.target.value))} />
              </label>
            </div>

            <div className="calc-result">
              <div>
                <span>Бетон:</span>
                <strong>{formatRub(estimated)} ₽</strong>
              </div>
              <div>
                <span>Доставка:</span>
                <strong>{formatRub(deliveryPrice)} ₽</strong>
              </div>
              <div>
                <span>Итого ориентировочно:</span>
                <strong>{formatRub(totalWithDelivery)} ₽</strong>
              </div>
            </div>
          </Card>
        </section>

        <section id="delivery" className="container section">
          <div className="section-title">
            <p>Как работаем</p>
            <h2>4 шага до заливки</h2>
          </div>

          <div className="steps">
            {[
              ['01', 'Заявка', 'Вы оставляете заявку или пишете нам в Telegram.'],
              ['02', 'Расчёт', 'Уточняем марку, объём, адрес и время подачи.'],
              ['03', 'Доставка', 'Миксер приезжает на объект в согласованный интервал.'],
              ['04', 'Заливка', 'Вы принимаете бетон и получаете документы.'],
            ].map(([num, title, text]) => (
              <div key={num} className="step">
                <strong>{num}</strong>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container section">
          <div className="section-title">
            <p>Отзывы</p>
            <h2>Что говорят клиенты</h2>
          </div>

          <div className="reviews">
            {reviews.map((review) => (
              <Card key={review.name} className="review-card">
                <Star size={22} />
                <p>{review.text}</p>
                <strong>{review.name}</strong>
              </Card>
            ))}
          </div>
        </section>

        <section className="container section">
          <div className="cta">
            <div>
              <h2>Нужен бетон в Стерлитамаке?</h2>
              <p>Оставьте заявку — быстро рассчитаем стоимость, доставку и ближайшее время подачи миксера.</p>
            </div>
            <div className="hero-actions">
              <Button onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}>
                <Calculator size={18} />
                Рассчитать
              </Button>
              <Button variant="outline" onClick={() => window.open('tel:+73473214585')}>
                <Phone size={18} />
                Позвонить
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer id="contacts" className="footer">
        <div className="container footer-grid">
          <div>
            <p className="brand-title">Бетонсервис</p>
            <p>Продажа бетона и раствора с доставкой на объект.</p>
          </div>
          <div>
            <p>Телефон: 8 (3473) 21-45-85</p>
            <p>Telegram: +7 (917) 419-48-25</p>
            <p>Email: bsk04@mail.ru</p>
          </div>
          <div>
            <p>Стерлитамак, Республика Башкортостан</p>
            <p>Заявки принимаем ежедневно</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
