import { TypedReducer } from "redoodle";

export interface IInterfaceState {}

export const interfaceReducer = TypedReducer.builder<IInterfaceState>().build();
