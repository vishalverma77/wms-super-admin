import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../modules/auth/slice";
import trialUsersReducer from "../modules/trial-users/slice";
import overviewReducer from "../modules/overview/slice";
import landingReducer from "../modules/landing/slice";
import trafficReducer from "../modules/traffic/slice";
import eventsReducer from "../modules/events/slice";
import plansReducer from "../modules/plans/slice";

export const rootReducer = combineReducers({
  auth: authReducer,
  trialUsers: trialUsersReducer,
  overview: overviewReducer,
  landing: landingReducer,
  traffic: trafficReducer,
  events: eventsReducer,
  plans: plansReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
