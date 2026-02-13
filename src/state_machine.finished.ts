// src/state_machine.ts

// 1. Define Valid States
export enum SystemState {
  IDLE = "IDLE",
  FETCH = "FETCH",
  DECODE = "DECODE",
  EXECUTE = "EXECUTE",
  ERROR = "ERROR",
}

export class StateMachine {
  currentState: SystemState = SystemState.IDLE;
  stepCount: number = 0;

  constructor() {
    console.log("FSM Initialized: Waiting for power...");
  }

  // 2. The Logic Loop (The "Tick")
  // This function runs every clock cycle
  tick() {
    this.stepCount++;

    switch (this.currentState) {
      case SystemState.IDLE:
        this.handleIdle();
        break;
      case SystemState.FETCH:
        this.handleFetch();
        break;
      case SystemState.DECODE:
        this.handleDecode();
        break;
      case SystemState.EXECUTE:
        this.handleExecute();
        break;
      case SystemState.ERROR:
        this.handleError();
        break;
    }
  }

  // --- State Handlers ---

  private handleIdle() {
    // Logic: Just wait.
    // Transition: Immediately go to FETCH for now.
    console.log(`[${this.stepCount}] IDLE: System warming up...`);
    this.transitionTo(SystemState.FETCH);
  }

  private handleFetch() {
    console.log(`[${this.stepCount}] FETCH: Requesting instruction from Memory...`);
    // Next week, we will actually send a network request here.
    // For now, simulate it:
    this.transitionTo(SystemState.DECODE);
  }

  private handleDecode() {
    console.log(`[${this.stepCount}] DECODE: Parsing instruction...`);
    this.transitionTo(SystemState.EXECUTE);
  }

  private handleExecute() {
    // 10% chance of a "glitch" crash
    if (Math.random() < 0.1) {
      console.error(`[${this.stepCount}] EXECUTE: SYSTEM FAILURE - Calculation Error`);
      this.transitionTo(SystemState.ERROR);
    } else {
      console.log(`[${this.stepCount}] EXECUTE: Calculating result...`);
      // Cycle complete, go back to start
      this.transitionTo(SystemState.FETCH);
    }
  }

  private handleError() {
    console.log(`[${this.stepCount}] ERROR: System halted. Resetting...`);
    this.transitionTo(SystemState.IDLE);
  }

  // Helper to log changes
  private transitionTo(newState: SystemState) {
    console.log(`    -> Transition: ${this.currentState} -> ${newState}`);
    this.currentState = newState;
  }
}
