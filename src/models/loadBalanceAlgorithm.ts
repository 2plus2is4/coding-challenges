export interface LoadBalanceAlgorithm<T> {
    list: Array<T>;
    elect(): T | null;
}