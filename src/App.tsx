import { useEffect } from "react";
import { AppContainer } from "./styles";
import { AbsencesList } from "./features/Absences";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { fetchAbsences } from "./redux/reducers/AbsencesSlice";
import { fetchMembers } from "./redux/reducers/MembersSlice";
import { H3 } from "./components/CountHeader/H3";
import { LOADING_MSG, ERROR_MSG } from "./constants";

export const App = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.absences.status);

  useEffect(() => {
    dispatch(fetchMembers());
    dispatch(fetchAbsences());
  }, [dispatch]);

  return (
    <AppContainer>
      {status === "loading" && <H3 label={LOADING_MSG} value="" />}
      {status === "success" && <AbsencesList />}
      {status === "failed" && <H3 label={ERROR_MSG} value="" />}
    </AppContainer>
  );
};
