import { Counter } from "./index";

describe("Counter", () => {
  let counter: Counter;

  beforeEach(() => {
    counter = new Counter();
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

  describe("notify", () => {
    it("should notify all listeners with current state", () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();

      counter.subscribe(listener1);
      counter.subscribe(listener2);
      counter.notify();

      expect(listener1).toHaveBeenCalledWith({ count: 0 });
      expect(listener2).toHaveBeenCalledWith({ count: 0 });
    });
  });
});
