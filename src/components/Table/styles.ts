import styled from "styled-components";
import { styleVariables } from "../../variables";

export const StyledTable = styled.table`
    width: 100%;
    min-height: 30rem;
    border-collapse: collapse;
    text-align: center;
    border-radius: ${styleVariables.borderRadius};
    overflow: hidden;
    background: ${styleVariables.invertedPrimary};
`
export const THead = styled.thead`
    position: sticky;
    z-index: 100;

`
export const TH = styled.th`
    font-weight: normal;
    padding: ${styleVariables.smSpacing};
    color: ${styleVariables.primary};
    text-transform: capitalize;
    font-weight: 600;
    font-size: 18px;
`

export const TR = styled.tr`

`

export const TD = styled.td`
    background: rgb(237,237,237);
    width: 12rem;
    height: 3rem;
    font-weight: 500;
    border-bottom: 1px solid lightgrey;
    text-transform: capitalize;
`

export const TBody = styled.tbody`

`