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
    readonly collectedAttributeId: string;
    readonly collectionConfigId: string;
    readonly collectionTargetId: string;
    readonly collectionTimeId: string;

    // references to raw and summarized values
    readonly collectedDataSummaryId?: string;
    readonly collectedDataValuesId?: string;
}

export interface CollectedDataSummary {
    readonly collectedDataSummaryId: string;
}

export interface CollectedDataValues<ValueStructure = ReadonlyArray<number>> {
    readonly collectedDataValuesId: string;
    readonly values: ValueStructure;
}

export interface CollectionTime {
    readonly collectionTimeId: string;
}

export interface CollectionTarget<TargetStructure = ReadonlyArray<number>> {
    readonly collectionTargetId: string;
    readonly structure: TargetStructure;
}

