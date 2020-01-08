# dgp-ng-app #

Building blocks for angular applications following patterns and practices by dgp

## Getting started ##

Install the dgp-ng-app npm package.
```
npm install --save dgp-ng-app
```

## Documentation ##

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
