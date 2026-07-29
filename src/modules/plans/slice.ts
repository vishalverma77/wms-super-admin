import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PlanItem, PlansState, UpdatePlanPayload } from "./types";

const initialState: PlansState = {
  plans: [],
  loading: false,
  error: null,
  updating: false,
  updateSuccess: false,
};

const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    fetchPlansRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPlansSuccess: (state, action: PayloadAction<PlanItem[]>) => {
      state.loading = false;
      state.plans = Array.isArray(action.payload) ? action.payload : [];
    },
    fetchPlansFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePlanRequest: (state, action: PayloadAction<UpdatePlanPayload>) => {
      state.updating = true;
      state.updateSuccess = false;
      state.error = null;
      if (action.payload && action.payload.isPopular && Array.isArray(state.plans)) {
        state.plans.forEach((p) => {
          if (p.id === action.payload.id || p.name === action.payload.name) {
            p.isPopular = true;
          } else {
            p.isPopular = false;
          }
        });
      } else if (action.payload && action.payload.isPopular === false && Array.isArray(state.plans)) {
        state.plans.forEach((p) => {
          if (p.id === action.payload.id || p.name === action.payload.name) {
            p.isPopular = false;
          }
        });
      }
    },
    updatePlanSuccess: (state, action: PayloadAction<PlanItem>) => {
      state.updating = false;
      state.updateSuccess = true;
      if (action.payload && action.payload.id && Array.isArray(state.plans)) {
        const index = state.plans.findIndex((p) => p && p.id === action.payload.id);
        if (index !== -1) {
          state.plans[index] = { ...state.plans[index], ...action.payload };
        }
        if (action.payload.isPopular) {
          state.plans.forEach((p) => {
            if (p.id !== action.payload.id && p.name !== action.payload.name) {
              p.isPopular = false;
            }
          });
        }
      }
    },
    updatePlanFailure: (state, action: PayloadAction<string>) => {
      state.updating = false;
      state.error = action.payload;
    },
    clearUpdateSuccess: (state) => {
      state.updateSuccess = false;
    },
  },
});

export const {
  fetchPlansRequest,
  fetchPlansSuccess,
  fetchPlansFailure,
  updatePlanRequest,
  updatePlanSuccess,
  updatePlanFailure,
  clearUpdateSuccess,
} = plansSlice.actions;

export default plansSlice.reducer;
