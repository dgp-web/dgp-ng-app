import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `
        <dgp-docking-layout dgpThemeHost>

            <dgp-docking-layout-item type="column">

                <dgp-docking-layout-item type="row">

                    <dgp-docking-layout-item type="column">
                        <dgp-docking-layout-container [label]="'e'">
                            <ng-template>
                                e
                            </ng-template>
                        </dgp-docking-layout-container>
                    </dgp-docking-layout-item>

                    <dgp-docking-layout-item type="column">
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

                <dgp-docking-layout-item type="row">
                    <dgp-docking-layout-container [label]="'a'">
                        <ng-template>
                            a
                        </ng-template>
                    </dgp-docking-layout-container>
                </dgp-docking-layout-item>

            </dgp-docking-layout-item>
        </dgp-docking-layout>

       <!-- <dgp-split-panel orientation="horizontal"
                         dgpThemeHost>
            <dgp-split-panel-content>
                <ng-template>
                    A
                    <dgp-dark-mode-toggle></dgp-dark-mode-toggle>
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
        </dgp-split-panel>-->
    `,
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {

    terser: boolean;

    /* constructor(
         private readonly cd: ChangeDetectorRef
     ) {
         interval(5000)
             .subscribe(() => {
                 this.terser = !this.terser;
                 this.cd.markForCheck();
             });
     }

     ngOnInit(): void {
     }
 */
}
