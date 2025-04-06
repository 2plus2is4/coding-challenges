import {LoadBalanceAlgorithm} from "../models/loadBalanceAlgorithm";

export class RoundRobin<T> implements LoadBalanceAlgorithm<T> {
    list: Array<T> = [];
    private index: number = 0;

    elect(): T | null {
        if (this.list.length === 0) return null;

        const elected = this.list[this.index];
        this.index = (this.index + 1) % this.list.length;
        return elected;
    }
}