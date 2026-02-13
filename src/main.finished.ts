// src/main.ts
// Week 3: Running the FSM simulation

import { StateMachine } from "./state_machine.finished.ts";

// Initialize the Brain
const fsm = new StateMachine();

console.log("=============================================");
console.log("      CPU SIMULATOR - STARTING CLOCK");
console.log("=============================================");
console.log("Clock Speed: 1 Hz (1 cycle per second)");
console.log("Press Ctrl+C to stop.\n");

// Start the Simulation Loop
// This simulates a CPU Clock running at 1Hz (1 cycle per second)
setInterval(() => {
  fsm.tick();
}, 1000);
