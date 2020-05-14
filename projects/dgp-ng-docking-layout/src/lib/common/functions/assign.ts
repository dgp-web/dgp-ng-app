import { AssignmentStrategy, RecursivePartial } from "../types";
import * as _ from "lodash";

export function assign<T>(a: RecursivePartial<T>, b: RecursivePartial, assignmentStrategy: AssignmentStrategy = AssignmentStrategy.Assign): T {
    if (assignmentStrategy === AssignmentStrategy.Assign) {
        return Object.assign(a, b);
    } else {
        return _.merge(a, b);
    }
}

/*
export function assign<T>(a: RecursivePartial<T>, b: RecursivePartial, c: RecursivePartial, assignmentStrategy: AssignmentStrategy = AssignmentStrategy.Assign): T {
    if (assignmentStrategy === AssignmentStrategy.Assign) {
        return Object.assign(a, b, c);
    } else {
        return _.merge(a, b, c);
    }
}*/
