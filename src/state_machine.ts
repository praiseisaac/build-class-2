/**
 * Week 3: Finite State Machine - CPU Fetch-Decode-Execute Cycle
 *
 * Sources:
 *  https://developer.mozilla.org/en-US/docs/Glossary/State_machine
 *  https://en.wikipedia.org/wiki/Finite-state_machine
 *  https://www.ibm.com/think/topics/central-processing-unit#:~:text=purposes%2E-,How,warranties
 */

// Define a SystemState enum with: IDLE, FETCH, DECODE, EXECUTE, ERROR (https://www.typescriptlang.org/docs/handbook/enums.html)

// Create a StateMachine class with currentState (IDLE) and stepCount (0)

// Implement tick() — increment stepCount, switch on currentState, call the right handler (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)

// Implement state handlers:
//   handleIdle()    — log state, transition to FETCH
//   handleFetch()   — log state, transition to DECODE
//   handleDecode()  — log state, transition to EXECUTE
//   handleExecute() — log state, transition to FETCH

// Implement transitionTo(newState) — log the transition, update currentState

// BONUS: Add 10% chance in handleExecute() to transition to ERROR instead
//   handleError() — log state, transition back to IDLE
