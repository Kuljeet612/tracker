import { useRef } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { filterByType } from "../../redux/reducers/AbsencesSlice";
import {
  StyledDropdownContainer,
  StyledDropdown,
  StyledOption,
} from "./styles";
import { StyledLabel } from "../../styles";

type VacationTypeProps = {
  typeOptions: string[]
}

export const VacationTypeDropdown = ({ typeOptions }: VacationTypeProps): JSX.Element => {
  const inputRef = useRef<HTMLSelectElement>(document.createElement("select"));
  const dispatch = useAppDispatch();

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    dispatch(filterByType(inputRef.current.value));
  };

  return (
    <StyledDropdownContainer>
      <StyledLabel htmlFor="selectId">Type</StyledLabel>
      <StyledDropdown
        data-testid="selectId"
        id="selectId"
        ref={inputRef}
        onChange={selectHandler}
        title="Select Vacation Type"
        aria-label="vacation type"
      >
        {typeOptions.map((option: string, index: number) => (
          <StyledOption key={index} value={option} data-testid="select-option">
            {option}
          </StyledOption>
        ))}
      </StyledDropdown>
    </StyledDropdownContainer>
  );
};
