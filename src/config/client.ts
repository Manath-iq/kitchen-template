/**
 * ЕДИНСТВЕННЫЙ ФАЙЛ С ДАННЫМИ КЛИЕНТА.
 *
 * Правило шаблона: город, телефон, цена, адрес, гарантия, сроки, ссылки и фото
 * живут только здесь. В компонентах — только подстановки.
 *
 * Пересборка под нового клиента = правка этого файла (~20 минут).
 */

export type ShapeKey = 'straight' | 'corner' | 'uShape' | 'island';
export type FacadeKey = 'ldsp' | 'mdfFilm' | 'mdfEnamel';
export type HardwareKey = 'basic' | 'standard' | 'premium';

export type ClientConfig = {
  niche: 'кухни на заказ';
  demoMode: boolean;
  city: string;
  cityPrepositional: string;
  region: string;
  companyName: string;
  legalForm: string;
  legalName: string;
  inn: string;
  ogrn: string;
  address: string;
  phone: string;
  waPhone: string;
  hours: string;
  mapUrl: string;
  mapEmbedUrl: string;
  routeUrl: string;
  instagramUrl?: string;
  yandexReviewsUrl?: string;
  twoGisUrl?: string;

  heroTitleVariant: 1 | 2 | 3;
  heroTitles: [string, string, string];
  heroSubtitle: string;
  heroNote: string;
  heroChips: [string, string];
  heroCtas: { primary: string; secondary: string };

  brand: {
    logoPath: string;
    fontDisplay: 'Unbounded';
    fontBody: 'Onest';
    fontData: 'JetBrains Mono';
  };

  trust: {
    yearsOnMarket: number;
    kitchensPerMonth: number;
    warrantyYears: number;
    measureHours: number;
    installDays: number;
    contractNote: string;
  };

  pricing: {
    basePerMeter: Record<FacadeKey, number>;
    shapeCoeff: Record<ShapeKey, number>;
    hardwarePack: Record<HardwareKey, number>;
    installPrice: number;
    techIntegration: number;
    deliveryPrice: number;
    price24m: number;
    price3m: number;
    price4m: number;
    /** Погрешность расчёта до замера, % */
    deltaPercent: number;
  };

  quiz: {
    basePriceByMeter: number;
    sizeMap: Record<string, number>;
    shapeMap: Record<ShapeKey, number>;
    materialMap: Record<string, number>;
    urgencyMap: Record<string, { tag: string; daysMin: number; daysMax: number }>;
    extrasByGoal: Record<string, number>;
  };

  warranty: string;
  warrantyFurniture: string;
  leadTimeText: string;
  prepayment: string;

  disclaimers: {
    publicOffer: string;
    pdn: string;
    priceNote: string;
    techReg: string;
  };

  tiers: Array<{
    id: 'econom' | 'standard' | 'premium';
    label: string;
    caption: string;
    coeff: number;
    included: string[];
    extra: string[];
  }>;

  materials: Array<{
    id: string;
    code: string;
    title: string;
    description: string;
    note: string;
    swatch: string;
    /** Макро-фото образца. Нет файла — рисуется CSS-образец по swatch. */
    image?: string;
  }>;

  categories: Array<{
    id: ShapeKey | 'newbuild' | 'house';
    code: string;
    title: string;
    meta: string;
    layers: [string, string, string, string];
    /** PNG без фона. Нет файла — рисуется план-схема SVG. */
    image?: string;
  }>;

  portfolio: Array<{
    id: string;
    title: string;
    shape: string;
    meters: string;
    days: number;
    materials: string;
    price: string;
    tone: string;
    /** Фото проекта. Нет файла — рисуется вектор по tone. */
    image?: string;
  }>;

  faq: Array<{ q: string; a: string }>;

  reviews: Array<{
    source: '2ГИС' | 'Яндекс';
    author: string;
    date: string;
    text: string;
    rating: number;
  }>;

  metrika: { counterId: string | null };
};

