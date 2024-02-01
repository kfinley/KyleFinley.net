import { Socket } from "../types";
import { Song } from "@kylefinley.net/songbook/src/types";

export enum RegistrationStatus {
  Unknown = 'Unknown',
  Failed = 'Failed',
  Registered = 'Registered',
  Registering = 'Registering',
  Success = 'Success'
}

export enum AuthStatus {
  Authenticated = "Authenticated",
  Authenticating = "Authenticating"
}

export enum Status {
  None = "None",
  Loading = "Loading",
  Loaded = "Loaded",
  Failed = "Failed",
}

export interface ArticlesState {
  articles: Record<string, string>;
  status: Status;
}

export interface AuthState {
  status: AuthStatus | Status;
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

export enum SongBookStatus {
}

export interface SongBookState {
  songs: Song[] | null;
  status: Status;
}
