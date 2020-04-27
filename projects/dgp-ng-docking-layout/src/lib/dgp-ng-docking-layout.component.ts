import { Component, OnInit } from "@angular/core";

@Component({
    selector: "lib-dgp-ng-docking-layout",
    template: `
        <golden-layout style="height: 100%;">

            <gl-item type="column">

                <gl-item type="row"
                         height="80">

                    <gl-item type="column"
                             width="20">
                        <gl-container [title]="'e'">
                            <ng-template>
                                e
                            </ng-template>
                        </gl-container>
                    </gl-item>

                    <gl-item type="column"
                             width="80">
                        <gl-item type="stack">

                            <gl-container [title]="'d'">
                                <ng-template>
                                    d
                                </ng-template>
                            </gl-container>

                            <gl-container [title]="'c'">
                                <ng-template>
                                    c
                                </ng-template>
                            </gl-container>

                            <gl-container [title]="'b'">
                                <ng-template>
                                    b
                                </ng-template>
                            </gl-container>

                        </gl-item>
                    </gl-item>

                </gl-item>

                <gl-item type="row"
                         height="20">
                    <gl-container [title]="'a'">
                        <ng-template>
                            a
                        </ng-template>
                    </gl-container>
                </gl-item>

            </gl-item>

        </golden-layout>

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

    constructor() {
    }

    ngOnInit(): void {
    }

}
