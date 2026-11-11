import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type TaskView = "list" | "kanban";

type UiPreferencesState = {
  sidebarCollapsed: boolean;
  taskView: TaskView;
};

const initialState: UiPreferencesState = {
  sidebarCollapsed: false,
  taskView: "list"
};

const uiPreferencesSlice = createSlice({
  name: "uiPreferences",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setTaskView(state, action: PayloadAction<TaskView>) {
      state.taskView = action.payload;
    }
  }
});

export const { toggleSidebar, setTaskView } = uiPreferencesSlice.actions;
export default uiPreferencesSlice.reducer;
