// https://stackoverflow.com/questions/42919469/efficient-way-to-implement-priority-queue-in-javascript

const top = 0;
const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;

export interface Prioritized<T> {
    priority: number;
    value: T;
}

export type PrioritizationFunc<T> = (a: Prioritized<T>, b: Prioritized<T>) => boolean;

export const prioritizeLowest: PrioritizationFunc<any> = (a, b) => a.priority < b.priority;
export const prioritizeHighest: PrioritizationFunc<any> = (a, b) => a.priority > b.priority;

export class PriorityQueue<T> {

    _heap = [];
    _comparator: ((a: Prioritized<T>, b: Prioritized<T>) => boolean);

    constructor(comparator: PrioritizationFunc<T> = prioritizeLowest) {
        this._heap = [];
        this._comparator = comparator;
    }

    size(): number {
        return this._heap.length;
    }

    isEmpty(): boolean {
        return this.size() === 0;
    }

    peek(): Prioritized<T> {
        return this._heap[top];
    }

    push(...values: Prioritized<T>[]): number {
        values.forEach(value => {
            this._heap.push(value);
            this._siftUp();
        });
        return this.size();
    }

    pop(): Prioritized<T> {
        const poppedValue = this.peek();
        const bottom = this.size() - 1;
        if (bottom > top) {
            this._swap(top, bottom);
        }
        this._heap.pop();
        this._siftDown();
        return poppedValue;
    }

    replace(value): Prioritized<T> {
        const replacedValue = this.peek();
        this._heap[top] = value;
        this._siftDown();
        return replacedValue;
    }

    _greater(i, j): boolean {
        return this._comparator(this._heap[i], this._heap[j]);
    }

    _swap(i, j): void {
        [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
    }

    _siftUp(): void {
        let node = this.size() - 1;
        while (node > top && this._greater(node, parent(node))) {
            this._swap(node, parent(node));
            node = parent(node);
        }
    }

    _siftDown(): void {
        let node = top;
        while (
            (left(node) < this.size() && this._greater(left(node), node)) ||
            (right(node) < this.size() && this._greater(right(node), node))
            ) {
            const maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
            this._swap(node, maxChild);
            node = maxChild;
        }
    }
}