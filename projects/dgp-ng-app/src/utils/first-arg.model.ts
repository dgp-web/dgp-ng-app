export type FirstArg<T extends Function> = T extends (payload: infer U) => any ? U : never;
