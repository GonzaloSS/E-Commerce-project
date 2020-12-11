export interface AuthResponse {
    user: {
        id: number;
        name: string;
        lastName: string;
        email: string;
        password: string;
        username: string;
        isAdmin: boolean;
        id_address: number;
    },
    access_token: string
}