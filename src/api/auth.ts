import { apiClient } from './client';

interface AuthResponse {
    token: string;
    user: {
        id: number;
        name?: string;
        businessName?: string;
        email: string;
        phone?: string;
        category?: string;
        type: 'customer' | 'vendor';
    };
}

export async function customerSignup(data: {
    name: string;
    email: string;
    phone: string;
    password: string;
}): Promise<AuthResponse> {
    return apiClient<AuthResponse>('/auth/customer/signup', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function customerLogin(data: {
    email: string;
    password: string;
}): Promise<AuthResponse> {
    return apiClient<AuthResponse>('/auth/customer/login', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function vendorSignup(data: {
    businessName: string;
    email: string;
    phone: string;
    password: string;
    category: string;
}): Promise<AuthResponse> {
    return apiClient<AuthResponse>('/auth/vendor/signup', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function vendorLogin(data: {
    email: string;
    password: string;
}): Promise<AuthResponse> {
    return apiClient<AuthResponse>('/auth/vendor/login', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}
