export type Part<T> = {
    [P in keyof T]?:
    T[P] extends (infer U)[] ? Part<U>[] :
        T[P] extends object ? Part<T[P]> :
            T[P];
};
