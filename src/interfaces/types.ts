export interface UserType {
    id?: string;
    email: string;
    name: string;
    role: "ADMIN" | "USER";
    createdAt?: string;
    updatedAt?: string;
}

export interface ActivityType {
    id?: string;
    title: string;
    type: string;
    userId: string;
    timestamp?: string;
    details?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface FileType {
    id?: string;
    name: string;
    type: string;
    userId: string;
    url: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface UserActivitySummary {
    id?: string;
    userId: string;
    total_logins?: number;
    total_downloads?: number;
}

export type UserSearchParams = {
    skip?: number;
    take?: number;
    search?: string;
    orderBy?: string;
  };
  