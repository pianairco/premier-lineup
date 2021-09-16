import {Position} from '../model/Position';
import {Formation} from '@lineup-app/core/model/Formation';

export const FORMATION_11 = {};
export const FORMATION_5 = {};

export const LD4_4_2: Position[] = [
  new Position(1, 0, -220),
  new Position(2, -130, -150),
  new Position(3, -40, -150),
  new Position(4, 40, -150),
  new Position(5, 130, -150),
  new Position(6, -130, -75),
  new Position(7, -40, -75),
  new Position(8, 40, -75),
  new Position(9, 130, -75),
  new Position(10, -25, -20),
  new Position(11, 25, -20),
];

export const LU4_4_2: Position[] = [
  new Position(1, 0, 220),
  new Position(2, -130, 150),
  new Position(3, -40, 150),
  new Position(4, 40, 150),
  new Position(5, 130, 150),
  new Position(6, -130, 75),
  new Position(7, -40, 75),
  new Position(8, 40, 75),
  new Position(9, 130, 75),
  new Position(10, -25, 20),
  new Position(11, 25, 20),
];

export const L4_4_2: Position[] = [
  new Position(1, 0, -220),
  new Position(2, -130, -150),
  new Position(3, -40, -150),
  new Position(4, 40, -150),
  new Position(5, 130, -150),
  new Position(6, -130, 15),
  new Position(7, -40, 15),
  new Position(8, 40, 15),
  new Position(9, 130, 15),
  new Position(10, -25, 150),
  new Position(11, 25, 150),
];

export const FORMATION_4_4_2: Formation = new Formation(L4_4_2, LU4_4_2, LD4_4_2);
FORMATION_11['FORMATION_4_4_2'] = FORMATION_4_4_2;

export const LD4_3_3: Position[] = [
  new Position(1, 0, -220),
  new Position(2, -130, -150),
  new Position(3, -40, -150),
  new Position(4, 40, -150),
  new Position(5, 130, -150),
  new Position(6, -90, -75),
  new Position(7, 0, -75),
  new Position(8, 90, -75),
  new Position(9, -90, -20),
  new Position(10, 0, -20),
  new Position(11, 90, -20),
];

export const LU4_3_3: Position[] = [
  new Position(1, 0, 220),
  new Position(2, -130, 150),
  new Position(3, -40, 150),
  new Position(4, 40, 150),
  new Position(5, 130, 150),
  new Position(6, -90, 75),
  new Position(7, 0, 75),
  new Position(8, 90, 75),
  new Position(9, -90, 20),
  new Position(10, 0, 20),
  new Position(11, 90, 20),
];

export const L4_3_3: Position[] = [
  new Position(1, 0, -220),
  new Position(2, -130, -150),
  new Position(3, -40, -150),
  new Position(4, 40, -150),
  new Position(5, 130, -150),
  new Position(6, -90, 15),
  new Position(7, 0, 15),
  new Position(8, 90, 15),
  new Position(9, -90, 150),
  new Position(10, 0, 150),
  new Position(11, 90, 150),
];

export const FORMATION_4_3_3: Formation = new Formation(L4_3_3, LU4_3_3, LD4_3_3);
FORMATION_11['FORMATION_4_3_3'] = FORMATION_4_3_3;

export const LD2_2: Position[] = [
  new Position(1, 0, -220),
  new Position(2, -50, -150),
  new Position(3, 50, -150),
  new Position(4, -50, -50),
  new Position(5, 50, -50)
];

export const LU2_2: Position[] = [
  new Position(1, 0, 220),
  new Position(2, -50, 150),
  new Position(3, 50, 150),
  new Position(4, 50, 50),
  new Position(5, -50, 50)
];

export const L2_2: Position[] = [
  new Position(1, 0, -220),
  new Position(2, -50, -70),
  new Position(3, 50, -70),
  new Position(4, -50, 70),
  new Position(5, 50, 70)
];

export const FORMATION_2_2: Formation = new Formation(L2_2, LU2_2, LD2_2);
FORMATION_5['FORMATION_2_2'] = FORMATION_2_2;

export const LD2_1_1: Position[] = [
  new Position(1, 0, -220),
  new Position(2, -50, -150),
  new Position(3, 50, -150),
  new Position(4, 0, -80),
  new Position(5, 0, -20)
];

export const LU2_1_1: Position[] = [
  new Position(1, 0, 220),
  new Position(2, -50, 150),
  new Position(3, 50, 150),
  new Position(4, 0, 80),
  new Position(5, 0, 20)
];

export const L2_1_1: Position[] = [
  new Position(1, 0, -220),
  new Position(2, -50, -70),
  new Position(3, 50, -70),
  new Position(4, 0, 0),
  new Position(5 ,0, 70)
];

export const FORMATION_2_1_1: Formation = new Formation(L2_1_1, LU2_1_1, LD2_1_1);
FORMATION_5['FORMATION_2_1_1'] = FORMATION_2_1_1;

export const LD1_2_1: Position[] = [
  new Position(1, 0, -220),
  new Position(2, 0, -150),
  new Position(3, -50, -80),
  new Position(4, 50, -80),
  new Position(5, 0, -20)
];

export const LU1_2_1: Position[] = [
  new Position(1, 0, 220),
  new Position(2, 0, 150),
  new Position(3, -50, 150),
  new Position(4, 50, 80),
  new Position(5, 0, 20)
];

export const L1_2_1: Position[] = [
  new Position(1, 0, -220),
  new Position(2, 0, -70),
  new Position(3, -50, 0),
  new Position(4, 50, 0),
  new Position(5, 0, 70)
];

export const FORMATION_1_2_1: Formation = new Formation(L1_2_1, LU1_2_1, LD1_2_1);
FORMATION_5['FORMATION_1_2_1'] = FORMATION_1_2_1;
