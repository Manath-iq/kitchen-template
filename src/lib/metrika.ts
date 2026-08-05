/**
 * Цели Яндекс.Метрики. Если counterId не задан в конфиге — вызовы молча игнорируются.
 * Разметка целей: data-goal="hero_cta_click" на любом элементе → отправка по клику.
 */
import { clientConfig } from '../config/client';

export type Goal =
  | 'hero_cta_click'
  | 'quiz_start'
  | 'quiz_complete'
  | 'calculator_open'
  | 'calculator_submit'
  | 'wa_click_hero'
  | 'wa_click_result'
  | 'map_open'
  | 'phone_click'
  | 'faq_open'
  | 'portfolio_view';

declare global {
  interface Window {
    ym?: (id: number, action: string, target: string) => void;
  }
}

export function reachGoal(goal: Goal | string): void {
  const id = clientConfig.metrika.counterId;
  if (!id || typeof window === 'undefined' || typeof window.ym !== 'function') return;
  window.ym(Number(id), 'reachGoal', goal);
}

/** Один делегированный слушатель на весь документ. */
export function bindGoals(): void {
  document.addEventListener(
    'click',
    (event) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-goal]');
      if (target?.dataset.goal) reachGoal(target.dataset.goal);
    },
    { passive: true },
  );
}
