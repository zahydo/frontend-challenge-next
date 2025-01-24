export interface User {
    id?: string;
    email: string;
    name: string;
    role: "ADMIN" | "USER";
    createdAt?: string;
    updatedAt?: string;
    activities?: Activity[];
    reports?: FileType[];
}

type ActivityType = "LOGIN" | "PDF_DOWNLOAD";

export interface Activity {
    id?: string;
    title: string;
    type: ActivityType;
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
  