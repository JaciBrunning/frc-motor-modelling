class Simulation {
  constructor(motor, load) {
    this.motor = motor;
    this.load = load;

    this.reset();
  }

  reset() {
    this.results = {
      voltage: [],
      speed: [],
      current: [],
      torque: [],
      velocity: [],
      acceleration: [],
      displacement: []
    }
  }

  step(dt, voltage) {
    let is_first = this.results.voltage.length === 0;
    var last = (a) => is_first ? 0 : a[a.length - 1];

    let { current, torque } = this.motor.calculate(voltage, last(this.results.speed));
    let acceleration = torque / (this.load.mass * this.load.radius);
    let velocity = last(this.results.velocity) + acceleration * dt;
    let displacement = last(this.results.displacement) + velocity * dt + 0.5 * acceleration * dt * dt;
    let speed = velocity / this.load.radius;

    this.results.voltage.push(voltage);
    this.results.current.push(current);
    this.results.torque.push(torque);
    this.results.acceleration.push(acceleration);
    this.results.velocity.push(velocity);
    this.results.displacement.push(displacement);
    this.results.speed.push(speed);
  }
}

export default Simulation;