/**
 * Формирование ссылок wa.me.
 * Правило: в текст сообщения попадают только параметры расчёта.
 * Никаких персональных данных — имя и телефон человек пишет сам в мессенджере.
 */
import { clientConfig } from '../config/client';
import type { CalcInput, CalcResult } from './calcKitchen';
import type { QuizResult } from './quizMatrix';
import { facadeLabel, hardwareLabel, shapeLabel } from './pricing';
import { formatDays, formatMeters, formatNumber, formatRub } from './format';

function waLink(text: string): string {
  return `https://wa.me/${clientConfig.waPhone}?text=${encodeURIComponent(text)}`;
}

export const waPlain = (text: string) => waLink(text);

export const waDefault = waLink(
  `Здравствуйте! Пишу с сайта ${clientConfig.companyName}. Хочу посчитать кухню на заказ.`,
);

export const waMeasure = waLink(
  `Здравствуйте! Хочу записаться на замер кухни. Город: ${clientConfig.city}.`,
);

export function waQuizMessage(result: QuizResult): string {
  return waLink(
    [
      'Здравствуйте! Я прошёл подбор кухни на сайте.',
      `Задача: ${result.goal}`,
      `Форма: ${result.shape}`,
      `Размер: ${result.size}`,
      `Материал: ${result.material}`,
      `Бюджет: ${formatNumber(result.estimateMin)}-${formatNumber(result.estimateMax)} ₽`,
      `Срок: ${formatDays(result.daysMin, result.daysMax)} (${result.urgencyTag})`,
    ].join('\n'),
  );
}

export function waCalcMessage(input: CalcInput, result: CalcResult): string {
  return waLink(
    [
      'Здравствуйте! Посчитал кухню в калькуляторе на сайте.',
      `Длина: ${formatMeters(input.length)}`,
      `Форма: ${shapeLabel[input.shape]}`,
      `Фасады: ${facadeLabel[input.facade]}`,
      `Фурнитура: ${hardwareLabel[input.hardware]}`,
      `Монтаж: ${input.needsInstall ? 'нужен' : 'не нужен'}`,
      `Техника в проекте: ${input.needsTech ? 'нужна' : 'не нужна'}`,
      `Ориентир: ${formatRub(result.estimate)}`,
      `Диапазон: ${formatNumber(result.rangeMin)}-${formatNumber(result.rangeMax)} ₽`,
      'Прошу подтвердить смету и срок.',
    ].join('\n'),
  );
}

export function waTierMessage(tierLabel: string, priceLabel: string): string {
  return waLink(
    `Здравствуйте! Интересует вариант «${tierLabel}» (${priceLabel}). Подскажите, что входит и какой срок?`,
  );
}
