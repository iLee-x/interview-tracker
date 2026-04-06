import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Interview, InterviewStatus } from "@/lib/types";
import { loadInterviews, saveInterviews } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

interface InterviewState {
  interviews: Interview[];
  searchQuery: string;
  statusFilter: InterviewStatus | "all";
  isLoaded: boolean;
}

const initialState: InterviewState = {
  interviews: [],
  searchQuery: "",
  statusFilter: "all",
  isLoaded: false,
};

const interviewSlice = createSlice({
  name: "interviews",
  initialState,
  reducers: {
    loadFromStorage(state) {
      state.interviews = loadInterviews();
      state.isLoaded = true;
    },
    addInterview(
      state,
      action: PayloadAction<Omit<Interview, "id" | "createdAt" | "updatedAt">>
    ) {
      const now = new Date().toISOString();
      const newInterview: Interview = {
        ...action.payload,
        id: uuidv4(),
        createdAt: now,
        updatedAt: now,
      };
      state.interviews.unshift(newInterview);
      saveInterviews(state.interviews);
    },
    updateInterview(
      state,
      action: PayloadAction<{ id: string; data: Partial<Interview> }>
    ) {
      const index = state.interviews.findIndex(
        (i) => i.id === action.payload.id
      );
      if (index !== -1) {
        state.interviews[index] = {
          ...state.interviews[index],
          ...action.payload.data,
          updatedAt: new Date().toISOString(),
        };
        saveInterviews(state.interviews);
      }
    },
    deleteInterview(state, action: PayloadAction<string>) {
      state.interviews = state.interviews.filter(
        (i) => i.id !== action.payload
      );
      saveInterviews(state.interviews);
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setStatusFilter(state, action: PayloadAction<InterviewStatus | "all">) {
      state.statusFilter = action.payload;
    },
    importInterviews(state, action: PayloadAction<Interview[]>) {
      state.interviews = action.payload;
      saveInterviews(state.interviews);
    },
  },
});

export const {
  loadFromStorage,
  addInterview,
  updateInterview,
  deleteInterview,
  setSearchQuery,
  setStatusFilter,
  importInterviews,
} = interviewSlice.actions;

export default interviewSlice.reducer;
