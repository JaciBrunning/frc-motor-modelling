import _ from 'lodash';
import { motorFromConfig } from './Motor';
import { simulationRunnerFrom } from './SimulationRunner';
import { Measurement } from './Units';

// Structured serialization fails to reconstruct classes, so for units we do this :)
const o2unit = (o) => {
  return Measurement.fromObject(o);
}

export class SimulationAdapter {
  constructor(sim_config, configs) {
    this.sim_config = sim_config;
    this.configs = configs;
  }


  run() {
    let duration = o2unit(this.sim_config.time).toBase();
    let dt = o2unit(this.sim_config.dt).toBase();
    let times = _.range(0, duration, dt);
    let results = {
      time: times,
      voltage: {},
      speed: {},
      current: {},
      torque: {},
      velocity: {},
      acceleration: {},
      displacement: {}
    };

    // Run simulation

    Object.values(this.configs).forEach(cfg => {
      let motor = motorFromConfig(cfg.motor);
      let load  = { mass: o2unit(cfg.load.mass).toBase(), radius: o2unit(cfg.load.radius).toBase() };
      let voltages = times.map(t => o2unit(cfg.motor.voltage).toBase())
      results.voltage[cfg.id] = voltages;

      let runner = simulationRunnerFrom(times, voltages, motor, load);
      let result = runner.run();
      Object.keys(result).forEach(k => {
        results[k][cfg.id] = result[k];
      });
    });
    
    return results;
  }
};