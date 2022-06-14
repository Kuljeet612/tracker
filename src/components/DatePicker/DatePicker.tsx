import React from "react";
import { useAppDispatch } from "../../redux/hooks";
import { filterByDate } from "../../redux/reducers/AbsencesSlice";
import { StyledDatePickerContainer, StyledDatePicker } from "./styles";
import { StyledLabel } from "../../styles";

export const DatePicker = () => {
  const dispatch = useAppDispatch();

  const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedVal = event.target.value;
    dispatch(filterByDate(selectedVal));
  };

  return (
    <StyledDatePickerContainer>
      <div className="col-sm-12 my-2">
        <StyledLabel htmlFor="startDate">From Date</StyledLabel>
        <StyledDatePicker
          type="date"
          className="form-control"
          id="startDate"
          title="Select a from date"
          aria-label="from date"          
          onChange={handleFromDateChange}
        />
      </div>
    </StyledDatePickerContainer>
  );
};
