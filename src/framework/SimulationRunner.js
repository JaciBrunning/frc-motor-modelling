import Simulation from './Simulation';

class SimulationRunner {
  constructor(times, voltages, motor, load) {
    this.times = times;
    this.voltages = voltages;
    this.motor = motor;
    this.load = load;
  }

  run() {
    let sim = new Simulation(this.motor, this.load);
    
    for (let i = 1; i < this.times.length; i++) {
      const time = this.times[i];
      const voltage = this.voltages[i];

      sim.step(time - this.times[i - 1], voltage);
    }

    return sim.results;
  }

}

export default SimulationRunner;