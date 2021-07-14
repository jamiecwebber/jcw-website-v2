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
            // apply necessary logic to update left MIDI
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
        }
    });
    return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>
}