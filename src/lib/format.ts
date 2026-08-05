/** Форматирование чисел и единиц. Единый источник для UI и WhatsApp-сообщений. */

const nbsp = ' ';

export function roundToThousand(value: number): number {
  return Math.round(value / 1000) * 1000;
}

/** 246000 → «246 000» (неразрывные пробелы, чтобы число не рвалось по строкам). */
export function formatNumber(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, nbsp);
}

/** 246000 → «246 000 ₽» */
export function formatRub(value: number): string {
  return `${formatNumber(value)}${nbsp}₽`;
}

/** 3 → «3,2 м» — метры с запятой, как в спецификации. */
export function formatMeters(value: number): string {
  const fixed = Number.isInteger(value) ? String(value) : value.toFixed(1);
  return `${fixed.replace('.', ',')}${nbsp}м`;
}

/** Склонение: 21 день / 22 дня / 25 дней. */
export function plural(n: number, forms: [string, string, string]): string {
  const abs = Math.abs(n) % 100;
  const last = abs % 10;
  if (abs > 10 && abs < 20) return forms[2];
  if (last > 1 && last < 5) return forms[1];
  if (last === 1) return forms[0];
  return forms[2];
}

export function formatDays(min: number, max: number): string {
  if (min === max) return `${min}${nbsp}${plural(min, ['день', 'дня', 'дней'])}`;
  return `${min}–${max}${nbsp}${plural(max, ['день', 'дня', 'дней'])}`;
}

export function formatRange(min: number, max: number): string {
  return `${formatNumber(min)}–${formatNumber(max)}${nbsp}₽`;
}
