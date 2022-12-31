import { Socket } from "../types";

export enum RegistrationStatus {
  Unknown = 'Unknown',
  Failed = 'Failed',
  Registered = 'Registered',
  Registering = 'Registering',
  Success = 'Success'
}
export enum Status {
  None = "None",
  Loading = "Loading",
  Loaded = "Loaded",
  Failed = "Failed",
  Authenticated = "Authenticated",
  Authenticating = "Authenticating"
}

export interface ArticlesState {
  articles: Record<string, string>;
  status: Status;
}

export interface AuthState {
  status: Status;
  user: string;
  access_token: string;
}

export enum WebSocketsStatus {
  "None", "Connected", "Disconnected", "Failed"
}

export interface WebSocketsState {
  status: WebSocketsStatus;
  socket?: Socket;
}

export interface GitHubState {
  sources: Record<string, string>;
  status: Status;
}
