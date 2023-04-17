export interface ObjectTree {
    contentItems: ObjectTree[];

    callDownwards(functionName: string,
                  functionArguments?: any[],
                  bottomUp?: boolean,
                  skipSelf?: boolean): void;
}
