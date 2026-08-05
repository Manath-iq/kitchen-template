/**
 * Матрица квиза (Механика 1): вопросы, коэффициенты, расчёт диапазона.
 *
 *   estimateMin = round((length * base * shapeCoeff * materialCoeff + extras) * 0.92)
 *   estimateMax = round((length * base * shapeCoeff * materialCoeff + extras) * 1.08)
 *
 * Срочность на цену не влияет — она меняет только блок leadTime.
 */
import { clientConfig, type ShapeKey } from '../config/client';
import { roundToThousand } from './format';

export type QuizStepId = 'goal' | 'shape' | 'size' | 'priority' | 'urgency';

export type QuizOption = {
  id: string;
  label: string;
  hint: string;
};

export type QuizStep = {
  id: QuizStepId;
  code: string;
  question: string;
  summaryLabel: string;
  options: QuizOption[];
};

export const quizSteps: QuizStep[] = [
  {
    id: 'goal',
    code: 'В-01',
    question: 'Что нужно?',
    summaryLabel: 'Задача',
    options: [
      { id: 'newbuild', label: 'Новая кухня в новостройку', hint: 'черновая отделка, точки под вынос' },
      { id: 'replace', label: 'Замена старой кухни', hint: 'демонтаж и подгонка по месту' },
      { id: 'house', label: 'Кухня в частный дом', hint: 'нестандартная геометрия' },
      { id: 'rental', label: 'Кухня под сдачу', hint: 'практичный минимум' },
    ],
  },
  {
    id: 'shape',
    code: 'В-02',
    question: 'Форма помещения',
    summaryLabel: 'Форма',
    options: [
      { id: 'straight', label: 'Прямая', hint: 'один фронт вдоль стены' },
      { id: 'corner', label: 'Угловая', hint: 'два фронта, угловой модуль' },
      { id: 'uShape', label: 'П-образная', hint: 'три фронта, два угла' },
      { id: 'island', label: 'С островом', hint: 'отдельный рабочий модуль' },
    ],
  },
  {
    id: 'size',
    code: 'В-03',
    question: 'Размер по фронту',
    summaryLabel: 'Длина',
    options: [
      { id: 'to24', label: 'До 2,4 м', hint: 'компактная' },
      { id: 'to3', label: '2,4–3 м', hint: 'типовая' },
      { id: 'to4', label: '3–4 м', hint: 'просторная' },
      { id: 'from4', label: '4 м и больше', hint: 'нестандарт' },
    ],
  },
  {
    id: 'priority',
    code: 'В-04',
    question: 'Что важнее',
    summaryLabel: 'Приоритет',
    options: [
      { id: 'budget', label: 'Минимальный бюджет', hint: 'ЛДСП, базовая фурнитура' },
      { id: 'balance', label: 'Баланс цены и вида', hint: 'МДФ плёнка, доводчики' },
      { id: 'durability', label: 'Долговечность', hint: 'усиленная фурнитура, кромка 2 мм' },
      { id: 'premium', label: 'Премиальный эффект', hint: 'МДФ эмаль, карго, подсветка' },
    ],
  },
  {
    id: 'urgency',
    code: 'В-05',
    question: 'Когда стартуем',
    summaryLabel: 'Старт',
    options: [
      { id: 'urgent', label: 'Срочно', hint: 'нужен быстрый слот' },
      { id: 'twoWeeks', label: 'В течение 2 недель', hint: 'есть время на проект' },
      { id: 'month', label: 'В течение месяца', hint: 'спокойный график' },
      { id: 'compare', label: 'Пока сравниваю', hint: 'нужен ориентир по цене' },
    ],
  },
];

/** Приоритет → материал фасадов и надбавка за комплектацию. */
const priorityMatrix: Record<string, { tier: string; material: string; extra: number }> = {
  budget: { tier: 'budget', material: 'ЛДСП', extra: 0 },
  balance: { tier: 'standard', material: 'МДФ плёнка', extra: 25000 },
  durability: { tier: 'standard', material: 'МДФ плёнка + усиленная фурнитура', extra: 38000 },
  premium: { tier: 'premium', material: 'МДФ эмаль', extra: 52000 },
};

export type QuizAnswers = Partial<Record<QuizStepId, string>>;

export type QuizResult = {
  shape: string;
  size: string;
  material: string;
  length: number;
  estimateMin: number;
  estimateMax: number;
  daysMin: number;
  daysMax: number;
  urgencyTag: string;
  goal: string;
  included: string[];
};

function labelOf(stepId: QuizStepId, optionId: string): string {
  const step = quizSteps.find((s) => s.id === stepId);
  return step?.options.find((o) => o.id === optionId)?.label ?? '';
}

export function calcQuiz(answers: Required<QuizAnswers>): QuizResult {
  const { quiz } = clientConfig;
  const length = quiz.sizeMap[answers.size] ?? 3;
  const shapeCoeff = quiz.shapeMap[answers.shape as ShapeKey] ?? 1;
  const priority = priorityMatrix[answers.priority] ?? priorityMatrix.balance!;
  const materialCoeff = quiz.materialMap[priority.tier] ?? 1;
  const extras = (quiz.extrasByGoal[answers.goal] ?? 0) + priority.extra;
  const urgency = quiz.urgencyMap[answers.urgency] ?? quiz.urgencyMap.month!;

  const core = length * quiz.basePriceByMeter * shapeCoeff * materialCoeff + extras;

  return {
    shape: labelOf('shape', answers.shape),
    size: labelOf('size', answers.size),
    material: priority.material,
    length,
    estimateMin: roundToThousand(core * 0.92),
    estimateMax: roundToThousand(core * 1.08),
    daysMin: urgency.daysMin,
    daysMax: urgency.daysMax,
    urgencyTag: urgency.tag,
    goal: labelOf('goal', answers.goal),
    included: ['замер', '3D-проект', 'смета до запуска'],
  };
}
