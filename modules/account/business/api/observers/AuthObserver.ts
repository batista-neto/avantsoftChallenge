export interface AuthObserver {
    onLoginSuccess?: (token: string) => void;
    onLogoutSuccess?: () => void;
    onError: (error: string) => void;
    onLoading: (isLoading: boolean) => void;
}