export const clientConfig: ClientConfig = {
  niche: 'кухни на заказ',
  /** DEMO: данные ниже — витринные заглушки, не реальная компания. */
  demoMode: true,
  city: 'Казань',
  cityPrepositional: 'Казани',
  region: 'Татарстан',
  companyName: 'МЕРА',
  legalForm: 'ИП',
  legalName: 'ИП Демо-Мастерская',
  inn: '000000000000',
  ogrn: '000000000000000',
  address: 'ул. Производственная, 12, корп. 3',
  phone: '+7 (843) 000-00-00',
  waPhone: '70000000000',
  hours: 'Пн–Сб 09:00–20:00, Вс 10:00–18:00',
  mapUrl: 'https://yandex.ru/maps/43/kazan/',
  // Виджет с меткой, без поисковой выдачи поверх карты
  mapEmbedUrl:
    'https://yandex.ru/map-widget/v1/?ll=49.106414%2C55.796127&z=15&pt=49.106414%2C55.796127%2Cpm2rdm',
  routeUrl: 'https://yandex.ru/maps/43/kazan/?rtext=~55.796127,49.106414',
  yandexReviewsUrl: 'https://yandex.ru/maps/43/kazan/',
  twoGisUrl: 'https://2gis.ru/kazan',

  heroTitleVariant: 2,
  heroTitles: [
    'Кухня на заказ, которая влезает в план и в бюджет.',
    'Покажем вашу кухню до замера — с ценой, сроком и составом.',
    'Сделаем кухню в Татарстане без сюрпризов в смете.',
  ],
  heroSubtitle: 'Замер, проект, производство и монтаж — в одном процессе.',
  heroNote: 'Ориентир по стоимости и срокам покажем сразу после 5 коротких вопросов.',
  heroChips: ['До 3 минут на расчёт', 'Без звонка и обязательств'],
  heroCtas: { primary: 'Пройти подбор', secondary: 'Считать по размерам' },

  brand: {
    logoPath: '/brand/logo.svg',
    fontDisplay: 'Unbounded',
    fontBody: 'Onest',
    fontData: 'JetBrains Mono',
  },

  trust: {
    yearsOnMarket: 11,
    kitchensPerMonth: 28,
    warrantyYears: 5,
    measureHours: 24,
    installDays: 2,
    contractNote: 'Договор и смета до запуска работ',
  },

  pricing: {
    basePerMeter: { ldsp: 52000, mdfFilm: 69000, mdfEnamel: 94000 },
    shapeCoeff: { straight: 1.0, corner: 1.12, uShape: 1.22, island: 1.35 },
    hardwarePack: { basic: 0, standard: 25000, premium: 52000 },
    installPrice: 18000,
    techIntegration: 12000,
    deliveryPrice: 6000,
    price24m: 149000,
    price3m: 189000,
    price4m: 239000,
    deltaPercent: 7,
  },

  quiz: {
    basePriceByMeter: 69000,
    sizeMap: { to24: 2.4, to3: 3.0, to4: 4.0, from4: 5.0 },
    shapeMap: { straight: 1.0, corner: 1.12, uShape: 1.22, island: 1.35 },
    materialMap: { budget: 1.0, standard: 1.18, premium: 1.42 },
    urgencyMap: {
      urgent: { tag: 'срочно', daysMin: 14, daysMax: 21 },
      twoWeeks: { tag: 'в течение 2 недель', daysMin: 18, daysMax: 28 },
      month: { tag: 'в течение месяца', daysMin: 24, daysMax: 35 },
      compare: { tag: 'сравниваю варианты', daysMin: 24, daysMax: 40 },
    },
    extrasByGoal: {
      newbuild: 18000,
      replace: 24000,
      house: 32000,
      rental: 8000,
    },
  },

  warranty: '5 лет',
  warrantyFurniture: '10 лет',
  leadTimeText: '18–28 дней от согласования проекта',
  prepayment: '50% при подписании договора, остаток — после сборки',

  disclaimers: {
    publicOffer: 'Информация на сайте не является публичной офертой.',
    pdn: 'Нажимая кнопку, вы соглашаетесь с Политикой конфиденциальности и даёте согласие на обработку персональных данных.',
    priceNote:
      'Информация о стоимости носит ознакомительный характер. Итоговая цена фиксируется после замера и согласования комплектации.',
    techReg:
      'Мебельная продукция соответствует ТР ТС 025/2012. Документы о соответствии предоставляются по запросу.',
  },

  tiers: [
    {
      id: 'econom',
      label: 'Эконом',
      caption: 'ЛДСП, базовая фурнитура',
      coeff: 1.0,
      included: ['Замер', 'Проект', 'Смета до запуска'],
      extra: ['Доставка', 'Монтаж', 'Техника'],
    },
    {
      id: 'standard',
      label: 'Стандарт',
      caption: 'МДФ плёнка, доводчики',
      coeff: 1.26,
      included: ['Замер', '3D-проект', 'Смета до запуска', 'Доводчики'],
      extra: ['Доставка', 'Техника'],
    },
    {
      id: 'premium',
      label: 'Премиум',
      caption: 'МДФ эмаль, карго и подсветка',
      coeff: 1.62,
      included: ['Замер', '3D-проект', 'Смета до запуска', 'Карго', 'Подсветка'],
      extra: ['Техника'],
    },
  ],

  materials: [
    {
      id: 'ldsp',
      code: 'M-01',
      title: 'ЛДСП',
      description: 'Практичный базовый корпус',
      note: '16 мм · влагостойкий торец · Е0.5',
      swatch: 'ldsp',
      image: '/assets/mat-ldsp.webp',
    },
    {
      id: 'mdf',
      code: 'M-02',
      title: 'МДФ',
      description: 'Фасады под плёнку, эмаль или фрезеровку',
      note: '18–19 мм · матовая и глянцевая отделка',
      swatch: 'mdf',
      image: '/assets/mat-mdf.webp',
    },
    {
      id: 'top',
      code: 'M-03',
      title: 'Столешница HPL',
      description: 'Влагостойкая, с кромкой по периметру',
      note: '38 мм · постформинг · R3',
      swatch: 'top',
      image: '/assets/mat-top.webp',
    },
    {
      id: 'hinge',
      code: 'M-04',
      title: 'Фурнитура с доводчиками',
      description: 'Петли и направляющие полного выдвижения',
      note: 'до 60 000 циклов открывания',
      swatch: 'hinge',
      image: '/assets/mat-hinge.webp',
    },
    {
      id: 'edge',
      code: 'M-05',
      title: 'Кромка ПВХ',
      description: 'Защита торца от влаги и сколов',
      note: '0,4 и 2 мм · в цвет плиты',
      swatch: 'edge',
      image: '/assets/mat-edge.webp',
    },
    {
      id: 'extras',
      code: 'M-06',
      title: 'Карго, подъёмники, подсветка',
      description: 'Наполнение, которое меняет цену',
      note: 'считается отдельной строкой в смете',
      swatch: 'extras',
      image: '/assets/mat-extras.webp',
    },
  ],

  categories: [
    {
      id: 'straight',
      image: '/assets/cat-straight.webp',
      code: '01',
      title: 'Прямая кухня',
      meta: 'ПРЯМАЯ / 2,4–3,6 М',
      layers: ['Корпус', 'Фасады', 'Фурнитура', 'Столешница'],
    },
    {
      id: 'corner',
      image: '/assets/cat-corner.webp',
      code: '02',
      title: 'Угловая кухня',
      meta: 'УГЛОВАЯ / 3–4 М',
      layers: ['Корпус', 'Фасады', 'Угловой модуль', 'Столешница'],
    },
    {
      id: 'uShape',
      image: '/assets/cat-ushape.webp',
      code: '03',
      title: 'П-образная кухня',
      meta: 'П-ОБРАЗНАЯ / 4–6 М',
      layers: ['Корпус', 'Фасады', 'Два угла', 'Столешница'],
    },
    {
      id: 'island',
      image: '/assets/cat-island.webp',
      code: '04',
      title: 'Кухня с островом',
      meta: 'ОСТРОВ / ОТ 4,5 М',
      layers: ['Корпус', 'Остров', 'Фурнитура', 'Столешница'],
    },
    {
      id: 'newbuild',
      image: '/assets/cat-newbuild.webp',
      code: '05',
      title: 'Для новостройки',
      meta: 'НОВОСТРОЙКА / ЧЕРНОВАЯ',
      layers: ['Выносы точек', 'Корпус', 'Фасады', 'Столешница'],
    },
    {
      id: 'house',
      image: '/assets/cat-house.webp',
      code: '06',
      title: 'Для частного дома',
      meta: 'ДОМ / НЕСТАНДАРТ',
      layers: ['Обмер по месту', 'Корпус', 'Фасады', 'Столешница'],
    },
  ],

  portfolio: [
    {
      id: 'p1',
      image: '/assets/work-1.webp',
      title: 'Кухня в новостройке',
      shape: 'Угловая',
      meters: '3,4 м',
      days: 21,
      materials: 'МДФ плёнка · HPL · доводчики',
      price: 'от 268 000 ₽',
      tone: 'sand',
    },
    {
      id: 'p2',
      image: '/assets/work-2.webp',
      title: 'Замена кухни в панельном доме',
      shape: 'Прямая',
      meters: '2,6 м',
      days: 17,
      materials: 'ЛДСП · HPL · базовая фурнитура',
      price: 'от 164 000 ₽',
      tone: 'grey',
    },
    {
      id: 'p3',
      image: '/assets/work-3.webp',
      title: 'Кухня в частном доме',
      shape: 'П-образная',
      meters: '5,2 м',
      days: 29,
      materials: 'МДФ эмаль · карго · подсветка',
      price: 'от 612 000 ₽',
      tone: 'green',
    },
    {
      id: 'p4',
      image: '/assets/work-4.webp',
      title: 'Кухня-остров, студия',
      shape: 'С островом',
      meters: '4,8 м',
      days: 27,
      materials: 'МДФ эмаль · подъёмники · HPL',
      price: 'от 548 000 ₽',
      tone: 'graphite',
    },
    {
      id: 'p5',
      image: '/assets/work-5.webp',
      title: 'Кухня под сдачу',
      shape: 'Прямая',
      meters: '2,4 м',
      days: 14,
      materials: 'ЛДСП · базовая фурнитура',
      price: 'от 149 000 ₽',
      tone: 'sand',
    },
    {
      id: 'p6',
      image: '/assets/work-6.webp',
      title: 'Кухня с нестандартным углом',
      shape: 'Угловая',
      meters: '3,9 м',
      days: 24,
      materials: 'МДФ плёнка · карго · HPL',
      price: 'от 342 000 ₽',
      tone: 'grey',
    },
  ],

  faq: [
    {
      q: 'Сколько занимает изготовление?',
      a: 'Срок зависит от состава и загрузки производства. На экране сразу показываем ориентир по сроку для вашего варианта, а точный график подтверждаем после замера и сметы.',
    },
    {
      q: 'Что входит в стоимость?',
      a: 'В базовый расчёт входят проект, замер и сама кухня по выбранной комплектации. Доставка, монтаж, техника и дополнительные модули считаются отдельно, если они нужны.',
    },
    {
      q: 'Можно ли посчитать без звонка?',
      a: 'Да. Квиз и калькулятор дают предварительный ориентир сразу, а итог можно отправить в WhatsApp одной кнопкой.',
    },
    {
      q: 'Что делать, если кухня нестандартная?',
      a: 'Для нестандартной геометрии мы показываем отдельный вариант комплектации и отмечаем, где нужен точный замер по месту.',
    },
    {
      q: 'Какая гарантия?',
      a: '{warranty} на кухню и {warrantyFurniture} на фурнитуру. Условия гарантии фиксируются в договоре.',
    },
    {
      q: 'Делаете монтаж?',
      a: 'Да. Монтаж входит в процесс как отдельный этап и отображается в смете отдельной строкой.',
    },
    {
      q: 'Нужна ли предоплата?',
      a: 'Да. {prepayment}. Цена фиксируется в договоре после замера и согласования комплектации.',
    },
  ],

  reviews: [
    {
      source: '2ГИС',
      author: 'Айгуль Р.',
      date: 'март',
      text: 'Приехал дизайнер на замер, сроки и доставка приятно удивили. Смету согласовали до запуска, доплат не было.',
      rating: 5,
    },
    {
      source: 'Яндекс',
      author: 'Сергей М.',
      date: 'февраль',
      text: 'Сделали и привезли точно в срок, всё совпало с ожиданиями. Отдельно порадовала аккуратная кромка.',
      rating: 5,
    },
    {
      source: '2ГИС',
      author: 'Наталья К.',
      date: 'январь',
      text: 'Помогли с проектом, учли пожелания по высоте верхних модулей, собрали аккуратно и убрали за собой.',
      rating: 5,
    },
  ],

  metrika: { counterId: null },
};

/** Заголовок H1 из выбранного варианта. */
export const heroTitle = clientConfig.heroTitles[clientConfig.heroTitleVariant - 1];

/** Подстановка {ключей} конфига в строку текста. */
export function fill(text: string): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = (clientConfig as unknown as Record<string, unknown>)[key];
    return typeof value === 'string' || typeof value === 'number' ? String(value) : match;
  });
}
