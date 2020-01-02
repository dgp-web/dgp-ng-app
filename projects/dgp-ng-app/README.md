# dgp-ng-app #

Building blocks for angular applications following patterns and practices by dgp

## Getting started ##

Install the dgp-ng-app npm package.
```
npm install --save dgp-ng-app
```

## Documentation ##

### Hamburger shell ###

A side drawer for your application that you can fill with any content you want.

It is always visible on x-large screens (as specified by material design) and becomes 
an overlay on smaller ones. The user can manually toggle the menu using a special
control that can be dropped into a page.

Helpful for setting up the main navigation for your application.

1: Import ``DgpHamburgerShellModule.forRoot()`` in your main module.

```
import { DgpHamburgerShellModule } from "dgp-ng-app";

// ...

@NgModule({
    imports: [
        DgpHamburgerShellModule.forRoot(),
        // ...
    ]
})
export class AppModule {}
```

2: Add the control to your main component.

```
<dgp-hamburger-shell>

    <ng-container dgp-hamburger-menu
        <!-- Sidenav content goes here -->
    </ng-container>

    <!-- main content goes here, usually a router outlet -->
    <router-outlet></router-outlet>

</dgp-hamburger-shell>
```

3: *Optional*: Pass an optional configuration to the module.
```
import { HamburgerShellConfig } from "dgp-ng-app";

// this is the default config
export const config: HamburgerShellConfig = {

    // breakpoints for automatic toggling of: overlay <-> side
    hamburgerMenuBreakpoints: [
        Breakpoints.XLarge
    ],

    // breakpoints for automatic toggling of: overlay <-> side for list-details page
    listDetailsPageMenuBreakpoints: [
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
    ]
};
```

```
<dgp-hamburger-shell>

    <ng-container dgp-hamburger-menu
        <!-- Sidenav content goes here -->
    </ng-container>

    <!-- main content goes here, usually a router outlet -->
    <router-outlet></router-outlet>

</dgp-hamburger-shell>
```

### List-details page ###

Layout components for a page with a collapsible list and a central details view.

The configuration options are passed to ``HamburgerMenuShellModule.forRoot(...)``
and described in that section.

1: Import ``DgpListDetailsPageModule`` in your feature module.

```
import { DgpListDetailsPageModule } from "dgp-ng-app";

// ...

@NgModule({
    imports: [
        DgpListDetailsPageModule,
        // ...
    ]
})
export class FeatureModule {}
```

2: Add the components to the template.

```
<dgp-list-details-page>

    <ng-container dgp-list-details-page-menu>
        <!-- List content goes here -->
    </ng-container>

    <!-- Content-wrapper. This component is optional. -->
    <dgp-list-details-page-content>
       <!-- Main content goes here -->
    </dgp-list-details-page-content>

</dgp-list-details-page>

```

### Spacer ###

Invisible component that fills empty space.


1: Import ``DgSpacerModule`` in your feature module.

```
import { DgpSpacerModule } from "dgp-ng-app";

// ...

@NgModule({
    imports: [
        DgpSpacerModule,
        // ...
    ]
})
export class FeatureModule {}
``` 

2: Add the component to your template.

```
<mat-toolbar>
    
    Feature title
    
    <dgp-spacer></dgp-spacer>
    
    <button mat-icon-button>
        <mat-icon>add</mat-icon>
    </button>

</mat-toolbar>

```

### Styling ###

``dgp-ng-app`` wraps mat-theme and helps you style your angular and 
dgp components for bright and dark mode in no time.

```
@import '~@angular/material/theming';
@import '~dgp-ng-app/theming';

@include mat-core();

$app-primary: mat-palette($mat-light-green, 800, 900);
$app-accent: mat-palette($mat-green, A200, A100, A400);

@include dgp-ng-app-theme($app-primary, $app-accent);
```

### Theme switcher ###

Module for quickly setting up theming-related components in your
application.

1: Import ``DgpThemeSwitcherModule.forRoot()`` in your main module.

```
import { DgpThemeSwitcherModule } from "dgp-ng-app";

// ...

@NgModule({
    imports: [
        DgpThemeSwitcherModule.forRoot(),
        // ...
    ]
})
export class AppModule {}
```

