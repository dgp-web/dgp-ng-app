import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "lib-dgp-ng-data-export",
    template: `
    <p>
      dgp-ng-data-export works!
    </p>
  `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class DgpNgDataExportComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

}
