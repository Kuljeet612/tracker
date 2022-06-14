import { useAppSelector } from '../redux/hooks';
import { H3 } from '../components/CountHeader/H3';
import { TableWithPagination } from '../components/Table/AbsencesTable';
import { MainContainer, TableContainer } from '../styles';
import { NO_RECORD_FOUND } from '../constants';

export const AbsencesList = () => {
    const absenceState = useAppSelector((state) => state.absences);
    const allAbsences = absenceState.items;
    const filteredAbsences = absenceState.filteredItems;

    return (
        <MainContainer>
            <H3 label="Total Records:" value={allAbsences.length}></H3>          
            <TableContainer>
                {filteredAbsences.length !== 0 ? <TableWithPagination /> : <H3 label={NO_RECORD_FOUND} value=""></H3>}
            </TableContainer>
        </MainContainer>

    )
}