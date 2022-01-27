import * as Units from './Units';

export const KitOfParts = () => {
  return {
    motor: {
      key: 'CIM',
      voltage: Units.V.make(12),
      num: 4,
      gearbox: [[14, 50], [16, 48]],
      efficiency: 90,
    },
    load: {
      accel: Units.mpsps.make(0),
      mass: Units.kg.make(70),
      radius: Units.inch.make(6 / 2)
    }
  };
};

export const Elevator = () => {
  return {
    motor: {
      key: 'pro775',
      voltage: Units.V.make(12),
      num: 2,
      gearbox: 20,
      efficiency: 90
    },
    load: {
      accel: Units.mpsps.make(-9.81),
      mass: Units.kg.make(10),
      radius: Units.inch.make(4 / 2)
    }
  };
};