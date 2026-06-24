# NetSim: Building a Simulated Computer System (Class 2)

A tiny CPU simulator built around a **finite state machine (FSM)**. The "CPU"
runs on a 1 Hz clock — once per second it `tick()`s, moving through the classic
**fetch → decode → execute** cycle and persisting its output to `storage.json`.

## Running with Bun

This project runs on [Bun](https://bun.sh), which executes TypeScript directly
(no separate transpile step).

```bash
bun install            # install dependencies
bun run start          # run YOUR code (src/main.ts + src/state_machine.ts)
bun run start:inclass  # run last week's in-class build (reference)
bun run start:solution # run the reference solution
```

Press `Ctrl+C` to stop the simulation.

## Your task

Fill in the two stub files. Everything you need to edit is marked with `// TODO`.

- **`src/state_machine.ts`** — the CPU itself (most of the work).
- **`src/main.ts`** — wires up the program and starts the clock.

The storage helpers (`write`, `fetchStorageData`, `writeStorageData`,
`isStorageAvailable`) and the small helpers (`logState`, `handleCrash`,
`transitionTo`) are already provided — call them, don't rewrite them.

### How the machine works

The CPU holds two pieces of memory:

- `inputData: string[]` — the "program": lines waiting to be processed.
- `fakeMemory` — a small buffer (max 3 lines) the CPU is currently working on.

Each `tick()` advances one step through this cycle:

| State | What it should do | Next state |
|-------|-------------------|------------|
| `IDLE`    | Log the state; power on. | `FETCH` |
| `FETCH`   | Pull the next line off `inputData` into `fakeMemory` (crash if the buffer would exceed 3). If a line was found → `DECODE`; if `inputData` is empty, the program is done → `handleProcessComplete()`. | `DECODE` / `IDLE` |
| `DECODE`  | If `fakeMemory` is empty, wait. Otherwise normalize the buffered lines (e.g. lowercase them). | `EXECUTE` |
| `EXECUTE` | If `fakeMemory` is empty, wait. Otherwise `write()` each buffered line to storage, then clear `fakeMemory`. | `FETCH` |
| `ERROR`   | Something went wrong — crash with a reason. | — |

### Suggested order

1. Implement `tick()`: increment `stepCount`, then `switch` on `currentState`
   and call the matching handler.
2. Implement `handleIdle` → `handleFetch` → `handleDecode` → `handleExecute`,
   testing with `bun run start` after each. You should see the state logs march
   forward and lines appear in `storage.json`.
3. Implement `handleProcessComplete` and `handleError`.
4. **Bonus:** in `handleExecute`, add a small random chance of jumping to
   `ERROR` to simulate a hardware glitch.

Useful references:
[FSM](https://en.wikipedia.org/wiki/Finite-state_machine) ·
[enums](https://www.typescriptlang.org/docs/handbook/enums.html) ·
[switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) ·
[setInterval](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)
