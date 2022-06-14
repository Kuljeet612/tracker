import styled from "styled-components";
import { styleVariables } from "../../variables";

export const StyledDropdownContainer = styled.div`
    display: flex;
    align-items: center;
    color: ${styleVariables.primary};
    font-size: ${styleVariables.largeFont};    
`
export const StyledDropdown = styled.select`
    margin: 1rem;
    width: 8rem;
    height: 2rem;
    cursor: pointer;
    font-size: ${styleVariables.mediumFont};
    border-radius: ${styleVariables.borderRadius};
    border: ${styleVariables.inputBorder};
    text-align: center;
    text-transform: capitalize;
`
export const StyledOption = styled.option`
    margin: 0.5rem 1rem;    
    height: 3rem;        
    text-transform: capitalize;
    cursor: pointer;
    font-size: ${styleVariables.largeFont};
    border-radius: ${styleVariables.borderRadius}; 
    border: ${styleVariables.inputBorder};
`

