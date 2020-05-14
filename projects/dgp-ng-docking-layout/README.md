# dgp-ng-docking-layout

Docking layout and split panels for Angular material apps.

## Installation

```
npm install --save dgp-ng-docking-layout 
```

Notes
- dgp-ng-docking-layout requires JQuery ^3

## Usage

Include the stylesheet in your global styles.scss.

```
@import '~dgp-ng-docking-layout/theming';
```

### Split panel
```
<!-- Add dgp-split-panel and set its orientation -->
<dgp-split-panel orientation="horizontal">

    <!-- Add dgp-split-panel-content and set its size (a percentage value) -->
    <dgp-split-panel-content size="20">
        <!-- Wrap your content in ng-templates -->
        <ng-template>A</ng-template>
    </dgp-split-panel-content>

    <dgp-split-panel-content size="30">
        <ng-template>B</ng-template>
    </dgp-split-panel-content>

    <dgp-split-panel-content size="50">
        <ng-template>

            <!-- Nested panel -->
            <dgp-split-panel orientation="vertical">
                <dgp-split-panel-content size="50">
                    <ng-template>C</ng-template>
                </dgp-split-panel-content>

                <dgp-split-panel-content size="50">
                    <ng-template>D</ng-template>
                </dgp-split-panel-content>
            </dgp-split-panel>
        </ng-template>

    </dgp-split-panel-content>
</dgp-split-panel>
```
