class Unit {
  static map = {};

  constructor(name, factor_to_base=1, base=null) {
    this.name = name;
    this.factor_to_base = factor_to_base;
    this.base = base;

    if (!base && (factor_to_base - 1) > 0.001)
      throw(`ERROR: Unit ${name} has no base unit!`)

    if (!base) {
      this.derivatives = []
      this.base = this;
    } else {
      while (this.base.base !== this.base) {
        this.factor_to_base *= this.base.factor_to_base;
        this.base = this.base.base;
      }
      this.base.derivatives.push(this);
    }
    Unit.map[name] = this;
  }

  toBase(n) {
    return n * this.factor_to_base;
  }

  fromBase(n) {
    return n / this.factor_to_base;
  }

  to(unit, n) {
    if (unit.base !== this.base)
      throw "Cannot convert between units of different bases!"
    return unit.fromBase(this.toBase(n));
  }

  allVariants() {
    return [ this.base, ...this.base.derivatives ]
  }

  static fromObject(unit_obj) {
    if (typeof unit_obj === 'object' && unit_obj !== null)
      return Unit.map[unit_obj.name];
    return unit_obj;
  }
};

export class Measurement {
  constructor(unit, value) {
    this.unit = unit;
    this.value = value;
    if (this.unit === undefined || this.value === undefined)
      throw "Measurement params undefined";
  }

  to(unit) {
    return new Measurement(unit, this.unit.to(unit, this.value));
  }

  toBase() {
    return this.unit.toBase(this.value);
  }

  with(f) {
    return new Measurement(this.unit, f(this.value));
  }

  static fromObject(measurement_obj) {
    if (typeof measurement_obj === 'object' && measurement_obj !== null)
      return new Measurement(Unit.fromObject(measurement_obj.unit), measurement_obj.value);
    return measurement_obj;
  }
};

Unit.prototype.make = function(n) {
  return new Measurement(this, n);
};

// Length
export const m    = new Unit('m', 1)
export const mm   = new Unit('mm', 1 / 1000, m);
export const cm   = new Unit('cm', 10, mm);
export const inch = new Unit('in', 25.4, mm);
export const ft   = new Unit('ft', 12, inch);
export const field = new Unit('FRC Field (54ft)', 54, ft);

// Time
export const s  = new Unit('s', 1);
export const ms = new Unit('ms', 1 / 1000, s);

// Mass
export const kg = new Unit('kg', 1);
export const lb = new Unit('lb', 0.453592, kg);

// Voltage
export const V = new Unit('V', 1);

// Current
export const A = new Unit('A', 1);
export const mA = new Unit('mA', 1 / 1000, A);

// Angle
export const rad = new Unit('rad', 1);
export const deg = new Unit('deg', Math.PI / 180, rad);

// Velocity
export const mps = new Unit('m/s', 1);
export const mmps = new Unit('mm/s', 1 / 1000, mps);
export const inchps = new Unit('in/s', 25.4, mmps)
export const ftps = new Unit('ft/s', 12, inchps);
export const kph = new Unit('km/hr', 1 / 3.6, mps);
export const field_per_s = new Unit('FRC Fields / s', 54, ftps);

// Acceleration
export const mpsps = new Unit('m/s/s', 1);
export const ftpsps = new Unit('ft/s/s', 12 * 25.4 / 1000, mpsps);

// Angular Velocity
export const radps = new Unit('rad/s', 1);
export const degps = new Unit('deg/s', Math.PI / 180, radps);
export const rpm   = new Unit('rpm', 2 * Math.PI / 60, radps);

// Torque
export const Nm = new Unit('Nm', 1);
export const ftlb = new Unit('ftlb', 1.35582, Nm);