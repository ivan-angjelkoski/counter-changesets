/**
 * Represents the state of the counter
 */
export type State = {
  count: number;
};

/**
 * A function that listens to state changes
 */
export type Listener = (state: State) => void;

/**
 * Configuration options for the Counter
 */
export type CounterOptions = {
  /** Initial value for the counter (default: 0) */
  initialValue?: number;
  /** Minimum allowed value (default: -Infinity) */
  min?: number;
  /** Maximum allowed value (default: Infinity) */
  max?: number;
  /** Default step for increment/decrement (default: 1) */
  step?: number;
};

/**
 * A flexible counter class with subscription support and configurable boundaries
 */
export class Counter {
  private count: number;
  private readonly initialValue: number;
  private readonly min: number;
  private readonly max: number;
  private readonly step: number;
  private listeners: Set<Listener> = new Set();

  /**
   * Creates a new Counter instance
   * @param options - Configuration options for the counter
   */
  constructor(options: CounterOptions = {}) {
    const { initialValue = 0, min = -Infinity, max = Infinity, step = 1 } = options;

    if (min > max) {
      throw new Error("min cannot be greater than max");
    }

    this.min = min;
    this.max = max;
    this.step = step;
    this.initialValue = this.clamp(initialValue);
    this.count = this.initialValue;
  }

  /**
   * Clamps a value within the min/max boundaries
   */
  private clamp(value: number): number {
    return Math.min(Math.max(value, this.min), this.max);
  }

  /**
   * Subscribe to state changes
   * @param listener - The listener function to call on state changes
   * @returns An unsubscribe function
   */
  subscribe(listener: Listener) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners of a state change
   */
  private notify() {
    for (const listener of this.listeners) {
      listener(this.getState());
    }
  }

  /**
   * Get the current state object
   * @returns The current state containing the count
   */
  getState(): State {
    return { count: this.count };
  }

  /**
   * Get the current count value
   * @returns The current count number
   */
  getCount(): number {
    return this.count;
  }

  /**
   * Increment the counter
   * @param amount - The amount to increment by (default: configured step)
   */
  increment(amount?: number) {
    const incrementBy = amount ?? this.step;
    this.count = this.clamp(this.count + incrementBy);
    this.notify();
  }

  /**
   * Decrement the counter
   * @param amount - The amount to decrement by (default: configured step)
   */
  decrement(amount?: number) {
    const decrementBy = amount ?? this.step;
    this.count = this.clamp(this.count - decrementBy);
    this.notify();
  }

  /**
   * Set the counter to a specific value
   * @param value - The value to set the counter to (will be clamped to min/max)
   */
  set(value: number) {
    this.count = this.clamp(value);
    this.notify();
  }

  /**
   * Reset the counter to the initial value or a new value
   * @param value - Optional new value to reset to (default: initial value)
   */
  reset(value?: number) {
    this.count = this.clamp(value ?? this.initialValue);
    this.notify();
  }

  /**
   * Get the configured minimum value
   */
  getMin(): number {
    return this.min;
  }

  /**
   * Get the configured maximum value
   */
  getMax(): number {
    return this.max;
  }

  /**
   * Get the configured step value
   */
  getStep(): number {
    return this.step;
  }

  /**
   * Get the initial value the counter was created with
   */
  getInitialValue(): number {
    return this.initialValue;
  }
}
