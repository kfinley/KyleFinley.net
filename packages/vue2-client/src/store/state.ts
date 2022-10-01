export enum Status {
    "None", "Loading", "Loaded", "Failed"
}

export interface ArticlesState {
    articles: Record<string, string>;
    status: Status
}

export interface AuthState {
  
  status: Status
}
