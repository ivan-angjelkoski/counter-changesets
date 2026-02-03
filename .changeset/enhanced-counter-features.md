---
"@ivan-angelkoski/counter": minor
---

Enhanced Counter class with new features:

- **Initial Value Support**: Configure the counter's starting value via `CounterOptions`
- **Reset Method**: Reset counter to initial value or a specific value using `reset(value?)`
- **Set Method**: Directly set counter to any value using `set(value)`
- **Min/Max Boundaries**: Configure optional `min` and `max` bounds with automatic clamping
- **Configurable Step**: Set a default step for `increment()` and `decrement()` operations
- **Convenience Methods**: Added `getCount()` for quick access to the current count value
- **Exported Types**: Now exports `State`, `Listener`, and `CounterOptions` types for better TypeScript support
- **Configuration Getters**: Added `getMin()`, `getMax()`, `getStep()`, and `getInitialValue()` methods
