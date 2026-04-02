import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: number;
    name?: string;
    businessName?: string;
    email: string;
    phone?: string;
    category?: string;
    type: 'customer' | 'vendor';
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    userType: 'customer' | 'vendor' | null;
    login: (token: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    isAuthenticated: false,
    userType: null,
    login: () => { },
    logout: () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Restore auth state from localStorage
        const savedToken = localStorage.getItem('celebrate_token');
        const savedUser = localStorage.getItem('celebrate_user');
        if (savedToken && savedUser) {
            try {
                setToken(savedToken);
                setUser(JSON.parse(savedUser));
            } catch {
                localStorage.removeItem('celebrate_token');
                localStorage.removeItem('celebrate_user');
            }
        }
    }, []);

    const login = (newToken: string, newUser: User) => {
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem('celebrate_token', newToken);
        localStorage.setItem('celebrate_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('celebrate_token');
        localStorage.removeItem('celebrate_user');
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isAuthenticated: !!token,
            userType: user?.type || null,
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
