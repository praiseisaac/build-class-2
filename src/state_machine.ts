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

export class StateMachine {
  currentState: SystemState = SystemState.IDLE
  stepCount: number = 0
  maxStorageCapacity = 5
  currentLine: string | undefined;
  inputData: string[] = [];
  fakeMemory: [string?, string?, string?] = []; // max of 3

  // The constructor receives the "program": the list of lines to process.
  constructor(initialData: string[]) {
    this.inputData = initialData;
  }

  // --- Persistent storage helpers (provided) -------------------------------

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

  // --- The clock --------------------------------------------------------

  // tick() runs once per clock cycle. Increment stepCount, then switch on
  // currentState and call the matching handler. Crash on an unknown state.
  tick() {
    // TODO: increment stepCount, then switch on this.currentState and dispatch
    //       to handleIdle / handleFetch / handleDecode / handleExecute / handleError
  }

  clearCurrentLine() {
    this.currentLine = undefined
  }

  // --- State handlers ---------------------------------------------------

  // handleIdle() — log the state, then transition to FETCH.
  handleIdle() {
    // TODO
  }

  // handleFetch() — pull the next line off inputData into fakeMemory (max 3,
  //   crash if exceeded). If a line was found, transition to DECODE; otherwise
  //   the program is done, so call handleProcessComplete().
  handleFetch() {
    // TODO
  }

  // handleDecode() — if fakeMemory is empty, just wait. Otherwise "decode" the
  //   buffered lines (e.g. normalize them) and transition to EXECUTE.
  handleDecode() {
    // TODO
  }

  // handleExecute() — if fakeMemory is empty, just wait. Otherwise write() each
  //   buffered line to storage, clear fakeMemory, and transition back to FETCH.
  handleExecute() {
    // TODO
  }

  // handleProcessComplete() — log, then transition back to IDLE.
  handleProcessComplete() {
    // TODO
  }

  // handleError() — something went wrong; crash with the given reason.
  handleError(reason: string) {
    // TODO
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

// BONUS: Add a small random chance in handleExecute() to transition to ERROR
//   instead, to simulate a hardware glitch.
