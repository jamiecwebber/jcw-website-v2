import { StyledCTGrid, GridRow, GridNote } from './CombinationToneMap.elements'

export const CTGrid = ( { leftMIDI, rightMIDI, gridSize } ) => {

    console.log(gridSize);
    var loopArray = [...Array(gridSize).keys()];
    console.log(loopArray);

    return (
        <StyledCTGrid>
            {
                loopArray.map((i)=>{
                    return (
                        <GridRow>
                            {
                            loopArray.map((j)=>{
                                return (
                                    <GridNote>
                                        { i } { j }
                                    </GridNote>
                                    )
                                })
                            }
                        </GridRow>
                    )
                })

            }
        </StyledCTGrid>
    )
}
