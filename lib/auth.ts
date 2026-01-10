import api from "./api";

/**
 * Define all database colum names (User Model data)
 */
export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

/**
 * Only the data that's needed to add data to the database. 
 * In this case everything that's defined within the $fillable[] within the Laravel app
 */
export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface LoginData {
    email: string;
    password: string;
}

class AuthService {
    async csrf() {
        return api.get('/sanctum/csrf-cookie');
    }

    async register(data: RegisterData) {
        await this.csrf();
        return api.post<{user: User; message: string}>('/register', data);
    }

    async login(data: LoginData) {
        await this.csrf();

        await new Promise(resolve => setTimeout(resolve, 1000));
        return api.post<{user: User; message: string}>('/login', data);
    }

    async logout() {
        return api.post('api/logout');
    }

    async getUser() {
        return api.get<User>('/user');
    }
}

export default new AuthService();