export interface RegisterObserver {
    onRegisterSuccess(): void;
    onError(message?: string): void;
    onLoading(loading: boolean): void;
}