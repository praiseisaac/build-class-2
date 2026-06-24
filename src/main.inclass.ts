/**
 * Week 3: Running the FSM simulation (in-class build)
 */

import { StateMachine } from "./state_machine.inclass";

console.log("  ==== Simulated CPU: Class 2. Finite State Machine Demonstration  ==== ");

const dataArray = [
  "Hello world",
  "this is class 2",
  "lorem ipsum",
  "friday june 19",
  "Learning about finite state machines"
];

const stateMachine = new StateMachine(dataArray);

// Simulate a CPU clock running at 1 Hz (1 tick per second).
setInterval(() => {
  stateMachine.tick();
}, 1000);
