export interface ObjectTree {
    contentItems: ObjectTree[];

    callLifecycleHookDownwards(functionName: string,
                               functionArguments?: any[],
                               bottomUp?: boolean,
                               skipSelf?: boolean): void;

    callLifecycleHookUpwards(functionName: string,
                             functionArguments?: any[],
                             bottomUp?: boolean,
                             skipSelf?: boolean): void;
}
