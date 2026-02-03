type State = {
  count: number;
};

type Listener = (state: State) => void;

type SubscribeOptions = {
  emitInitial?: boolean;
};

export class Counter {
  private count: number = 0;

  private listeners: Set<Listener> = new Set();

  constructor(initialCount: number = 0) {
    this.assertFiniteAmount(initialCount, "initialCount");
    this.count = initialCount;
  }

  subscribe(listener: Listener, options: SubscribeOptions = {}) {
    this.listeners.add(listener);
    const { emitInitial = true } = options;
    if (emitInitial) {
      listener(this.getState());
    }

    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    for (const listener of this.listeners) {
      listener(this.getState());
    }
  }

  getState() {
    return { count: this.count };
  }

  increment(amount: number = 1) {
    this.assertFiniteAmount(amount, "amount");
    this.count += amount;
    this.notify();
  }

  decrement(amount: number = 1) {
    this.assertFiniteAmount(amount, "amount");
    this.count -= amount;
    this.notify();
  }

  reset(value: number = 0) {
    this.assertFiniteAmount(value, "value");
    this.count = value;
    this.notify();
  }

  private assertFiniteAmount(value: number, name: string) {
    if (!Number.isFinite(value)) {
      throw new Error(`${name} must be a finite number`);
    }
  }
}
