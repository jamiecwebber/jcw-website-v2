import { useState, useEvent } from 'react'
import { CTControls , CTGrid, CTGridRow, CTContainer, NoteSlider, Label , GridNote, GridLine, GridLineBig} from './CombinationToneCalculator.elements'

let midiToFrequency = (midi) => {
    return Math.pow(2,((midi-69)/12)) * 440;
  }

  let frequencyToMidicents = (frequency) => {
    // this calculation assumes A4 = 440Hz = 6900 MIDIcents
    // https://newt.phys.unsw.edu.au/jw/notes.html
    let midicents = 6900 + 1200 * Math.log(frequency/440) / Math.log(2);
    return midicents;
  } 

  const midiToNote = (midi) => {
    let octave = Math.floor(midi/12) - 1;
    
    let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    let note = notes[midi % 12];
    return [note, octave];
}

  const Note = ({frequency}) => {
    if (frequency === 0) { return <GridNote></GridNote> }; // returns empty square for freq of 0

    let midicents = frequencyToMidicents(frequency);
    
    let cents = Math.round(midicents % 100);
    if (cents >= 50) cents -= 100;
    
    let semitone = Math.round(midicents / 100);
    let octave = Math.floor(semitone/12) - 1;
    let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    let note = notes[semitone % 12];

    return (
      <GridNote>
          <GridLine>{Math.floor(frequency)}</GridLine>
          <GridLineBig>{note} {octave} {cents >= 0 ? ' +' : ' -'}{Math.abs(cents)}</GridLineBig>
          <GridLine>{Math.floor(cents * 81.92 + 8192)}</GridLine>
      </GridNote>

    )
  }

const CTC = (
) => {
    const [melodyMIDI, setMelodyMIDI] = useState(52);
    const [bassMIDI, setBassMIDI] = useState(48);
    const [gridSize, setGridSize] = useState(9);
    
    const handleMelodyChange = (event) => {
        setMelodyMIDI(event.target.value);
    }
    
    const handleBassChange = (event) => {
        setBassMIDI(event.target.value);
    }
    
    const handleGridSizeChange = (event) => {
        setGridSize(event.target.value);
    }

    return (
        <CTContainer>
            <CTControls>
                <h1>Combination Tone Grid</h1>
                <Label>Upper: {melodyMIDI} {midiToNote(melodyMIDI)} <NoteSlider type="range" min="1" max="108" value={melodyMIDI} class="slider" onChange={handleMelodyChange} id="melodySlider"/></Label>
                <Label>Lower: {bassMIDI} {midiToNote(bassMIDI)} <NoteSlider type="range" min="1" max="108" value={bassMIDI} class="slider" onChange={handleBassChange} id="bassSlider"/></Label>
            </CTControls>
            <CTGrid>
              <CTGridRow>
                <Note frequency={0}/>
                <Note frequency={midiToFrequency(bassMIDI)}/>
                <Note frequency={midiToFrequency(bassMIDI)*2}/>
              </CTGridRow>
              <CTGridRow>
                <Note frequency={midiToFrequency(melodyMIDI)}/>
                <Note frequency={midiToFrequency(bassMIDI)+midiToFrequency(melodyMIDI)}/>
              </CTGridRow>
              <CTGridRow>
                <Note frequency={midiToFrequency(melodyMIDI)*2}/>
              </CTGridRow>
            </CTGrid>
        </CTContainer>
    )
}

export default CTC