import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "dgp-blind-text",
    template: `
        <h1>The whole truth about baby penguins</h1>

        <p>
            Baby penguins are really cute animals. Looking at images of them make you just feel good.
            If that is not the case for certain individuals, it is to be suspected that there's
            something very wrong with these people.
        </p>

        <h2>
            Cuteness
        </h2>

        <h3>
            Cuteness level
        </h3>

        <h3>
            Cuteness by species
        </h3>

        <h2>
            Cuddle factor
        </h2>

        <h3>
            Definition
        </h3>

        <h3>
            Why baby penguins are especially cuddle.
        </h3>

        <h2>
            Baby penguins as calendar motives
        </h2>

        <h3>
            Are there enough pictures of baby penguins?
        </h3>
    `,
    styles: [`
      :host {
        display: flex;
        flex-direction: column;
      }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlindTextComponent {
}
