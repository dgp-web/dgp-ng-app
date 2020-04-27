import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { interval } from "rxjs";

@Component({
    selector: "dgp-ng-docking-layout-demo",
    template: `

        <dgp-split-panel orientation="vertical">
            <dgp-split-panel-content>
                <ng-template>
                    A
                </ng-template>
            </dgp-split-panel-content>

            <dgp-split-panel-content>
                <ng-template>
                    B
                </ng-template>
            </dgp-split-panel-content>

            <dgp-split-panel-content>
                <ng-template>
                    C
                </ng-template>
            </dgp-split-panel-content>
        </dgp-split-panel>

    `,
    styles: [`
        :host {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
    `]
})
export class DgpNgDockingLayoutComponent implements OnInit {

    terser: boolean;

    constructor(
        private readonly cd: ChangeDetectorRef
    ) {
        interval(2500).subscribe(() => {
            this.terser = !this.terser;
            this.cd.markForCheck();
        });
    }

    ngOnInit(): void {
    }

}
