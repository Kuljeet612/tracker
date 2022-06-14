import reducer, { filterByType, fetchMore, fetchPrevious, fetchAbsences } from '../../redux/reducers/AbsencesSlice';
import { store } from '../../redux/store';

interface Absence {
  admitterNote: string
  confirmedAt: any
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

interface AbsencesState {
  items: Absence[],
  filteredItems: Absence[],
  status: 'loading' | 'success' | 'failed'
  filterBy: string,
  startIndex: number,
  endIndex: number
}

const initialState = { "filterBy": "all", "filteredItems": [], "endIndex": 10, "startIndex": 0, "items": [], "status": "loading" } as AbsencesState;

describe("Absences Reducer", () => {

  test('should return the initial state', () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  })

  
  test('should set status to loading when fetchAbsences is pending', () => {
    const action = { type: fetchAbsences.pending.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({ "filterBy": "all", "filteredItems": [], "endIndex": 10, "startIndex": 0, "items": [], "status": "loading" });
  });

  test('should set status to success and verify other state values when fetchAbsences is fulfilled', () => {
    let payload = [
      {
        admitterId: null,
        admitterNote: "",
        confirmedAt: "2020-12-12T18:03:55.000+01:00",
        createdAt: "2020-12-12T14:17:01.000+01:00",
        crewId: 352,
        endDate: "2021-01-13",
        id: 2351,
        memberNote: "",
        rejectedAt: null,
        startDate: "2021-01-13",
        type: "sickness",
        userId: 2664
      },
      {
        admitterId: null,
        admitterNote: "Sorry",
        confirmedAt: null,
        createdAt: "2021-01-03T17:36:52.000+01:00",
        crewId: 352,
        endDate: "2021-01-05",
        id: 2521,
        memberNote: "ganzer tag",
        rejectedAt: "2021-01-03T17:39:50.000+01:00",
        startDate: "2021-01-05",
        type: "vacation",
        userId: 2664
      }
    ]
    const action = { type: fetchAbsences.fulfilled.type, payload: payload };
    const state = reducer(initialState, action);
    expect(state).toEqual({ "filterBy": "all", "filteredItems": payload, "endIndex": 10, "startIndex": 0, "items": payload, "status": "success" });
    expect(state.status).toEqual("success");
    expect(state.items).toHaveLength(2);
    expect(state.items).toEqual(payload);
    expect(state.filteredItems).toEqual(payload);
    store.dispatch(filterByType('sickness'));    
  });

  test('should set status to failed when fetchAbsences is rejected', () => {
    const action = { type: fetchAbsences.rejected.type, payload: { error: 'some error' } };
    const state = reducer(initialState, action);
    expect(state.status).toEqual("failed");
    expect(state.items).toHaveLength(0);
  });

  test('should test filterBy reducer by setting filterBy to the value dispatched', () => {
    expect(reducer(initialState, filterByType('vacation'))).toEqual(
      { "filterBy": "vacation", "filteredItems": [], "endIndex": 10, "startIndex": 0, "items": [], "status": "loading" }
    )
  })

  test('should test fetchMore reducer and increment startIndex and endIndex indexes by 10 to view next 10 records', () => {
    let initialState: AbsencesState = { "filterBy": "all", "filteredItems": [], "endIndex": 10, "startIndex": 0, "items": [], "status": "loading" }
    expect(reducer(initialState, fetchMore())).toEqual(
      { "filterBy": "all", "filteredItems": [], "endIndex": 20, "startIndex": 10, "items": [], "status": 'loading' }
    )
  })

  test('should test fetchPrevious reducer and decrement startIndex and endIndex indexes by 10 to view last 10 records', () => {
    let initialState: AbsencesState = { "filterBy": "all", "filteredItems": [], "endIndex": 20, "startIndex": 10, "items": [], "status": "loading" }
    expect(reducer(initialState, fetchPrevious())).toEqual(
      { "filterBy": "all", "filteredItems": [], "endIndex": 10, "startIndex": 0, "items": [], "status": 'loading' }
    )
  })

  test('should set type to sickness', () => {
    let initialState: AbsencesState = { "filterBy": "vacation", "filteredItems": [], "endIndex": 10, "startIndex": 0, "items": [], "status": "loading" }
    expect(reducer(initialState, filterByType('sickness'))).toEqual(
      { "filterBy": "sickness", "filteredItems": [], "endIndex": 10, "startIndex": 0, "items": [], "status": 'loading' }
    )
  })
})

