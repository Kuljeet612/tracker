import styled from "styled-components";

export const PaginationContainer = styled.div`
    display:flex;
    justify-content: end;
`
export const PaginationButton = styled.button`
    margin: 1rem;
    width: 6rem;
    height: 2rem;
    font-size: medium;
    border-radius: 6px;
    cursor: pointer;
    border: 2px solid darkgrey;
    text-align: center;
    text-transform: capitalize;
    &:hover {
        transform: scale(1.1);
    }
`