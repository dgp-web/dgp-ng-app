import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { AttributeMetadata } from "data-modeling";

@Component({
    selector: "dgp-inspector-metadata-item",
    template: `
        <dgp-inspector-item [label]="metadata.label"
                            [description]="metadata.description"
                            [matIconName]="metadata.icon">
            <ng-content></ng-content>
        </dgp-inspector-item>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectorMetadataItemComponent {
    @Input()
    metadata: AttributeMetadata<any>;
}
