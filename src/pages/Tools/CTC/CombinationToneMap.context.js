import React from 'react';

// Create React context
export const CTX = React.createContext();

// Web Audio basics go here
let actx = new AudioContext();
let out = actx.destination;

let masterGain = actx.createGain();
masterGain.connect(out);



// Reducer and app state
export function reducer(state, action) {
    let { id, value } = action.payload || {};
    switch(action.type){
        case "CHANGE_LEFT_MIDI":
            // apply necessary logic to update left MIDI
            return {...state, gridSettings: {...state.gridSettings, leftMidi: value}};
        case "CHANGE_RIGHT_MIDI":
            return {...state, gridSettings: {...state.gridSettings, rightMidi: value}};
        case "CHANGE_GRID_SIZE":
            return {...state};
        default: 
            console.log("reducer error: action ", action);
            return {...state};
    }
}

export default function Store(props) {
    const stateHook = React.useReducer(reducer, {
        // this is the object with all the initial values
        gridSettings: {
            leftMidi: 40,
            rightMidi: 47,
            gridSize: 10
        },
        synthSettings: {
            volume: 0.6,
            playOnHover: true,
            sustainOnClick: true
        }
    });
    return <CTX.Provider>{props.children}</CTX.Provider>
}