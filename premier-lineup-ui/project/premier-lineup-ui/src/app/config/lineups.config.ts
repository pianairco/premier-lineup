import {Position} from '../model/Position';
import {Formation} from '@lineup-app/model/Formation';

export const LD4_4_2: Position[] = [
  new Position(0, -220),
  new Position(-130, -150),
  new Position(-40, -150),
  new Position(40, -150),
  new Position(130, -150),
  new Position(-130, -75),
  new Position(-40, -75),
  new Position(40, -75),
  new Position(130, -75),
  new Position(-25, -20),
  new Position(25, -20),
];

export const LU4_4_2: Position[] = [
  new Position(0, 220),
  new Position(-130, 150),
  new Position(-40, 150),
  new Position(40, 150),
  new Position(130, 150),
  new Position(-130, 75),
  new Position(-40, 75),
  new Position(40, 75),
  new Position(130, 75),
  new Position(-25, 20),
  new Position(25, 20),
];

export const L4_4_2: Position[] = [
  new Position(0, -220),
  new Position(-130, -150),
  new Position(-40, -150),
  new Position(40, -150),
  new Position(130, -150),
  new Position(-130, 15),
  new Position(-40, 15),
  new Position(40, 15),
  new Position(130, 15),
  new Position(-25, 150),
  new Position(25, 150),
];

export const FORMATION_4_4_2: Formation = new Formation(L4_4_2, LU4_4_2, LD4_4_2);

export const LD4_3_3: Position[] = [
  new Position(0, -220),
  new Position(-130, -150),
  new Position(-40, -150),
  new Position(40, -150),
  new Position(130, -150),
  new Position(-90, -75),
  new Position(0, -75),
  new Position(90, -75),
  new Position(-90, -20),
  new Position(0, -20),
  new Position(90, -20),
];

export const LU4_3_3: Position[] = [
  new Position(0, 220),
  new Position(-130, 150),
  new Position(-40, 150),
  new Position(40, 150),
  new Position(130, 150),
  new Position(-90, 75),
  new Position(0, 75),
  new Position(90, 75),
  new Position(-90, 20),
  new Position(0, 20),
  new Position(90, 20),
];

export const L4_3_3: Position[] = [
  new Position(0, -220),
  new Position(-130, -150),
  new Position(-40, -150),
  new Position(40, -150),
  new Position(130, -150),
  new Position(-90, 15),
  new Position(0, 15),
  new Position(90, 15),
  new Position(-90, 150),
  new Position(0, 150),
  new Position(90, 150),
];

export const FORMATION_4_3_3: Formation = new Formation(L4_3_3, LU4_3_3, LD4_3_3);

export const LD2_2: Position[] = [
  new Position(0, -220),
  new Position(-50, -150),
  new Position(50, -150),
  new Position(-50, -50),
  new Position(50, -50)
];

export const LU2_2: Position[] = [
  new Position(0, 220),
  new Position(-50, 150),
  new Position(50, 150),
  new Position(50, 50),
  new Position(-50, 50)
];

export const L2_2: Position[] = [
  new Position(0, -220),
  new Position(-50, -70),
  new Position(50, -70),
  new Position(-50, 70),
  new Position(50, 70)
];

export const LD2_1_1: Position[] = [
  new Position(0, -220),
  new Position(-50, -150),
  new Position(50, -150),
  new Position(0, -80),
  new Position(0, -20)
];

export const LU2_1_1: Position[] = [
  new Position(0, 220),
  new Position(-50, 150),
  new Position(50, 150),
  new Position(0, 80),
  new Position(0, 20)
];

export const L2_1_1: Position[] = [
  new Position(0, -220),
  new Position(-50, -70),
  new Position(50, -70),
  new Position(0, 0),
  new Position(0, 70)
];

export const LD1_2_1: Position[] = [
  new Position(0, -220),
  new Position(0, -150),
  new Position(-50, -80),
  new Position(50, -80),
  new Position(0, -20)
];

export const LU1_2_1: Position[] = [
  new Position(0, 220),
  new Position(0, 150),
  new Position(-50, 150),
  new Position(50, 80),
  new Position(0, 20)
];

export const L1_2_1: Position[] = [
  new Position(0, -220),
  new Position(0, -70),
  new Position(-50, 0),
  new Position(50, 0),
  new Position(0, 70)
];

