import { useAppSelector } from "../../redux/hooks";
import dayjs from "dayjs";
import { StyledTable, THead, TBody, TH, TR, TD } from "./styles";
import { StyledPagination } from "../Pagination/Pagination";

export const TableWithPagination = () => {
  const absenceState = useAppSelector((state) => state.absences);
  const membersList = useAppSelector((state) => state.members.items);
  const absencesList = absenceState.items;
  const filteredList = absenceState.filteredItems;

  const getNameByUserId = (userId: number) => {
    return membersList.map((member) => {
      return member.userId === userId ? member.name : "";
    });
  };

  const getStatus = (id: number) => {
    let status;
    const found = absencesList.find((absence) => {
      return absence.id === id;
    });
    if (found?.rejectedAt === null && found?.confirmedAt !== null) {
      status = "Confirmed";
    } else if (found?.rejectedAt !== null && found?.confirmedAt === null) {
      status = "Rejected";
    } else {
      status = "Requested";
    }
    return status;
  };

  return (
    <>
      <StyledPagination />
      <StyledTable>
        <THead>
          <TR>
            <TH>Name</TH>
            <TH>Type</TH>
            <TH>From</TH>
            <TH>To</TH>
            <TH>Member Note</TH>
            <TH>Status</TH>
            <TH>Admitter Note</TH>
          </TR>
        </THead>
        <TBody>
          {filteredList.map((member) => (
            <TR key={member.id}>
              <TD>{getNameByUserId(member.userId)}</TD>
              <TD>{member.type}</TD>
              <TD>{dayjs(member.startDate).format("MMM D, YYYY")}</TD>
              <TD>{dayjs(member.endDate).format("MMM D, YYYY")}</TD>
              <TD>{member.memberNote ? member.memberNote : "-"}</TD>
              <TD>{getStatus(member.id)}</TD>
              <TD>{member.admitterNote ? member.admitterNote : "-"}</TD>
            </TR>
          ))}
        </TBody>
      </StyledTable>
    </>
  );
};
