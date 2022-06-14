import { useAppSelector } from '../redux/hooks'
import { TableWithPagination } from '../components/Table/AbsencesTable';
import { DatePicker } from '../components/DatePicker/DatePicker';
import { VacationTypeDropdown } from '../components/Dropdown/VacationType';
import { H3 } from '../components/CountHeader/H3';
import { MainContainer, FilterContainer, TableContainer } from '../styles';
import { NO_RECORD_FOUND } from '../constants';

export const AbsencesList = () => {
    const absenceState = useAppSelector((state) => state.absences);
    const allAbsences = absenceState.items;
    const filteredAbsences = absenceState.filteredItems;

    const getVacationTypes = ():string[] => {
        const vacationTypes = [(allAbsences.slice().map((item) => item.type))];
        return (["all", ...new Set(...vacationTypes)])
    };

    return (
        <MainContainer>
            <H3 label="Total Records:" value={allAbsences.length}></H3>
            <FilterContainer>
                <VacationTypeDropdown typeOptions={getVacationTypes()} />
                <DatePicker />
            </FilterContainer>
            <TableContainer>
                {filteredAbsences.length !== 0 ? <TableWithPagination /> : <H3 label={NO_RECORD_FOUND} value=""></H3>}
            </TableContainer>
        </MainContainer>

    )
}