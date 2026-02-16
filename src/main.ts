/**
 * Week 3: Running the FSM simulation
 */

// Import your StateMachine class
// Initialize a new StateMachine and store it in a variable called `fsm`
import { StateMachine } from "./state_machine";

import readline from 'readline'
import process from 'process'

const fsm = new StateMachine();

// Log start information
//   "CPU SIMULATOR - STARTING CLOCK"
//   "Clock Speed: 1 Hz (1 cycle per second)"
//   "Press Ctrl+C to stop."
console.log(`
  CPU Simulation - Starting Clock
  Clock Speed: 1 Hz
  Press Ctrl+C to stop.
`)


const readlineInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

{
  (async () => {
    for await (const line of readline.createInterface({ input: process.stdin })) {
      if (!line) continue

      fsm.write(line)
    }
  })()
}

// Use setInterval to call fsm.tick() every 1000ms (1 second).
// This simulates a CPU clock running at 1 Hz.
// Docs: https://developer.mozilla.org/en-US/docs/Web/API/setInterval
setInterval(() => {
  fsm.tick()
}, 1000)
