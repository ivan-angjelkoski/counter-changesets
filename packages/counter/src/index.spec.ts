import {
  Counter,
  type State,
  type Listener,
  type CounterOptions,
} from "./index";

describe("Counter", () => {
  let counter: Counter;

  beforeEach(() => {
    counter = new Counter();
  });

  describe("constructor", () => {
    it("should create a counter with default options", () => {
      expect(counter.getCount()).toBe(0);
      expect(counter.getMin()).toBe(-Infinity);
      expect(counter.getMax()).toBe(Infinity);
      expect(counter.getStep()).toBe(1);
      expect(counter.getInitialValue()).toBe(0);
    });

    it("should create a counter with custom initial value", () => {
      const customCounter = new Counter({ initialValue: 10 });
      expect(customCounter.getCount()).toBe(10);
      expect(customCounter.getInitialValue()).toBe(10);
    });

    it("should create a counter with min/max boundaries", () => {
      const customCounter = new Counter({ min: 0, max: 100 });
      expect(customCounter.getMin()).toBe(0);
      expect(customCounter.getMax()).toBe(100);
    });

    it("should create a counter with custom step", () => {
      const customCounter = new Counter({ step: 5 });
      expect(customCounter.getStep()).toBe(5);
    });

    it("should clamp initial value to min/max", () => {
      const customCounter = new Counter({
        initialValue: 150,
        min: 0,
        max: 100,
      });
      expect(customCounter.getCount()).toBe(100);
      expect(customCounter.getInitialValue()).toBe(100);
    });

    it("should throw error if min is greater than max", () => {
      expect(() => new Counter({ min: 100, max: 0 })).toThrow(
        "min cannot be greater than max"
      );
    });
  });

  describe("increment", () => {
    it("should increment the count", () => {
      const listener = vi.fn();
      counter.subscribe(listener);

      counter.increment();

      expect(listener).toHaveBeenCalledWith({ count: 1 });
    });

    it("should increment multiple times", () => {
      const listener = vi.fn();
      counter.subscribe(listener);

      counter.increment();
      counter.increment();
      counter.increment();

      expect(listener).toHaveBeenCalledTimes(3);
      expect(listener).toHaveBeenLastCalledWith({ count: 3 });
    });

    it("should increment by a specific amount", () => {
      const listener = vi.fn();
      counter.subscribe(listener);

      counter.increment(5);

      expect(listener).toHaveBeenCalledWith({ count: 5 });
    });

    it("should use configured step when no amount is provided", () => {
      const customCounter = new Counter({ step: 10 });
      const listener = vi.fn();
      customCounter.subscribe(listener);

      customCounter.increment();

      expect(listener).toHaveBeenCalledWith({ count: 10 });
    });

    it("should respect max boundary", () => {
      const customCounter = new Counter({ initialValue: 95, max: 100 });
      const listener = vi.fn();
      customCounter.subscribe(listener);

      customCounter.increment(10);

      expect(listener).toHaveBeenCalledWith({ count: 100 });
    });
  });

  describe("decrement", () => {
    it("should decrement the count", () => {
      const listener = vi.fn();
      counter.subscribe(listener);

      counter.decrement();

      expect(listener).toHaveBeenCalledWith({ count: -1 });
    });

    it("should decrement multiple times", () => {
      const listener = vi.fn();
      counter.subscribe(listener);

      counter.decrement();
      counter.decrement();

      expect(listener).toHaveBeenCalledTimes(2);
      expect(listener).toHaveBeenLastCalledWith({ count: -2 });
    });

    it("should decrement by a specific amount", () => {
      const listener = vi.fn();
      counter.subscribe(listener);

      counter.decrement(5);

      expect(listener).toHaveBeenCalledWith({ count: -5 });
    });

    it("should use configured step when no amount is provided", () => {
      const customCounter = new Counter({ step: 10 });
      const listener = vi.fn();
      customCounter.subscribe(listener);

      customCounter.decrement();

      expect(listener).toHaveBeenCalledWith({ count: -10 });
    });

    it("should respect min boundary", () => {
      const customCounter = new Counter({ initialValue: 5, min: 0 });
      const listener = vi.fn();
      customCounter.subscribe(listener);

      customCounter.decrement(10);

      expect(listener).toHaveBeenCalledWith({ count: 0 });
    });
  });

  describe("set", () => {
    it("should set the counter to a specific value", () => {
      const listener = vi.fn();
      counter.subscribe(listener);

      counter.set(50);

      expect(listener).toHaveBeenCalledWith({ count: 50 });
      expect(counter.getCount()).toBe(50);
    });

    it("should clamp value to min", () => {
      const customCounter = new Counter({ min: 0, max: 100 });
      const listener = vi.fn();
      customCounter.subscribe(listener);

      customCounter.set(-50);

      expect(listener).toHaveBeenCalledWith({ count: 0 });
    });

    it("should clamp value to max", () => {
      const customCounter = new Counter({ min: 0, max: 100 });
      const listener = vi.fn();
      customCounter.subscribe(listener);

      customCounter.set(150);

      expect(listener).toHaveBeenCalledWith({ count: 100 });
    });
  });

  describe("reset", () => {
    it("should reset to initial value", () => {
      const customCounter = new Counter({ initialValue: 10 });
      const listener = vi.fn();
      customCounter.subscribe(listener);

      customCounter.increment(5);
      customCounter.reset();

      expect(listener).toHaveBeenLastCalledWith({ count: 10 });
      expect(customCounter.getCount()).toBe(10);
    });

    it("should reset to a specific value", () => {
      const listener = vi.fn();
      counter.subscribe(listener);

      counter.increment(5);
      counter.reset(20);

      expect(listener).toHaveBeenLastCalledWith({ count: 20 });
      expect(counter.getCount()).toBe(20);
    });

    it("should clamp reset value to boundaries", () => {
      const customCounter = new Counter({ min: 0, max: 100 });
      const listener = vi.fn();
      customCounter.subscribe(listener);

      customCounter.reset(150);

      expect(listener).toHaveBeenCalledWith({ count: 100 });
    });
  });

  describe("getCount", () => {
    it("should return the current count", () => {
      expect(counter.getCount()).toBe(0);

      counter.increment(5);
      expect(counter.getCount()).toBe(5);

      counter.decrement(2);
      expect(counter.getCount()).toBe(3);
    });
  });

  describe("getState", () => {
    it("should return the current state object", () => {
      const state = counter.getState();

      expect(state).toEqual({ count: 0 });
    });

    it("should return updated state after changes", () => {
      counter.increment(5);
      const state = counter.getState();

      expect(state).toEqual({ count: 5 });
    });
  });

  describe("subscribe", () => {
    it("should add a listener", () => {
      const listener = vi.fn();

      counter.subscribe(listener);
      counter.increment();

      expect(listener).toHaveBeenCalledWith({ count: 1 });
    });

    it("should support multiple listeners", () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();

      counter.subscribe(listener1);
      counter.subscribe(listener2);
      counter.increment();

      expect(listener1).toHaveBeenCalledWith({ count: 1 });
      expect(listener2).toHaveBeenCalledWith({ count: 1 });
    });

    it("should return an unsubscribe function", () => {
      const listener = vi.fn();

      const unsubscribe = counter.subscribe(listener);
      unsubscribe();
      counter.increment();

      expect(listener).not.toHaveBeenCalled();
    });
  });

  describe("type exports", () => {
    it("should export State type", () => {
      const state: State = { count: 5 };
      expect(state.count).toBe(5);
    });

    it("should export Listener type", () => {
      const listener: Listener = (state) => {
        expect(state.count).toBeDefined();
      };
      counter.subscribe(listener);
      counter.increment();
    });

    it("should export CounterOptions type", () => {
      const options: CounterOptions = {
        initialValue: 10,
        min: 0,
        max: 100,
        step: 5,
      };
      const customCounter = new Counter(options);
      expect(customCounter.getCount()).toBe(10);
    });
  });
});
