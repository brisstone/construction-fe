import { create } from "zustand";

interface PageState {
  search: string;
  startDate: Date | null;
  endDate: Date | null;
  officeBranch: string[];
  deptSelect: string[];
  status: string[];
  type: string[];
  userIds: string[];
  setSearch: (value: string) => void;
  setStartDate: (value: Date | null) => void;
  setEndDate: (value: Date | null) => void;
  setOfficeBranch: (value: string[]) => void;
  setDeptSelect: (value: string[]) => void;
  setStatus: (value: string[]) => void;
  setType: (value: string[]) => void;
  setUserIds: (value: string[]) => void;
  reset: () => void; // Reset function
}

interface FilterState {
  [key: string]: PageState;
}

export const useFilterState = create<FilterState>(() => ({}));

export const createPageState = (pageKey: string) => {
  useFilterState.setState((prev) => ({
    ...prev,
    [pageKey]: {
      search: "",
      startDate: null,
      endDate: null,
      officeBranch: [],
      deptSelect: [],
      status: [],
      type: [],
      userIds: [],
      setSearch: (value) =>
        useFilterState.setState((state) => ({
          ...state,
          [pageKey]: { ...state[pageKey], search: value },
        })),
      setStartDate: (value: Date | null) =>
        useFilterState.setState((state) => ({
          ...state,
          [pageKey]: { ...state[pageKey], startDate: value },
        })),
      setEndDate: (value: Date | null) =>
        useFilterState.setState((state) => ({
          ...state,
          [pageKey]: { ...state[pageKey], endDate: value },
        })),
      setOfficeBranch: (value: string[]) =>
        useFilterState.setState((state) => ({
          ...state,
          [pageKey]: { ...state[pageKey], officeBranch: value },
        })),
        setDeptSelect: (value: string[]) =>
        useFilterState.setState((state) => ({
          ...state,
          [pageKey]: { ...state[pageKey], deptSelect: value },
        })),
      setStatus: (value: string[]) =>
        useFilterState.setState((state) => ({
          ...state,
          [pageKey]: { ...state[pageKey], status: value },
        })),
      setType: (value: string[]) =>
        useFilterState.setState((state) => ({
          ...state,
          [pageKey]: { ...state[pageKey], type: value },
        })),
      setUserIds: (value: string[]) =>
        useFilterState.setState((state) => ({
          ...state,
          [pageKey]: { ...state[pageKey], userIds: value },
        })),
      reset: () =>
        useFilterState.setState((state) => ({
          ...state,
          [pageKey]: {
            ...state[pageKey],
            officeBranch: [],
            deptSelect: [],
            status: [],
            type: [],
            userIds: [],
            search: "",
            startDate: null,
            endDate: null,
          },
        })),
    },
  }));
};
