import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    selector: "dgp-tile",
    template: `
        <a *ngIf="route"
           [routerLink]="route"
           class="container">
            <mat-card appearance="outlined" matRipple
                      class="tile-card">
                <mat-card-content class="description">
                    <mat-icon class="icon dgp-bg--primary">{{ matIconName }}</mat-icon>
                    <div class="label">
                        {{ label }}
                    </div>
                    <mat-divider class="divider"></mat-divider>
                    <div class="description__text">
                        {{ description }}
                    </div>
                </mat-card-content>
            </mat-card>

        </a>

        <a *ngIf="externalLink"
           [attr.href]="externalLink"
           target="_blank"
           class="container">
            <mat-card appearance="outlined" matRipple
                      class="tile-card">
                <mat-card-content class="description">
                    <mat-icon class="icon dgp-bg--primary">{{ matIconName }}</mat-icon>
                    <div class="label">
                        {{ label }}
                    </div>
                    <mat-divider class="divider"></mat-divider>
                    <div class="description__text">
                        {{ description }}
                    </div>
                </mat-card-content>
            </mat-card>

        </a>
    `,
    styles: [`
        .container {
            display: flex;
            flex-direction: column;
            max-height: 224px;
            min-height: 224px;
            height: 100%;
            max-width: 224px;
            min-width: 224px;
            width: 100%;
            text-decoration: inherit;
            margin: 8px;
        }

        .tile-card {
            flex-grow: 1;
        }

        .description {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
        }

        .icon {
            font-size: 40px;
            height: 64px;
            width: 64px;
            color: white !important;
            border-radius: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 16px;
        }

        .label {
            font-size: larger;
        }

        .divider {
            position: relative !important;
            margin-top: 16px;
            margin-bottom: 16px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileComponent {

    @Input()
    externalLink: string;

    @Input()
    route: string;

    @Input()
    matIconName: string;

    @Input()
    label: string;

    @Input()
    description: string;

}
