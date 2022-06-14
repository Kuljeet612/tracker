import styled from "styled-components";
import { styleVariables } from "../../variables";

export const StyledDatePickerContainer = styled.div`
    display: flex;
    font-size: ${styleVariables.largeFont};
    color: ${styleVariables.primary};
`

export const StyledDatePicker = styled.input`
    margin: 1rem;
    width: 8rem;
    height: 2rem;
    font-size: ${styleVariables.mediumFont};
    border-radius: ${styleVariables.borderRadius};
    cursor: pointer;
    border: 2px solid darkgrey;
    text-align: center;
`