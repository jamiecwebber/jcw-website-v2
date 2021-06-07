// Some helper functions
export const midiToNote = (midi) => {
    let octave = Math.floor(midi/12) - 1;
    let note = midi % 12;
    let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    let noteName = notes[note];
    return  { noteName, octave, note };
}

export const midiToFrequency = (midi) => {
    return Math.pow(2,((midi-69)/12)) * 440;
}
  
export const frequencyToMidicents = (frequency) => {
    // this calculation assumes A4 = 440Hz = 6900 MIDIcents
    // https://newt.phys.unsw.edu.au/jw/notes.html
    let midicents = Math.round(6900 + 1200 * Math.log(frequency/440) / Math.log(2));
    return midicents;
} 

export const splitMidicents = (midicents) => {
    let cents = midicents % 100;
    let midi = (midicents - cents) / 100 ;

    return {
        midi,
        cents
    };
}
