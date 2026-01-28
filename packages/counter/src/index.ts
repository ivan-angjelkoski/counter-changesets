type State = {
  count: number;
};

type Listener = (state: State) => void;

export class Counter {
  private count: number = 0;

  listeners: Set<Listener> = new Set();

  constructor() {
    this.count = 0;
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  notify() {
    for (const listener of this.listeners) {
      listener({ count: this.count });
    }
  }

  increment() {
    this.count++;
    this.notify();
  }

  decrement() {
    this.count--;
    this.notify();
  }
}
