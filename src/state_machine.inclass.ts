/**
 * Week 3: Finite State Machine - CPU Fetch-Decode-Execute Cycle
 *
 * Sources:
 *  https://developer.mozilla.org/en-US/docs/Glossary/State_machine
 *  https://en.wikipedia.org/wiki/Finite-state_machine
 *  https://www.ibm.com/think/topics/central-processing-unit#:~:text=purposes%2E-,How,warranties
 */
import fs from 'node:fs'
import os from 'node:os'

const storageFilePath = './storage.json'

try {
  fs.readFileSync(storageFilePath, 'utf-8')
} catch (error) {
  fs.writeFileSync(storageFilePath, '[]')
  fs.readFileSync(storageFilePath, 'utf-8')
}

// Define a SystemState enum with: IDLE, FETCH, DECODE, EXECUTE, ERROR (https://www.typescriptlang.org/docs/handbook/enums.html)
export enum SystemState {
  IDLE = "idle",
  FETCH = "fetch",
  DECODE = "decode",
  EXECUTE = "execute",
  ERROR = "error"
}

// Implement tick() — increment stepCount, switch on currentState, call the right handler (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
export class StateMachine {
  currentState: SystemState = SystemState.IDLE
  stepCount: number = 0
  maxStorageCapacity = 5
  currentLine: string | undefined;
  inputData: string[] = [];
  fakeMemory: [string?, string?, string?] = []; // max of 3


  constructor(initialData: string[]) {
    this.inputData = initialData;
  }

  private fetchStorageData() {
    const fileData = fs.readFileSync(storageFilePath, 'utf-8')
    const existingData = JSON.parse(fileData) as string[]

    return existingData
  }

  private writeStorageData(data: string[]) {
    fs.writeFileSync(storageFilePath, JSON.stringify(data, null, 2))
  }

  write(line: string) {
    const existingData = this.fetchStorageData();
    existingData.push(line)

    if (!this.isStorageAvailable()) {
      this.handleCrash("No storage available");
    }

    this.currentLine = line
    this.writeStorageData(existingData)
  }

  isStorageAvailable() {
    const existingData = this.fetchStorageData();
    return existingData.length <= this.maxStorageCapacity
  }

  // Implement tick() — increment stepCount, then switch on currentState and
  // call the matching handler (handleIdle/handleFetch/handleDecode/handleExecute/handleError).
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
        this.handleError("Generic error " + this.currentState);
        break;
      default:
        this.handleCrash("Invalid state");
    }
  }

  clearCurrentLine() {
    this.currentLine = undefined
  }

  // handleIdle()    — log state, transition to FETCH
  handleIdle() {
    try {
      this.logState("Hello from idle state. Transitioning to " + SystemState.FETCH);
      this.transitionTo(SystemState.FETCH)
    } catch (err) {
      this.transitionTo(SystemState.ERROR);
    }
  }

  // handleFetch()   — log state, transition to DECODE
  handleFetch() {
    try {
      const data = this.inputData.shift();

      if (data) {
        if (this.fakeMemory.length === 3) {
          this.handleCrash("Memory limit exceeded");
        }

        this.fakeMemory.push(data);
        this.logState("Found data")
        this.transitionTo(SystemState.DECODE)
        return;
      }
      this.logState("Going back to sleep")
      this.handleProcessComplete();
    } catch (err) {
      this.transitionTo(SystemState.ERROR);
    }
  }

  // handleDecode()  — log state, transition to EXECUTE
  handleDecode() {
    try {
      if (this.fakeMemory.length === 0) {
        this.logState("No data");
        return;
      }

      this.logState("Decoding data")
      const [first, second, third] = this.fakeMemory.map(
        m => m?.toLowerCase()
      );
      this.fakeMemory[0] = first;
      this.fakeMemory[1] = second;
      this.fakeMemory[2] = third;
      this.transitionTo(SystemState.EXECUTE)
    } catch (err) {
      this.transitionTo(SystemState.ERROR);
    }
  }

  // handleExecute() — log the current line, clear it, transition to FETCH
  handleExecute() {
    try {
      if (this.fakeMemory.length === 0) {
        this.logState("No data");
        return;
      }

      this.logState("Executing write operations")
      for (let line of this.fakeMemory) {
        if (!line) continue;
        this.write(line)
      }

      this.fakeMemory = []

      this.transitionTo(SystemState.FETCH)
    } catch (err) {
      this.transitionTo(SystemState.ERROR);
    }
  }

  handleProcessComplete() {
    try {
      this.logState("Hello from complete state. Transitioning to " + SystemState.IDLE);
      this.transitionTo(SystemState.IDLE)
    } catch (err) {
      this.transitionTo(SystemState.ERROR);
    }
  }

  // handleError()   — log state, transition back to IDLE
  handleError(reason: string) {
    this.handleCrash(reason);
  }

  handleCrash(reason: string) {
    throw new Error(`[CPU Crash]: ${reason}`)
  }

  logState(message: string) {
    console.log(`[${this.currentState}]: ${message}`)
  }

  transitionTo(state: SystemState) {
    this.currentState = state;
  }
}

// BONUS: Add 10% chance in handleExecute() to transition to ERROR instead
//   handleError() — log state, transition back to IDLE