2: Add dgpThemeHost to your shell component.

```
<dgp-hamburger-shell dgpThemeHost>

   <!-- Your content goes here -->

</dgp-hamburger-shell>
```

You can add a control for switching between bright and
dark mode to your application.

The current setting is persisted in your local storage.

1: Import ``DgpDarkModeToggleModule`` in your feature module.
```
import { DgpDarkModeToggleModule } from "dgp-ng-app";

// ...

@NgModule({
    imports: [
        DgpDarkModeToggleModule,
        // ...
    ]
})
export class FeatureModule {}
```

2: Drop ``dgp-dark-mode-toggle`` into your application.

A convenient solution is to add it to your hamburger menu.

```
<dgp-hamburger-shell dgpThemeHost>

   <ng-container dgp-hamburger-menu>
           
        <!-- Menu entries go here -->
           
       <dgp-dark-mode-toggle></dgp-dark-mode-toggle>
   
   </ng-container>

</dgp-hamburger-shell>
```

### Hot-module replacement ###

Helps keep your store state between HMR-related application reloads.

1: Make your app extend ``DgpNgApp``.

2: Add ``hmrReducer`` to your meta reducers.

```
import { DgpThemeSwitcherModule, hmrReducer } from "dgp-ng-app";

// ...

@NgModule({
    imports: [
        DgpThemeSwitcherModule.forRoot(),
        StoreModule.forRoot(appReducer, {
            metaReducers: [
                hmrReducer
            ]
        }),
        // ...
    ]
})
export class AppModule extends DgpNgApp {

    constructor(public readonly appRef: ApplicationRef,
                protected readonly ngrxStore: Store<AppState>) {
        super(appRef, ngrxStore);
    }

}
```

### Log ###

Feature to create and view log entries.

1: Import ``DgpLogModule`` in your main module.

```
import { DgpLogModule } from "dgp-ng-app";

// ...

@NgModule({
    imports: [
        DgpLogModule,
        // ...
    ]
})
export class AppModule {}
``` 

2: Create some option to route to it. It's located under ``/logEntries``.

3: Create log actions to populate your log via ``AddLogEntryAction`` and ``LogErrorAction``.

### Virtual-list panel ###

An easy interface for virtual lists with dynamic width and height.

1: Import ``DgpVirtualListPanelModule`` in your feature module.
```
import { DgpVirtualListPanelModule } from "dgp-ng-app";

// ...

@NgModule({
    imports: [
        DgpVirtualListPanelModule,
        // ...
    ]
})
export class FeatureModule {}
```

2: Use the ``dgp-virtual-list-panel`` component in template.

```
<mat-nav-list>

    <dgp-virtual-list-panel [items]="items">

        <a *dgpVirtualListItem="let item"
           mat-list-item
           href="javascript:;">
            <!-- Your content goes here -->
        </a>

    </dgp-virtual-list-panel>
    
</mat-nav-list>
```

### Broadcast (Multi-window app) ###

Communicate between multiple instances of your application in different
tabs or windows.

1: Import ``DgpBroadcastStoreModule`` in your main module.

```
import { 
    DgpBroadcastStoreModule, 
    defaultBroadcastConfig 
} from "dgp-ng-app";

// ...

@NgModule({
    imports: [
        DgpBroadcastStoreModule.forRoot({
            ...defaultBroadcastConfig,
            actionTypesToPrefixWithPeon: [
                // action types to prefix go here
            ]
        }),,
        // ...
    ]
})
export class AppModule {}
```

2: Broadcast on a channel with ``SetBroadcastChannelDataIdAction``
which can take any object.

```
new SetBroadcastChannelDataIdAction("ChannelId");
```

What happens? All actions with a prefix registered in 
``actionTypesToPrefixWithPeon`` are sent to the ``leader`` tab who
processes them normally.

``CompositeEntityActions`` are automatically broadcasted from the 
``leader`` to all ``peons``. This allows you to synchronize your 
application state across app instances while each instances can
still have its own additional data handling.
