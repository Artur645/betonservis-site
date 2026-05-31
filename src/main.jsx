import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import {
  Award,
  Calculator,
  Camera,
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
  'М100': 4400,
  'М150': 4600,
  'М200': 5000,
  'М250': 5400,
  'М300': 5900,
  'М350': 6400,
  'М400': 7000,
};

const mortarPrices = [
  { name: 'Раствор известковый', price: 5000 },
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

const fleetPhotos = [
  {
    title: 'Собственный бетонный узел',
    text: 'Производство в Стерлитамаке, контроль качества смеси и отгрузка напрямую с завода.',
    image: '/images/hero-collage.png',
  },
  {
    title: 'Автобетоносмесители 6–8 м³',
    text: 'Доставляем бетон и растворы на частные и коммерческие объекты точно ко времени.',
    image: '/images/mixer-orange.jpg',
  },
  {
    title: 'Опытные водители',
    text: 'Аккуратная подача, знание объектов и помощь при организации заливки.',
    image: '/images/mixer-blue-driver.jpg',
  },
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

function ConcreteLanding() {
  const [volume, setVolume] = useState(10);
  const [grade, setGrade] = useState('М300');
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
            <a href="#calculator">Расчёт</a>
            <a href="#delivery">Доставка</a>
            <a href="#contacts">Контакты</a>
          </nav>

          <a className="call-link" href="tel:+73473214585">
            <Phone size={16} /> 8 (3473) 21-45-85
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-bg" />
          <div className="container hero-grid">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="badge"><Truck size={16} /> Собственное производство бетона</div>
              <h1>Бетон и раствор с доставкой в Стерлитамаке</h1>
              <p className="hero-text">
                Производство и доставка бетона по Стерлитамаку и Республике Башкортостан.
                Работаем с частными клиентами, застройщиками и юридическими лицами.
              </p>

              <div className="hero-actions">
                <Button onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}>
                  Получить расчёт цены
                </Button>
                <Button variant="outline" onClick={() => window.open('https://t.me/Zartur25', '_blank')}>
                  <Send size={18} /> Написать в Telegram
                </Button>
              </div>

              <div className="stats">
                <div><strong>20+</strong><span>позиций в прайсе</span></div>
                <div><strong>24/7</strong><span>приём заявок</span></div>
                <div><strong>от 1 м³</strong><span>любой объём</span></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }}>
              <Card className="form-card">
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
                    {Object.keys(prices).map((g) => <option key={g}>{g}</option>)}
                  </select>

                  <textarea
                    placeholder="Адрес объекта и примерный объём"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />

                  <Button onClick={sendTelegram}>
                    <Send size={18} /> Отправить заявку в Telegram
                  </Button>

                  <small>Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</small>
                </div>
              </Card>
            </motion.div>
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
            <div className="section-head">
              <div>
                <p className="eyebrow">Популярные марки</p>
                <h2>Прайс на бетон</h2>
              </div>
              <p>Актуальные цены для Стерлитамака. Возможны скидки в зависимости от объёма заказа и условий доставки.</p>
            </div>

            <div className="price-grid">
              {Object.entries(prices).map(([g, p]) => (
                <Card key={g} className="price-card">
                  <h3>Бетон {g}</h3>
                  <p>Для фундамента, стяжки, площадок и строительных работ.</p>
                  <strong>от {formatRub(p)} ₽</strong>
                  <span>за 1 м³</span>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container section">
          <p className="eyebrow">Строительные растворы</p>
          <h2>Прайс на растворы</h2>
          <p className="section-note">Поставляем цементные и сложные растворы для кладочных, штукатурных и строительных работ.</p>

          <div className="mortar-grid">
            {mortarPrices.map((item) => (
              <Card key={item.name} className="price-card soft">
                <h3>{item.name}</h3>
                <strong>от {formatRub(item.price)} ₽</strong>
                <span>за 1 м³</span>
              </Card>
            ))}
          </div>
        </section>

        <section id="calculator" className="container section calc-grid">
          <div>
            <div className="badge"><Calculator size={16} /> Быстрый расчёт</div>
            <h2>Посчитайте примерную стоимость бетона</h2>
            <p className="section-note">
              Введите объём и выберите марку. После заявки менеджер проверит расчёт, доставку и подскажет оптимальное решение.
            </p>

            <div className="check-list">
              {[
                'Подскажем, какая марка нужна под ваш объект',
                'Рассчитаем доставку и график подачи миксера',
                'При необходимости организуем дополнительные услуги',
              ].map((item) => (
                <p key={item}><CheckCircle2 size={20} /> {item}</p>
              ))}
            </div>
          </div>

          <Card className="form-card">
            <label>Марка бетона</label>
            <select value={grade} onChange={(e) => setGrade(e.target.value)}>
              {Object.keys(prices).map((g) => <option key={g}>{g}</option>)}
            </select>

            <label>Объём, м³</label>
            <input type="number" value={volume} min="1" onChange={(e) => setVolume(Number(e.target.value))} />

            <div className="result-box">
              <p>Примерная стоимость</p>
              <strong>{formatRub(estimated)} ₽</strong>
              <span>Без учёта доставки и дополнительных услуг.</span>
            </div>

            <Button variant="light" onClick={() => document.querySelector('.form-card input')?.focus()}>
              Зафиксировать расчёт
            </Button>
          </Card>
        </section>

        <section id="fleet" className="section section-dark">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">Реальные фото</p>
                <h2>Наш автопарк и производство</h2>
              </div>
              
            </div>

            <div className="fleet-grid">
              {fleetPhotos.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.12 }}
                  className="fleet-card"
                >
                  <div className="fleet-img">
                    <img src={item.image} alt={item.title} />
                    <span><Camera size={16} /> Фото объекта</span>
                  </div>
                  <div className="fleet-body">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="container section calc-grid">
          <Card className="form-card">
            <div className="badge"><Navigation size={16} /> Калькулятор доставки</div>
            <h2>Рассчитайте доставку</h2>
            <p>Укажите примерное расстояние от завода до объекта. Точный расчёт менеджер подтвердит после заявки.</p>

            <label>Расстояние до объекта, км</label>
            <input type="number" value={distance} min="1" onChange={(e) => setDistance(Number(e.target.value))} />

            <div className="delivery-results">
              <div><span>Доставка</span><strong>{formatRub(deliveryPrice)} ₽</strong></div>
              <div className="gold"><span>Бетон + доставка</span><strong>{formatRub(totalWithDelivery)} ₽</strong></div>
            </div>
          </Card>

          <Card className="form-card telegram-card">
            <div className="badge"><Send size={16} /> Заявка в Telegram</div>
            <h2>Получите расчёт в Telegram</h2>
            <p>Оставьте данные — менеджер получит заявку и свяжется с вами для расчёта бетона, доставки и времени подачи.</p>

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

              <textarea
                placeholder="Что нужно: бетон, раствор, марка, объём, адрес"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />

              <Button onClick={sendTelegram}>
                <Send size={18} /> Отправить заявку в Telegram
              </Button>
            </div>
          </Card>
        </section>

        <section className="section section-dark">
          <div className="container">
            <div className="center-head">
              <p className="eyebrow">Отзывы</p>
              <h2>Что говорят клиенты</h2>
            </div>

            <div className="reviews-grid">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                >
                  <Card className="review-card">
                    <div className="stars">{[1, 2, 3, 4, 5].map((s) => <Star key={s} size={18} fill="currentColor" />)}</div>
                    <p>“{review.text}”</p>
                    <strong>{review.name}</strong>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="container section map-grid">
          <div>
            <div className="badge"><MapPin size={16} /> Яндекс.Карта</div>
            <h2>Где мы находимся</h2>
            <p className="section-note">
              Республика Башкортостан, г. Стерлитамак. Карта поможет быстро построить маршрут до производства или рассчитать доставку до объекта.
            </p>
            <div className="map-note">
              <Award size={32} /> Здесь можно вставить iframe-код Яндекс.Карты из кабинета Яндекс.Бизнес или конструктора карт.
            </div>
          </div>

        <div className="map-placeholder">
  <iframe
    src="https://yandex.ru/map-widget/v1/?ll=55.993519%2C53.684991&z=16"
    width="100%"
    height="320"
    frameBorder="0"
    allowFullScreen={true}
    style={{
      border: '0',
      borderRadius: '16px',
      width: '100%',
      height: '320px'
    }}
  />

  <div style={{ marginTop: '15px', textAlign: 'left' }}>
    <strong>Производство Бетонсервис</strong>
    <p>Республика Башкортостан, г. Стерлитамак</p>
    <p>ул. Бабушкина, 167Б</p>
    <p>Координаты: 53.684991, 55.993519</p>


<a
  href="https://yandex.ru/maps/?pt=55.993519,53.684991&z=16&l=map"
  target="_blank"
  rel="noopener noreferrer"
  className="btn btn-primary"
>
  Построить маршрут
</a>


  </div>
</div>

        </section>

        <section id="delivery" className="section section-dark">
          <div className="container">
            <h2>Как проходит заказ</h2>

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
          </div>
        </section>

        <section className="container section">
          <div className="cta">
            <div>
              <h2>Нужен бетон в Стерлитамаке?</h2>
              <p>Оставьте заявку — быстро рассчитаем стоимость, доставку и ближайшее время подачи миксера.</p>
            </div>

            <div className="hero-actions">
              <Button variant="dark" onClick={() => window.open('tel:+73473214585')}>
                <Phone size={18} /> Позвонить
              </Button>
              <Button variant="outline-dark" onClick={() => window.open('https://t.me/Zartur25', '_blank')}>
                <MessageCircle size={18} /> Telegram
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

createRoot(document.getElementById('root')).render(<ConcreteLanding />);
