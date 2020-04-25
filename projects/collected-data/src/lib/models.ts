import { EntityStateMap } from "entity-store";

export interface CollectedAttribute {
    readonly collectedAttributeId: string;
}

export interface CollectionConfig {
    readonly collectionConfigId: string;
}

/**
 * Represents an event at which data have been collected
 * - for an attribute
 * - of a target
 * - with a particular configuration
 * - and at a specified time
 *
 * This event may include
 * - the actually recorded values
 * - a summary of those values
 */
export interface CollectedData {
    readonly collectedDataId: string;

    // references to related meta data
    readonly collectedAttributeId: string;  // WHAT aspect of the target under the specified config is collected?
    readonly collectionConfigId: string;    // HOW are data collected?
    readonly collectionTargetId: string;    // For WHOM are data collected?
    readonly collectionTimeId: string;      // WHEN are data collected?

    // references to raw and summarized values
    readonly collectedDataSummaryId?: string;
    readonly collectedDataValuesId?: string;
}

export interface CollectedDataEntities {
    readonly collectedData: CollectedData;

    readonly collectedAttribute: CollectedAttribute;
    readonly collectionConfig: CollectionConfig;
    readonly collectionTarget: CollectionTarget;
    readonly collectionTime: CollectionTime;

    readonly collectedDataSummary: CollectedDataSummary;
    readonly collectedDataValues: CollectedDataValues;
}

export interface CollectedDataState extends EntityStateMap<CollectedDataEntities> {
}

export interface CollectedDataSummary {
    readonly collectedDataSummaryId: string;
}

export interface CollectedDataValues<ValueStructure = ReadonlyArray<number>> {
    readonly collectedDataValuesId: string;
    readonly values: ValueStructure;
}

export type CollectedDataStoreFeature = "CollectedData";
export const collectedDataStoreFeature: CollectedDataStoreFeature = "CollectedData";

export interface CollectionTime {
    readonly collectionTimeId: string;
}

export interface CollectionTarget<TargetStructure = ReadonlyArray<number>> {
    readonly collectionTargetId: string;
    readonly structure: TargetStructure;
}

