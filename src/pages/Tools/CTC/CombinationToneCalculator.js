import { useState, useEvent } from 'react'
import { CTControls , CTGrid, CTContainer, NoteSlider, Label } from './CombinationToneCalculator.elements'

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
    let midicents = frequencyToMidicents(frequency);
    
    let cents = Math.round(midicents % 100);
    if (cents >= 50) cents -= 100;
    
    let semitone = Math.round(midicents / 100);
    let octave = Math.floor(semitone/12) - 1;
    let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    let note = notes[semitone % 12];
    
    return (
      <div className='noteContainer'>
        <div className='frequency'>{Math.floor(frequency)}</div>
        <div className='note'>{note}</div>
        <div className='cents'>
          {cents >= 0 ? ' +' : ' -'}{Math.abs(cents)}
        </div>
        <div className='octave'>{octave}</div>
      </div>
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
                <Label>Melody: {melodyMIDI} {midiToNote(melodyMIDI)} <NoteSlider type="range" min="1" max="108" value={melodyMIDI} class="slider" onChange={handleMelodyChange} id="melodySlider"/></Label>
                <Label>Bass: {bassMIDI} {midiToNote(bassMIDI)} <NoteSlider type="range" min="1" max="108" value={bassMIDI} class="slider" onChange={handleBassChange} id="bassSlider"/></Label>

            
            </CTControls>
            <CTGrid>

            </CTGrid>
        </CTContainer>
    )
}

export default CTC