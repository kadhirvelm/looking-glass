import { TypedReducer } from "redoodle";

export interface IApplicationState {}

export const applicationReducer = TypedReducer.builder<IApplicationState>().build();
