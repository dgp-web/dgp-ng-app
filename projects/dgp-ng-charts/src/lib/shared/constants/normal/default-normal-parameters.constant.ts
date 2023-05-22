import { NormalParameters } from "../../models";

export const defaultNormalParameters: NormalParameters = {
    /**
     * The axis scale uses a distribution with median 0 which helps us with computing regular distances
     * in both directions. p of 0.5 results in 0 which should be the middle of the range.
     */
    median: 0,
    /**
     * We can use the variance included in the data or 1 which makes us work with the standard normal distribution.
     */
    variance: 1
};
