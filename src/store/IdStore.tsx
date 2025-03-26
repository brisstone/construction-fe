import { create } from "zustand";

interface IdState {
  budgetId: string;
  projectId: string;
  setBudgetId: (id: string) => void;
  setProjectId: (id: string) => void;
}

const getInitialState = (): IdState => {
  const budgetId = localStorage.getItem("budgetId") || "";
  const projectId = localStorage.getItem("projectId") || "";
  return {
    budgetId,
    projectId,
    setBudgetId: (id: string) => {console.log(id)},
    setProjectId: (id: string) => {console.log(id)},
  };
};

export const useIdStore = create<IdState>((set) => ({
  ...getInitialState(),
  setBudgetId: (id: string) => {
    localStorage.setItem("budgetId", id);
    set({ budgetId: id });
  },
  setProjectId: (id: string) => {
    localStorage.setItem("projectId", id);
    set({ projectId: id });
  },
}));
