import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { interval } from "rxjs";

@Component({
    selector: "dgp-ng-docking-layout-demo",
    template: `

        <dgp-docking-layout>

            <ng-container *ngIf="terser">

                <dgp-docking-layout-item type="column">

                    <dgp-docking-layout-item type="row"
                                             height="80">

                        <dgp-docking-layout-item type="column"
                                                 width="20">
                            <dgp-docking-layout-container [label]="'e'">
                                <ng-template>
                                    e
                                </ng-template>
                            </dgp-docking-layout-container>
                        </dgp-docking-layout-item>

                        <dgp-docking-layout-item type="column"
                                                 width="80">
                            <dgp-docking-layout-item type="stack">

                                <dgp-docking-layout-container [label]="'d'">
                                    <ng-template>
                                        d
                                    </ng-template>
                                </dgp-docking-layout-container>

                                <dgp-docking-layout-container [label]="'c'">
                                    <ng-template>
                                        c
                                    </ng-template>
                                </dgp-docking-layout-container>

                                <dgp-docking-layout-container [label]="'b'">
                                    <ng-template>
                                        b
                                    </ng-template>
                                </dgp-docking-layout-container>

                            </dgp-docking-layout-item>
                        </dgp-docking-layout-item>

                    </dgp-docking-layout-item>

                    <dgp-docking-layout-item type="row"
                                             height="20">
                        <dgp-docking-layout-container [label]="'a'">
                            <ng-template>
                                a
                            </ng-template>
                        </dgp-docking-layout-container>
                    </dgp-docking-layout-item>

                </dgp-docking-layout-item>

            </ng-container>

        </dgp-docking-layout>

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
