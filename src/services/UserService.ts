import { UserSearchParams, UserType } from "../interfaces/types";

class UserServiceClient {
    private static instance: UserServiceClient;
    private readonly API_URL = `${process.env.NEXT_PUBLIC_BACK_END_API_URL}/users`;
    private constructor() { }

    public static getInstance(): UserServiceClient {
        if (!UserServiceClient.instance) {
            UserServiceClient.instance = new UserServiceClient();
        }

        return UserServiceClient.instance;
    }

    public async getUsers(params?: UserSearchParams): Promise<UserType[]> {
        const url = new URL(this.API_URL);
        if (params) {
            Object.keys(params).forEach(key => {
                const value = params[key as keyof UserSearchParams];
                if (value !== undefined) {
                    url.searchParams.append(key, value.toString());
                }
            });
        }
        return fetch(url).then((response) => response.json());
    }

    public async createUser(user: UserType): Promise<UserType> {
        return fetch(this.API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }).then((response) => response.json());
    }

    public async updateUser(user: UserType): Promise<UserType> {
        return fetch(`${this.API_URL}/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }).then((response) => response.json());
    }

    public async deleteUser(id: string): Promise<void> {
        return fetch(`${this.API_URL}/${id}`, {
            method: "DELETE",
        }).then((response) => response.json());
    }
};

export default UserServiceClient;