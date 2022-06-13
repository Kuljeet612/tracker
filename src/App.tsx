import { useEffect, useState } from "react";
import { AppContainer } from "./styles";
import { H3 } from "./components/CountHeader/H3";
import { LOADING_MSG, ERROR_MSG } from "./constants";
import { AbsencesList } from "./features/Absences";

export const App = () => { 
  const [absences, setAbsences] = useState([]);
  const [members, setMembers] = useState([]);
  const [status, setStatus] = useState('');

  const fetchAbsences = async() => {
    setStatus("loading")
    const response = await fetch('http://localhost:3300/absences');
      if (response.ok) {
      setStatus("success")
      const result = await response.json(); 
      setAbsences(result.absences.payload);
    } else {
      setStatus("failed")
      const error: any = new Error(
        `Error ${response.status}: ${response.statusText}`
      );
      error.response = response;
      throw error;
    }
  }

  const fetchMembers = async() => {
    const response = await fetch('http://localhost:3300/members');
    if (response.ok) {
      const result = await response.json();      
      setMembers(result.members.payload);
    } else {
      const error: any = new Error(
        `Error ${response.status}: ${response.statusText}`
      );
      error.response = response;
      throw error;
    }
  }

  useEffect(() => { 
    fetchMembers();
    fetchAbsences();
  }, []);

  return (
    <AppContainer>
      {status === "loading" && <H3 label={LOADING_MSG} value="" />}
      {status === "success" && <AbsencesList absences={absences} members={members}/>}
      {status === "failed" && <H3 label={ERROR_MSG} value="" />}
    </AppContainer>
  );
};
