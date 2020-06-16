/**
 * Describes how attributes are assigned to objects.
 */
export enum AssignmentStrategy {
    /**
     * Object.assign()
     */
    Assign,
    /**
     * _.merge()
     */
    Merge
}