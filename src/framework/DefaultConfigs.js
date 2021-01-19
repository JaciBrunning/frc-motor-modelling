import * as Units from './Units';

export const KitOfParts = () => {
  return {
    motor: {
      key: 'CIM',
      voltage: Units.V.make(12),
      num: 4,
      reduction: 10.75,
      gearbox: null,
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
      reduction: 20,
      gearbox: null,
      efficiency: 90
    },
    load: {
      accel: Units.mpsps.make(-9.81),
      mass: Units.kg.make(10),
      radius: Units.inch.make(4 / 2)
    }
  };
};