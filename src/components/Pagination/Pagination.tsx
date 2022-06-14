import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchPrevious, fetchMore } from "../../redux/reducers/AbsencesSlice";
import { PaginationContainer, PaginationButton } from "./styles";

export const StyledPagination = () => {
  const dispatch = useAppDispatch();
  const absencesState = useAppSelector((state) => state.absences);

  const totalItems = absencesState.items;
  const startIndex = absencesState.startIndex;
  const lastIndex = absencesState.endIndex;
  const isFirstPage = startIndex === 0;
  const isLastPage = lastIndex > totalItems.length;

  return (
    <PaginationContainer>
      {!isFirstPage && (
        <PaginationButton
          onClick={() => dispatch(fetchPrevious())}
          title="Go to previous page"
          aria-label="previous"
        >
          Previous
        </PaginationButton>
      )}
      {!isLastPage && (
        <PaginationButton
          onClick={() => dispatch(fetchMore())}
          title="Go to next page"
          aria-label="next"
        >
          Next
        </PaginationButton>
      )}
    </PaginationContainer>
  );
};
