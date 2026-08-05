/**
 * Формула калькулятора (Механика 2).
 *
 *   base     = pricing.basePerMeter[facade]
 *   shape    = pricing.shapeCoeff[shape]
 *   hardware = pricing.hardwarePack[hardware]
 *   install  = needsInstall ? pricing.installPrice : 0
 *   tech     = needsTech ? pricing.techIntegration : 0
 *
 *   estimate = roundToThousand(length * base * shape + hardware + install + tech)
 *   rangeMin = estimate * 0.93
 *   rangeMax = estimate * 1.10
 */
import type { FacadeKey, HardwareKey, ShapeKey } from '../config/client';
import { pricing } from './pricing';
import { roundToThousand } from './format';

export type CalcInput = {
  length: number;
  shape: ShapeKey;
  facade: FacadeKey;
  hardware: HardwareKey;
  needsInstall: boolean;
  needsTech: boolean;
  needsDelivery: boolean;
};

export type CalcResult = {
  estimate: number;
  rangeMin: number;
  rangeMax: number;
  breakdown: Array<{ label: string; value: number }>;
  deltaPercent: number;
};

export const defaultCalcInput: CalcInput = {
  length: 3.2,
  shape: 'corner',
  facade: 'mdfFilm',
  hardware: 'standard',
  needsInstall: true,
  needsTech: false,
  needsDelivery: true,
};

export function calcKitchen(input: CalcInput): CalcResult {
  const base = pricing.basePerMeter[input.facade];
  const shape = pricing.shapeCoeff[input.shape];
  const body = input.length * base * shape;
  const hardware = pricing.hardwarePack[input.hardware];
  const install = input.needsInstall ? pricing.installPrice : 0;
  const tech = input.needsTech ? pricing.techIntegration : 0;
  const delivery = input.needsDelivery ? pricing.deliveryPrice : 0;

  const estimate = roundToThousand(body + hardware + install + tech + delivery);

  return {
    estimate,
    rangeMin: roundToThousand(estimate * 0.93),
    rangeMax: roundToThousand(estimate * 1.1),
    deltaPercent: pricing.deltaPercent,
    breakdown: [
      { label: 'Корпус и фасады', value: roundToThousand(body) },
      { label: 'Фурнитура', value: hardware },
      { label: 'Монтаж', value: install },
      { label: 'Техника в проекте', value: tech },
      { label: 'Доставка', value: delivery },
    ],
  };
}
