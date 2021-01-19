class Motor {
  constructor(name, v_nom, free_speed, free_current, stall_torque, stall_current) {
    this.name = name;
    this.voltage_nom = v_nom;
    this.free_speed = free_speed;
    this.free_current = free_current;
    this.stall_torque = stall_torque;
    this.stall_current = stall_current;
  }

  mult(n) {
    return new Motor(this.name + " (x" + n + ")", 
                this.voltage_nom, this.free_speed, n * this.free_current, 
                n * this.stall_torque, n * this.stall_current);
  }

  reduce(G) {
    return new Motor(this.name + " (G=" + G + ")",
                this.voltage_nom, this.free_speed / G, this.free_current,
                this.stall_torque * G, this.stall_current);
  }

  withEfficiency(eff) {
    return new Motor(this.name + " (Eff=" + eff + ")",
                this.voltage_nom, this.free_speed, this.free_current,
                this.stall_torque * eff, this.stall_current);
  }

  R() {
    return this.voltage_nom / this.stall_current;
  }
  
  kw() {
    return (this.voltage_nom - this.free_current * this.R()) / this.free_speed;
  }

  kt() {
    return (this.stall_current / this.stall_torque);
  }

  calculate(voltage, speed) {
    let current = (voltage - this.kw() * speed) / this.R();
    return {
      current: current,
      torque: current / this.kt()
    };
  }
};

let rpm_to_rad = (2 * Math.PI) / 60.0;

export const Motors = {
  Falcon500:  new Motor("Falcon 500", 12,  6380 * rpm_to_rad, 1.5, 4.69, 257),
  NEO:        new Motor("NEO",        12,  5880 * rpm_to_rad, 1.3, 3.36, 166),
  NEO550:     new Motor("NEO 550",    12, 11710 * rpm_to_rad, 1.1, 1.08, 111),
  CIM:        new Motor("CIM",        12,  5330 * rpm_to_rad, 2.7, 2.41, 131),
  MiniCIM:    new Motor("Mini CIM",   12,  5840 * rpm_to_rad, 3.0, 1.41,  89),
  BAG:        new Motor("BAG",        12, 13180 * rpm_to_rad, 1.8, 0.43,  53),
  pro775:     new Motor("775pro",     12, 14270 * rpm_to_rad, 3.7, 0.36, 71),
  redline:    new Motor("AM Redline", 12, 19500 * rpm_to_rad, 2.6, 0.64, 122)
};

export function motorFromConfig(cfg) {
  return Motors[cfg.key].mult(cfg.num).reduce(cfg.reduction).withEfficiency(cfg.efficiency / 100.0);
};

export default Motor;