/**
 * Базовые ставки, коэффициенты и словари подписей калькулятора.
 * Числа берутся из clientConfig — здесь только структура и лейблы.
 */
import { clientConfig, type FacadeKey, type HardwareKey, type ShapeKey } from '../config/client';

export const shapeOptions: Array<{ id: ShapeKey; label: string; hint: string }> = [
  { id: 'straight', label: 'Прямая', hint: 'один фронт' },
  { id: 'corner', label: 'Угловая', hint: 'два фронта' },
  { id: 'uShape', label: 'П-образная', hint: 'три фронта' },
  { id: 'island', label: 'С островом', hint: 'отдельный модуль' },
];

export const facadeOptions: Array<{ id: FacadeKey; label: string; hint: string }> = [
  { id: 'ldsp', label: 'ЛДСП', hint: 'базовый корпус и фасад' },
  { id: 'mdfFilm', label: 'МДФ плёнка', hint: 'матовая отделка' },
  { id: 'mdfEnamel', label: 'МДФ эмаль', hint: 'крашеный фасад' },
];

export const hardwareOptions: Array<{ id: HardwareKey; label: string; hint: string }> = [
  { id: 'basic', label: 'Базовая', hint: 'петли, направляющие' },
  { id: 'standard', label: 'С доводчиками', hint: '+ ящики полного выдвижения' },
  { id: 'premium', label: 'Премиум', hint: '+ карго, подъёмники, подсветка' },
];

export const shapeLabel: Record<ShapeKey, string> = {
  straight: 'Прямая',
  corner: 'Угловая',
  uShape: 'П-образная',
  island: 'С островом',
};

/** Короткий шифр формы для «номера позиции» в спецификации. */
export const shapeCode: Record<ShapeKey, string> = {
  straight: 'ПРЯМ',
  corner: 'УГЛ',
  uShape: 'П-ОБР',
  island: 'ОСТР',
};

export const facadeLabel: Record<FacadeKey, string> = {
  ldsp: 'ЛДСП',
  mdfFilm: 'МДФ плёнка',
  mdfEnamel: 'МДФ эмаль',
};

export const hardwareLabel: Record<HardwareKey, string> = {
  basic: 'Базовая',
  standard: 'С доводчиками',
  premium: 'Премиум',
};

export const pricing = clientConfig.pricing;

export const calcLimits = { min: 1.6, max: 7, step: 0.1, default: 3.2 };
