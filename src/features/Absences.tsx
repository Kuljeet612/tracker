import dayjs from "dayjs";
import { H3 } from '../components/CountHeader/H3';
import { MainContainer, TableContainer, StyledTable, THead, TBody, TH, TR, TD } from '../styles';
import { NO_RECORD_FOUND } from '../constants';

interface Absence {
    admitterNote: string
    confirmedAt: string | null
    createdAt: string
    crewId: number
    endDate: string
    id: number
    memberNote: string
    rejectedAt: string
    startDate: string
    type: string
    userId: number
}

interface Member {
    crewId: number
    id: number
    image: string
    name: string
    userId: number
}

type AbsencesProps = {
    absences: Absence[]
    members: Member[]
}

export const AbsencesList = ({ absences, members }: AbsencesProps) => {

    const getNameByUserId = (userId: number) => {
        return members.map((member) => {
          return member.userId === userId ? member.name : "";
        });
      };
    
      const getStatus = (id: number) => {
        let status;
        const found = absences.find((absence) => {
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
            <MainContainer>
                <H3 label="Total Records:" value={absences.length}></H3>
            </MainContainer>
            <TableContainer>
                {absences.length !== 0 ? <StyledTable>
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
          {absences.map((absence) => (
            <TR key={absence.id}>
              <TD>{getNameByUserId(absence.userId)}</TD>
              <TD>{absence.type}</TD>
              <TD>{dayjs(absence.startDate).format("MMM D, YYYY")}</TD>
              <TD>{dayjs(absence.endDate).format("MMM D, YYYY")}</TD>
              <TD>{absence.memberNote ? absence.memberNote : "-"}</TD>
              <TD>{getStatus(absence.id)}</TD>
              <TD>{absence.admitterNote ? absence.admitterNote : "-"}</TD>
            </TR>
          ))}
        </TBody>
      </StyledTable> :
                 <H3 label={NO_RECORD_FOUND} value=""></H3>}
        </TableContainer>
        </>
    )
}