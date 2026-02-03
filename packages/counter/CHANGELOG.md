# @ivanangjelkoski/counter

## 1.1.2

### Patch Changes

- 74a3568: minor description

## 1.1.1

### Patch Changes

- 7e4c697: minor imports
- 18b4f42: minor changes

## 1.1.0

### Minor Changes

- 216f4e7: Enhanced Counter class with new features:
  - **Initial Value Support**: Configure the counter's starting value via `CounterOptions`
  - **Reset Method**: Reset counter to initial value or a specific value using `reset(value?)`
  - **Set Method**: Directly set counter to any value using `set(value)`
  - **Min/Max Boundaries**: Configure optional `min` and `max` bounds with automatic clamping
  - **Configurable Step**: Set a default step for `increment()` and `decrement()` operations
  - **Convenience Methods**: Added `getCount()` for quick access to the current count value
  - **Exported Types**: Now exports `State`, `Listener`, and `CounterOptions` types for better TypeScript support
  - **Configuration Getters**: Added `getMin()`, `getMax()`, `getStep()`, and `getInitialValue()` methods

## 1.0.11

### Patch Changes

- 339e0d3: removed notify method

## 1.0.10

### Patch Changes

- d3837df: make the package platform neutral

## 1.0.9

### Patch Changes

- 1711cca: minor improvements to the counter class

## 1.0.8

### Patch Changes

- 60ed8cb: change the package type to module

## 1.0.7

### Patch Changes

- 3059705: minor export type fix

## 1.0.6

### Patch Changes

- c3c825c: add files field in package json

## 1.0.5

### Patch Changes

- 35d53e7: name change

## 1.0.4

### Patch Changes

- 901fe4e: updated the publish script

## 1.0.3

### Patch Changes

- 2355f3d: update package name

## 1.0.2

### Patch Changes

- 0e29ba4: Added more tests
- c9a70c4: updated the increment and decrement methods to accept an amount

## 1.0.1

### Patch Changes

- e23f26a: Initial Version
