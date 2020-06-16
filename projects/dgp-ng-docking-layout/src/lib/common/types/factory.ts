/**
 * Class whose jobs is to create objects based on
 * passed payload that can have any form.
 */
export abstract class Factory<T> {

    /**
     * Create one object
     * @param payload
     * @returns {T}
     */
    abstract createOne(...payload: any[]): T;

}