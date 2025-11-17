# Strudel 
### Web Technology – Assignment (SP2 2025)  
### Author: **Huy Duong Quang**

---

## Overview

This project is a React-based live-coding environment built using the Strudel audio engine.  
It extends the standard Strudel REPL by adding DJ-style interactive controls, audio visualisation, JSON presets, and realtime tempo + gain manipulation.

The application enables users to modify Strudel patterns **without manually editing code**, making it more user-friendly for musical experimentation.

---

## 🧩 Features

### 1. Volume Control (Scaled Gain)
- Multiplies all `.gain()` values by the slider amount
- Stores original gains to avoid repeated multiplication
- Applies fallback gain if `.gain()` not found

---

### 2. CPM (Tempo) Control + Reset
- Adds `setcpm(x)` dynamically to the Strudel code
- Prevents invalid CPM values and displays warnings
- Includes **Reset CPM** which:
  - Removes all `setcpm(...)`
  - Restores default tempo
  - Re-evaluates the project

---

### 3. Drum Toggles
- Enables/disables drum patterns dynamically
- Works by commenting/uncommenting the Strudel labels:


---

###  4. JSON Preset Save/Load
- Saves user settings to `.json` files:
- Volume
- CPM
- Drum toggles
- Loads the preset instantly using FileReader

---

### 5. D3 Gain Graph
- Real-time gain monitor using WebAudio AnalyserNode
- Smooth animated waveform-style curve
- Listens to custom events:

## How to Run

- Open Terminal in project folder then type: npm install
- Then type: npm run
