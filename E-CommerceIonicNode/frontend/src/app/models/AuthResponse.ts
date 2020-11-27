export interface AuthResponse {
    user: {
        id: number;
        name: string;
        lastName: string;
        email: string;
        password: string;
        username: string;
        isAdmin: string;
        id_address: number;
    },
    access_token: string
}