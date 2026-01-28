type State = {
  count: number;
};

type Listener = (state: State) => void;

export class Counter {
  private count: number = 0;

  private listeners: Set<Listener> = new Set();

  constructor() {
    this.count = 0;
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);

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
    this.count += amount;
    this.notify();
  }

  decrement(amount: number = 1) {
    this.count -= amount;
    this.notify();
  }
}
