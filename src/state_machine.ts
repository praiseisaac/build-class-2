/**
 * Week 3: Finite State Machine - CPU Fetch-Decode-Execute Cycle
 *
 * Sources:
 *  https://developer.mozilla.org/en-US/docs/Glossary/State_machine
 *  https://en.wikipedia.org/wiki/Finite-state_machine
 *  https://www.ibm.com/think/topics/central-processing-unit#:~:text=purposes%2E-,How,warranties
 */
import fs from 'node:fs'
import os from 'os'

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
      this.handleCrash();
    }

    this.currentLine = line
    this.writeStorageData(existingData)
  }

  isStorageAvailable() {
    const existingData = this.fetchStorageData();
    return existingData.length <= this.maxStorageCapacity
  }

  tick() {
    this.stepCount++;
    // check input

    switch (this.currentState) {
      case SystemState.IDLE: {
        this.handleIdle()
        break;
      } case SystemState.DECODE: {
        this.handleDecode()
        break;
      } case SystemState.ERROR: {
        console.log("Not Implemented")
        break;
      } case SystemState.EXECUTE: {
        this.handleExecute()
        break;
      } case SystemState.FETCH: {
        this.handleFetch()
        break;
      } default: {
        throw new Error("Invalid State")
      }
    }
  }

  clearCurrentLine() {
    this.currentLine = undefined
  }

  // handleIdle()    — log state, transition to FETCH
  handleIdle() {
    this.transitionTo(SystemState.FETCH);
  }

  // handleFetch()   — log state, transition to DECODE
  handleFetch() {
    this.transitionTo(SystemState.DECODE);
  }

  // handleDecode()  — log state, transition to EXECUTE
  handleDecode() {
    this.transitionTo(SystemState.EXECUTE);
  }

  // handleExecute() — log state, transition to FETCH
  handleExecute() {
    console.log(this.currentLine)
    this.clearCurrentLine()
    this.transitionTo(SystemState.FETCH);
  }

  handleError() {
    this.transitionTo(SystemState.IDLE);
  }

  handleCrash() {
    throw new Error("Cpu Crashed")
  }

  transitionTo(state: SystemState) {
    this.currentState = state;
  }
}

// BONUS: Add 10% chance in handleExecute() to transition to ERROR instead
//   handleError() — log state, transition back to IDLE
