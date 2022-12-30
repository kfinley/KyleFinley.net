import { Socket } from "../types";

export enum Status {
  "None", "Loading", "Loaded", "Failed", "Authenticated", "Authenticating"
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
