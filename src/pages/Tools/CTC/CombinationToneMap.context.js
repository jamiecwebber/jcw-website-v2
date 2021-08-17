import React from 'react';

// Create React context
const CTX = React.createContext();
export { CTX };

// Web Audio basics go here
let actx = new AudioContext();
let out = actx.destination;

let masterGain = actx.createGain(0.6);
masterGain.connect(out);

// Reducer and app state
export function reducer(state, action) {
    let { id, value } = action.payload || {};
    switch(action.type){
        case "CHANGE_LEFT_MIDI":
            return {...state, gridSettings: {...state.gridSettings, leftMIDI: value}};
        case "CHANGE_RIGHT_MIDI":
            return {...state, gridSettings: {...state.gridSettings, rightMIDI: value}};
        case "CHANGE_GRID_SIZE":
            return {...state, gridSettings: {...state.gridSettings, gridSize: value}};
        case "TOGGLE_PLAY_ON_HOVER":
            let newToggle = !state.synthSettings.playOnHover;
            return {...state, synthSettings: {...state.synthSettings, playOnHover: newToggle}};
        case "TOGGLE_SUSTAIN_ON_CLICK":
            let newSustain = !state.synthSettings.sustainOnClick;
            return {...state, synthSettings: {...state.synthSettings, sustainOnClick: newSustain}};
        case "CHANGE_MASTER_VOLUME":
            masterGain.gain.value = value;
            return {...state, synthSettings: {...state.synthSettings, volume: value}};
        case "GRID_NOTE_HOVER_ON":
            let newHoverGrid = state.hoverOscGrid;
            if (!newHoverGrid[value.left][value.right]) {
                let newOsc = actx.createOscillator();
                let newGain = actx.createGain();
                newOsc.frequency.value = value.frequency;
                newOsc.type = "triangle";
                newGain.gain.setValueAtTime(0, actx.currentTime);
                newOsc.connect(newGain);
                newOsc.start();
                newGain.connect(masterGain);
                newHoverGrid[value.left][value.right] = {oscNode: newOsc, gainNode: newGain};
            }
            let { oscNode: osc, gainNode } = newHoverGrid[value.left][value.right];
            gainNode.gain.cancelScheduledValues(actx.currentTime);
            gainNode.gain.linearRampToValueAtTime(1, actx.currentTime + 0.25);
            gainNode.gain.linearRampToValueAtTime(0.6, actx.currentTime + 0.4);
            return {...state, hoverOscGrid: newHoverGrid};
        case "GRID_NOTE_HOVER_OFF":
            let { oscNode: oscOff, gainNode: gainOff } = state.hoverOscGrid[value.left][value.right];
            gainOff.gain.linearRampToValueAtTime(0, actx.currentTime + 1);
            setTimeout(()=>{reducer(state, {type: "KILL_HOVER_OSC", payload: { value:{left: value.left, right: value.right}}})}, 2000);
            return {...state};
        case "KILL_HOVER_OSC":
            let killHoverGrid = state.hoverOscGrid;
            if ( state.hoverOscGrid[value.left][value.right] ) {
                let { oscNode: killOsc, gainNode: killGainNode } = killHoverGrid[value.left][value.right];
                if (killGainNode.gain.value === 0.0) {
                    killOsc.stop();
                    killOsc.disconnect();
                    killGainNode.disconnect();
                    killHoverGrid[value.left][value.right] = false;
                }
            }
            return {...state, hoverOscGrid: killHoverGrid};
        case "GRID_NOTE_SUSTAIN_ON":
            let newSustainGrid = state.sustainOscGrid;
            if (!newSustainGrid[value.left][value.right]) {
                let newOsc = actx.createOscillator();
                let newGain = actx.createGain();
                newOsc.frequency.value = value.frequency;
                newOsc.type = "sine";
                newGain.gain.setValueAtTime(0, actx.currentTime);
                newOsc.connect(newGain);
                newOsc.start();
                newGain.connect(masterGain);
                newSustainGrid[value.left][value.right] = {oscNode: newOsc, gainNode: newGain};
            }
            let { oscNode: susOscNode, gainNode: susGainNode } = newSustainGrid[value.left][value.right];
            susGainNode.gain.cancelScheduledValues(actx.currentTime);
            susGainNode.gain.linearRampToValueAtTime(0.8, actx.currentTime + 1);
            susGainNode.gain.linearRampToValueAtTime(0.4, actx.currentTime + 1.5);
            return {...state, sustainOscGrid: newSustainGrid};
        case "GRID_NOTE_SUSTAIN_OFF":
            let { oscNode: susOscOff, gainNode: susGainOff } = state.sustainOscGrid[value.left][value.right];
            susGainOff.gain.linearRampToValueAtTime(0, actx.currentTime + 3);
            setTimeout(()=>{reducer(state, {type: "KILL_SUSTAIN_OSC", payload: { value:{left: value.left, right: value.right}}})}, 5000);
            return {...state};
        case "KILL_SUSTAIN_OSC":
            let killSustainGrid = state.sustainOscGrid;
            if ( state.sustainOscGrid[value.left][value.right] ) {
                let { oscNode: killOsc, gainNode: killGainNode } = killSustainGrid[value.left][value.right];
                if (killGainNode.gain.value === 0.0) {
                    killOsc.stop();
                    killOsc.disconnect();
                    killGainNode.disconnect();
                    killSustainGrid[value.left][value.right] = false;
                }
            }
            return {...state, hoverOscGrid: killSustainGrid};
        default: 
            console.log("reducer error: action ", action);
            return {...state};
    }
}

export default function Store(props) {
    const stateHook = React.useReducer(reducer, {
        // this is the object that sends the initial values to React
        gridSettings: {
            leftMIDI: 40,
            rightMIDI: 47,
            gridSize: 10
        },
        synthSettings: {
            volume: masterGain.gain.value,
            playOnHover: true,
            sustainOnClick: false
        },
        hoverOscGrid: [...Array(17)].map(() => Array(17).fill(false)),
        sustainOscGrid: [...Array(17)].map(() => Array(17).fill(false))
    });
    return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>
}