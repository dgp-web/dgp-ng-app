"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createGuid = createGuid;
exports.createOnChangeEffect$ = _createOnChangeEffect$;
exports.distinctUntilHashChanged = distinctUntilHashChanged;
exports.filterEmpty = filterEmpty;
exports.filterNotNullOrUndefined = filterNotNullOrUndefined;
exports.firstAsPromise = firstAsPromise;
exports.flattenMatrix = flattenMatrix;
exports.getFileFromFileItem$ = getFileFromFileItem$;
exports.getFileFromUrl$ = getFileFromUrl$;
exports.getFileItemSizeLabel = getFileItemSizeLabel;
exports.getFileItemsFromFileList = getFileItemsFromFileList;
exports.getHashCode = getHashCode;
exports.getMimeTypeFromExtension = getMimeTypeFromExtension;
exports.hmrReducer = hmrReducer;
exports.isNullOrUndefined = isNullOrUndefined;
exports.notNullOrUndefined = notNullOrUndefined;
exports.openFileManagerShortKeyFilter = openFileManagerShortKeyFilter;
exports.parseCSVFile$ = parseCSVFile$;
exports.parseContentAsStringMatrix = parseContentAsStringMatrix;
exports.parseFileNameWithExtension = parseFileNameWithExtension;
exports.parseStringMatrixAsNumberMatrix = parseStringMatrixAsNumberMatrix;
exports.resolveOverridableValue = resolveOverridableValue;
exports.ɵba = requestStoreReducerFactory;
exports.ɵbf = themeSwitcherReducerFactory;
exports.ɵbh = appInitializer;
exports.ɵe = authenticationReducerFactory;
exports.ɵj = broadcastReducerFactory;
exports.ɵn = fileUploadReducerFactory;
exports.ɵq = hamburgerShellReducerFactory;
exports.ɵt = createLogStoreReducer;
exports.confirmButtonConfig = exports.closeListDetailsMenu = exports.closeHamburgerMenu = exports.closeFileManager = exports.cancelButtonConfig = exports.canOpenFileDrawer = exports.broadcastStoreFeatureSelector = exports.broadcastStoreFeature = exports.authenticationStoreFeature = exports.authenticationServiceProvider = exports.authenticationReducer = exports.authenticateUser = exports.addLogEntry = exports.addFilesViaDrop = exports.addFiles = exports.actionBroadcastChannelId = exports.VirtualListPanelComponent = exports.VirtualListItemDirective = exports.TileComponent = exports.ThemeHostDirective = exports.SvgViewerComponent = exports.SpacerComponent = exports.Severity = exports.SetOwnBroadcastRoleAction = exports.SetBroadcastChannelDataIdAction = exports.ScheduleRequestAction = exports.SafePipeModule = exports.SafePipe = exports.PngViewerComponent = exports.PdfViewerComponent = exports.PageHeaderComponent = exports.OpenFileManagerViaShortKeyDirective = exports.NoPeonGuard = exports.Magnitude = exports.LogErrorAction = exports.ListDetailsPageMode = exports.ListDetailsPageContentComponent = exports.ListDetailsPageComponent = exports.JpgViewerComponent = exports.InspectorSectionComponent = exports.InspectorItemComponent = exports.InspectorComponent = exports.InitializationService = exports.HybridComponentBase = exports.HttpSSEApiClient = exports.HamburgerShellMode = exports.HamburgerShellComponent = exports.HamburgerMenuToggleComponent = exports.HamburgerMenuHeaderComponent = exports.HamburgerMenuEntryComponent = exports.HamburgerMenuEntriesComponent = exports.HamburgerMenuComponent = exports.HAMBURGER_SHELL_CONFIG = exports.FileViewerComponentBase = exports.FileViewerComponent = exports.FileItemListComponent = exports.FallbackFileViewerComponent = exports.FILE_VIEWER_CONFIG = exports.FILE_UPLOAD_CONFIG = exports.EmptyStateComponent = exports.DynamicFileViewerComponent = exports.DragFileListenerDirective = exports.DgpVirtualListPanelModule = exports.DgpTileModule = exports.DgpThemeSwitcherModule = exports.DgpTableCellModule = exports.DgpTableCellComponent = exports.DgpTableCelLEditorDirective = exports.DgpSpacerModule = exports.DgpSelectEntityViaRouteResolver = exports.DgpRoutingOverlayModule = exports.DgpResolverBase = exports.DgpRequestStoreModule = exports.DgpPageHeaderModule = exports.DgpNgAppModule = exports.DgpNgApp = exports.DgpModelEditorComponentBase = exports.DgpLogModule = exports.DgpListDetailsPageModule = exports.DgpInspectorModule = exports.DgpHamburgerShellModule = exports.DgpHamburgerMenuToggleModule = exports.DgpHamburgerMenuModule = exports.DgpFileViewerModule = exports.DgpFileUploadModule = exports.DgpEmptyStateModule = exports.DgpEffectsBase = exports.DgpContainer = exports.DgpConfirmDialogModule = exports.DgpConfirmDialogComponent = exports.DgpBroadcastStoreModule = exports.DgpAuthenticationModule = exports.DarkModeToggleComponent = exports.BroadcastRole = exports.BROADCAST_CONFIG = exports.AuthenticationServiceImpl = exports.AuthenticationService = exports.AuthenticationGuard = exports.AuthenticationApiClient = exports.APP_REDUCER = void 0;
exports.ɵbv = exports.ɵbu = exports.ɵbt = exports.ɵbs = exports.ɵbr = exports.ɵbq = exports.ɵbp = exports.ɵbo = exports.ɵbn = exports.ɵbm = exports.ɵbl = exports.ɵbk = exports.ɵbj = exports.ɵbi = exports.ɵbg = exports.ɵbe = exports.ɵbd = exports.ɵbc = exports.ɵbb = exports.ɵb = exports.ɵa = exports.ɵ9 = exports.ɵ8 = exports.ɵ7 = exports.ɵ6 = exports.ɵ5 = exports.ɵ4 = exports.ɵ3 = exports.ɵ2 = exports.ɵ11 = exports.ɵ10 = exports.ɵ1 = exports.ɵ0 = exports.toggleListDetailsPageMenu = exports.toggleHamburgerMenu = exports.toggleDarkMode = exports.themeSwitcherStoreFeature = exports.themeSwitcherFeatureSelector = exports.sideNavHamburgerShellConfigProvider = exports.sideNavHamburgerShellConfig = exports.showLoadingSpinner = exports.showDropTarget = exports.setListDetailsPageState = exports.setIsDarkModeActive = exports.setHamburgerMenuState = exports.setConfig = exports.setBroadcastChannelDataId = exports.scheduleRequestActionType = exports.scheduleRequest = exports.responsiveHamburgerShellConfig = exports.requestStoreFeature = exports.requestStateSelector = exports.removeFile = exports.pageMenuModeSelector = exports.overlayHamburgerShellConfigProvider = exports.overlayHamburgerShellConfig = exports.openFileManagerOverlay = exports.openFileManager = exports.nullOrUndefined = exports.logStoreFeature = exports.logErrorActionType = exports.logError = exports.isRemoveFilesDisabled = exports.isPageMenuOpenSelector = exports.isHamburgerMenuOpenSelector = exports.isFileManagerOpen = exports.isDropTargetVisible = exports.isDarkModeActiveSelector = exports.isDarkModeActive = exports.isAddFilesDisabled = exports.initialAuthenticationState = exports.hotReload = exports.hideDropTarget = exports.heartbeatBroadcastChannelId = exports.hasPendingRequestsSelector = exports.hasPendingRequests = exports.hamburgerShellStoreFeature = exports.hamburgerShellFeatureSelector = exports.hamburgerMenuModeSelector = exports.getSelectedFileItem = exports.getOwnBroadcastRoleSelector = exports.getIsAuthenticatedSelector = exports.getFileItemState = exports.getFileItemListModel = exports.getFileItemKVS = exports.getDirectoryState = exports.getAuthenticatedUserSelector = exports.getAllFileItems = exports.getAllDirectories = exports.fileUploadStoreFeature = exports.fileUploadFeatureSelector = exports.fileUploadEntityStore = exports.defaultRuntimeChecks = exports.defaultHamburgerShellConfigProvider = exports.defaultHamburgerShellConfig = exports.defaultFileViewerConfig = exports.defaultFileUploadConfig = exports.defaultFileTypeViewerMap = exports.defaultBroadcastRoleDisplayConfig = exports.defaultBroadcastConfig = void 0;
exports.ɵz = exports.ɵy = exports.ɵx = exports.ɵw = exports.ɵu = exports.ɵs = exports.ɵr = exports.ɵp = exports.ɵo = exports.ɵm = exports.ɵl = exports.ɵk = exports.ɵi = exports.ɵh = exports.ɵg = exports.ɵf = exports.ɵd = exports.ɵcj = exports.ɵci = exports.ɵch = exports.ɵcg = exports.ɵcf = exports.ɵce = exports.ɵcd = exports.ɵcc = exports.ɵcb = exports.ɵca = exports.ɵc = exports.ɵbz = exports.ɵby = exports.ɵbx = exports.ɵbw = void 0;

var _store = require("@ngrx/store");

var _tslib = require("tslib");

var _operators = require("rxjs/operators");

var _router = require("@angular/router");

var _core = require("@angular/core");

var _util = require("util");

var _rxjs = require("rxjs");

var _effects = require("@ngrx/effects");

var _snackBar = require("@angular/material/snack-bar");

var _lodash = require("lodash");

var _entityStore = require("entity-store");

var _dialog = require("@angular/material/dialog");

var _button = require("@angular/material/button");

var _icon = require("@angular/material/icon");

var _common = require("@angular/common");

var _platform = require("@angular/cdk/platform");

var _list = require("@angular/material/list");

var _tooltip = require("@angular/material/tooltip");

var _menu = require("@angular/material/menu");

var _platformBrowser = require("@angular/platform-browser");

var _progressBar = require("@angular/material/progress-bar");

var _toolbar = require("@angular/material/toolbar");

var _layout = require("@angular/cdk/layout");

var _sidenav = require("@angular/material/sidenav");

var _forms = require("@angular/forms");

var _hmr = require("@angularclass/hmr");

var _divider = require("@angular/material/divider");

var _overlay = require("@angular/cdk/overlay");

var _slideToggle = require("@angular/material/slide-toggle");

var _card = require("@angular/material/card");

var _core2 = require("@angular/material/core");

var _scrolling = require("@angular/cdk/scrolling");

var _animations = require("@angular/platform-browser/animations");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var authenticationActionTypePrefix = "[Authentication] ";
var authenticateUser = (0, _store.createAction)(authenticationActionTypePrefix + "AuthenticateUser", (0, _store.props)());
exports.authenticateUser = authenticateUser;
var cacheInitialUrl = (0, _store.createAction)(authenticationActionTypePrefix + "CacheInitialUrl", (0, _store.props)());
exports.ɵa = cacheInitialUrl;
var registerAuthenticateError = (0, _store.createAction)(authenticationActionTypePrefix + "RegisterAuthenticationError", (0, _store.props)());
/**
 * Service for authenticating the user
 */

exports.ɵb = registerAuthenticateError;

var AuthenticationApiClient = function AuthenticationApiClient() {
  _classCallCheck(this, AuthenticationApiClient);
};

exports.AuthenticationApiClient = AuthenticationApiClient;
var authenticationStoreFeature = "Authentication";
exports.authenticationStoreFeature = authenticationStoreFeature;
var authenticationFeatureSelector = (0, _store.createFeatureSelector)(authenticationStoreFeature);
exports.ɵc = authenticationFeatureSelector;

var ɵ0 = function ɵ0(x) {
  return x.success;
};

var getIsAuthenticatedSelector = (0, _store.createSelector)(authenticationFeatureSelector, ɵ0);
exports.getIsAuthenticatedSelector = getIsAuthenticatedSelector;

var ɵ1 = function ɵ1(x) {
  return x.user;
};

var getAuthenticatedUserSelector = (0, _store.createSelector)(authenticationFeatureSelector, ɵ1);
exports.getAuthenticatedUserSelector = getAuthenticatedUserSelector;

var ɵ2 = function ɵ2(x) {
  return x.initialUrl;
};

var getCachedInitialUrlSelector = (0, _store.createSelector)(authenticationFeatureSelector, ɵ2);

var ɵ3 = function ɵ3(x) {
  return !(0, _util.isNullOrUndefined)(x);
};

var hasCachedInitialUrlSelector = (0, _store.createSelector)(getCachedInitialUrlSelector, ɵ3);

var AuthenticationGuard = /*#__PURE__*/function () {
  function AuthenticationGuard(store, router) {
    _classCallCheck(this, AuthenticationGuard);

    this.store = store;
    this.router = router;
  }

  _createClass(AuthenticationGuard, [{
    key: "canActivate",
    value: function canActivate(route, state) {
      return (0, _tslib.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var hasInitialUrl;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.store.pipe((0, _store.select)(hasCachedInitialUrlSelector), (0, _operators.first)()).toPromise();

              case 2:
                hasInitialUrl = _context.sent;

                if (!hasInitialUrl) {
                  this.store.dispatch(cacheInitialUrl({
                    initialUrl: state.url
                  }));
                }

                return _context.abrupt("return", this.store.pipe((0, _store.select)(getIsAuthenticatedSelector), (0, _operators.first)()).toPromise());

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }]);

  return AuthenticationGuard;
}();

exports.AuthenticationGuard = AuthenticationGuard;
AuthenticationGuard.decorators = [{
  type: _core.Injectable
}];

AuthenticationGuard.ctorParameters = function () {
  return [{
    type: _store.Store
  }, {
    type: _router.Router
  }];
};

var AuthenticationService = function AuthenticationService() {
  _classCallCheck(this, AuthenticationService);
};

exports.AuthenticationService = AuthenticationService;

var AuthenticationServiceImpl = /*#__PURE__*/function () {
  function AuthenticationServiceImpl(store, authenticationApiClient) {
    _classCallCheck(this, AuthenticationServiceImpl);

    this.store = store;
    this.authenticationApiClient = authenticationApiClient;
    this.postAuthenticationTasks = [];
  }

  _createClass(AuthenticationServiceImpl, [{
    key: "authenticate$",
    value: function authenticate$() {
      var _this = this;

      return (0, _rxjs.from)(this.authenticationApiClient.authenticate$()).pipe((0, _operators.tap)(function (user) {
        _this.store.dispatch(authenticateUser({
          user: user
        }));
      }), (0, _operators.switchMap)(function (user) {
        var requests$ = _this.postAuthenticationTasks.map(function (task) {
          return (0, _rxjs.from)(task(user));
        });

        return (0, _rxjs.forkJoin)(requests$);
      }), (0, _operators.catchError)(function (error) {
        _this.store.dispatch(registerAuthenticateError({
          error: error
        }));

        return (0, _rxjs.empty)();
      }), (0, _operators.defaultIfEmpty)(null)).toPromise();
    }
  }, {
    key: "registerPostAuthenticationTask",
    value: function registerPostAuthenticationTask(task) {
      this.postAuthenticationTasks.push(task);
    }
  }]);

  return AuthenticationServiceImpl;
}();

exports.AuthenticationServiceImpl = AuthenticationServiceImpl;
AuthenticationServiceImpl.decorators = [{
  type: _core.Injectable
}];

AuthenticationServiceImpl.ctorParameters = function () {
  return [{
    type: _store.Store
  }, {
    type: AuthenticationApiClient
  }];
};

var authenticationServiceProvider = {
  provide: AuthenticationService,
  useClass: AuthenticationServiceImpl
};
exports.authenticationServiceProvider = authenticationServiceProvider;
var initialAuthenticationState = {
  user: null,
  success: null,
  error: null,
  initialUrl: null
};
exports.initialAuthenticationState = initialAuthenticationState;

var ɵ0$1 = function ɵ0$1(state, action) {
  return Object.assign(Object.assign({}, state), {
    user: action.user,
    success: true
  });
},
    ɵ1$1 = function ɵ1$1(state, action) {
  return Object.assign(Object.assign({}, state), {
    initialUrl: action.initialUrl
  });
},
    ɵ2$1 = function ɵ2$1(state, action) {
  return Object.assign(Object.assign({}, state), {
    error: action.error,
    success: false
  });
};

var authenticationReducer = (0, _store.createReducer)(initialAuthenticationState, (0, _store.on)(authenticateUser, ɵ0$1), (0, _store.on)(cacheInitialUrl, ɵ1$1), (0, _store.on)(registerAuthenticateError, ɵ2$1));
/**
 * Service that runs tasks once the user is authenticated
 * but before the application actually starts.
 *
 * Use for downloading basic data or load user settings.
 */

exports.authenticationReducer = authenticationReducer;

var InitializationService = function InitializationService() {
  _classCallCheck(this, InitializationService);
};

exports.InitializationService = InitializationService;
var setOwnBroadcastRoleActionType = "[BroadcastChannel] SetOwnRole";

var SetOwnBroadcastRoleAction = function SetOwnBroadcastRoleAction(payload) {
  _classCallCheck(this, SetOwnBroadcastRoleAction);

  this.payload = payload;
  this.type = setOwnBroadcastRoleActionType;
};

exports.SetOwnBroadcastRoleAction = SetOwnBroadcastRoleAction;
var setOwnBroadcastRole = (0, _store.createAction)(setOwnBroadcastRoleActionType, (0, _store.props)());
exports.ɵg = setOwnBroadcastRole;
var setBroadcastChannelDataIdActionType = "[BroadcastChannel] SetSelectedDataId";

var SetBroadcastChannelDataIdAction = function SetBroadcastChannelDataIdAction(payload) {
  _classCallCheck(this, SetBroadcastChannelDataIdAction);

  this.payload = payload;
  this.type = setBroadcastChannelDataIdActionType;
};

exports.SetBroadcastChannelDataIdAction = SetBroadcastChannelDataIdAction;
var setBroadcastChannelDataId = (0, _store.createAction)(setBroadcastChannelDataIdActionType, (0, _store.props)());
exports.setBroadcastChannelDataId = setBroadcastChannelDataId;
var requestInitialData = (0, _store.createAction)("[BroadcastChannel] RequestInitialData");
var leaderActionTypePrefix = "[Leader] ";
var peonActionTypePrefix = "[Peon] ";
var compositeActionTypePrefix = "[Composite] ";
var trackRequestActionTypePrefix = "[Request] ";
var openUrlAsPeon = (0, _store.createAction)("[BroadcastChannel] OpenUrlAsPeon", (0, _store.props)());
var heartbeatBroadcastChannelId = "HeartbeatBroadcastChannel";
exports.heartbeatBroadcastChannelId = heartbeatBroadcastChannelId;
var actionBroadcastChannelId = "ActionBroadcastChannel";
exports.actionBroadcastChannelId = actionBroadcastChannelId;
var defaultBroadcastRoleDisplayConfig = {
  leaderBrowserTabTitleSuffix: ": Leader",
  peonBrowserTabTitleSuffix: ": Peon"
};
exports.defaultBroadcastRoleDisplayConfig = defaultBroadcastRoleDisplayConfig;
var defaultBroadcastConfig = {
  heartbeartBroadcastInterval: 1000,
  incomingHeartbeatBufferInterval: 10000,
  heartbeatBroadcastChannelId: heartbeatBroadcastChannelId,
  actionBroadcastChannelId: actionBroadcastChannelId,
  actionTypesToPrefixWithPeon: [],
  updateBrowserTabTitleConfig: defaultBroadcastRoleDisplayConfig
};
exports.defaultBroadcastConfig = defaultBroadcastConfig;
var BROADCAST_CONFIG = new _core.InjectionToken("DEFAULT_BROADCAST_CONFIG");
exports.BROADCAST_CONFIG = BROADCAST_CONFIG;
var BroadcastRole;
exports.BroadcastRole = BroadcastRole;

(function (BroadcastRole) {
  BroadcastRole[BroadcastRole["None"] = 0] = "None";
  BroadcastRole[BroadcastRole["Leader"] = 1] = "Leader";
  BroadcastRole[BroadcastRole["Peon"] = 2] = "Peon";
})(BroadcastRole || (exports.BroadcastRole = BroadcastRole = {}));
/**
 * Logic executed before the app loads
 */


function appInitializer(authenticationService, initializationService, store) {
  if (window.location.href.includes("startAsPeon=true")) return function () {
    store.dispatch(setOwnBroadcastRole({
      broadcastRole: BroadcastRole.Peon
    }));
    return Promise.resolve();
  };
  authenticationService.registerPostAuthenticationTask(function (user) {
    return initializationService.runPostAuthenticationTask$(user);
  });
  return function () {
    return authenticationService.authenticate$();
  };
}

var appInitializerProvider = {
  provide: _core.APP_INITIALIZER,
  useFactory: appInitializer,
  deps: [AuthenticationService, InitializationService, _store.Store],
  multi: true
};
exports.ɵbi = appInitializerProvider;
var AUTHENTICATION_REDUCER = new _core.InjectionToken("authenticationReducer");
exports.ɵd = AUTHENTICATION_REDUCER;

function authenticationReducerFactory() {
  return authenticationReducer;
}

var authenticationReducerProvider = {
  provide: AUTHENTICATION_REDUCER,
  useFactory: authenticationReducerFactory
};
exports.ɵf = authenticationReducerProvider;

var DgpAuthenticationModule = /*#__PURE__*/function () {
  function DgpAuthenticationModule() {
    _classCallCheck(this, DgpAuthenticationModule);
  }

  _createClass(DgpAuthenticationModule, null, [{
    key: "forRoot",
    value: function forRoot(settings) {
      return {
        ngModule: DgpAuthenticationModule,
        providers: [settings.authenticationApiClientProvider, settings.initializationServiceProvider]
      };
    }
  }]);

  return DgpAuthenticationModule;
}();

exports.DgpAuthenticationModule = DgpAuthenticationModule;
DgpAuthenticationModule.decorators = [{
  type: _core.NgModule,
  args: [{
    imports: [_store.StoreModule.forFeature(authenticationStoreFeature, AUTHENTICATION_REDUCER)],
    providers: [appInitializerProvider, authenticationReducerProvider, AuthenticationGuard, authenticationServiceProvider]
  }]
}];
var broadcastStoreFeature = "Broadcast";
exports.broadcastStoreFeature = broadcastStoreFeature;
var broadcastStoreFeatureSelector = (0, _store.createFeatureSelector)(broadcastStoreFeature);
exports.broadcastStoreFeatureSelector = broadcastStoreFeatureSelector;

var ɵ0$2 = function ɵ0$2(state, action) {
  return {
    ownRole: action.broadcastRole
  };
};

var broadcastReducer = (0, _store.createReducer)({
  ownRole: BroadcastRole.None
}, (0, _store.on)(setOwnBroadcastRole, ɵ0$2));
exports.ɵh = broadcastReducer;

var ɵ1$2 = function ɵ1$2(x) {
  if ((0, _util.isNullOrUndefined)(x)) {
    return null;
  }

  return x.ownRole;
};

var getOwnBroadcastRoleSelector = (0, _store.createSelector)(broadcastStoreFeatureSelector, ɵ1$2);
exports.getOwnBroadcastRoleSelector = getOwnBroadcastRoleSelector;

var NoPeonGuard = /*#__PURE__*/function () {
  function NoPeonGuard(store) {
    _classCallCheck(this, NoPeonGuard);

    this.store = store;
  }

  _createClass(NoPeonGuard, [{
    key: "canActivate",
    value: function canActivate(route, state) {
      return this.store.pipe((0, _store.select)(getOwnBroadcastRoleSelector), (0, _operators.map)(function (role) {
        return role !== BroadcastRole.Peon;
      }));
    }
  }]);

  return NoPeonGuard;
}();

exports.NoPeonGuard = NoPeonGuard;
NoPeonGuard.decorators = [{
  type: _core.Injectable
}];

NoPeonGuard.ctorParameters = function () {
  return [{
    type: _store.Store
  }];
};

var crypto = window.crypto || window.msCrypto; // for IE 11

function createGuid() {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (// tslint:disable-next-line:no-bitwise
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  });
}

function prefixAction(payload) {
  return Object.assign({}, payload.action, {
    type: payload.prefix + payload.action.type
  });
}

function shouldPrefixAction(payload) {
  if (payload.actualBroadcastRole === payload.triggeringBroadcastRole) {
    if (payload.triggeringActionPrefixes.some(function (actionPrefix) {
      return payload.action.type.startsWith(actionPrefix);
    })) {
      return true;
    }
  }

  return false;
}

var BroadcastStoreDecorator = /*#__PURE__*/function (_Store) {
  _inherits(BroadcastStoreDecorator, _Store);

  var _super = _createSuper(BroadcastStoreDecorator);

  function BroadcastStoreDecorator(state$, actionsObserver, reducerManager, config) {
    var _this2;

    _classCallCheck(this, BroadcastStoreDecorator);

    _this2 = _super.call(this, state$, actionsObserver, reducerManager);
    _this2.config = config;
    _this2.ownBroadcastRoleSubscription = state$.pipe((0, _store.select)(getOwnBroadcastRoleSelector)).subscribe(function (x) {
      _this2.broadcastRole = x;
    }, function (e) {
      throw e;
    });
    return _this2;
  }

  _createClass(BroadcastStoreDecorator, [{
    key: "dispatch",
    value: function dispatch(action) {
      var localAction = action;
      var shouldPrefixActionWithPeonResult = shouldPrefixAction({
        action: action,
        actualBroadcastRole: this.broadcastRole,
        triggeringBroadcastRole: BroadcastRole.Peon,
        triggeringActionPrefixes: this.config.actionTypesToPrefixWithPeon
      });

      if (shouldPrefixActionWithPeonResult) {
        localAction = prefixAction({
          action: localAction,
          prefix: peonActionTypePrefix
        });
      }

      _get(_getPrototypeOf(BroadcastStoreDecorator.prototype), "dispatch", this).call(this, localAction);
    }
  }, {
    key: "next",
    value: function next(action) {
      var localAction = action;
      var shouldPrefixActionWithPeonResult = shouldPrefixAction({
        action: action,
        actualBroadcastRole: this.broadcastRole,
        triggeringBroadcastRole: BroadcastRole.Peon,
        triggeringActionPrefixes: this.config.actionTypesToPrefixWithPeon
      });

      if (shouldPrefixActionWithPeonResult) {
        localAction = prefixAction({
          action: localAction,
          prefix: peonActionTypePrefix
        });
      }

      _get(_getPrototypeOf(BroadcastStoreDecorator.prototype), "next", this).call(this, localAction);
    }
  }]);

  return BroadcastStoreDecorator;
}(_store.Store);

exports.ɵbn = BroadcastStoreDecorator;
BroadcastStoreDecorator.decorators = [{
  type: _core.Injectable
}];

BroadcastStoreDecorator.ctorParameters = function () {
  return [{
    type: _store.StateObservable,
    decorators: [{
      type: _core.Inject,
      args: [_store.StateObservable]
    }]
  }, {
    type: _store.ActionsSubject,
    decorators: [{
      type: _core.Inject,
      args: [_store.ActionsSubject]
    }]
  }, {
    type: _store.ReducerManager,
    decorators: [{
      type: _core.Inject,
      args: [_store.ReducerManager]
    }]
  }, {
    type: undefined,
    decorators: [{
      type: _core.Inject,
      args: [BROADCAST_CONFIG]
    }]
  }];
};

var broadcastStoreProvider = {
  provide: _store.Store,
  useClass: BroadcastStoreDecorator
};
exports.ɵbo = broadcastStoreProvider;

var BroadcastChannelLocalStorageFallbackService = /*#__PURE__*/function () {
  function BroadcastChannelLocalStorageFallbackService(channelId) {
    _classCallCheck(this, BroadcastChannelLocalStorageFallbackService);

    this.channelId = channelId;
  }

  _createClass(BroadcastChannelLocalStorageFallbackService, [{
    key: "addEventListener",
    value: function addEventListener(type, listener, options) {
      var _this3 = this;

      window.addEventListener("storage", function (ev) {
        if (ev.key !== _this3.channelId) {
          return;
        }

        if ((0, _util.isNullOrUndefined)(ev.newValue)) {
          return;
        }

        var message = JSON.parse(ev.newValue);
        listener({
          data: message
        });
      });
    }
  }, {
    key: "postMessage",
    value: function postMessage(message) {
      var messageJson = JSON.stringify(message);
      window.localStorage.setItem(this.channelId, messageJson);
    }
  }]);

  return BroadcastChannelLocalStorageFallbackService;
}();
/**
 * Parses heartbeats from message events
 *
 * This is needed to ensure that the objects resulting from broadcast channels
 * and local storage look the same
 *
 * @param messageEvent
 */


function getBroadcastHeartbeatFromMessageEvent(messageEvent) {
  return {
    dataId: messageEvent.data.dataId,
    participantId: messageEvent.data.participantId,
    participantCreationDate: (0, _util.isDate)(messageEvent.data.participantCreationDate) ? messageEvent.data.participantCreationDate : new Date(messageEvent.data.participantCreationDate)
  };
}

var BroadcastChannelService = function BroadcastChannelService() {
  _classCallCheck(this, BroadcastChannelService);
};

exports.ɵbk = BroadcastChannelService;

var BroadcastChannelServiceImpl = /*#__PURE__*/function (_BroadcastChannelServ) {
  _inherits(BroadcastChannelServiceImpl, _BroadcastChannelServ);

  var _super2 = _createSuper(BroadcastChannelServiceImpl);

  function BroadcastChannelServiceImpl(config) {
    var _this4;

    _classCallCheck(this, BroadcastChannelServiceImpl);

    _this4 = _super2.call(this);
    _this4.config = config;

    _this4.addBroadcastListenerForHeartbeat = function (handler) {
      _this4.heartbeatBroadcastChannel.addEventListener("message", handler);
    };

    _this4.addBroadcastListenerForAction = function (handler) {
      _this4.actionBroadcastChannel.addEventListener("message", handler);
    };

    if ("BroadcastChannel" in self) {
      _this4.heartbeatBroadcastChannel = new BroadcastChannel(_this4.config.heartbeatBroadcastChannelId);
      _this4.actionBroadcastChannel = new BroadcastChannel(_this4.config.actionBroadcastChannelId);
    } else {
      _this4.heartbeatBroadcastChannel = new BroadcastChannelLocalStorageFallbackService(_this4.config.heartbeatBroadcastChannelId);
      _this4.actionBroadcastChannel = new BroadcastChannelLocalStorageFallbackService(_this4.config.actionBroadcastChannelId);
    }

    return _this4;
  }

  _createClass(BroadcastChannelServiceImpl, [{
    key: "getAction$",
    value: function getAction$() {
      return (0, _rxjs.fromEventPattern)(this.addBroadcastListenerForAction).pipe((0, _operators.map)(function (messageEvent) {
        return messageEvent.data;
      }));
    }
  }, {
    key: "getHeartbeat$",
    value: function getHeartbeat$() {
      return (0, _rxjs.fromEventPattern)(this.addBroadcastListenerForHeartbeat).pipe((0, _operators.map)(getBroadcastHeartbeatFromMessageEvent));
    }
  }, {
    key: "postAction",
    value: function postAction(action) {
      this.actionBroadcastChannel.postMessage(action);
    }
  }, {
    key: "postHeartbeat",
    value: function postHeartbeat(heartbeat) {
      this.heartbeatBroadcastChannel.postMessage(heartbeat);
    }
  }]);

  return BroadcastChannelServiceImpl;
}(BroadcastChannelService);

exports.ɵbl = BroadcastChannelServiceImpl;
BroadcastChannelServiceImpl.decorators = [{
  type: _core.Injectable
}];

BroadcastChannelServiceImpl.ctorParameters = function () {
  return [{
    type: undefined,
    decorators: [{
      type: _core.Inject,
      args: [BROADCAST_CONFIG]
    }]
  }];
};

var broadcastChannelServiceProvider = {
  provide: BroadcastChannelService,
  useClass: BroadcastChannelServiceImpl
};
exports.ɵbm = broadcastChannelServiceProvider;

function createBroadcastHeartbeat(payload) {
  return {
    participantId: payload.participant.participantId,
    participantCreationDate: payload.participant.participantCreationDate,
    dataId: payload.dataId
  };
}

function createBroadcastParticipant() {
  return {
    participantId: createGuid(),
    participantCreationDate: new Date()
  };
}

function trimIncomingBroadcastAction(action) {
  if (action.type.startsWith(peonActionTypePrefix)) {
    return Object.assign({}, action, {
      type: action.type.replace(peonActionTypePrefix, "")
    });
  } else if (action.type.startsWith(leaderActionTypePrefix)) {
    return Object.assign({}, action, {
      type: action.type.replace(leaderActionTypePrefix, "")
    });
  } else {
    throw Error("Broadcasted actions must either be marked as Peon or Leader actions");
  }
}
/**
 * Returns distinct heartbeats for a given data channel
 *
 * If no dataId is passed to identify the channel, an empty array is returned
 * Heartbeats are distinguished by participantId
 *
 * @param payload
 */


function getDistinctHeartbeatsForChannel(payload) {
  if ((0, _util.isNullOrUndefined)(payload.channelDataId)) {
    return [];
  }

  var distinctHearbeats = (0, _lodash.uniqBy)(payload.heartbeats, function (x) {
    return x.participantId;
  });
  return distinctHearbeats.filter(function (x) {
    if ((0, _util.isNullOrUndefined)(x.dataId)) {
      return false;
    }

    return (0, _lodash.isEqual)(x.dataId, payload.channelDataId);
  });
}

function getHeartbeatFromOldestParticipant(payload) {
  return (0, _lodash.minBy)(payload, function (x) {
    return x.participantCreationDate;
  });
}

function shouldBroadcastParticipantChangeRole(payload) {
  var result = {
    shouldChangeRole: false,
    newRole: null
  };
  var ownHeartbeat = payload.heartbeats.find(function (x) {
    return x.participantId === payload.participantId;
  });

  if ((0, _util.isNullOrUndefined)(ownHeartbeat.dataId)) {
    if (payload.currentBroadcastRole !== BroadcastRole.None) {
      return {
        newBroadcastRole: BroadcastRole.None,
        shouldChangeRole: true
      };
    } else {
      return result;
    }
  }

  var distinctHeartbeatsForOwnChannel = getDistinctHeartbeatsForChannel({
    heartbeats: payload.heartbeats,
    channelDataId: ownHeartbeat.dataId
  });

  if (distinctHeartbeatsForOwnChannel.length < 2) {
    if (payload.currentBroadcastRole !== BroadcastRole.None) {
      return {
        newBroadcastRole: BroadcastRole.None,
        shouldChangeRole: true
      };
    } else {
      return result;
    }
  }

  var elderSender = getHeartbeatFromOldestParticipant(distinctHeartbeatsForOwnChannel);

  if (elderSender.participantId === payload.participantId) {
    if (payload.currentBroadcastRole !== BroadcastRole.Leader) {
      return {
        newBroadcastRole: BroadcastRole.Leader,
        shouldChangeRole: true
      };
    } else {
      return result;
    }
  } else {
    if (payload.currentBroadcastRole !== BroadcastRole.Peon) {
      return {
        newBroadcastRole: BroadcastRole.Peon,
        shouldChangeRole: true
      };
    } else {
      return result;
    }
  }
}

function createBroadcastAction(payload) {
  return Object.assign({}, payload.action, {
    type: payload.action.type,
    participantId: payload.participant.participantId,
    participantCreationDate: payload.participant.participantCreationDate,
    dataId: payload.dataId
  });
}

function filterIncomingBroadcastAction(payload) {
  var doDataIdsExist = !(0, _util.isNullOrUndefined)(payload.action.dataId) && !(0, _util.isNullOrUndefined)(payload.dataId);

  if (!doDataIdsExist) {
    return false;
  }

  var areDataIdsEqual = (0, _lodash.isEqual)(payload.action.dataId, payload.dataId);

  if (!areDataIdsEqual) {
    return false;
  }

  var peonActionArrivesAtLeader = payload.action.type.startsWith(peonActionTypePrefix) && payload.ownBroadcastRole === BroadcastRole.Leader;

  if (peonActionArrivesAtLeader) {
    return true;
  }

  var leaderActionArrivesAtPeon = payload.action.type.startsWith(leaderActionTypePrefix) && payload.ownBroadcastRole === BroadcastRole.Peon;
  return leaderActionArrivesAtPeon;
}

var defaultShouldUpdateBrowserTabBroadcastRoleDisplayConfig = defaultBroadcastRoleDisplayConfig;

function shouldUpdateBrowserTabBroadcastRoleDisplay(payload) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultShouldUpdateBrowserTabBroadcastRoleDisplayConfig;
  var updatedTabTitle;
  var broadcastRoleLabel;
  var result = {
    shouldUpdateRoleDisplay: null,
    updatedBrowserTabTitle: null
  };

  switch (payload.currentBroadcastRole) {
    case BroadcastRole.None:
      break;

    case BroadcastRole.Leader:
      broadcastRoleLabel = config.leaderBrowserTabTitleSuffix;
      break;

    case BroadcastRole.Peon:
      broadcastRoleLabel = config.peonBrowserTabTitleSuffix;
      break;
  }

  if (!(0, _util.isNullOrUndefined)(broadcastRoleLabel)) {
    updatedTabTitle = payload.currentBrowserTabTitle;

    if (updatedTabTitle.endsWith(config.leaderBrowserTabTitleSuffix)) {
      updatedTabTitle = updatedTabTitle.replace(config.leaderBrowserTabTitleSuffix, "");
    } else if (updatedTabTitle.endsWith(config.peonBrowserTabTitleSuffix)) {
      updatedTabTitle = updatedTabTitle.replace(config.peonBrowserTabTitleSuffix, "");
    }

    updatedTabTitle += broadcastRoleLabel;
  } else {
    updatedTabTitle = payload.currentBrowserTabTitle;

    if (updatedTabTitle.endsWith(config.leaderBrowserTabTitleSuffix)) {
      updatedTabTitle = updatedTabTitle.replace(config.leaderBrowserTabTitleSuffix, "");
    } else if (updatedTabTitle.endsWith(config.peonBrowserTabTitleSuffix)) {
      updatedTabTitle = updatedTabTitle.replace(config.peonBrowserTabTitleSuffix, "");
    }
  }

  if (updatedTabTitle !== payload.currentBrowserTabTitle) {
    result.updatedBrowserTabTitle = updatedTabTitle;
  }

  result.shouldUpdateRoleDisplay = !(0, _util.isNullOrUndefined)(result.updatedBrowserTabTitle);
  return result;
}

function filterActionToPrefixWithLeaderPredicate(action) {
  return action.type.startsWith(compositeActionTypePrefix) || action.type.startsWith(trackRequestActionTypePrefix) || action.type.startsWith(authenticationActionTypePrefix);
}

function getBroadcastHeartbeatsForInterval(payload) {
  return payload.heartbeatsFromOtherParticipants.concat([createBroadcastHeartbeat({
    participant: payload.participant,
    dataId: payload.dataId
  })]);
}

var BroadcastEffects = function BroadcastEffects(actions$, store, channelService, config) {
  var _this5 = this;

  _classCallCheck(this, BroadcastEffects);

  this.actions$ = actions$;
  this.store = store;
  this.channelService = channelService;
  this.config = config;
  this.participant = createBroadcastParticipant();
  this.heartbeat$ = (0, _rxjs.interval)(this.config.heartbeartBroadcastInterval);
  this.cacheDataId$ = this.actions$.pipe((0, _effects.ofType)(setBroadcastChannelDataId), (0, _operators.tap)(function (action) {
    _this5.selectedDataId = action.payload;
  }));
  this.cacheOwnBroadcastRole$ = this.store.pipe((0, _store.select)(getOwnBroadcastRoleSelector)).pipe((0, _operators.tap)(function (ownBroadcastRole) {
    _this5.ownBroadcastRole = ownBroadcastRole;
  }));
  this.broadcastHeartbeat$ = this.heartbeat$.pipe((0, _operators.tap)(function () {
    var heartbeat = createBroadcastHeartbeat({
      participant: _this5.participant,
      dataId: _this5.selectedDataId
    });

    _this5.channelService.postHeartbeat(heartbeat);
  }));
  this.observeBroadcastedHeartbeats$ = this.channelService.getHeartbeat$().pipe((0, _operators.bufferTime)(this.config.incomingHeartbeatBufferInterval), (0, _operators.map)(function (heartbeartsFromOtherParticipants) {
    return getBroadcastHeartbeatsForInterval({
      heartbeatsFromOtherParticipants: heartbeartsFromOtherParticipants,
      participant: _this5.participant,
      dataId: _this5.selectedDataId
    });
  }), (0, _operators.map)(function (heartbeats) {
    var shouldChangeRoleResult = shouldBroadcastParticipantChangeRole({
      currentBroadcastRole: _this5.ownBroadcastRole,
      heartbeats: heartbeats,
      participantId: _this5.participant.participantId
    });

    if (shouldChangeRoleResult.shouldChangeRole) {
      // TODO: Experimental feature for trimming startAsPeon=true

      /* if (this.ownBroadcastRole === BroadcastRole.Peon) {
           if (window.location.href.includes("startAsPeon=true")) {
               window.location.href = window.location.href.replace("startAsPeon=true", "");
           }
       }*/
      return setOwnBroadcastRole({
        broadcastRole: shouldChangeRoleResult.newBroadcastRole
      });
    } else {
      return null;
    }
  }), (0, _operators.filter)(function (x) {
    return !(0, _util.isNullOrUndefined)(x);
  }));
  this.displayBroadcastRoleInBrowserTabTitle$ = this.actions$.pipe((0, _effects.ofType)(setOwnBroadcastRole), (0, _operators.filter)(function () {
    return !(0, _util.isNullOrUndefined)(_this5.config.updateBrowserTabTitleConfig);
  }), (0, _operators.tap)(function (action) {
    var result = shouldUpdateBrowserTabBroadcastRoleDisplay({
      currentBroadcastRole: action.broadcastRole,
      currentBrowserTabTitle: window.document.title
    }, _this5.config.updateBrowserTabTitleConfig);

    if (result.shouldUpdateRoleDisplay) {
      window.document.title = result.updatedBrowserTabTitle;
    }
  }));
  this.broadcastPeonAction$ = this.actions$.pipe((0, _operators.filter)(function (action) {
    return action.type.startsWith(peonActionTypePrefix);
  }), (0, _operators.tap)(function (action) {
    var actionMessage = createBroadcastAction({
      participant: _this5.participant,
      dataId: _this5.selectedDataId,
      action: action
    });

    _this5.channelService.postAction(actionMessage);
  }));
  this.createLeaderAction$ = this.store.pipe((0, _store.select)(getOwnBroadcastRoleSelector), (0, _operators.switchMap)(function (broadcastRole) {
    // TODO: Extract
    function tryTrimSelectionFromCompositeEntityAction(action) {
      if (action.type.startsWith(compositeActionTypePrefix)) {
        var typedAction = action;
        /**
         * Synchronize everything but the selection
         * which the client has to manage itself
         */

        return new _entityStore.CompositeEntityAction({
          add: typedAction.payload.add,
          clear: typedAction.payload.clear,
          remove: typedAction.payload.remove,
          set: typedAction.payload.set,
          update: typedAction.payload.update
        });
      } else {
        return action;
      }
    }

    if (broadcastRole === BroadcastRole.Leader) {
      return _this5.actions$.pipe((0, _operators.filter)(filterActionToPrefixWithLeaderPredicate), (0, _operators.map)(tryTrimSelectionFromCompositeEntityAction));
    } else {
      return (0, _rxjs.of)(null);
    }
  }), (0, _operators.filter)(function (x) {
    return !(0, _util.isNullOrUndefined)(x);
  }), (0, _operators.map)(function (action) {
    return Object.assign({}, action, {
      type: leaderActionTypePrefix + action.type
    });
  }));
  this.broadcastLeaderAction$ = this.actions$.pipe((0, _operators.filter)(function (action) {
    return action.type.startsWith(leaderActionTypePrefix);
  }), (0, _operators.tap)(function (action) {
    var actionMessage = createBroadcastAction({
      participant: _this5.participant,
      dataId: _this5.selectedDataId,
      action: action
    });

    _this5.channelService.postAction(actionMessage);
  }));
  this.observeBroadcastedActions$ = this.channelService.getAction$().pipe((0, _operators.filter)(function (action) {
    return filterIncomingBroadcastAction({
      action: action,
      dataId: _this5.selectedDataId,
      ownBroadcastRole: _this5.ownBroadcastRole
    });
  }), (0, _operators.map)(function (x) {
    return trimIncomingBroadcastAction(x);
  }));
  this.sendInitialData$ = this.actions$.pipe((0, _effects.ofType)(requestInitialData), (0, _operators.switchMap)(function () {
    return _this5.store.select(getOwnBroadcastRoleSelector).pipe((0, _operators.first)());
  }), (0, _operators.filter)(function (role) {
    return role === BroadcastRole.Leader && _this5.config.sendInitialState !== null && _this5.config.sendInitialState !== undefined;
  }), (0, _operators.switchMap)(function () {
    return _this5.store.pipe((0, _operators.first)());
  }), (0, _operators.switchMap)(function (state) {
    if (Array.isArray(_this5.config.sendInitialState)) {
      var actionFactories = _this5.config.sendInitialState;
      return (0, _rxjs.from)(actionFactories.map(function (actionFactory) {
        return actionFactory(state);
      }));
    } else {
      var actionFactory = _this5.config.sendInitialState;
      return (0, _rxjs.from)([prefixAction({
        action: actionFactory(state),
        prefix: leaderActionTypePrefix
      })]);
    }
  }));
  this.requestInitialData$ = this.store.select(getOwnBroadcastRoleSelector).pipe((0, _operators.distinctUntilChanged)(), (0, _operators.filter)(function (role) {
    return role === BroadcastRole.Peon && _this5.config.sendInitialState !== null && _this5.config.sendInitialState !== undefined;
  }), (0, _operators.map)(function () {
    return prefixAction({
      action: requestInitialData,
      prefix: peonActionTypePrefix
    });
  }));
  this.openUrlAsPeon$ = this.actions$.pipe((0, _effects.ofType)(openUrlAsPeon), (0, _operators.switchMap)(function (action) {
    return _this5.store.select(getOwnBroadcastRoleSelector).pipe((0, _operators.first)(), (0, _operators.tap)(function (broadcastRole) {
      window.open(action.url + "?startAsPeon=true");

      if (broadcastRole !== BroadcastRole.Leader) {
        _this5.store.dispatch(setOwnBroadcastRole({
          broadcastRole: BroadcastRole.Leader
        }));
      }
    }));
  }));
};

exports.ɵbj = BroadcastEffects;
BroadcastEffects.decorators = [{
  type: _core.Injectable
}];

BroadcastEffects.ctorParameters = function () {
  return [{
    type: _effects.Actions
  }, {
    type: _store.Store
  }, {
    type: BroadcastChannelService
  }, {
    type: undefined,
    decorators: [{
      type: _core.Inject,
      args: [BROADCAST_CONFIG]
    }]
  }];
};

(0, _tslib.__decorate)([(0, _effects.Effect)({
  dispatch: false
})], BroadcastEffects.prototype, "cacheDataId$", void 0);
(0, _tslib.__decorate)([(0, _effects.Effect)({
  dispatch: false
})], BroadcastEffects.prototype, "cacheOwnBroadcastRole$", void 0);
(0, _tslib.__decorate)([(0, _effects.Effect)({
  dispatch: false
})], BroadcastEffects.prototype, "broadcastHeartbeat$", void 0);
(0, _tslib.__decorate)([(0, _effects.Effect)()], BroadcastEffects.prototype, "observeBroadcastedHeartbeats$", void 0);
(0, _tslib.__decorate)([(0, _effects.Effect)({
  dispatch: false
})], BroadcastEffects.prototype, "displayBroadcastRoleInBrowserTabTitle$", void 0);
(0, _tslib.__decorate)([(0, _effects.Effect)({
  dispatch: false
})], BroadcastEffects.prototype, "broadcastPeonAction$", void 0);
(0, _tslib.__decorate)([(0, _effects.Effect)()], BroadcastEffects.prototype, "createLeaderAction$", void 0);
(0, _tslib.__decorate)([(0, _effects.Effect)({
  dispatch: false
})], BroadcastEffects.prototype, "broadcastLeaderAction$", void 0);
(0, _tslib.__decorate)([(0, _effects.Effect)()], BroadcastEffects.prototype, "observeBroadcastedActions$", void 0);
(0, _tslib.__decorate)([(0, _effects.Effect)()], BroadcastEffects.prototype, "sendInitialData$", void 0);
(0, _tslib.__decorate)([(0, _effects.Effect)()], BroadcastEffects.prototype, "requestInitialData$", void 0);
(0, _tslib.__decorate)([(0, _effects.Effect)({
  dispatch: false
})], BroadcastEffects.prototype, "openUrlAsPeon$", void 0);
var BROADCAST_REDUCER = new _core.InjectionToken("BroadcastStoreReducer");
exports.ɵi = BROADCAST_REDUCER;

function broadcastReducerFactory() {
  return broadcastReducer;
}

var broadcastReducerProvider = {
  provide: BROADCAST_REDUCER,
  useFactory: broadcastReducerFactory
};
exports.ɵk = broadcastReducerProvider;
var ɵ0$3 = defaultBroadcastConfig;

var DgpBroadcastStoreModule = /*#__PURE__*/function () {
  function DgpBroadcastStoreModule() {
    _classCallCheck(this, DgpBroadcastStoreModule);
  }

  _createClass(DgpBroadcastStoreModule, null, [{
    key: "forRoot",
    value: function forRoot() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultBroadcastConfig;
      return {
        ngModule: DgpBroadcastStoreModule,
        providers: [{
          provide: BROADCAST_CONFIG,
          useValue: config
        }, broadcastStoreProvider]
      };
    }
  }]);

  return DgpBroadcastStoreModule;
}();

exports.DgpBroadcastStoreModule = DgpBroadcastStoreModule;
DgpBroadcastStoreModule.decorators = [{
  type: _core.NgModule,
  args: [{
    imports: [_store.StoreModule.forFeature(broadcastStoreFeature, BROADCAST_REDUCER), _effects.EffectsModule.forFeature([BroadcastEffects]), _snackBar.MatSnackBarModule],
    providers: [broadcastChannelServiceProvider, {
      provide: BROADCAST_CONFIG,
      useValue: ɵ0$3
    }, NoPeonGuard, broadcastReducerProvider]
  }]
}];
var cancelButtonConfig = {
  label: "Cancel",
  returnValue: null,
  matIconName: "close"
};
exports.cancelButtonConfig = cancelButtonConfig;
var confirmButtonConfig = {
  label: "Confirm",
  returnValue: true,
  matIconName: "delete",
  color: "primary"
};
exports.confirmButtonConfig = confirmButtonConfig;

var DgpConfirmDialogComponent = function DgpConfirmDialogComponent() {
  _classCallCheck(this, DgpConfirmDialogComponent);

  this.confirmButtonConfig = confirmButtonConfig;
  this.cancelButtonConfig = cancelButtonConfig;
};

exports.DgpConfirmDialogComponent = DgpConfirmDialogComponent;
DgpConfirmDialogComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-confirm-dialog",
    template: "\n        <h2 mat-dialog-title>\n            {{ title }}\n        </h2>\n\n        <mat-dialog-content>\n            <ng-content></ng-content>\n        </mat-dialog-content>\n\n        <mat-dialog-actions>\n            <button [mat-dialog-close]=\"cancelButtonConfig.returnValue\"\n                    [color]=\"cancelButtonConfig.color\"\n                    mat-raised-button>\n                <mat-icon>{{cancelButtonConfig.matIconName}}</mat-icon>\n                {{ cancelButtonConfig.label }}\n            </button>\n\n            <button [mat-dialog-close]=\"confirmButtonConfig.returnValue\"\n                    mat-raised-button\n                    [color]=\"confirmButtonConfig.color\">\n                <mat-icon>{{confirmButtonConfig.matIconName}}</mat-icon>\n                {{confirmButtonConfig.label}}\n            </button>\n        </mat-dialog-actions>\n\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        :host {\n            display: block;\n            width: 360px;\n        }\n    "]
  }]
}];
DgpConfirmDialogComponent.propDecorators = {
  title: [{
    type: _core.Input
  }],
  confirmButtonConfig: [{
    type: _core.Input
  }],
  cancelButtonConfig: [{
    type: _core.Input
  }]
};

var DgpConfirmDialogModule = function DgpConfirmDialogModule() {
  _classCallCheck(this, DgpConfirmDialogModule);
};

exports.DgpConfirmDialogModule = DgpConfirmDialogModule;
DgpConfirmDialogModule.decorators = [{
  type: _core.NgModule,
  args: [{
    imports: [_dialog.MatDialogModule, _button.MatButtonModule, _icon.MatIconModule],
    declarations: [DgpConfirmDialogComponent],
    exports: [DgpConfirmDialogComponent],
    entryComponents: [DgpConfirmDialogComponent]
  }]
}];

var EmptyStateComponent = function EmptyStateComponent() {
  _classCallCheck(this, EmptyStateComponent);
};

exports.EmptyStateComponent = EmptyStateComponent;
EmptyStateComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-empty-state",
    template: "\n        <dgp-empty-state-icon *ngIf=\"matIconName\">\n            {{ matIconName }}\n        </dgp-empty-state-icon>\n        <dgp-empty-state-title>\n            {{ title }}\n        </dgp-empty-state-title>\n\n        <dgp-empty-state-content>\n            <ng-content></ng-content>\n        </dgp-empty-state-content>\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        :host {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            max-height: 640px;\n            height: 100%;\n            justify-content: center;\n            align-items: center;\n        }\n    "]
  }]
}];
EmptyStateComponent.propDecorators = {
  matIconName: [{
    type: _core.Input
  }],
  title: [{
    type: _core.Input
  }]
};

var EmptyStateContentComponent = function EmptyStateContentComponent() {
  _classCallCheck(this, EmptyStateContentComponent);
};

exports.ɵbp = EmptyStateContentComponent;
EmptyStateContentComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-empty-state-content",
    template: "<ng-content></ng-content>",
    changeDetection: _core.ChangeDetectionStrategy.OnPush
  }]
}];

var EmptyStateIconComponent = function EmptyStateIconComponent() {
  _classCallCheck(this, EmptyStateIconComponent);
};

exports.ɵbq = EmptyStateIconComponent;
EmptyStateIconComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-empty-state-icon",
    template: "\n        <mat-icon class=\"icon\">\n            <ng-content></ng-content>\n        </mat-icon>\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        :host {\n            margin-left: 16px;\n            margin-right: 16px;\n            display: inline-flex;\n        }\n\n        .icon {\n            color: gray;\n            font-size: 64px;\n            width: 64px;\n            height: 64px;\n        }\n    "]
  }]
}];

var EmptyStateTitleComponent = function EmptyStateTitleComponent() {
  _classCallCheck(this, EmptyStateTitleComponent);
};

exports.ɵbr = EmptyStateTitleComponent;
EmptyStateTitleComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-empty-state-title",
    template: "\n        <h1 class=\"mat-h1\">\n            <ng-content></ng-content>\n        </h1>\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        :host {\n            display: inline-flex;\n            color: gray;\n        }\n    "]
  }]
}];

var DgpEmptyStateModule = function DgpEmptyStateModule() {
  _classCallCheck(this, DgpEmptyStateModule);
};

exports.DgpEmptyStateModule = DgpEmptyStateModule;
DgpEmptyStateModule.decorators = [{
  type: _core.NgModule,
  args: [{
    imports: [_common.CommonModule, _icon.MatIconModule],
    declarations: [EmptyStateComponent, EmptyStateContentComponent, EmptyStateIconComponent, EmptyStateTitleComponent],
    exports: [EmptyStateComponent]
  }]
}];
var FILE_VIEWER_CONFIG = new _core.InjectionToken("DgpFileViewerConfig");
exports.FILE_VIEWER_CONFIG = FILE_VIEWER_CONFIG;

function getFileItemSizeLabel(size) {
  if (size < 1000) {
    return (size / 1000).toFixed(2) + " Kb";
  } else {
    return (size / (1000 * 1000)).toFixed(2) + " Mb";
  }
}

function parseFileNameWithExtension(fileNameWithExtension) {
  var lastPeriodIndex = fileNameWithExtension.indexOf(".");
  var extension = fileNameWithExtension.substring(lastPeriodIndex + 1, fileNameWithExtension.length);
  var fileName = fileNameWithExtension.substring(0, lastPeriodIndex);
  return {
    extension: extension,
    fileName: fileName
  };
}

function getMimeTypeFromExtension(extension) {
  switch (extension) {
    case "pdf":
      return "application/pdf";

    default:
      return null;
  }
}

function getFileItemsFromFileList(fileList) {
  var result = new Array();

  for (var i = 0; i < fileList.length; i++) {
    var file = fileList.item(i);
    var objectUrl = URL.createObjectURL(file);
    var fileItem = Object.assign({
      fileItemId: createGuid(),
      size: file.size,
      url: objectUrl,
      creationDate: new Date(file.lastModified),
      isSaved: false
    }, parseFileNameWithExtension(file.name));
    result.push(fileItem);
  }

  return result;
}

function getFileFromFileItem$(fileItem) {
  return new Promise(function (resolve) {
    return fetch(fileItem.url, {
      credentials: "include"
    }).then(function (x) {
      return x.blob();
    }).then(function (x) {
      var file = new Blob([x], {
        type: getMimeTypeFromExtension(fileItem.extension)
      });
      file.name = fileItem.fileName + "." + fileItem.extension;
      resolve(file);
    })["catch"](function (reason) {
      console.error(reason);
    });
  });
}

function getFileFromUrl$(url) {
  return new Promise(function (resolve) {
    return fetch(url).then(function (x) {
      return x.blob();
    }).then(function (x) {
      var file = new Blob([x]);
      resolve(file);
    })["catch"](function (reason) {
      console.error(reason);
    });
  });
}

function parseContentAsStringMatrix(csvFileContent) {
  var csv = csvFileContent;
  var allTextLines = csv.split(/\r\n|\n/).filter(function (x) {
    return x.length !== 0;
  });
  var lines = [];
  allTextLines.forEach(function (line) {
    var segments = line.split(";");
    lines = lines.concat([segments]);
  });
  return lines;
}

function parseCSVFile$(fileToRead) {
  return new Promise(function (resolve) {
    var reader = new FileReader();
    reader.readAsText(fileToRead);

    reader.onload = function (event) {
      var csv = event.target.result;
      resolve(parseContentAsStringMatrix(csv));
    };
  });
} // tslint:disable-next-line:directive-class-suffix


var FileViewerComponentBase = function FileViewerComponentBase() {
  _classCallCheck(this, FileViewerComponentBase);
};

exports.FileViewerComponentBase = FileViewerComponentBase;
FileViewerComponentBase.decorators = [{
  type: _core.Directive
}];
FileViewerComponentBase.propDecorators = {
  fileItem: [{
    type: _core.Input
  }]
};

var FallbackFileViewerComponent = /*#__PURE__*/function (_FileViewerComponentB) {
  _inherits(FallbackFileViewerComponent, _FileViewerComponentB);

  var _super3 = _createSuper(FallbackFileViewerComponent);

  function FallbackFileViewerComponent(platform) {
    var _this6;

    _classCallCheck(this, FallbackFileViewerComponent);

    _this6 = _super3.call(this);
    _this6.platform = platform;
    _this6.isTridentOrEdge = _this6.platform.TRIDENT || _this6.platform.EDGE;
    return _this6;
  }

  _createClass(FallbackFileViewerComponent, [{
    key: "ngAfterViewInit",
    value: function ngAfterViewInit() {
      this.isTridentOrEdge = this.platform.TRIDENT || this.platform.EDGE;
    }
  }, {
    key: "downloadFileInTridentOrEdge",
    value: function downloadFileInTridentOrEdge() {
      return (0, _tslib.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var file;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return getFileFromFileItem$(this.fileItem);

              case 2:
                file = _context2.sent;
                window.navigator.msSaveOrOpenBlob(file, file.name);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
    }
  }]);

  return FallbackFileViewerComponent;
}(FileViewerComponentBase);

exports.FallbackFileViewerComponent = FallbackFileViewerComponent;
FallbackFileViewerComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-fallback-file-viewer",
    template: "\n        <dgp-empty-state title=\"No preview available\"\n                         matIconName=\"get_app\">\n\n            <a *ngIf=\"!isTridentOrEdge; else ieFallback\"\n               class=\"download-link\"\n               [href]=\"fileItem.url | safe:'url'\"\n               target=\"_blank\">\n                Download it here\n            </a>\n\n            <ng-template #ieFallback>\n                <a class=\"download-link\"\n                   href=\"javascript:;\"\n                   (click)=\"downloadFileInTridentOrEdge()\">\n                    Download it here\n                </a>\n            </ng-template>\n\n        </dgp-empty-state>\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        :host {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            width: 100%;\n            height: 100%;\n        }\n\n        .download-link {\n            color: inherit;\n        }\n    "]
  }]
}];

FallbackFileViewerComponent.ctorParameters = function () {
  return [{
    type: _platform.Platform
  }];
};

var FileItemListComponent = /*#__PURE__*/function () {
  function FileItemListComponent() {
    _classCallCheck(this, FileItemListComponent);

    this.fileItemRemoved = new _core.EventEmitter();
  }

  _createClass(FileItemListComponent, [{
    key: "getFileItemSize",
    value: function getFileItemSize(fileItem) {
      return getFileItemSizeLabel(fileItem.size);
    }
  }, {
    key: "removeFileItem",
    value: function removeFileItem(fileItem) {
      if (this.disabled) return;
      this.fileItemRemoved.emit(fileItem);
    }
  }]);

  return FileItemListComponent;
}();

exports.FileItemListComponent = FileItemListComponent;
FileItemListComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-file-item-list",
    template: "\n        <mat-nav-list style=\"overflow: auto;\">\n            <ng-container *ngFor=\"let directory of model.directories\">\n                <h3 mat-subheader>{{ directory.label }}</h3>\n\n                <a *ngFor=\"let fileItemId of directory.fileItemIds\"\n                   mat-list-item\n                   [routerLink]=\"[]\"\n                   routerLinkActive=\"dgp-list-item --selected\"\n                   [queryParams]=\"{ fileItemId: model.fileItemKVS[fileItemId].fileItemId }\"\n                   queryParamsHandling=\"preserve\"\n                   [matTooltip]=\"model.fileItemKVS[fileItemId].fileName\"\n                   matTooltipShowDelay=\"500\"\n                   (keydown.delete)=\"removeFileItem(model.fileItemKVS[fileItemId])\">\n                    <mat-icon matListIcon>\n                        insert_drive_file\n                    </mat-icon>\n                    <div matLine\n                         style=\"display: flex; align-items: center;\">\n\n                        <div style=\"flex-grow: 1; display: flex; flex-direction: column; overflow: hidden;\">\n\n                            <div style=\"flex-grow: 1; display: flex;\">\n                                {{ model.fileItemKVS[fileItemId].fileName }}\n                                <dgp-spacer></dgp-spacer>\n                                <small>{{ model.fileItemKVS[fileItemId].extension }}</small>\n                            </div>\n\n                            <div style=\"display: flex;\">\n                                <small>{{ model.fileItemKVS[fileItemId].creationDate | date:'hh:mm, dd MMMM yyyy' }}</small>\n                                <dgp-spacer></dgp-spacer>\n                                <small>{{ getFileItemSize(model.fileItemKVS[fileItemId]) }}</small>\n                            </div>\n                        </div>\n\n                        <button mat-icon-button\n                                style=\"margin-left: 16px;\"\n                                [matMenuTriggerFor]=\"overflowMenu\"\n                                [disabled]=\"disabled\">\n\n                            <mat-icon>\n                                more_vert\n                            </mat-icon>\n\n                        </button>\n\n                        <mat-menu #overflowMenu=\"matMenu\">\n                            <button mat-menu-item\n                                    (click)=\"removeFileItem(model.fileItemKVS[fileItemId])\"\n                                    [disabled]=\"disabled\">Remove\n                            </button>\n                        </mat-menu>\n\n                    </div>\n                </a>\n\n            </ng-container>\n        </mat-nav-list>\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        :host {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            overflow: auto;\n        }\n    "]
  }]
}];
FileItemListComponent.propDecorators = {
  disabled: [{
    type: _core.Input
  }],
  fileItemRemoved: [{
    type: _core.Output
  }],
  model: [{
    type: _core.Input
  }]
};

var FileViewerComponent = /*#__PURE__*/function (_FileViewerComponentB2) {
  _inherits(FileViewerComponent, _FileViewerComponentB2);

  var _super4 = _createSuper(FileViewerComponent);

  function FileViewerComponent(config) {
    var _this7;

    _classCallCheck(this, FileViewerComponent);

    _this7 = _super4.call(this);
    _this7.config = config;
    return _this7;
  }

  _createClass(FileViewerComponent, [{
    key: "ngOnChanges",
    value: function ngOnChanges(changes) {
      if (changes && changes.fileItem) {
        if (this.fileItem) {
          this.isKnownFileType = this.config.fileTypeViewerMap[this.fileItem.extension] === null || this.config.fileTypeViewerMap[this.fileItem.extension] === undefined;
        }
      }
    }
  }]);

  return FileViewerComponent;
}(FileViewerComponentBase);

exports.FileViewerComponent = FileViewerComponent;
FileViewerComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-file-viewer",
    template: "\n\n        <ng-container *ngIf=\"isKnownFileType; else dynamicViewer\">\n            <ng-container [ngSwitch]=\"fileItem.extension\">\n                <dgp-jpg-viewer *ngSwitchCase=\"'jpg'\"\n                                [fileItem]=\"fileItem\"></dgp-jpg-viewer>\n                <dgp-pdf-viewer *ngSwitchCase=\"'pdf'\"\n                                [fileItem]=\"fileItem\"></dgp-pdf-viewer>\n                <dgp-png-viewer *ngSwitchCase=\"'png'\"\n                                [fileItem]=\"fileItem\"></dgp-png-viewer>\n                <dgp-svg-viewer *ngSwitchCase=\"'svg'\"\n                                [fileItem]=\"fileItem\"></dgp-svg-viewer>\n                <dgp-fallback-file-viewer *ngSwitchDefault\n                                          [fileItem]=\"fileItem\"></dgp-fallback-file-viewer>\n            </ng-container>\n        </ng-container>\n\n        <ng-template #dynamicViewer>\n            <dgp-dynamic-file-viewer [fileItem]=\"fileItem\"></dgp-dynamic-file-viewer>\n        </ng-template>\n\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        :host {\n            display: flex;\n            flex-grow: 1;\n            flex-direction: column;\n            justify-content: center;\n            align-items: center;\n        }\n    "]
  }]
}];

FileViewerComponent.ctorParameters = function () {
  return [{
    type: undefined,
    decorators: [{
      type: _core.Inject,
      args: [FILE_VIEWER_CONFIG]
    }]
  }];
};

var DynamicFileViewerComponent = /*#__PURE__*/function (_FileViewerComponentB3) {
  _inherits(DynamicFileViewerComponent, _FileViewerComponentB3);

  var _super5 = _createSuper(DynamicFileViewerComponent);

  function DynamicFileViewerComponent(componentFactoryResolver, viewContainerRef, config) {
    var _this8;

    _classCallCheck(this, DynamicFileViewerComponent);

    _this8 = _super5.call(this);
    _this8.componentFactoryResolver = componentFactoryResolver;
    _this8.viewContainerRef = viewContainerRef;
    _this8.config = config;
    return _this8;
  }

  _createClass(DynamicFileViewerComponent, [{
    key: "ngOnChanges",
    value: function ngOnChanges(changes) {
      if (changes && changes.fileItem) {
        if (this.fileItem) {
          this.loadComponent(this.fileItem);
        } else {
          this.clear();
        }
      }
    }
  }, {
    key: "loadComponent",
    value: function loadComponent(fileItem) {
      var fileType = fileItem.extension;
      var componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.config.fileTypeViewerMap[fileType.toLowerCase()] ? this.config.fileTypeViewerMap[fileType.toLowerCase()] : this.config.fileTypeViewerMap["default"]);
      this.viewContainerRef.clear();
      var componentRef = this.viewContainerRef.createComponent(componentFactory);
      var viewerComponent = componentRef.instance;
      viewerComponent.fileItem = this.fileItem;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.viewContainerRef.clear();
    }
  }]);

  return DynamicFileViewerComponent;
}(FileViewerComponentBase);

exports.DynamicFileViewerComponent = DynamicFileViewerComponent;
DynamicFileViewerComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-dynamic-file-viewer",
    template: "",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        :host {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            width: 100%;\n            height: 100%;\n        }\n    "]
  }]
}];

DynamicFileViewerComponent.ctorParameters = function () {
  return [{
    type: _core.ComponentFactoryResolver
  }, {
    type: _core.ViewContainerRef
  }, {
    type: undefined,
    decorators: [{
      type: _core.Inject,
      args: [FILE_VIEWER_CONFIG]
    }]
  }];
};

var JpgViewerComponent = /*#__PURE__*/function (_FileViewerComponentB4) {
  _inherits(JpgViewerComponent, _FileViewerComponentB4);

  var _super6 = _createSuper(JpgViewerComponent);

  function JpgViewerComponent(platform) {
    var _this9;

    _classCallCheck(this, JpgViewerComponent);

    _this9 = _super6.call(this);
    _this9.platform = platform;
    _this9.isTrident = _this9.platform.TRIDENT;
    return _this9;
  }

  return JpgViewerComponent;
}(FileViewerComponentBase);

exports.JpgViewerComponent = JpgViewerComponent;
JpgViewerComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-jpg-viewer",
    template: "\n        <img *ngIf=\"!isTrident; else fallback\"\n             [src]=\"fileItem.url | safe:'url'\"\n             class=\"image\"\n             alt=\"{{ fileItem.fileName }}\">\n        <ng-template #fallback>\n            <div class=\"trident-container\">\n                <img [src]=\"fileItem.url | safe:'url'\"\n                     class=\"trident-image\"\n                     alt=\"{{ fileItem.fileName }}\">\n            </div>\n        </ng-template>\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        :host {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            width: 100%;\n            height: 100%;\n        }\n\n        .image {\n            max-width: 100%;\n            max-height: 100%;\n            object-fit: contain;\n        }\n\n        .trident-container {\n            display: flex;\n            overflow: auto;\n            flex-shrink: 0;\n        }\n\n        .trident-image {\n            margin: auto;\n            flex-shrink: 0;\n        }\n    "]
  }]
}];

JpgViewerComponent.ctorParameters = function () {
  return [{
    type: _platform.Platform
  }];
};

var PdfViewerComponent = /*#__PURE__*/function (_FileViewerComponentB5) {
  _inherits(PdfViewerComponent, _FileViewerComponentB5);

  var _super7 = _createSuper(PdfViewerComponent);

  function PdfViewerComponent(platform, cd) {
    var _this10;

    _classCallCheck(this, PdfViewerComponent);

    _this10 = _super7.call(this);
    _this10.platform = platform;
    _this10.cd = cd;
    return _this10;
  }

  _createClass(PdfViewerComponent, [{
    key: "ngOnChanges",
    value: function ngOnChanges(changes) {
      if (changes.fileItem && this.platform.EDGE) {
        this.edgeHTML = "\n                <embed src=\"".concat(this.fileItem.url, "\"\n                       type=\"application/pdf\"\n                       width=\"100%\"\n                       height=\"100%\">\n            ");
        this.cd.markForCheck();
      }
    }
  }]);

  return PdfViewerComponent;
}(FileViewerComponentBase);

exports.PdfViewerComponent = PdfViewerComponent;
PdfViewerComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-pdf-viewer",
    template: "\n\n        <ng-container *ngIf=\"platform.FIREFOX || platform.BLINK || platform.EDGE; else fallback\">\n\n            <ng-container *ngIf=\"platform.FIREFOX || platform.BLINK\">\n                <object [attr.data]=\"fileItem.url | safe:'resourceUrl'\"\n                        type=\"application/pdf\"\n                        width=\"100%\"\n                        height=\"100%\">\n                    <dgp-fallback-file-viewer [fileItem]=\"fileItem\"></dgp-fallback-file-viewer>\n                </object>\n            </ng-container>\n\n            <ng-container *ngIf=\"platform.EDGE\">\n                <div [innerHTML]=\"edgeHTML | safe:'html'\"\n                     class=\"edge-helper\"></div>\n            </ng-container>\n\n        </ng-container>\n\n        <ng-template #fallback>\n            <dgp-fallback-file-viewer [fileItem]=\"fileItem\"></dgp-fallback-file-viewer>\n        </ng-template>\n\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        :host {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            width: 100%;\n            height: 100%;\n        }\n\n        .edge-helper {\n            flex-grow: 1;\n        }\n    "]
  }]
}];

PdfViewerComponent.ctorParameters = function () {
  return [{
    type: _platform.Platform
  }, {
    type: _core.ChangeDetectorRef
  }];
};

var PngViewerComponent = /*#__PURE__*/function (_FileViewerComponentB6) {
  _inherits(PngViewerComponent, _FileViewerComponentB6);

  var _super8 = _createSuper(PngViewerComponent);

  function PngViewerComponent(platform) {
    var _this11;

    _classCallCheck(this, PngViewerComponent);

    _this11 = _super8.call(this);
    _this11.platform = platform;
    _this11.isTrident = _this11.platform.TRIDENT;
    return _this11;
  }

  return PngViewerComponent;
}(FileViewerComponentBase);

exports.PngViewerComponent = PngViewerComponent;
PngViewerComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-png-viewer",
    template: "\n        <img *ngIf=\"!isTrident; else fallback\"\n             [src]=\"fileItem.url | safe:'url'\"\n             class=\"image\"\n             alt=\"{{ fileItem.fileName }}\">\n        <ng-template #fallback>\n            <div class=\"trident-container\">\n                <img [src]=\"fileItem.url | safe:'url'\"\n                     class=\"trident-image\"\n                     alt=\"{{ fileItem.fileName }}\">\n            </div>\n        </ng-template>\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        :host {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            width: 100%;\n            height: 100%;\n        }\n\n        .image {\n            max-width: 100%;\n            max-height: 100%;\n            object-fit: contain;\n        }\n\n        .trident-container {\n            display: flex;\n            overflow: auto;\n            flex-shrink: 0;\n        }\n\n        .trident-image {\n            margin: auto;\n            flex-shrink: 0;\n        }\n\n    "]
  }]
}];

PngViewerComponent.ctorParameters = function () {
  return [{
    type: _platform.Platform
  }];
};

var SvgViewerComponent = /*#__PURE__*/function (_FileViewerComponentB7) {
  _inherits(SvgViewerComponent, _FileViewerComponentB7);

  var _super9 = _createSuper(SvgViewerComponent);

  function SvgViewerComponent(platform) {
    var _this12;

    _classCallCheck(this, SvgViewerComponent);

    _this12 = _super9.call(this);
    _this12.platform = platform;
    _this12.isTrident = _this12.platform.TRIDENT;
    return _this12;
  }

  return SvgViewerComponent;
}(FileViewerComponentBase);

exports.SvgViewerComponent = SvgViewerComponent;
SvgViewerComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-svg-viewer",
    template: "\n        <img *ngIf=\"!isTrident; else fallback\"\n             [src]=\"fileItem.url | safe:'url'\"\n             class=\"image\"\n             alt=\"{{ fileItem.fileName }}\">\n        <ng-template #fallback>\n            <div class=\"trident-container\">\n                <img [src]=\"fileItem.url | safe:'url'\"\n                     class=\"trident-image\"\n                     alt=\"{{ fileItem.fileName }}\">\n            </div>\n        </ng-template>\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        :host {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            width: 100%;\n            height: 100%;\n        }\n\n        .image {\n            max-width: 100%;\n            max-height: 100%;\n            object-fit: contain;\n        }\n\n        .trident-container {\n            display: flex;\n            overflow: auto;\n            flex-shrink: 0;\n        }\n\n        .trident-image {\n            margin: auto;\n            flex-shrink: 0;\n        }\n\n    "]
  }]
}];

SvgViewerComponent.ctorParameters = function () {
  return [{
    type: _platform.Platform
  }];
};

var SpacerComponent = function SpacerComponent() {
  _classCallCheck(this, SpacerComponent);
};

exports.SpacerComponent = SpacerComponent;
SpacerComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-spacer",
    template: "",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        :host {\n            flex-grow: 1;\n        }\n    "]
  }]
}];

var DgpSpacerModule = function DgpSpacerModule() {
  _classCallCheck(this, DgpSpacerModule);
};

exports.DgpSpacerModule = DgpSpacerModule;
DgpSpacerModule.decorators = [{
  type: _core.NgModule,
  args: [{
    declarations: [SpacerComponent],
    exports: [SpacerComponent]
  }]
}];

var SafePipe = /*#__PURE__*/function () {
  function SafePipe(sanitizer) {
    _classCallCheck(this, SafePipe);

    this.sanitizer = sanitizer;
  }

  _createClass(SafePipe, [{
    key: "transform",
    value: function transform(value, type) {
      switch (type) {
        case "html":
          return this.sanitizer.bypassSecurityTrustHtml(value);

        case "style":
          return this.sanitizer.bypassSecurityTrustStyle(value);

        case "script":
          return this.sanitizer.bypassSecurityTrustScript(value);

        case "url":
          return this.sanitizer.bypassSecurityTrustUrl(value);

        case "resourceUrl":
          return this.sanitizer.bypassSecurityTrustResourceUrl(value);

        default:
          throw new Error("Invalid safe type specified: ".concat(type));
      }
    }
  }]);

  return SafePipe;
}();

exports.SafePipe = SafePipe;
SafePipe.decorators = [{
  type: _core.Pipe,
  args: [{
    name: "safe"
  }]
}];

SafePipe.ctorParameters = function () {
  return [{
    type: _platformBrowser.DomSanitizer
  }];
};

var SafePipeModule = function SafePipeModule() {
  _classCallCheck(this, SafePipeModule);
};

exports.SafePipeModule = SafePipeModule;
SafePipeModule.decorators = [{
  type: _core.NgModule,
  args: [{
    declarations: [SafePipe],
    exports: [SafePipe]
  }]
}]; // TODO: Add bmp

var defaultFileTypeViewerMap = {};
exports.defaultFileTypeViewerMap = defaultFileTypeViewerMap;
var defaultFileViewerConfig = {
  fileTypeViewerMap: defaultFileTypeViewerMap
};
exports.defaultFileViewerConfig = defaultFileViewerConfig;

var DgpFileViewerModule = /*#__PURE__*/function () {
  function DgpFileViewerModule() {
    _classCallCheck(this, DgpFileViewerModule);
  }

  _createClass(DgpFileViewerModule, null, [{
    key: "forRoot",
    value: function forRoot() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultFileViewerConfig;
      return {
        ngModule: DgpFileViewerModule,
        providers: [{
          provide: FILE_VIEWER_CONFIG,
          useValue: config
        }]
      };
    }
  }]);

  return DgpFileViewerModule;
}();

exports.DgpFileViewerModule = DgpFileViewerModule;
DgpFileViewerModule.decorators = [{
  type: _core.NgModule,
  args: [{
    imports: [_platform.PlatformModule, DgpEmptyStateModule, _list.MatListModule, _router.RouterModule, _common.CommonModule, _tooltip.MatTooltipModule, _icon.MatIconModule, DgpSpacerModule, _button.MatButtonModule, _menu.MatMenuModule, SafePipeModule],
    declarations: [PdfViewerComponent, JpgViewerComponent, PngViewerComponent, SvgViewerComponent, FileViewerComponent, FallbackFileViewerComponent, FileItemListComponent, DynamicFileViewerComponent],
    exports: [PdfViewerComponent, JpgViewerComponent, PngViewerComponent, SvgViewerComponent, FileViewerComponent, FallbackFileViewerComponent, FileItemListComponent, DynamicFileViewerComponent],
    providers: [{
      provide: FILE_VIEWER_CONFIG,
      useValue: defaultFileViewerConfig
    }]
  }]
}];
var openFileManagerOverlay = (0, _store.createAction)("[FileUpload] OpenFileManagerOverlay", (0, _store.props)());
exports.openFileManagerOverlay = openFileManagerOverlay;
var openFileManager = openFileManagerOverlay;
exports.openFileManager = openFileManager;
var closeFileManager = (0, _store.createAction)("[FileUpload] CloseFileManager");
exports.closeFileManager = closeFileManager;
var addFilesViaDrop = (0, _store.createAction)("[FileUpload] AddFiles", (0, _store.props)());
exports.addFilesViaDrop = addFilesViaDrop;
var addFiles = addFilesViaDrop;
exports.addFiles = addFiles;
var removeFile = (0, _store.createAction)("[FileUpload] RemoveFile", (0, _store.props)());
exports.removeFile = removeFile;
var showDropTarget = (0, _store.createAction)("[FileUpload] ShowDropTarget");
exports.showDropTarget = showDropTarget;
var hideDropTarget = (0, _store.createAction)("[FileUpload] HideDropTarget");
exports.hideDropTarget = hideDropTarget;
var setConfig = (0, _store.createAction)("[FileUpload] SetConfig", (0, _store.props)());
exports.setConfig = setConfig;

var DragFileListenerDirective = function DragFileListenerDirective(store, elementRef) {
  _classCallCheck(this, DragFileListenerDirective);

  this.store = store;
  this.elementRef = elementRef;

  function dragOverHandler(e) {
    e.preventDefault();
    store.dispatch(openFileManager({}));
  }

  this.elementRef.nativeElement.addEventListener("dragover", dragOverHandler);
};

exports.DragFileListenerDirective = DragFileListenerDirective;
DragFileListenerDirective.decorators = [{
  type: _core.Directive,
  args: [{
    selector: "[dgpFileDragListener]"
  }]
}];

DragFileListenerDirective.ctorParameters = function () {
  return [{
    type: _store.Store
  }, {
    type: _core.ElementRef
  }];
};

function openFileManagerShortKeyFilter(x) {
  return x.keyCode === 70 && x.altKey;
}

var defaultFileUploadConfig = {
  fileManagerMatDialogConfig: {
    height: "80%",
    width: "80%",
    panelClass: "dgp-file-manager-overlay"
  },
  maximizedClass: "dgp-file-manager-overlay--maximized",
  openFileManagerShortKeyFilter: openFileManagerShortKeyFilter,
  editingCapabilities: {
    canAddFiles: true,
    canRemoveFiles: true
  },
  canOpenFileDrawer: true
};
exports.defaultFileUploadConfig = defaultFileUploadConfig;
var FILE_UPLOAD_CONFIG = new _core.InjectionToken("FileUploadConfig");
exports.FILE_UPLOAD_CONFIG = FILE_UPLOAD_CONFIG;
var fileUploadStoreFeature = "FileUpload";
exports.fileUploadStoreFeature = fileUploadStoreFeature;
var fileUploadFeatureSelector = (0, _store.createFeatureSelector)(fileUploadStoreFeature);
exports.fileUploadFeatureSelector = fileUploadFeatureSelector;

var ɵ0$4 = function ɵ0$4(x) {
  return x.fileItem;
};

exports.ɵ0 = ɵ0$4;
var getFileItemState = (0, _store.createSelector)(fileUploadFeatureSelector, ɵ0$4);
exports.getFileItemState = getFileItemState;

var ɵ1$3 = function ɵ1$3(x) {
  return x.directory;
};

exports.ɵ1 = ɵ1$3;
var getDirectoryState = (0, _store.createSelector)(fileUploadFeatureSelector, ɵ1$3);
exports.getDirectoryState = getDirectoryState;

var ɵ2$2 = function ɵ2$2(x) {
  return (0, _entityStore.getAll)(x);
};

exports.ɵ2 = ɵ2$2;
var getAllFileItems = (0, _store.createSelector)(getFileItemState, ɵ2$2);
exports.getAllFileItems = getAllFileItems;

var ɵ3$1 = function ɵ3$1(x) {
  return x.entities;
};

exports.ɵ3 = ɵ3$1;
var getFileItemKVS = (0, _store.createSelector)(getFileItemState, ɵ3$1);
exports.getFileItemKVS = getFileItemKVS;

var ɵ4 = function ɵ4(x) {
  return (0, _entityStore.getAll)(x);
};

exports.ɵ4 = ɵ4;
var getAllDirectories = (0, _store.createSelector)(getDirectoryState, ɵ4);
exports.getAllDirectories = getAllDirectories;

var ɵ5 = function ɵ5(directories, fileItemKVS) {
  return {
    directories: directories,
    fileItemKVS: fileItemKVS
  };
};

exports.ɵ5 = ɵ5;
var getFileItemListModel = (0, _store.createSelector)(getAllDirectories, getFileItemKVS, ɵ5);
exports.getFileItemListModel = getFileItemListModel;

var ɵ6 = function ɵ6(x) {
  return (0, _entityStore.getFirstSelected)(x);
};

exports.ɵ6 = ɵ6;
var getSelectedFileItem = (0, _store.createSelector)(getFileItemState, ɵ6);
exports.getSelectedFileItem = getSelectedFileItem;

var ɵ7 = function ɵ7(x) {
  return x.isFileManagerOpen;
};

exports.ɵ7 = ɵ7;
var isFileManagerOpen = (0, _store.createSelector)(fileUploadFeatureSelector, ɵ7);
exports.isFileManagerOpen = isFileManagerOpen;

var ɵ8 = function ɵ8(x) {
  return x.initialConfig.canOpenFileDrawer;
};

exports.ɵ8 = ɵ8;
var canOpenFileDrawer = (0, _store.createSelector)(fileUploadFeatureSelector, ɵ8);
exports.canOpenFileDrawer = canOpenFileDrawer;

var ɵ9 = function ɵ9(x) {
  return !x.initialConfig.editingCapabilities.canAddFiles;
};

exports.ɵ9 = ɵ9;
var isAddFilesDisabled = (0, _store.createSelector)(fileUploadFeatureSelector, ɵ9);
exports.isAddFilesDisabled = isAddFilesDisabled;

var ɵ10 = function ɵ10(x) {
  return !x.initialConfig.editingCapabilities.canRemoveFiles;
};

exports.ɵ10 = ɵ10;
var isRemoveFilesDisabled = (0, _store.createSelector)(fileUploadFeatureSelector, ɵ10);
exports.isRemoveFilesDisabled = isRemoveFilesDisabled;

var ɵ11 = function ɵ11(x) {
  return x.initialConfig.editingCapabilities.canAddFiles && (x.isDropTargetVisible || x.fileItem.ids.length === 0);
};

exports.ɵ11 = ɵ11;
var isDropTargetVisible = (0, _store.createSelector)(fileUploadFeatureSelector, ɵ11);
exports.isDropTargetVisible = isDropTargetVisible;

var OpenFileManagerViaShortKeyDirective = /*#__PURE__*/function () {
  function OpenFileManagerViaShortKeyDirective(store, moduleConfig) {
    var _this13 = this;

    _classCallCheck(this, OpenFileManagerViaShortKeyDirective);

    this.store = store;
    this.moduleConfig = moduleConfig;
    this.keyPressSubscription = (0, _rxjs.fromEvent)(document, "keydown").pipe((0, _operators.filter)(this.moduleConfig.openFileManagerShortKeyFilter), (0, _operators.switchMap)(function () {
      return _this13.store.select(isFileManagerOpen).pipe((0, _operators.first)()).toPromise();
    }), (0, _operators.filter)(function (x) {
      return !x;
    }), (0, _operators.tap)(function () {
      return _this13.store.dispatch(openFileManager({}));
    })).subscribe();
  }

  _createClass(OpenFileManagerViaShortKeyDirective, [{
    key: "ngOnDestroy",
    value: function ngOnDestroy() {
      if (!this.keyPressSubscription.closed) {
        this.keyPressSubscription.unsubscribe();
      }
    }
  }]);

  return OpenFileManagerViaShortKeyDirective;
}();

exports.OpenFileManagerViaShortKeyDirective = OpenFileManagerViaShortKeyDirective;
OpenFileManagerViaShortKeyDirective.decorators = [{
  type: _core.Directive,
  args: [{
    selector: "[dgpOpenFileManagerViaShortKey]"
  }]
}];

OpenFileManagerViaShortKeyDirective.ctorParameters = function () {
  return [{
    type: _store.Store
  }, {
    type: undefined,
    decorators: [{
      type: _core.Inject,
      args: [FILE_UPLOAD_CONFIG]
    }]
  }];
};

var fileUploadEntityStore = (0, _entityStore.createEntityStore)({
  storeFeature: "FileUpload",
  entityTypes: ["directory", "fileItem"]
});
exports.fileUploadEntityStore = fileUploadEntityStore;

var ɵ0$5 = function ɵ0$5() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case openFileManagerOverlay.type:
      return true;

    case closeFileManager.type:
      return false;

    default:
      return state;
  }
},
    ɵ1$4 = function ɵ1$4() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case showDropTarget.type:
      return true;

    case hideDropTarget.type:
      return false;

    default:
      return state;
  }
},
    ɵ2$3 = function ɵ2$3() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultFileUploadConfig;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.type === setConfig.type) {
    return action.config;
  } else {
    return state;
  }
};

var fileUploadReducer = Object.assign(Object.assign({}, fileUploadEntityStore.reducers), {
  isFileManagerOpen: ɵ0$5,
  isDropTargetVisible: ɵ1$4,
  initialConfig: ɵ2$3
}); // tslint:disable-next-line:directive-class-suffix

exports.ɵl = fileUploadReducer;

var DgpContainer = function DgpContainer(store) {
  var _this14 = this;

  _classCallCheck(this, DgpContainer);

  this.store = store;

  this.dispatch = function (x) {
    return _this14.store.dispatch(x);
  };

  this.select = function (x) {
    return _this14.store.select(x);
  };
};

exports.DgpContainer = DgpContainer;
DgpContainer.decorators = [{
  type: _core.Directive
}];

DgpContainer.ctorParameters = function () {
  return [{
    type: _store.Store
  }];
};

var FileManagerComponent = /*#__PURE__*/function (_DgpContainer) {
  _inherits(FileManagerComponent, _DgpContainer);

  var _super10 = _createSuper(FileManagerComponent);

  function FileManagerComponent(store, elementRef, dialogRef, moduleConfig) {
    var _this15;

    _classCallCheck(this, FileManagerComponent);

    _this15 = _super10.call(this, store);
    _this15.store = store;
    _this15.elementRef = elementRef;
    _this15.dialogRef = dialogRef;
    _this15.moduleConfig = moduleConfig;
    _this15.isMaximized = false;
    _this15.isDropTargetVisible$ = _this15.select(isDropTargetVisible);
    _this15.fileItemListModel$ = _this15.select(getFileItemListModel);
    _this15.selectedFileItem$ = _this15.select(getSelectedFileItem);
    _this15.isRemoveFilesDisabled$ = _this15.select(isRemoveFilesDisabled);
    _this15.isAddFilesDisabled$ = _this15.select(isAddFilesDisabled);
    _this15.canOpenFileDrawer$ = _this15.select(canOpenFileDrawer);

    _this15.dragEnterHandler = function (e) {
      e.preventDefault();

      _this15.dispatch(showDropTarget());
    };

    _this15.dragLeaveHandler = function (e) {
      e.preventDefault();

      _this15.dispatch(hideDropTarget());
    };

    _this15.dragOverHandler = function (e) {
      e.preventDefault();
    };

    _this15.dropHandler = function (e) {
      e.preventDefault();
      var fileItems = getFileItemsFromFileList(e.dataTransfer.files);

      _this15.store.dispatch(hideDropTarget());

      _this15.store.dispatch(addFilesViaDrop({
        fileItems: fileItems
      }));
    };

    return _this15;
  }

  _createClass(FileManagerComponent, [{
    key: "ngAfterViewInit",
    value: function ngAfterViewInit() {
      this.elementRef.nativeElement.addEventListener("dragenter", this.dragEnterHandler);
      this.elementRef.nativeElement.addEventListener("dragleave", this.dragLeaveHandler);
      this.elementRef.nativeElement.addEventListener("drop", this.dropHandler);
      this.elementRef.nativeElement.addEventListener("dragover", this.dragOverHandler);
    }
  }, {
    key: "ngOnDestroy",
    value: function ngOnDestroy() {
      this.elementRef.nativeElement.removeEventListener("dragenter", this.dragEnterHandler);
      this.elementRef.nativeElement.removeEventListener("dragleave", this.dragLeaveHandler);
      this.elementRef.nativeElement.removeEventListener("drop", this.dropHandler);
      this.elementRef.nativeElement.removeEventListener("dragover", this.dragOverHandler);
    }
  }, {
    key: "removeFileItem",
    value: function removeFileItem(fileItem) {
      this.dispatch(removeFile({
        fileItem: fileItem
      }));
    }
  }, {
    key: "onFileSelected",
    value: function onFileSelected(e) {
      var fileItems = getFileItemsFromFileList(e.target.files);
      this.dispatch(addFilesViaDrop({
        fileItems: fileItems
      }));
    }
  }, {
    key: "maximize",
    value: function maximize() {
      this.dialogRef.addPanelClass(this.moduleConfig.maximizedClass);
      this.isMaximized = true;
    }
  }, {
    key: "minimize",
    value: function minimize() {
      this.dialogRef.removePanelClass(this.moduleConfig.maximizedClass);
      this.isMaximized = false;
    }
  }]);

  return FileManagerComponent;
}(DgpContainer);

exports.ɵbt = FileManagerComponent;
FileManagerComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-file-manager",
    template: "\n\n        <ng-container *ngIf=\"(isDropTargetVisible$ | async) === false; else dropTarget\">\n\n            <h2 mat-dialog-title\n                style=\"display: flex; align-items: center\">\n                File manager\n                <dgp-spacer></dgp-spacer>\n                <button *ngIf=\"!isMaximized\"\n                        mat-icon-button\n                        (click)=\"maximize()\"\n                        matTooltip=\"Maximize\">\n                    <mat-icon>crop_din</mat-icon>\n                </button>\n                <button *ngIf=\"isMaximized\"\n                        mat-icon-button\n                        (click)=\"minimize()\"\n                        matTooltip=\"Minimize\">\n                    <mat-icon>filter_none</mat-icon>\n                </button>\n                <button mat-icon-button\n                        mat-dialog-close\n                        matTooltip=\"Close dialog\">\n                    <mat-icon>close</mat-icon>\n                </button>\n            </h2>\n\n            <dgp-list-details-page *ngIf=\"canOpenFileDrawer$ | async; else singleFileMode\">\n\n                <ng-container dgp-list-details-page-menu>\n                    <dgp-file-item-list [model]=\"fileItemListModel$ | async\"\n                                        (fileItemRemoved)=\"removeFileItem($event)\"\n                                        [disabled]=\"isRemoveFilesDisabled$ | async\"></dgp-file-item-list>\n                    <dgp-spacer></dgp-spacer>\n                    <mat-nav-list *ngIf=\"!(isAddFilesDisabled$ | async)\">\n                        <a mat-list-item\n                           (click)=\"filePicker.click()\">\n                            <mat-icon>\n                                open_in_new\n                            </mat-icon>\n                            <div matLine>\n                                Choose file via picker\n                            </div>\n                            <input hidden\n                                   multiple\n                                   (change)=\"onFileSelected($event)\"\n                                   type=\"file\"\n                                   #filePicker>\n                        </a>\n                    </mat-nav-list>\n                </ng-container>\n\n                <dgp-file-viewer [fileItem]=\"selectedFileItem$ | async\"></dgp-file-viewer>\n\n            </dgp-list-details-page>\n\n            <ng-template #singleFileMode>\n                <dgp-file-viewer [fileItem]=\"selectedFileItem$ | async\"></dgp-file-viewer>\n            </ng-template>\n        </ng-container>\n\n        <ng-template #dropTarget>\n\n            <dgp-empty-state title=\"Drop file here\"\n                             matIconName=\"get_app\"\n                             class=\"drop-target\">\n                Drop one or more files into this zone to upload them.\n                <br>\n                You can preview them afterward.\n                <br>\n                <button mat-button\n                        [disabled]=\"isAddFilesDisabled$ | async\"\n                        (click)=\"filePicker.click()\"\n                        style=\"display: flex; max-width: 480px; width: 100%; justify-content: center; margin-top: 16px;\">\n                    <mat-icon style=\"margin-right: 4px;\">open_in_new</mat-icon>\n                    Choose file via picker\n                </button>\n\n                <input hidden\n                       multiple\n                       (change)=\"onFileSelected($event)\"\n                       type=\"file\"\n                       #filePicker>\n\n            </dgp-empty-state>\n\n        </ng-template>\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        :host {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            width: 100%;\n            height: 100%;\n        }\n\n        .drop-target {\n            border: 2px dashed white;\n            max-height: 100%;\n        }\n\n    "]
  }]
}];

FileManagerComponent.ctorParameters = function () {
  return [{
    type: _store.Store
  }, {
    type: _core.ElementRef
  }, {
    type: _dialog.MatDialogRef
  }, {
    type: undefined,
    decorators: [{
      type: _core.Inject,
      args: [FILE_UPLOAD_CONFIG]
    }]
  }];
};

var FileUploadEffects = function FileUploadEffects(actions$, store, matDialog, activatedRoute, router, moduleConfig) {
  var _this16 = this;

  _classCallCheck(this, FileUploadEffects);

  this.actions$ = actions$;
  this.store = store;
  this.matDialog = matDialog;
  this.activatedRoute = activatedRoute;
  this.router = router;
  this.moduleConfig = moduleConfig;
  this.openFileManagerOverlay$ = this.actions$.pipe((0, _effects.ofType)(openFileManagerOverlay), (0, _operators.tap)(function (action) {
    if (action.fileItems) {
      _this16.store.dispatch(fileUploadEntityStore.actions.composeEntityActions({
        set: {
          fileItem: (0, _entityStore.createKVSFromArray)(action.fileItems, function (x) {
            return x.fileItemId;
          }),
          directory: (0, _entityStore.createKVSFromArray)(action.directories, function (x) {
            return x.directoryId;
          })
        }
      }));
    }

    if (action.config) {
      _this16.store.dispatch(setConfig({
        config: action.config
      }));
    }
  }), (0, _operators.switchMap)(function (action) {
    var dialogRef = _this16.matDialog.open(FileManagerComponent, action.config ? action.config.fileManagerMatDialogConfig : _this16.moduleConfig.fileManagerMatDialogConfig);

    if (action.selectedFileItemId) {
      _this16.store.dispatch(fileUploadEntityStore.actions.composeEntityActions({
        select: {
          fileItem: [action.selectedFileItemId]
        }
      }));
    }

    return dialogRef.afterClosed();
  }), (0, _operators.map)(function () {
    return closeFileManager();
  }));
  this.addFilesViaDrop$ = this.actions$.pipe((0, _effects.ofType)(addFilesViaDrop), (0, _operators.switchMap)(function (action) {
    return _this16.store.select(getAllDirectories).pipe((0, _operators.first)(), (0, _operators.map)(function (directories) {
      if (directories.length > 0) {
        var directory = directories[0];

        _this16.router.navigate([], {
          queryParams: {
            fileItemId: action.fileItems[0].fileItemId
          }
        });

        return fileUploadEntityStore.actions.composeEntityActions({
          add: {
            fileItem: (0, _entityStore.createKVSFromArray)(action.fileItems, function (x) {
              return x.fileItemId;
            })
          },
          update: {
            directory: _defineProperty({}, directory.directoryId, {
              fileItemIds: directory.fileItemIds.concat(action.fileItems.map(function (x) {
                return x.fileItemId;
              }))
            })
          }
        });
      } else {
        _this16.router.navigate([], {
          queryParams: {
            fileItemId: action.fileItems[0].fileItemId
          }
        });

        return fileUploadEntityStore.actions.composeEntityActions({
          add: {
            fileItem: (0, _entityStore.createKVSFromArray)(action.fileItems, function (x) {
              return x.fileItemId;
            }),
            directory: _defineProperty({}, "Files", {
              directoryId: "Files",
              label: "Files",
              fileItemIds: action.fileItems.map(function (x) {
                return x.fileItemId;
              })
            })
          }
        });
      }
    }));
  }));
  this.selectFileItem$ = this.activatedRoute.queryParams.pipe((0, _operators.map)(function (x) {
    return x.fileItemId;
  }), (0, _operators.distinctUntilChanged)(), (0, _operators.map)(function (fileItemId) {
    if (!fileItemId) {
      return fileUploadEntityStore.actions.composeEntityActions({
        select: {
          fileItem: []
        }
      });
    }

    return fileUploadEntityStore.actions.composeEntityActions({
      select: {
        fileItem: [fileItemId]
      }
    });
  }));
  this.removeFile$ = this.actions$.pipe((0, _effects.ofType)(removeFile), (0, _operators.map)(function (action) {
    return fileUploadEntityStore.actions.composeEntityActions({
      remove: {
        fileItem: [action.fileItem.fileItemId]
      }
    });
  }));
  this.store.dispatch(setConfig({
    config: moduleConfig
  }));
};

exports.ɵbs = FileUploadEffects;
FileUploadEffects.decorators = [{
  type: _core.Injectable
}];

FileUploadEffects.ctorParameters = function () {
  return [{
    type: _effects.Actions
  }, {
    type: _store.Store
  }, {
    type: _dialog.MatDialog
  }, {
    type: _router.ActivatedRoute
  }, {
    type: _router.Router
  }, {
    type: undefined,
    decorators: [{
      type: _core.Inject,
      args: [FILE_UPLOAD_CONFIG]
    }]
  }];
};

(0, _tslib.__decorate)([(0, _effects.Effect)()], FileUploadEffects.prototype, "openFileManagerOverlay$", void 0);
(0, _tslib.__decorate)([(0, _effects.Effect)()], FileUploadEffects.prototype, "addFilesViaDrop$", void 0);
(0, _tslib.__decorate)([(0, _effects.Effect)()], FileUploadEffects.prototype, "selectFileItem$", void 0);
(0, _tslib.__decorate)([(0, _effects.Effect)()], FileUploadEffects.prototype, "removeFile$", void 0);
var requestStoreFeature = "Requests";
exports.requestStoreFeature = requestStoreFeature;
var requestStateSelector = (0, _store.createFeatureSelector)(requestStoreFeature);
exports.requestStateSelector = requestStateSelector;

var ɵ0$6 = function ɵ0$6(x) {
  return x.requests.pendingRequests > 0;
};

var hasPendingRequests = (0, _store.createSelector)(requestStateSelector, ɵ0$6);
exports.hasPendingRequests = hasPendingRequests;

var ɵ1$5 = function ɵ1$5(x) {
  return x;
};

var hasPendingRequestsSelector = (0, _store.createSelector)(hasPendingRequests, ɵ1$5);
exports.hasPendingRequestsSelector = hasPendingRequestsSelector;

var PageHeaderComponent = /*#__PURE__*/function (_DgpContainer2) {
  _inherits(PageHeaderComponent, _DgpContainer2);

  var _super11 = _createSuper(PageHeaderComponent);

  function PageHeaderComponent() {
    var _this17;

    _classCallCheck(this, PageHeaderComponent);

    _this17 = _super11.apply(this, arguments);
    _this17.hasPendingRequests$ = _this17.select(hasPendingRequestsSelector);
    return _this17;
  }

  return PageHeaderComponent;
}(DgpContainer);

exports.PageHeaderComponent = PageHeaderComponent;
PageHeaderComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-page-header",
    template: "\n        <mat-toolbar color=\"primary\"\n                     class=\"toolbar\">\n            <div class=\"progress-bar-container\">\n                <mat-progress-bar *ngIf=\"hasPendingRequests$ | async\"\n                                  color=\"accent\"\n                                  mode=\"query\"></mat-progress-bar>\n            </div>\n            <ng-content></ng-content>\n        </mat-toolbar>\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        .toolbar {\n            position: relative;\n        }\n\n        .progress-bar-container {\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n        }\n    "]
  }]
}];

var DgpPageHeaderModule = function DgpPageHeaderModule() {
  _classCallCheck(this, DgpPageHeaderModule);
};

exports.DgpPageHeaderModule = DgpPageHeaderModule;
DgpPageHeaderModule.decorators = [{
  type: _core.NgModule,
  args: [{
    imports: [_common.CommonModule, _toolbar.MatToolbarModule, _progressBar.MatProgressBarModule],
    declarations: [PageHeaderComponent],
    exports: [PageHeaderComponent],
    providers: []
  }]
}]; // hamburger menu

var setHamburgerMenuState = (0, _store.createAction)("[HamburgerShell] SetHamburgerMenuState", (0, _store.props)());
exports.setHamburgerMenuState = setHamburgerMenuState;

var _toggleHamburgerMenu = (0, _store.createAction)("[HamburgerShell] ToggleHamburgerMenu");

exports.toggleHamburgerMenu = _toggleHamburgerMenu;

var _closeHamburgerMenu = (0, _store.createAction)("[HamburgerShell] CloseHamburgerMenu"); // list-details page


exports.closeHamburgerMenu = _closeHamburgerMenu;
var setListDetailsPageState = (0, _store.createAction)("[HamburgerShell] SetListDetailsPageState", (0, _store.props)());
exports.setListDetailsPageState = setListDetailsPageState;
var toggleListDetailsPageMenu = (0, _store.createAction)("[HamburgerShell] ToggleListDetailsPageMenu");
exports.toggleListDetailsPageMenu = toggleListDetailsPageMenu;
var closeListDetailsMenu = (0, _store.createAction)("[HamburgerShell] CloseListDetailsPageMenu");
exports.closeListDetailsMenu = closeListDetailsMenu;
var HamburgerShellMode;
exports.HamburgerShellMode = HamburgerShellMode;

(function (HamburgerShellMode) {
  HamburgerShellMode[HamburgerShellMode["Responsive"] = 0] = "Responsive";
  HamburgerShellMode[HamburgerShellMode["Overlay"] = 1] = "Overlay";
  HamburgerShellMode[HamburgerShellMode["SideNav"] = 2] = "SideNav";
})(HamburgerShellMode || (exports.HamburgerShellMode = HamburgerShellMode = {}));

var ListDetailsPageMode;
exports.ListDetailsPageMode = ListDetailsPageMode;

(function (ListDetailsPageMode) {
  ListDetailsPageMode[ListDetailsPageMode["Responsive"] = 0] = "Responsive";
  ListDetailsPageMode[ListDetailsPageMode["Overlay"] = 1] = "Overlay";
  ListDetailsPageMode[ListDetailsPageMode["SideNav"] = 2] = "SideNav";
})(ListDetailsPageMode || (exports.ListDetailsPageMode = ListDetailsPageMode = {}));

var responsiveHamburgerShellConfig = {
  hamburgerShellMode: HamburgerShellMode.Responsive,
  hamburgerMenuBreakpoints: [_layout.Breakpoints.XLarge],
  listDetailsPageMode: ListDetailsPageMode.Responsive,
  listDetailsPageMenuBreakpoints: [_layout.Breakpoints.Large, _layout.Breakpoints.XLarge]
};
exports.responsiveHamburgerShellConfig = responsiveHamburgerShellConfig;
var sideNavHamburgerShellConfig = {
  hamburgerShellMode: HamburgerShellMode.SideNav,
  listDetailsPageMode: ListDetailsPageMode.SideNav
};
exports.sideNavHamburgerShellConfig = sideNavHamburgerShellConfig;
var overlayHamburgerShellConfig = {
  hamburgerShellMode: HamburgerShellMode.Overlay,
  listDetailsPageMode: ListDetailsPageMode.Overlay
};
exports.overlayHamburgerShellConfig = overlayHamburgerShellConfig;
var defaultHamburgerShellConfig = responsiveHamburgerShellConfig;
exports.defaultHamburgerShellConfig = defaultHamburgerShellConfig;
var HAMBURGER_SHELL_CONFIG = new _core.InjectionToken("HamburgerShellConfig");
exports.HAMBURGER_SHELL_CONFIG = HAMBURGER_SHELL_CONFIG;
var sideNavHamburgerShellConfigProvider = {
  provide: HAMBURGER_SHELL_CONFIG,
  useValue: sideNavHamburgerShellConfig
};
exports.sideNavHamburgerShellConfigProvider = sideNavHamburgerShellConfigProvider;
var overlayHamburgerShellConfigProvider = {
  provide: HAMBURGER_SHELL_CONFIG,
  useValue: overlayHamburgerShellConfig
};
exports.overlayHamburgerShellConfigProvider = overlayHamburgerShellConfigProvider;
var defaultHamburgerShellConfigProvider = {
  provide: HAMBURGER_SHELL_CONFIG,
  useValue: defaultHamburgerShellConfig
};
exports.defaultHamburgerShellConfigProvider = defaultHamburgerShellConfigProvider;
var hamburgerShellStoreFeature = "HamburgerShell";
exports.hamburgerShellStoreFeature = hamburgerShellStoreFeature;
var hamburgerShellFeatureSelector = (0, _store.createFeatureSelector)(hamburgerShellStoreFeature);
exports.hamburgerShellFeatureSelector = hamburgerShellFeatureSelector;

var ɵ0$7 = function ɵ0$7(x) {
  return x.hamburgerMenuMode;
};

var hamburgerMenuModeSelector = (0, _store.createSelector)(hamburgerShellFeatureSelector, ɵ0$7);
exports.hamburgerMenuModeSelector = hamburgerMenuModeSelector;

var ɵ1$6 = function ɵ1$6(x) {
  return x.isHamburgerMenuOpen;
};

var isHamburgerMenuOpenSelector = (0, _store.createSelector)(hamburgerShellFeatureSelector, ɵ1$6);
exports.isHamburgerMenuOpenSelector = isHamburgerMenuOpenSelector;

var ɵ2$4 = function ɵ2$4(x) {
  return x.pageMenuMode;
};

var pageMenuModeSelector = (0, _store.createSelector)(hamburgerShellFeatureSelector, ɵ2$4);
exports.pageMenuModeSelector = pageMenuModeSelector;

var ɵ3$2 = function ɵ3$2(x) {
  return x.isPageMenuOpen;
};

var isPageMenuOpenSelector = (0, _store.createSelector)(hamburgerShellFeatureSelector, ɵ3$2);
exports.isPageMenuOpenSelector = isPageMenuOpenSelector;

var ListDetailsPageComponent = /*#__PURE__*/function (_DgpContainer3) {
  _inherits(ListDetailsPageComponent, _DgpContainer3);

  var _super12 = _createSuper(ListDetailsPageComponent);

  function ListDetailsPageComponent() {
    var _this18;

    _classCallCheck(this, ListDetailsPageComponent);

    _this18 = _super12.apply(this, arguments);
    _this18.pageMenuDrawerMode$ = _this18.select(pageMenuModeSelector);
    _this18.isPageMenuDrawerOpen$ = _this18.select(isPageMenuOpenSelector);
    return _this18;
  }

  _createClass(ListDetailsPageComponent, [{
    key: "closePageMenuDrawer",
    value: function closePageMenuDrawer() {
      this.dispatch(closeListDetailsMenu());
    }
  }, {
    key: "togglePageMenuDrawer",
    value: function togglePageMenuDrawer() {
      this.dispatch(toggleListDetailsPageMenu());
    }
  }]);

  return ListDetailsPageComponent;
}(DgpContainer);

exports.ListDetailsPageComponent = ListDetailsPageComponent;
ListDetailsPageComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-list-details-page",
    template: "\n        <mat-drawer-container class=\"page-menu-drawer-container\">\n\n            <mat-drawer [mode]=\"pageMenuDrawerMode$ | async\"\n                        [opened]=\"isPageMenuDrawerOpen$ | async\"\n                        (closed)=\"closePageMenuDrawer()\"\n                        class=\"page-menu-drawer mat-elevation-z4\">\n\n                <ng-content select=\"[dgp-list-details-page-menu]\"></ng-content>\n\n            </mat-drawer>\n\n            <mat-drawer-content class=\"page-menu-drawer-content\">\n\n                <div class=\"page-menu-drawer-toggle-container\">\n\n                    <button mat-icon-button\n                            (click)=\"togglePageMenuDrawer()\"\n                            matTooltip=\"Toggle menu drawer\">\n                        <mat-icon *ngIf=\"isPageMenuDrawerOpen$ | async; else closedIcon\">\n                            arrow_back\n                        </mat-icon>\n                        <ng-template #closedIcon>\n                            <mat-icon>arrow_forward</mat-icon>\n                        </ng-template>\n                    </button>\n\n                </div>\n\n                <ng-content></ng-content>\n\n            </mat-drawer-content>\n\n        </mat-drawer-container>\n\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        :host {\n            display: flex;\n            flex-direction: column;\n            overflow: auto;\n            flex-grow: 1;\n        }\n\n        .page-menu-drawer-container {\n            display: flex;\n            flex-grow: 1;\n            overflow: inherit;\n        }\n\n        .page-menu-drawer {\n            width: 360px;\n        }\n\n        .page-menu-drawer-content {\n            overflow: auto;\n            flex-grow: 1;\n            display: flex;\n            position: relative;\n        }\n\n        .page-menu-drawer-toggle-container {\n            display: flex;\n            align-items: center;\n            top: 0;\n            bottom: 0;\n            position: absolute;\n        }\n\n    "]
  }]
}];

var ListDetailsPageContentComponent = function ListDetailsPageContentComponent() {
  _classCallCheck(this, ListDetailsPageContentComponent);
};

exports.ListDetailsPageContentComponent = ListDetailsPageContentComponent;
ListDetailsPageContentComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-list-details-page-content",
    template: "<ng-content></ng-content>",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        :host {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            max-width: 800px;\n            width: 100%;\n            padding: 32px;\n            justify-self: center;\n            margin-right: auto;\n            margin-left: auto;\n        }\n    "]
  }]
}];

var DgpListDetailsPageModule = function DgpListDetailsPageModule() {
  _classCallCheck(this, DgpListDetailsPageModule);
};

exports.DgpListDetailsPageModule = DgpListDetailsPageModule;
DgpListDetailsPageModule.decorators = [{
  type: _core.NgModule,
  args: [{
    imports: [_common.CommonModule, _button.MatButtonModule, _icon.MatIconModule, _sidenav.MatSidenavModule, _tooltip.MatTooltipModule],
    declarations: [ListDetailsPageContentComponent, ListDetailsPageComponent],
    exports: [ListDetailsPageContentComponent, ListDetailsPageComponent]
  }]
}];
var FILE_UPLOAD_REDUCER = new _core.InjectionToken("hamburgerShellReducer");
exports.ɵm = FILE_UPLOAD_REDUCER;

function fileUploadReducerFactory() {
  return fileUploadReducer;
}

var fileUploadReducerProvider = {
  provide: FILE_UPLOAD_REDUCER,
  useFactory: fileUploadReducerFactory
};
exports.ɵo = fileUploadReducerProvider;
var ɵ0$8 = defaultFileUploadConfig;

var DgpFileUploadModule = /*#__PURE__*/function () {
  function DgpFileUploadModule() {
    _classCallCheck(this, DgpFileUploadModule);
  }

  _createClass(DgpFileUploadModule, null, [{
    key: "forRoot",
    value: function forRoot() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultFileUploadConfig;
      return {
        ngModule: DgpFileUploadModule,
        providers: [{
          provide: FILE_UPLOAD_CONFIG,
          useValue: config
        }]
      };
    }
  }]);

  return DgpFileUploadModule;
}();

exports.DgpFileUploadModule = DgpFileUploadModule;
DgpFileUploadModule.decorators = [{
  type: _core.NgModule,
  args: [{
    imports: [_common.CommonModule, _dialog.MatDialogModule, _store.StoreModule.forFeature(fileUploadStoreFeature, FILE_UPLOAD_REDUCER), _effects.EffectsModule.forFeature([FileUploadEffects]), DgpPageHeaderModule, DgpListDetailsPageModule, _list.MatListModule, _router.RouterModule, _icon.MatIconModule, DgpSpacerModule, _button.MatButtonModule, _menu.MatMenuModule, DgpEmptyStateModule, _tooltip.MatTooltipModule, DgpFileViewerModule],
    declarations: [DragFileListenerDirective, OpenFileManagerViaShortKeyDirective, FileManagerComponent],
    exports: [DragFileListenerDirective, OpenFileManagerViaShortKeyDirective],
    entryComponents: [FileManagerComponent],
    providers: [fileUploadReducerProvider, {
      provide: FILE_UPLOAD_CONFIG,
      useValue: ɵ0$8
    }]
  }]
}];

var HamburgerShellComponent = /*#__PURE__*/function () {
  function HamburgerShellComponent(store) {
    _classCallCheck(this, HamburgerShellComponent);

    this.store = store;
    this.hasPendingRequests$ = this.store.select(hasPendingRequestsSelector);
    this.isHamburgerMenuOpen$ = this.store.select(isHamburgerMenuOpenSelector);
    this.hamburgerMenuMode$ = this.store.select(hamburgerMenuModeSelector);
  }

  _createClass(HamburgerShellComponent, [{
    key: "closeHamburgerMenu",
    value: function closeHamburgerMenu() {
      this.store.dispatch(_closeHamburgerMenu());
    }
  }]);

  return HamburgerShellComponent;
}();

exports.HamburgerShellComponent = HamburgerShellComponent;
HamburgerShellComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-hamburger-shell",
    template: "\n        <mat-drawer-container class=\"hamburger-menu-drawer-container\">\n\n            <mat-drawer [mode]=\"hamburgerMenuMode$ | async\"\n                        [opened]=\"isHamburgerMenuOpen$ | async\"\n                        class=\"hamburger-menu-drawer mat-elevation-z4\"\n                        (closed)=\"closeHamburgerMenu()\">\n\n                <div class=\"progress-bar-container\">\n                    <mat-progress-bar *ngIf=\"hasPendingRequests$ | async\"\n                                      color=\"accent\"\n                                      mode=\"query\"></mat-progress-bar>\n                </div>\n\n                <ng-content select=\"[dgp-hamburger-menu]\"></ng-content>\n\n            </mat-drawer>\n\n            <mat-drawer-content class=\"hamburger-menu-drawer-content\">\n\n                <ng-content></ng-content>\n\n            </mat-drawer-content>\n\n        </mat-drawer-container>\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        :host {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            overflow: auto;\n        }\n\n        .hamburger-menu-drawer-container {\n            flex-grow: 1;\n            display: flex !important;\n        }\n\n        .hamburger-menu-drawer {\n            width: 240px;\n        }\n\n        .progress-bar-container {\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n        }\n\n        .hamburger-menu-drawer-content {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            height: auto;\n        }\n    "]
  }]
}];

HamburgerShellComponent.ctorParameters = function () {
  return [{
    type: _store.Store
  }];
};

var HamburgerMenuToggleComponent = /*#__PURE__*/function (_DgpContainer4) {
  _inherits(HamburgerMenuToggleComponent, _DgpContainer4);

  var _super13 = _createSuper(HamburgerMenuToggleComponent);

  function HamburgerMenuToggleComponent() {
    _classCallCheck(this, HamburgerMenuToggleComponent);

    return _super13.apply(this, arguments);
  }

  _createClass(HamburgerMenuToggleComponent, [{
    key: "toggleHamburgerMenu",
    value: function toggleHamburgerMenu() {
      this.dispatch(_toggleHamburgerMenu());
    }
  }]);

  return HamburgerMenuToggleComponent;
}(DgpContainer);

exports.HamburgerMenuToggleComponent = HamburgerMenuToggleComponent;
HamburgerMenuToggleComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-hamburger-menu-toggle",
    template: "\n        <button mat-icon-button\n                (click)=\"toggleHamburgerMenu()\">\n            <mat-icon>menu</mat-icon>\n        </button>\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        :host {\n            margin-right: 8px;\n        }\n    "]
  }]
}];

var DgpHamburgerMenuToggleModule = function DgpHamburgerMenuToggleModule() {
  _classCallCheck(this, DgpHamburgerMenuToggleModule);
};

exports.DgpHamburgerMenuToggleModule = DgpHamburgerMenuToggleModule;
DgpHamburgerMenuToggleModule.decorators = [{
  type: _core.NgModule,
  args: [{
    imports: [_common.CommonModule, _button.MatButtonModule, _icon.MatIconModule],
    declarations: [HamburgerMenuToggleComponent],
    exports: [HamburgerMenuToggleComponent]
  }]
}];

var HamburgerMenuComponent = function HamburgerMenuComponent() {
  _classCallCheck(this, HamburgerMenuComponent);
};

exports.HamburgerMenuComponent = HamburgerMenuComponent;
HamburgerMenuComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-hamburger-menu",
    template: "<ng-content></ng-content>",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        :host {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            height: 100%;\n        }\n    "]
  }]
}];

var HamburgerMenuHeaderComponent = function HamburgerMenuHeaderComponent() {
  _classCallCheck(this, HamburgerMenuHeaderComponent);
};

exports.HamburgerMenuHeaderComponent = HamburgerMenuHeaderComponent;
HamburgerMenuHeaderComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-hamburger-menu-header",
    template: "\n        <mat-toolbar color=\"primary\"\n                     class=\"hamburger-menu__header\">\n            <ng-content></ng-content>\n        </mat-toolbar>\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n    \n   "]
  }]
}];

var HamburgerMenuEntriesComponent = function HamburgerMenuEntriesComponent() {
  _classCallCheck(this, HamburgerMenuEntriesComponent);
};

exports.HamburgerMenuEntriesComponent = HamburgerMenuEntriesComponent;
HamburgerMenuEntriesComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-hamburger-menu-entries",
    template: "\n        <mat-nav-list>\n            <ng-content></ng-content>\n        </mat-nav-list>\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        :host {\n            display: flex;\n            flex-direction: column;\n            overflow: auto;\n            flex-grow: 1;\n        }\n\n        mat-nav-list {\n            flex-grow: 1;\n        }\n    "]
  }]
}];

var HamburgerMenuEntryComponent = /*#__PURE__*/function () {
  function HamburgerMenuEntryComponent() {
    _classCallCheck(this, HamburgerMenuEntryComponent);
  }

  _createClass(HamburgerMenuEntryComponent, [{
    key: "isNonEmptyRoute",
    value: function isNonEmptyRoute() {
      return this.route && this.route.length !== 0;
    }
  }]);

  return HamburgerMenuEntryComponent;
}();

exports.HamburgerMenuEntryComponent = HamburgerMenuEntryComponent;
HamburgerMenuEntryComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-hamburger-menu-entry",
    template: "\n        <a *ngIf=\"isNonEmptyRoute(); else emptyRoute\"\n           mat-list-item\n           [routerLink]=\"route\"\n           [routerLinkActive]=\"'dgp-list-item--selected'\"\n           [class.disabled]=\"disabled\"\n           [attr.tabindex]=\"disabled ? -1 : 0\">\n            <mat-icon>{{ matIconName }}</mat-icon>\n            {{ label }}\n        </a>\n\n        <ng-template #emptyRoute>\n            <a mat-list-item\n               class=\"disabled\"\n               tabindex=\"-1\">\n                <mat-icon>{{ matIconName }}</mat-icon>\n                {{ label }}\n            </a>\n        </ng-template>\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        mat-icon {\n            margin-right: 16px;\n        }\n\n        .disabled {\n            pointer-events: none;\n            color: gray !important;\n        }\n    "]
  }]
}];
HamburgerMenuEntryComponent.propDecorators = {
  matIconName: [{
    type: _core.Input
  }],
  label: [{
    type: _core.Input
  }],
  route: [{
    type: _core.Input
  }],
  disabled: [{
    type: _core.Input
  }]
};

var DgpHamburgerMenuModule = function DgpHamburgerMenuModule() {
  _classCallCheck(this, DgpHamburgerMenuModule);
};

exports.DgpHamburgerMenuModule = DgpHamburgerMenuModule;
DgpHamburgerMenuModule.decorators = [{
  type: _core.NgModule,
  args: [{
    imports: [_toolbar.MatToolbarModule, _list.MatListModule, _router.RouterModule, _icon.MatIconModule, _common.CommonModule],
    declarations: [HamburgerMenuComponent, HamburgerMenuHeaderComponent, HamburgerMenuEntriesComponent, HamburgerMenuEntryComponent],
    exports: [HamburgerMenuComponent, HamburgerMenuHeaderComponent, HamburgerMenuEntriesComponent, HamburgerMenuEntryComponent]
  }]
}];

var HamburgerShellEffects = function HamburgerShellEffects(actions, store, breakpointObserver, hamburgerShellConfig) {
  var _this19 = this;

  _classCallCheck(this, HamburgerShellEffects);

  this.actions = actions;
  this.store = store;
  this.breakpointObserver = breakpointObserver;
  this.hamburgerShellConfig = hamburgerShellConfig;
  this.setHamburgerMenuState$ = (0, _rxjs.of)(this.hamburgerShellConfig.hamburgerShellMode).pipe((0, _operators.filter)(function (x) {
    return x === HamburgerShellMode.Responsive;
  }), (0, _operators.switchMap)(function () {
    return _this19.breakpointObserver.observe(_this19.hamburgerShellConfig.hamburgerMenuBreakpoints);
  }), (0, _operators.debounceTime)(50), (0, _operators.map)(function (result) {
    var isHamburgerMenuOpen = result.matches;
    var hamburgerMenuMode = isHamburgerMenuOpen ? "side" : "over";
    return setHamburgerMenuState({
      isHamburgerMenuOpen: isHamburgerMenuOpen,
      hamburgerMenuMode: hamburgerMenuMode
    });
  }));
  this.setListDetailsPageLayout$ = (0, _rxjs.of)(this.hamburgerShellConfig.listDetailsPageMode).pipe((0, _operators.filter)(function (x) {
    return x === ListDetailsPageMode.Responsive;
  }), (0, _operators.switchMap)(function () {
    return _this19.breakpointObserver.observe(_this19.hamburgerShellConfig.listDetailsPageMenuBreakpoints);
  }), (0, _operators.debounceTime)(50), (0, _operators.map)(function (result) {
    var isPageMenuOpen = result.matches;
    var pageMenuMode = isPageMenuOpen ? "side" : "over";
    return setListDetailsPageState({
      isPageMenuOpen: isPageMenuOpen,
      pageMenuMode: pageMenuMode
    });
  }));

  if (hamburgerShellConfig.hamburgerShellMode === HamburgerShellMode.SideNav) {
    this.store.dispatch(setHamburgerMenuState({
      isHamburgerMenuOpen: true,
      hamburgerMenuMode: "side"
    }));
  } else if (hamburgerShellConfig.hamburgerShellMode === HamburgerShellMode.Overlay) {
    this.store.dispatch(setHamburgerMenuState({
      isHamburgerMenuOpen: false,
      hamburgerMenuMode: "over"
    }));
  }

  if (hamburgerShellConfig.listDetailsPageMode === ListDetailsPageMode.SideNav) {
    this.store.dispatch(setListDetailsPageState({
      isPageMenuOpen: true,
      pageMenuMode: "side"
    }));
  } else if (hamburgerShellConfig.listDetailsPageMode === ListDetailsPageMode.Overlay) {
    this.store.dispatch(setListDetailsPageState({
      isPageMenuOpen: false,
      pageMenuMode: "over"
    }));
  }
};

exports.ɵbu = HamburgerShellEffects;
HamburgerShellEffects.decorators = [{
  type: _core.Injectable
}];

HamburgerShellEffects.ctorParameters = function () {
  return [{
    type: _effects.Actions
  }, {
    type: _store.Store
  }, {
    type: _layout.BreakpointObserver
  }, {
    type: undefined,
    decorators: [{
      type: _core.Inject,
      args: [HAMBURGER_SHELL_CONFIG]
    }]
  }];
};

(0, _tslib.__decorate)([(0, _effects.Effect)()], HamburgerShellEffects.prototype, "setHamburgerMenuState$", void 0);
(0, _tslib.__decorate)([(0, _effects.Effect)()], HamburgerShellEffects.prototype, "setListDetailsPageLayout$", void 0);
var initialHamburgerShellState = {
  hamburgerMenuMode: "side",
  isHamburgerMenuOpen: true,
  pageMenuMode: "side",
  isPageMenuOpen: true
};
exports.ɵbv = initialHamburgerShellState;

var ɵ0$9 = function ɵ0$9(state, action) {
  return Object.assign(Object.assign({}, state), {
    hamburgerMenuMode: action.hamburgerMenuMode,
    isHamburgerMenuOpen: action.isHamburgerMenuOpen
  });
},
    ɵ1$7 = function ɵ1$7(state) {
  return Object.assign(Object.assign({}, state), {
    isHamburgerMenuOpen: !state.isHamburgerMenuOpen
  });
},
    ɵ2$5 = function ɵ2$5(state) {
  return Object.assign(Object.assign({}, state), {
    isHamburgerMenuOpen: false
  });
},
    ɵ3$3 = function ɵ3$3(state, action) {
  return Object.assign(Object.assign({}, state), {
    pageMenuMode: action.pageMenuMode,
    isPageMenuOpen: action.isPageMenuOpen
  });
},
    ɵ4$1 = function ɵ4$1(state) {
  return Object.assign(Object.assign({}, state), {
    isPageMenuOpen: !state.isPageMenuOpen
  });
},
    ɵ5$1 = function ɵ5$1(state) {
  return Object.assign(Object.assign({}, state), {
    isPageMenuOpen: false
  });
};

var hamburgerShellReducer = (0, _store.createReducer)(initialHamburgerShellState, (0, _store.on)(setHamburgerMenuState, ɵ0$9), (0, _store.on)(_toggleHamburgerMenu, ɵ1$7), (0, _store.on)(_closeHamburgerMenu, ɵ2$5), (0, _store.on)(setListDetailsPageState, ɵ3$3), (0, _store.on)(toggleListDetailsPageMenu, ɵ4$1), (0, _store.on)(closeListDetailsMenu, ɵ5$1));
exports.ɵbw = hamburgerShellReducer;
var HAMBURGER_SHELL_REDUCER = new _core.InjectionToken("hamburgerShellReducer");
exports.ɵp = HAMBURGER_SHELL_REDUCER;

function hamburgerShellReducerFactory() {
  return hamburgerShellReducer;
}

var hamburgerShellReducerProvider = {
  provide: HAMBURGER_SHELL_REDUCER,
  useFactory: hamburgerShellReducerFactory
};
exports.ɵr = hamburgerShellReducerProvider;

var DgpHamburgerShellModule = /*#__PURE__*/function () {
  function DgpHamburgerShellModule() {
    _classCallCheck(this, DgpHamburgerShellModule);
  }

  _createClass(DgpHamburgerShellModule, null, [{
    key: "forRoot",
    value: function forRoot() {
      var configProvider = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultHamburgerShellConfigProvider;
      return {
        ngModule: DgpHamburgerShellModule,
        providers: [configProvider]
      };
    }
  }]);

  return DgpHamburgerShellModule;
}();

exports.DgpHamburgerShellModule = DgpHamburgerShellModule;
DgpHamburgerShellModule.decorators = [{
  type: _core.NgModule,
  args: [{
    imports: [_layout.LayoutModule, _common.CommonModule, _forms.FormsModule, _button.MatButtonModule, _icon.MatIconModule, _progressBar.MatProgressBarModule, _sidenav.MatSidenavModule, _store.StoreModule.forFeature(hamburgerShellStoreFeature, HAMBURGER_SHELL_REDUCER), _effects.EffectsModule.forFeature([HamburgerShellEffects]), _router.RouterModule],
    providers: [hamburgerShellReducerProvider],
    declarations: [HamburgerShellComponent],
    exports: [HamburgerShellComponent]
  }]
}];
var hotReload = (0, _store.createAction)("[HMR] Reload", (0, _store.props)());
/**
 * Generate a reducer to set the root state in dev mode for HMR
 */

exports.hotReload = hotReload;

function hmrReducer(x) {
  return function (state, action) {
    if (action.type === "[HMR] Reload") {
      return action.payload;
    }

    return x(state, action);
  };
}

var DgpNgApp = /*#__PURE__*/function () {
  function DgpNgApp(appRef, ngrxStore) {
    _classCallCheck(this, DgpNgApp);

    this.appRef = appRef;
    this.ngrxStore = ngrxStore;
  } //noinspection JSUnusedGlobalSymbols


  _createClass(DgpNgApp, [{
    key: "hmrOnInit",
    value: function hmrOnInit(store) {
      if (!store || !store.rootState) {
        return;
      }

      if (store.rootState) {
        this.ngrxStore.dispatch(hotReload({
          payload: store.rootState
        }));
      }

      Object.keys(store).forEach(function (prop) {
        return delete store[prop];
      });
    } //noinspection JSUnusedGlobalSymbols

  }, {
    key: "hmrOnDestroy",
    value: function hmrOnDestroy(store) {
      var cmpLocation = this.appRef.components.map(function (cmp) {
        return cmp.location.nativeElement;
      });
      store.disposeOldHosts = (0, _hmr.createNewHosts)(cmpLocation);
      this.ngrxStore.pipe((0, _operators.take)(1)).subscribe(function (s) {
        return store.rootState = s;
      });
      var queryResults = document.querySelectorAll(".cdk-overlay-container");
      queryResults.forEach(function (x) {
        x.parentNode.removeChild(x);
      });
      queryResults = document.querySelectorAll(".cdk-visually-hidden");
      queryResults.forEach(function (x) {
        x.parentNode.removeChild(x);
      });
      (0, _hmr.removeNgStyles)();
    } //noinspection JSUnusedGlobalSymbols

  }, {
    key: "hmrAfterDestroy",
    value: function hmrAfterDestroy(store) {
      store.disposeOldHosts();
      delete store.disposeOldHosts;
    }
  }]);

  return DgpNgApp;
}();

exports.DgpNgApp = DgpNgApp;

var InspectorComponent = function InspectorComponent() {
  _classCallCheck(this, InspectorComponent);
};

exports.InspectorComponent = InspectorComponent;
InspectorComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-inspector",
    template: "\n        <ng-content></ng-content>\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        :host {\n            padding: 8px;\n        }\n   "]
  }]
}];

var InspectorItemComponent = function InspectorItemComponent() {
  _classCallCheck(this, InspectorItemComponent);
};

exports.InspectorItemComponent = InspectorItemComponent;
InspectorItemComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-inspector-item",
    template: "\n        <mat-list-item>\n            <mat-icon>{{matIconName}}</mat-icon>\n            <div class=\"label\">\n                {{ label }}\n            </div>\n            <dgp-spacer></dgp-spacer>\n            <ng-content></ng-content>\n        </mat-list-item>\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n\n        mat-list-item {\n            height: auto !important;\n        }\n\n        mat-icon {\n            margin-right: 16px;\n            color: gray;\n        }\n\n        .label {\n            font-size: smaller;\n        }\n\n    "]
  }]
}];
InspectorItemComponent.propDecorators = {
  label: [{
    type: _core.Input
  }],
  matIconName: [{
    type: _core.Input
  }]
};

var InspectorSectionComponent = function InspectorSectionComponent() {
  _classCallCheck(this, InspectorSectionComponent);
};

exports.InspectorSectionComponent = InspectorSectionComponent;
InspectorSectionComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-inspector-section",
    template: "\n        <mat-list>\n            <h3 class=\"label-item\"\n                mat-subheader>\n                {{ label }}\n                <dgp-spacer></dgp-spacer>\n                <mat-icon>{{matIconName}}</mat-icon>\n            </h3>\n            <ng-content></ng-content>\n        </mat-list>",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        .label-item {\n            border-bottom-width: 1px;\n            border-bottom-style: solid;\n            border-bottom-color: gray;\n        }\n    "]
  }]
}];
InspectorSectionComponent.propDecorators = {
  matIconName: [{
    type: _core.Input
  }],
  label: [{
    type: _core.Input
  }]
};
var components = [InspectorComponent, InspectorItemComponent, InspectorSectionComponent];

var DgpInspectorModule = function DgpInspectorModule() {
  _classCallCheck(this, DgpInspectorModule);
};

exports.DgpInspectorModule = DgpInspectorModule;
DgpInspectorModule.decorators = [{
  type: _core.NgModule,
  args: [{
    imports: [_common.CommonModule, _list.MatListModule, DgpSpacerModule, _icon.MatIconModule],
    declarations: [].concat(components),
    exports: [].concat(components)
  }]
}];
var logError = (0, _store.createAction)("[Log] LogError", (0, _store.props)());
exports.logError = logError;
var addLogEntry = (0, _store.createAction)("[Log] AddLogEntry", (0, _store.props)());
exports.addLogEntry = addLogEntry;
var logErrorActionType = logError.type;
exports.logErrorActionType = logErrorActionType;

var LogErrorAction = function LogErrorAction(payload) {
  _classCallCheck(this, LogErrorAction);

  this.payload = payload;
  this.type = logErrorActionType;
};

exports.LogErrorAction = LogErrorAction;
var Severity;
exports.Severity = Severity;

(function (Severity) {
  Severity[Severity["Error"] = 0] = "Error";
})(Severity || (exports.Severity = Severity = {}));

var logStoreFeature = "LogStore";
exports.logStoreFeature = logStoreFeature;
var logStore = (0, _entityStore.createEntityStore)({
  entityTypes: ["logEntry"],
  storeFeature: "LogStore"
});
exports.ɵcb = logStore;
var logFeatureSelector = (0, _store.createFeatureSelector)(logStoreFeature);

var ɵ0$a = function ɵ0$a(x) {
  return x.logEntry;
};

var getLogEntryState = (0, _store.createSelector)(logFeatureSelector, ɵ0$a);

var ɵ1$8 = function ɵ1$8(x) {
  var entries = (0, _entityStore.getAll)(x);
  entries.sort(function (a, b) {
    return b.timeStamp - a.timeStamp;
  });
  return entries;
};

var getAllLogEntries = (0, _store.createSelector)(getLogEntryState, ɵ1$8);

var ɵ2$6 = function ɵ2$6(x) {
  return x && x.length > 0;
};

var hasLogEntries = (0, _store.createSelector)(getAllLogEntries, ɵ2$6);
var getSelectedLogEntry = (0, _store.createSelector)(logFeatureSelector, logStore.selectors.logEntry.getFirstSelected);

var LogPageComponent = function LogPageComponent(store, activatedRoute) {
  var _this20 = this;

  _classCallCheck(this, LogPageComponent);

  this.store = store;
  this.activatedRoute = activatedRoute;
  this.logEntry$ = this.store.select(getSelectedLogEntry);
  activatedRoute.params.pipe((0, _operators.filter)(function (params) {
    return params.logEntryId;
  })).subscribe(function (params) {
    return _this20.store.dispatch(logStore.actions.composeEntityActions({
      select: {
        logEntry: [params.logEntryId]
      }
    }));
  });
};

exports.ɵby = LogPageComponent;
LogPageComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-log-page",
    template: "\n        <dgp-page-header>\n            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>\n            Log\n        </dgp-page-header>\n\n        <dgp-list-details-page>\n\n            <ng-container dgp-list-details-page-menu>\n                <dgp-log-entry-list></dgp-log-entry-list>\n            </ng-container>\n\n            <dgp-list-details-page-content>\n                <dgp-log-entry-details [logEntry]=\"logEntry$ | async\"></dgp-log-entry-details>\n            </dgp-list-details-page-content>\n\n        </dgp-list-details-page>\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush
  }]
}];

LogPageComponent.ctorParameters = function () {
  return [{
    type: _store.Store
  }, {
    type: _router.ActivatedRoute
  }];
};

var LogEntryListComponent = /*#__PURE__*/function (_DgpContainer5) {
  _inherits(LogEntryListComponent, _DgpContainer5);

  var _super14 = _createSuper(LogEntryListComponent);

  function LogEntryListComponent() {
    var _this21;

    _classCallCheck(this, LogEntryListComponent);

    _this21 = _super14.apply(this, arguments);
    _this21.severityEnum = Severity;
    _this21.logEntries$ = _this21.select(getAllLogEntries);
    _this21.hasLogEntries$ = _this21.select(hasLogEntries);
    return _this21;
  }

  return LogEntryListComponent;
}(DgpContainer);

exports.ɵca = LogEntryListComponent;
LogEntryListComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-log-entry-list",
    template: "\n        <mat-nav-list *ngIf=\"hasLogEntries$ | async; else emptyState\">\n            <h3 mat-subheader>Entries</h3>\n            <a mat-list-item\n               *ngFor=\"let logEntry of logEntries$ | async\"\n               [routerLink]=\"['/logEntries', logEntry.timeStamp.toString()]\">\n                <mat-icon mat-list-icon\n                          *ngIf=\"logEntry.severity === severityEnum.Error\">\n                    error\n                </mat-icon>\n                <div mat-line>\n                    {{ logEntry.title }}\n                </div>\n                <div mat-line>\n                    {{ logEntry.timeStamp | date:'medium'}}\n                </div>\n            </a>\n        </mat-nav-list>\n\n        <ng-template #emptyState>\n            <dgp-empty-state matIconName=\"error\"\n                             title=\"No entries available\">\n\n            </dgp-empty-state>\n        </ng-template>\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        :host {\n            display: flex;\n            flex-grow: 1;\n            flex-direction: column;\n            height: 100%;\n        }\n    "]
  }]
}];

var LogEntryDetailsComponent = /*#__PURE__*/function () {
  function LogEntryDetailsComponent() {
    _classCallCheck(this, LogEntryDetailsComponent);

    this.severityEnum = Severity;
  }

  _createClass(LogEntryDetailsComponent, [{
    key: "isApiError",
    value: function isApiError() {
      var _a, _b;

      if (((_a = this.logEntry.content) === null || _a === void 0 ? void 0 : _a.hasOwnProperty("status")) && ((_b = this.logEntry.content) === null || _b === void 0 ? void 0 : _b.hasOwnProperty("error"))) {
        return true;
      }

      return false;
    }
  }]);

  return LogEntryDetailsComponent;
}();

exports.ɵbz = LogEntryDetailsComponent;
LogEntryDetailsComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-log-entry-details",
    template: "\n        <ng-container *ngIf=\"logEntry; else noLogEntryTemplate\">\n\n            <div class=\"header\">\n                <mat-icon class=\"header__icon\"\n                          *ngIf=\"logEntry.severity === severityEnum.Error\">\n                    error\n                </mat-icon>\n                <div class=\"header__title-container\">\n                    <h1 class=\"header__title mat-h1\">\n                        {{ logEntry.title }}\n                    </h1>\n                    <div class=\"header__subtitle\">\n                        {{ logEntry.timeStamp | date:'medium' }}\n\n                    </div>\n                </div>\n            </div>\n\n            <mat-divider class=\"vertical-separator\"></mat-divider>\n\n            <div class=\"content\">\n                <h2 class=\"content__heading mat-h2\">\n                    Severity\n                </h2>\n                <div class=\"content__body\">\n                    <ng-container *ngIf=\"logEntry.severity === severityEnum.Error\">\n                        Error\n                    </ng-container>\n                </div>\n                <h2 class=\"content__heading mat-h2\">\n                    Content\n                </h2>\n                <div class=\"content__body\"\n                     *ngIf=\"logEntry.content; else noContentTemplate\">\n                    <ng-container *ngIf=\"!isApiError(); else apiError\">\n                        {{ logEntry.content | json }}\n                    </ng-container>\n                    <ng-template #apiError>\n                        <div [innerHTML]=\"logEntry.content.error | safe:'html'\"></div>\n                    </ng-template>\n                </div>\n                <ng-template #noContentTemplate>\n                    <div class=\"content__placeholder\">\n                        This log entry doesn't contain additional content.\n                    </div>\n                </ng-template>\n            </div>\n\n        </ng-container>\n\n        <ng-template #noLogEntryTemplate>\n            <dgp-empty-state title=\"No entry selected\"\n                             matIconName=\"error\">\n                Pick one from the list to the left.\n            </dgp-empty-state>\n        </ng-template>\n\n\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        :host {\n            display: flex;\n            flex-direction: column;\n            flex-grow: 1;\n            overflow: auto;\n            word-break: break-word;\n        }\n\n        .header {\n            display: flex;\n            align-items: center;\n        }\n\n        .header__icon {\n            font-size: 40px;\n            width: 40px;\n            height: 40px;\n            margin-left: 16px;\n            margin-right: 16px;\n        }\n\n        .header__title-container {\n            flex-grow: 1;\n        }\n\n        .header__title {\n            margin-top: 8px;\n            margin-bottom: 8px;\n        }\n\n        .header__subtitle {\n            display: flex;\n        }\n\n        .content {\n        }\n\n        .content__heading {\n            margin-top: 8px;\n            margin-bottom: 8px;\n        }\n\n        .content__body {\n\n        }\n\n        .content__placeholder {\n\n        }\n\n        .vertical-separator {\n            margin-top: 16px;\n            margin-bottom: 16px;\n        }\n    "]
  }]
}];
LogEntryDetailsComponent.propDecorators = {
  logEntry: [{
    type: _core.Input
  }]
};

var LogEffects = function LogEffects(actions$, matSnackbar, router) {
  var _this22 = this;

  _classCallCheck(this, LogEffects);

  this.actions$ = actions$;
  this.matSnackbar = matSnackbar;
  this.router = router;
  this.logError$ = this.actions$.pipe((0, _effects.ofType)(logError), (0, _operators.map)(function (action) {
    var logEntry = {
      timeStamp: new Date().valueOf(),
      title: action.payload.title,
      content: action.payload.error,
      severity: Severity.Error
    };
    return addLogEntry({
      logEntry: logEntry
    });
  }));
  this.addLogEntry$ = this.actions$.pipe((0, _effects.ofType)(addLogEntry), (0, _operators.map)(function (action) {
    return logStore.actions.composeEntityActions({
      add: {
        logEntry: _defineProperty({}, action.logEntry.timeStamp.toString(), action.logEntry)
      }
    });
  }));
  this.showErrorSnack$ = this.actions$.pipe((0, _effects.ofType)(addLogEntry), (0, _operators.switchMap)(function (action) {
    return _this22.matSnackbar.open(action.logEntry.title, "Show log", {
      duration: 5000
    }).onAction().pipe((0, _operators.map)(function () {
      return _this22.router.navigate(["/logEntries", action.logEntry.timeStamp.toString()]);
    }), (0, _operators.defaultIfEmpty)(null));
  }));
};

exports.ɵbx = LogEffects;
LogEffects.decorators = [{
  type: _core.Injectable
}];

LogEffects.ctorParameters = function () {
  return [{
    type: _effects.Actions
  }, {
    type: _snackBar.MatSnackBar
  }, {
    type: _router.Router
  }];
};

(0, _tslib.__decorate)([(0, _effects.Effect)()], LogEffects.prototype, "logError$", void 0);
(0, _tslib.__decorate)([(0, _effects.Effect)()], LogEffects.prototype, "addLogEntry$", void 0);
(0, _tslib.__decorate)([(0, _effects.Effect)({
  dispatch: false
})], LogEffects.prototype, "showErrorSnack$", void 0);
var LOG_STORE_REDUCER = new _core.InjectionToken("LogStoreReducer");
exports.ɵs = LOG_STORE_REDUCER;

function createLogStoreReducer() {
  return logStore.reducers;
}

var logStoreReducerProvider = {
  provide: LOG_STORE_REDUCER,
  useFactory: createLogStoreReducer
};
exports.ɵu = logStoreReducerProvider;

var DgpLogModule = function DgpLogModule() {
  _classCallCheck(this, DgpLogModule);
};

exports.DgpLogModule = DgpLogModule;
DgpLogModule.decorators = [{
  type: _core.NgModule,
  args: [{
    imports: [_common.CommonModule, _forms.FormsModule, _store.StoreModule.forFeature(logStoreFeature, LOG_STORE_REDUCER), _effects.EffectsModule.forFeature([LogEffects]), _router.RouterModule.forChild([{
      path: "logEntries",
      component: LogPageComponent
    }, {
      path: "logEntries/:logEntryId",
      component: LogPageComponent
    }]), _divider.MatDividerModule, _icon.MatIconModule, _list.MatListModule, _snackBar.MatSnackBarModule, DgpHamburgerMenuToggleModule, DgpPageHeaderModule, DgpListDetailsPageModule, DgpEmptyStateModule, SafePipeModule],
    declarations: [LogEntryDetailsComponent, LogEntryListComponent, LogPageComponent],
    providers: [logStoreReducerProvider]
  }]
}];
var scheduleRequestActionType = "[ScheduleRequest] ScheduleRequestAction";
exports.scheduleRequestActionType = scheduleRequestActionType;

var ScheduleRequestAction = function ScheduleRequestAction(payload) {
  _classCallCheck(this, ScheduleRequestAction);

  this.payload = payload;
  this.type = scheduleRequestActionType;
};

exports.ScheduleRequestAction = ScheduleRequestAction;
var scheduleRequest = (0, _store.createAction)(scheduleRequestActionType, (0, _store.props)());
exports.scheduleRequest = scheduleRequest;
var registerRequestActionType = "[Request] Register";
var registerRequest = (0, _store.createAction)(registerRequestActionType);
exports.ɵw = registerRequest;
var unregisterRequestActionType = "[Request] Unregister";
var unregisterRequest = (0, _store.createAction)(unregisterRequestActionType);
exports.ɵx = unregisterRequest;
var resetRequestsActionType = "[Request] Reset";
var resetRequests = (0, _store.createAction)(resetRequestsActionType);
/**
 * Observes a promise or observable based
 * request
 *
 * Allows intercepting value and error events
 * with a custom observer
 */

exports.ɵy = resetRequests;

function observeRequest(payload) {
  var request = payload.request$;
  var obs$;

  if (request instanceof Promise) {
    obs$ = (0, _rxjs.from)(request);
  } else {
    obs$ = request;
  }

  var interceptedObs$ = obs$;
  interceptedObs$ = interceptedObs$.pipe((0, _operators.tap)(payload.observer), (0, _operators.catchError)(function (err, caught) {
    return (0, _rxjs.empty)();
  }), (0, _operators.defaultIfEmpty)(null));
  return interceptedObs$.pipe((0, _operators.first)()).toPromise();
}

var RequestEffects = /*#__PURE__*/function () {
  function RequestEffects(actions$, store) {
    var _this23 = this;

    _classCallCheck(this, RequestEffects);

    this.actions$ = actions$;
    this.store = store;
    /**
     * A request-processing queue that processes requests
     * in the order they arrive and keeps track of how
     * many requests are currently running
     */

    this.scheduleRequest$ = this.actions$.pipe((0, _effects.ofType)(scheduleRequest), (0, _operators.concatMap)(function (action) {
      return observeRequest({
        request$: action.request$,
        observer: _this23.getRequestObserver()
      });
    }));
  }

  _createClass(RequestEffects, [{
    key: "getRequestObserver",
    value: function getRequestObserver() {
      var _this24 = this;

      this.store.dispatch(registerRequest());
      var isAlreadyUnregistered = false;

      var onObserved = function onObserved() {
        if (!isAlreadyUnregistered) {
          isAlreadyUnregistered = true;

          _this24.store.dispatch(unregisterRequest());
        }
      };

      return {
        next: onObserved,
        error: function error() {
          onObserved();
        },
        complete: onObserved
      };
    }
  }]);

  return RequestEffects;
}();

exports.ɵcc = RequestEffects;
RequestEffects.decorators = [{
  type: _core.Injectable
}];

RequestEffects.ctorParameters = function () {
  return [{
    type: _effects.Actions
  }, {
    type: _store.Store
  }];
};

(0, _tslib.__decorate)([(0, _effects.Effect)({
  dispatch: false
})], RequestEffects.prototype, "scheduleRequest$", void 0);

var ɵ0$b = function ɵ0$b(state) {
  return {
    pendingRequests: state.pendingRequests + 1
  };
},
    ɵ1$9 = function ɵ1$9(state) {
  return {
    pendingRequests: state.pendingRequests - 1
  };
},
    ɵ2$7 = function ɵ2$7() {
  return {
    pendingRequests: 0
  };
};

var requestReducer = (0, _store.createReducer)({
  pendingRequests: 0
}, (0, _store.on)(registerRequest, ɵ0$b), (0, _store.on)(unregisterRequest, ɵ1$9), (0, _store.on)(resetRequests, ɵ2$7));
exports.ɵcd = requestReducer;
var requestStoreReducer = {
  requests: requestReducer
};
exports.ɵce = requestStoreReducer;
var REQUEST_STORE_REDUCER = new _core.InjectionToken("RequestStoreReducer");
exports.ɵz = REQUEST_STORE_REDUCER;

function requestStoreReducerFactory() {
  return requestStoreReducer;
}

var requestStoreReducerProvider = {
  provide: REQUEST_STORE_REDUCER,
  useFactory: requestStoreReducerFactory
};
exports.ɵbb = requestStoreReducerProvider;

var DgpRequestStoreModule = function DgpRequestStoreModule() {
  _classCallCheck(this, DgpRequestStoreModule);
};

exports.DgpRequestStoreModule = DgpRequestStoreModule;
DgpRequestStoreModule.decorators = [{
  type: _core.NgModule,
  args: [{
    imports: [_store.StoreModule.forFeature(requestStoreFeature, REQUEST_STORE_REDUCER), _effects.EffectsModule.forFeature([RequestEffects])],
    providers: [requestStoreReducerProvider]
  }]
}];
var showLoadingSpinner = (0, _store.createAction)("[RoutingOverlay] ShowSpinner", (0, _store.props)());
exports.showLoadingSpinner = showLoadingSpinner;

var RoutingOverlayComponent = function RoutingOverlayComponent() {
  _classCallCheck(this, RoutingOverlayComponent);
};

exports.ɵcg = RoutingOverlayComponent;
RoutingOverlayComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-routing-overlay",
    template: "<mat-progress-bar mode='indeterminate' style='height: 16px;'></mat-progress-bar>",
    styles: ["\n        :host {\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            flex-grow: 1;\n            height: 100%;\n        }\n    "]
  }]
}];

var RoutingOverlayEffects = function RoutingOverlayEffects(actions$, router, matDialog) {
  var _this25 = this;

  _classCallCheck(this, RoutingOverlayEffects);

  this.actions$ = actions$;
  this.router = router;
  this.matDialog = matDialog;
  this.observeRouteEvents$ = this.router.events.pipe((0, _operators.map)(function (event) {
    if (event instanceof _router.ActivationStart) {
      return showLoadingSpinner({
        showSpinner: true
      });
    }

    if (event instanceof _router.NavigationEnd || event instanceof _router.NavigationCancel || event instanceof _router.NavigationError) {
      return showLoadingSpinner({
        showSpinner: false
      });
    }

    return null;
  }), (0, _operators.filter)(function (event) {
    return !(0, _util.isNullOrUndefined)(event);
  }));
  this.showLoadingSpinner$ = this.actions$.pipe((0, _effects.ofType)(showLoadingSpinner), (0, _operators.distinctUntilKeyChanged)("showSpinner"), (0, _operators.switchMap)(function (action) {
    if (action.showSpinner) {
      return (0, _rxjs.timer)(500).pipe((0, _operators.tap)(function () {
        _this25.dialogRef = _this25.matDialog.open(RoutingOverlayComponent, {
          disableClose: true,
          width: "400px",
          height: "320px"
        });
      }));
    } else {
      return (0, _rxjs.of)(null).pipe((0, _operators.tap)(function () {
        if (!(0, _util.isNullOrUndefined)(_this25.dialogRef)) {
          _this25.dialogRef.close();
        }
      }));
    }
  }));
};

exports.ɵcf = RoutingOverlayEffects;
RoutingOverlayEffects.decorators = [{
  type: _core.Injectable
}];

RoutingOverlayEffects.ctorParameters = function () {
  return [{
    type: _effects.Actions
  }, {
    type: _router.Router
  }, {
    type: _dialog.MatDialog
  }];
};

(0, _tslib.__decorate)([(0, _effects.Effect)()], RoutingOverlayEffects.prototype, "observeRouteEvents$", void 0);
(0, _tslib.__decorate)([(0, _effects.Effect)({
  dispatch: false
})], RoutingOverlayEffects.prototype, "showLoadingSpinner$", void 0);

var DgpRoutingOverlayModule = function DgpRoutingOverlayModule() {
  _classCallCheck(this, DgpRoutingOverlayModule);
};

exports.DgpRoutingOverlayModule = DgpRoutingOverlayModule;
DgpRoutingOverlayModule.decorators = [{
  type: _core.NgModule,
  args: [{
    imports: [_dialog.MatDialogModule, _progressBar.MatProgressBarModule, _effects.EffectsModule.forFeature([RoutingOverlayEffects]), _progressBar.MatProgressBarModule],
    declarations: [RoutingOverlayComponent],
    entryComponents: [RoutingOverlayComponent]
  }]
}];

var DgpTableCelLEditorDirective = function DgpTableCelLEditorDirective() {
  _classCallCheck(this, DgpTableCelLEditorDirective);
};

exports.DgpTableCelLEditorDirective = DgpTableCelLEditorDirective;
DgpTableCelLEditorDirective.decorators = [{
  type: _core.Directive,
  args: [{
    selector: "[dgpTableCellEditor]"
  }]
}];

function computeTableCellEditorSizes(payload) {
  return {
    offsetTop: payload.tableCellBoundingRect.top + payload.triggerButtonElement.offsetHeight,
    offsetLeft: payload.tableCellBoundingRect.left,
    availableSpace: {
      left: payload.tableCellBoundingRect.left,
      right: payload.window.innerWidth - payload.tableCellBoundingRect.left,
      bottom: payload.window.innerHeight - (payload.tableCellBoundingRect.top + payload.triggerButtonElement.offsetHeight),
      top: payload.window.innerHeight - payload.tableCellBoundingRect.top
    }
  };
}

function getDialogPositionFromTableCellEditorSizes(payload) {
  var result = {
    top: payload.tableCellEditorSizes.offsetTop + "px",
    left: payload.tableCellEditorSizes.offsetLeft + "px",
    bottom: null,
    right: null
  };

  if (payload.tableCellEditorSizes.availableSpace.right < payload.configureDialogWidth && payload.tableCellEditorSizes.availableSpace.left >= payload.configureDialogWidth) {
    result = Object.assign(Object.assign({}, result), {
      left: payload.tableCellEditorSizes.availableSpace.right - payload.configureDialogWidth + "px"
    });
  }

  return result;
}

var DgpTableCellComponent = /*#__PURE__*/function () {
  function DgpTableCellComponent(matDialog) {
    _classCallCheck(this, DgpTableCellComponent);

    this.matDialog = matDialog;
    this.editDialogConfig = {
      width: "240px"
    };
    this.editorOpened = new _core.EventEmitter();
    this.editorClosed = new _core.EventEmitter();
  }

  _createClass(DgpTableCellComponent, [{
    key: "openCellEditorDialog",
    value: function openCellEditorDialog() {
      return (0, _tslib.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var triggerButtonElement, configureDialogWidth, tableCellBoundingRect, tableCellEditorSizes, position;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.editorOpened.emit();
                triggerButtonElement = this.buttonElRef.nativeElement;
                configureDialogWidth = +this.editDialogConfig.width.replace("px", "");
                tableCellBoundingRect = this.buttonElRef.nativeElement.getBoundingClientRect();
                tableCellEditorSizes = computeTableCellEditorSizes({
                  tableCellBoundingRect: tableCellBoundingRect,
                  triggerButtonElement: triggerButtonElement,
                  window: window
                });
                position = getDialogPositionFromTableCellEditorSizes({
                  tableCellEditorSizes: tableCellEditorSizes,
                  configureDialogWidth: configureDialogWidth
                });
                this.dialogRef = this.matDialog.open(this.editorTemplate, Object.assign(Object.assign({}, this.editDialogConfig), {
                  position: position,
                  backdropClass: "mat-dialog-no-backdrop"
                }));
                _context3.next = 9;
                return this.dialogRef.afterClosed().toPromise();

              case 9:
                this.dialogRef = null;
                this.editorClosed.emit();

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
    }
  }, {
    key: "closeCellEditorDialog",
    value: function closeCellEditorDialog() {
      if (this.dialogRef) {
        this.dialogRef.close();
      }
    }
  }]);

  return DgpTableCellComponent;
}();

exports.DgpTableCellComponent = DgpTableCellComponent;
DgpTableCellComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-table-cell",
    template: "\n\n        <button #triggerButton\n                mat-button\n                [disabled]=\"disabled\"\n                (click)=\"openCellEditorDialog()\"\n                class=\"mat-table-cell-editor-trigger-button\">\n            <ng-content></ng-content>\n        </button>\n\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    encapsulation: _core.ViewEncapsulation.None,
    styles: ["\n\n        dgp-table-cell {\n            display: flex;\n            flex-grow: 1;\n        }\n\n        .mat-table-cell-editor-trigger-button {\n            flex-grow: 1;\n            justify-content: flex-start;\n            padding: initial;\n            display: flex;\n            font-weight: initial;\n        }\n\n        .mat-table-cell-editor-trigger-button .mat-button-wrapper {\n            flex-grow: 1;\n            justify-content: flex-start;\n            display: flex;\n        }\n\n        .mat-dialog-no-backdrop {\n            background: initial;\n        }\n\n\n    "]
  }]
}];

DgpTableCellComponent.ctorParameters = function () {
  return [{
    type: _dialog.MatDialog
  }];
};

DgpTableCellComponent.propDecorators = {
  editDialogConfig: [{
    type: _core.Input
  }],
  editorOpened: [{
    type: _core.Output
  }],
  editorClosed: [{
    type: _core.Output
  }],
  disabled: [{
    type: _core.Input
  }],
  scrollParentSelector: [{
    type: _core.Input
  }],
  editorTemplate: [{
    type: _core.ContentChild,
    args: [DgpTableCelLEditorDirective, {
      read: _core.TemplateRef
    }]
  }],
  buttonElRef: [{
    type: _core.ViewChild,
    args: ["triggerButton", {
      read: _core.ElementRef
    }]
  }]
};

var DgpTableCellModule = function DgpTableCellModule() {
  _classCallCheck(this, DgpTableCellModule);
};

exports.DgpTableCellModule = DgpTableCellModule;
DgpTableCellModule.decorators = [{
  type: _core.NgModule,
  args: [{
    imports: [_common.CommonModule, _button.MatButtonModule, _dialog.MatDialogModule],
    declarations: [DgpTableCellComponent, DgpTableCelLEditorDirective],
    exports: [DgpTableCellComponent, DgpTableCelLEditorDirective]
  }]
}];

var _toggleDarkMode = (0, _store.createAction)("[ThemeSwitcher] ToggleDarkMode");

exports.toggleDarkMode = _toggleDarkMode;
var setIsDarkModeActive = (0, _store.createAction)("[ThemeSwitcher] SetIsDarkModeActive", (0, _store.props)());
exports.setIsDarkModeActive = setIsDarkModeActive;
var defaultThemeSwitcherConfig = {
  darkThemeClassName: "dark-theme"
};
exports.ɵbc = defaultThemeSwitcherConfig;
var THEME_SWITCHER_CONFIG = new _core.InjectionToken("ThemeSwitcherConfig");
exports.ɵbd = THEME_SWITCHER_CONFIG;
var themeSwitcherStoreFeature = "ThemeSwitcher";
exports.themeSwitcherStoreFeature = themeSwitcherStoreFeature;
var themeSwitcherFeatureSelector = (0, _store.createFeatureSelector)(themeSwitcherStoreFeature);
exports.themeSwitcherFeatureSelector = themeSwitcherFeatureSelector;

var ɵ0$c = function ɵ0$c(x) {
  return x.useDarkMode;
};

var isDarkModeActiveSelector = (0, _store.createSelector)(themeSwitcherFeatureSelector, ɵ0$c);
exports.isDarkModeActiveSelector = isDarkModeActiveSelector;
var isDarkModeActive = isDarkModeActiveSelector;
exports.isDarkModeActive = isDarkModeActive;

var DarkModeToggleComponent = /*#__PURE__*/function (_DgpContainer6) {
  _inherits(DarkModeToggleComponent, _DgpContainer6);

  var _super15 = _createSuper(DarkModeToggleComponent);

  function DarkModeToggleComponent() {
    var _this26;

    _classCallCheck(this, DarkModeToggleComponent);

    _this26 = _super15.apply(this, arguments);
    _this26.useDarkMode$ = _this26.select(isDarkModeActive);
    return _this26;
  }

  _createClass(DarkModeToggleComponent, [{
    key: "toggleDarkMode",
    value: function toggleDarkMode() {
      this.dispatch(_toggleDarkMode());
    }
  }]);

  return DarkModeToggleComponent;
}(DgpContainer);

exports.DarkModeToggleComponent = DarkModeToggleComponent;
DarkModeToggleComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-dark-mode-toggle",
    template: "\n        <mat-slide-toggle [ngModel]=\"useDarkMode$ | async\"\n                          (ngModelChange)=\"toggleDarkMode()\">\n            Use dark mode\n        </mat-slide-toggle>\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        :host {\n            margin-left: 16px;\n            margin-right: 16px;\n        }\n    "]
  }]
}];

var ThemeHostDirective = function ThemeHostDirective(elRef, renderer, store, config, overlayContainer) {
  var _this27 = this;

  _classCallCheck(this, ThemeHostDirective);

  this.elRef = elRef;
  this.renderer = renderer;
  this.store = store;
  this.config = config;
  this.overlayContainer = overlayContainer;
  this.store.pipe((0, _store.select)(isDarkModeActiveSelector)).subscribe(function (isDarkModeActive) {
    if (isDarkModeActive) {
      _this27.renderer.addClass(elRef.nativeElement, _this27.config.darkThemeClassName);

      _this27.overlayContainer.getContainerElement().classList.add(_this27.config.darkThemeClassName);
    } else {
      _this27.renderer.removeClass(elRef.nativeElement, _this27.config.darkThemeClassName);

      _this27.overlayContainer.getContainerElement().classList.remove(_this27.config.darkThemeClassName);
    }
  });
};

exports.ThemeHostDirective = ThemeHostDirective;
ThemeHostDirective.decorators = [{
  type: _core.Directive,
  args: [{
    selector: "[dgpThemeHost]"
  }]
}];

ThemeHostDirective.ctorParameters = function () {
  return [{
    type: _core.ElementRef
  }, {
    type: _core.Renderer2
  }, {
    type: _store.Store
  }, {
    type: undefined,
    decorators: [{
      type: _core.Inject,
      args: [THEME_SWITCHER_CONFIG]
    }]
  }, {
    type: _overlay.OverlayContainer
  }];
};

var ThemeSwitcherEffects = function ThemeSwitcherEffects(actions$, store) {
  var _this28 = this;

  _classCallCheck(this, ThemeSwitcherEffects);

  this.actions$ = actions$;
  this.store = store;
  this.toggleDarkMode$ = this.actions$.pipe((0, _effects.ofType)(_toggleDarkMode), (0, _operators.switchMap)(function () {
    return _this28.store.pipe((0, _store.select)(isDarkModeActiveSelector), (0, _operators.first)(), (0, _operators.tap)(function (isDarkModeActive) {
      localStorage.setItem("isDarkModeActive", JSON.stringify(isDarkModeActive));
    }));
  }));
};

exports.ɵch = ThemeSwitcherEffects;
ThemeSwitcherEffects.decorators = [{
  type: _core.Injectable
}];

ThemeSwitcherEffects.ctorParameters = function () {
  return [{
    type: _effects.Actions
  }, {
    type: _store.Store
  }];
};

(0, _tslib.__decorate)([(0, _effects.Effect)({
  dispatch: false
})], ThemeSwitcherEffects.prototype, "toggleDarkMode$", void 0);
var initialThemeSwitcherState = {
  useDarkMode: true
};
exports.ɵci = initialThemeSwitcherState;

var ɵ0$d = function ɵ0$d(state, action) {
  return Object.assign(Object.assign({}, state), {
    useDarkMode: action.isDarkModeActive
  });
},
    ɵ1$a = function ɵ1$a(state) {
  return Object.assign(Object.assign({}, state), {
    useDarkMode: !state.useDarkMode
  });
};

var themeSwitcherReducer = (0, _store.createReducer)(initialThemeSwitcherState, (0, _store.on)(setIsDarkModeActive, ɵ0$d), (0, _store.on)(_toggleDarkMode, ɵ1$a));
exports.ɵcj = themeSwitcherReducer;
var THEME_SWITCHER_REDUCER = new _core.InjectionToken("ThemeSwitcherReducer");
exports.ɵbe = THEME_SWITCHER_REDUCER;

function themeSwitcherReducerFactory() {
  return themeSwitcherReducer;
}

var themeSwitcherReducerProvider = {
  provide: THEME_SWITCHER_REDUCER,
  useFactory: themeSwitcherReducerFactory
};
exports.ɵbg = themeSwitcherReducerProvider;

var DgpThemeSwitcherModule = /*#__PURE__*/function () {
  function DgpThemeSwitcherModule(store) {
    _classCallCheck(this, DgpThemeSwitcherModule);

    this.store = store;
    var isDarkModeActiveJSON = localStorage.getItem("isDarkModeActive");

    if (!(0, _util.isNullOrUndefined)(isDarkModeActiveJSON)) {
      var _isDarkModeActive = JSON.parse(isDarkModeActiveJSON);

      this.store.dispatch(setIsDarkModeActive({
        isDarkModeActive: _isDarkModeActive
      }));
    }
  }

  _createClass(DgpThemeSwitcherModule, null, [{
    key: "forRoot",
    value: function forRoot() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultThemeSwitcherConfig;
      return {
        ngModule: DgpThemeSwitcherModule,
        providers: [{
          provide: THEME_SWITCHER_CONFIG,
          useValue: config
        }]
      };
    }
  }]);

  return DgpThemeSwitcherModule;
}();

exports.DgpThemeSwitcherModule = DgpThemeSwitcherModule;
DgpThemeSwitcherModule.decorators = [{
  type: _core.NgModule,
  args: [{
    imports: [_common.CommonModule, _forms.FormsModule, _overlay.OverlayModule, _slideToggle.MatSlideToggleModule, _store.StoreModule.forFeature(themeSwitcherStoreFeature, THEME_SWITCHER_REDUCER), _effects.EffectsModule.forFeature([ThemeSwitcherEffects])],
    declarations: [DarkModeToggleComponent, ThemeHostDirective],
    exports: [DarkModeToggleComponent, ThemeHostDirective],
    providers: [themeSwitcherReducerProvider]
  }]
}];

DgpThemeSwitcherModule.ctorParameters = function () {
  return [{
    type: _store.Store
  }];
};

var TileComponent = function TileComponent() {
  _classCallCheck(this, TileComponent);
};

exports.TileComponent = TileComponent;
TileComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-tile",
    template: "\n        <a *ngIf=\"route\"\n           [routerLink]=\"route\"\n           class=\"container\">\n            <mat-card matRipple\n                      class=\"tile-card\">\n                <mat-card-content class=\"description\">\n                    <mat-icon class=\"icon dgp-bg--primary\">{{ matIconName }}</mat-icon>\n                    <div class=\"label\">\n                        {{ label }}\n                    </div>\n                    <mat-divider class=\"divider\"></mat-divider>\n                    <div>\n                        {{ description }}\n                    </div>\n                </mat-card-content>\n            </mat-card>\n\n        </a>\n\n        <a *ngIf=\"externalLink\"\n           [attr.href]=\"externalLink\"\n           target=\"_blank\"\n           class=\"container\">\n            <mat-card matRipple\n                      class=\"tile-card\">\n                <mat-card-content class=\"description\">\n                    <mat-icon class=\"icon dgp-bg--primary\">{{ matIconName }}</mat-icon>\n                    <div class=\"label\">\n                        {{ label }}\n                    </div>\n                    <mat-divider class=\"divider\"></mat-divider>\n                    <div>\n                        {{ description }}\n                    </div>\n                </mat-card-content>\n            </mat-card>\n\n        </a>\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush,
    styles: ["\n        .container {\n            display: flex;\n            flex-direction: column;\n            max-height: 224px;\n            min-height: 224px;\n            height: 100%;\n            max-width: 224px;\n            min-width: 224px;\n            width: 100%;\n            text-decoration: inherit;\n            margin: 8px;\n        }\n\n        .tile-card {\n            flex-grow: 1;\n        }\n\n        .description {\n            display: flex;\n            flex-direction: column;\n            justify-content: center;\n            align-items: center;\n            height: 100%;\n        }\n\n        .icon {\n            font-size: 40px;\n            height: 64px;\n            width: 64px;\n            color: white !important;\n            border-radius: 32px;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            margin-bottom: 16px;\n        }\n\n        .label {\n            font-size: larger;\n        }\n\n        .divider {\n            position: relative !important;\n            margin-top: 16px;\n            margin-bottom: 16px;\n        }\n    "]
  }]
}];
TileComponent.propDecorators = {
  externalLink: [{
    type: _core.Input
  }],
  route: [{
    type: _core.Input
  }],
  matIconName: [{
    type: _core.Input
  }],
  label: [{
    type: _core.Input
  }],
  description: [{
    type: _core.Input
  }]
};

var DgpTileModule = function DgpTileModule() {
  _classCallCheck(this, DgpTileModule);
};

exports.DgpTileModule = DgpTileModule;
DgpTileModule.decorators = [{
  type: _core.NgModule,
  args: [{
    imports: [_router.RouterModule, _card.MatCardModule, _core2.MatRippleModule, _icon.MatIconModule, _divider.MatDividerModule, _common.CommonModule],
    declarations: [TileComponent],
    exports: [TileComponent]
  }]
}];

function isNullOrUndefined(value) {
  for (var _len = arguments.length, additionalValues = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    additionalValues[_key - 1] = arguments[_key];
  }

  return value === null || value === undefined || additionalValues.some(function (x) {
    return x === null || x === undefined;
  });
}

var nullOrUndefined = isNullOrUndefined;
exports.nullOrUndefined = nullOrUndefined;

function notNullOrUndefined(value) {
  for (var _len2 = arguments.length, additionalValues = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    additionalValues[_key2 - 1] = arguments[_key2];
  }

  return !isNullOrUndefined(value) && !additionalValues.some(isNullOrUndefined);
}

function filterNotNullOrUndefined() {
  return (0, _operators.filter)(notNullOrUndefined);
}
/**
 * Source: https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
 */


function getHashCode(object) {
  var hash = 0;
  if (isNullOrUndefined(object)) return hash;
  var serializedObject = JSON.stringify(object);
  if (serializedObject.length === 0) return hash;

  for (var i = 0; i < serializedObject.length; i++) {
    var _char = serializedObject.charCodeAt(i); // tslint:disable-next-line:no-bitwise


    hash = (hash << 5) - hash + _char; // tslint:disable-next-line:no-bitwise

    hash = hash & hash; // Convert to 32bit integer
  }

  return hash;
}

function distinctUntilHashChanged() {
  return (0, _operators.distinctUntilChanged)(function (x, y) {
    return getHashCode(x) === getHashCode(y);
  });
}

function _createOnChangeEffect$(payload) {
  return payload.store.select(payload.observedSelector).pipe(filterNotNullOrUndefined(), distinctUntilHashChanged());
}

var defaultRuntimeChecks = {
  strictStateSerializability: false,
  strictStateImmutability: false,
  strictActionWithinNgZone: false,
  strictActionSerializability: false,
  strictActionImmutability: false
};
exports.defaultRuntimeChecks = defaultRuntimeChecks;

var DgpEffectsBase = /*#__PURE__*/function (_DgpContainer7) {
  _inherits(DgpEffectsBase, _DgpContainer7);

  var _super16 = _createSuper(DgpEffectsBase);

  function DgpEffectsBase() {
    _classCallCheck(this, DgpEffectsBase);

    return _super16.apply(this, arguments);
  }

  _createClass(DgpEffectsBase, [{
    key: "createOnChangeEffect$",
    value: function createOnChangeEffect$(payload) {
      return _createOnChangeEffect$(Object.assign({
        store: this.store
      }, payload));
    }
  }]);

  return DgpEffectsBase;
}(DgpContainer);

exports.DgpEffectsBase = DgpEffectsBase;
DgpEffectsBase.decorators = [{
  type: _core.Directive
}];

function filterEmpty() {
  return (0, _operators.filter)(function (x) {
    return x.length !== 0;
  });
}

function flattenMatrix(matrix) {
  return (0, _lodash.flatten)(matrix);
}
/**
 * Base class for classes for manipulating a model
 */
// tslint:disable-next-line:directive-class-suffix


var DgpModelEditorComponentBase = /*#__PURE__*/function () {
  function DgpModelEditorComponentBase() {
    _classCallCheck(this, DgpModelEditorComponentBase);

    this.modelValue = null;
    this.model$ = new _rxjs.BehaviorSubject(this.modelValue);
    this.modelChange = new _core.EventEmitter();
  }

  _createClass(DgpModelEditorComponentBase, [{
    key: "model",
    get: function get() {
      return this.modelValue;
    },
    set: function set(value) {
      if ((0, _lodash.isEqual)(value, this.modelValue)) {
        return;
      }

      this.modelValue = value;
      this.model$.next(value);
    }
  }, {
    key: "setModel",
    value: function setModel(value) {
      this.model = value;
      this.modelChange.emit(this.model);
    }
  }, {
    key: "updateModel",
    value: function updateModel(value) {
      if (value !== null && _typeof(value) === "object" || this.model !== null && _typeof(this.model) === "object") {
        this.model = Object.assign(Object.assign({}, this.model), value);
      } else {
        this.model = value;
      }

      this.modelChange.emit(this.model);
    }
  }]);

  return DgpModelEditorComponentBase;
}();

exports.DgpModelEditorComponentBase = DgpModelEditorComponentBase;
DgpModelEditorComponentBase.decorators = [{
  type: _core.Directive
}];
DgpModelEditorComponentBase.propDecorators = {
  model: [{
    type: _core.Input
  }],
  modelChange: [{
    type: _core.Output
  }]
}; // tslint:disable-next-line:directive-class-suffix

var HybridComponentBase = /*#__PURE__*/function (_DgpModelEditorCompon) {
  _inherits(HybridComponentBase, _DgpModelEditorCompon);

  var _super17 = _createSuper(HybridComponentBase);

  function HybridComponentBase(store) {
    var _this29;

    _classCallCheck(this, HybridComponentBase);

    _this29 = _super17.call(this);
    _this29.store = store;

    _this29.dispatch = function (x) {
      return _this29.store.dispatch(x);
    };

    _this29.select = function (x) {
      return _this29.store.select(x);
    }; // tslint:disable-next-line:member-ordering


    _this29.data$ = notNullOrUndefined(_this29.getData) ? _this29.select(_this29.getData()) : (0, _rxjs.of)(null);
    return _this29;
  }

  return HybridComponentBase;
}(DgpModelEditorComponentBase);

exports.HybridComponentBase = HybridComponentBase;
HybridComponentBase.decorators = [{
  type: _core.Directive
}];

HybridComponentBase.ctorParameters = function () {
  return [{
    type: _store.Store
  }];
};

var DgpSelectEntityViaRouteResolver = /*#__PURE__*/function () {
  function DgpSelectEntityViaRouteResolver(store, config) {
    _classCallCheck(this, DgpSelectEntityViaRouteResolver);

    this.store = store;
    this.config = config;
  }

  _createClass(DgpSelectEntityViaRouteResolver, [{
    key: "resolve",
    value: function resolve(route, state) {
      return (0, _tslib.__awaiter)(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var newSelectionIdFromRoute, oldSelectionIdFromStore;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.config.getNewEntitySurrogateKeyFromRoute(route);

              case 2:
                newSelectionIdFromRoute = _context4.sent;
                _context4.next = 5;
                return this.config.getOldEntitySurrogateKeyFromStore();

              case 5:
                oldSelectionIdFromStore = _context4.sent;

                if (!(!oldSelectionIdFromStore && !newSelectionIdFromRoute)) {
                  _context4.next = 8;
                  break;
                }

                return _context4.abrupt("return");

              case 8:
                if (!(oldSelectionIdFromStore === newSelectionIdFromRoute)) {
                  _context4.next = 10;
                  break;
                }

                return _context4.abrupt("return");

              case 10:
                this.store.dispatch((0, _entityStore.composeEntityActions)({
                  select: _defineProperty({}, this.config.entityName, [newSelectionIdFromRoute]),
                  storeFeature: this.config.storeFeature
                }));

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
    }
  }]);

  return DgpSelectEntityViaRouteResolver;
}();

exports.DgpSelectEntityViaRouteResolver = DgpSelectEntityViaRouteResolver;

function resolveOverridableValue(payload) {
  return notNullOrUndefined(payload.overriddenValue) ? payload.overriddenValue : payload.computedValue;
}

var DgpResolverBase = /*#__PURE__*/function (_DgpContainer8) {
  _inherits(DgpResolverBase, _DgpContainer8);

  var _super18 = _createSuper(DgpResolverBase);

  function DgpResolverBase() {
    _classCallCheck(this, DgpResolverBase);

    return _super18.apply(this, arguments);
  }

  return DgpResolverBase;
}(DgpContainer);

exports.DgpResolverBase = DgpResolverBase;
DgpResolverBase.decorators = [{
  type: _core.Directive
}];

function parseStringMatrixAsNumberMatrix(payload) {
  return payload.map(function (line) {
    return line.map(function (entry) {
      return +entry.replace(",", ".");
    });
  });
}

var Magnitude;
exports.Magnitude = Magnitude;

(function (Magnitude) {
  Magnitude[Magnitude["Femto"] = -15] = "Femto";
  Magnitude[Magnitude["Piko"] = -12] = "Piko";
  Magnitude[Magnitude["Nano"] = -9] = "Nano";
  Magnitude[Magnitude["Mikro"] = -6] = "Mikro";
  Magnitude[Magnitude["Milli"] = -3] = "Milli";
  Magnitude[Magnitude["None"] = 0] = "None";
  Magnitude[Magnitude["Kilo"] = 3] = "Kilo";
  Magnitude[Magnitude["Mega"] = 6] = "Mega";
  Magnitude[Magnitude["Giga"] = 9] = "Giga";
  Magnitude[Magnitude["Tera"] = 12] = "Tera";
  Magnitude[Magnitude["Peta"] = 15] = "Peta";
})(Magnitude || (exports.Magnitude = Magnitude = {}));

var HttpSSEApiClient = /*#__PURE__*/function () {
  function HttpSSEApiClient() {
    _classCallCheck(this, HttpSSEApiClient);
  }

  _createClass(HttpSSEApiClient, [{
    key: "getStream$",
    value: function getStream$(url, processor, eventSourceInitDict) {
      return new _rxjs.Observable(function (observer) {
        var source = new EventSource(url, eventSourceInitDict);

        source.onmessage = function (x) {
          var result = processor(x.data);
          observer.next(result);
        };

        source.onerror = function (x) {
          return observer.error(x);
        };

        return function () {
          return source.close();
        };
      });
    }
  }]);

  return HttpSSEApiClient;
}();

exports.HttpSSEApiClient = HttpSSEApiClient;
HttpSSEApiClient.ɵprov = (0, _core.ɵɵdefineInjectable)({
  factory: function HttpSSEApiClient_Factory() {
    return new HttpSSEApiClient();
  },
  token: HttpSSEApiClient,
  providedIn: "root"
});
HttpSSEApiClient.decorators = [{
  type: _core.Injectable,
  args: [{
    providedIn: "root"
  }]
}];

function firstAsPromise(observable) {
  return observable.pipe((0, _operators.first)()).toPromise();
}

var VirtualListItemDirective = function VirtualListItemDirective() {
  _classCallCheck(this, VirtualListItemDirective);
};

exports.VirtualListItemDirective = VirtualListItemDirective;
VirtualListItemDirective.decorators = [{
  type: _core.Directive,
  args: [{
    selector: "[dgpVirtualListItem]"
  }]
}];

var VirtualListPanelComponent = /*#__PURE__*/function () {
  function VirtualListPanelComponent(elementRef, renderer) {
    _classCallCheck(this, VirtualListPanelComponent);

    this.elementRef = elementRef;
    this.renderer = renderer;
    this.itemSize = 48;
  }

  _createClass(VirtualListPanelComponent, [{
    key: "ngAfterViewInit",
    value: function ngAfterViewInit() {
      var parentNode = this.renderer.parentNode(this.elementRef.nativeElement);
      this.renderer.setStyle(parentNode, "flex-grow", 1);
      this.renderer.setStyle(parentNode, "overflow", "auto");
      this.renderer.setStyle(parentNode, "height", "100%");
    }
  }]);

  return VirtualListPanelComponent;
}();

exports.VirtualListPanelComponent = VirtualListPanelComponent;
VirtualListPanelComponent.decorators = [{
  type: _core.Component,
  args: [{
    selector: "dgp-virtual-list-panel",
    template: "\n        <cdk-virtual-scroll-viewport [itemSize]=\"itemSize\"\n                                     style=\"height: 100%; width:100%;\">\n            <ng-container *cdkVirtualFor=\"let item of items\">\n                <ng-container *ngTemplateOutlet=\"itemTemplate; context: {$implicit: item}\"></ng-container>\n            </ng-container>\n        </cdk-virtual-scroll-viewport>\n    ",
    changeDetection: _core.ChangeDetectionStrategy.OnPush
  }]
}];

VirtualListPanelComponent.ctorParameters = function () {
  return [{
    type: _core.ElementRef
  }, {
    type: _core.Renderer2
  }];
};

VirtualListPanelComponent.propDecorators = {
  itemSize: [{
    type: _core.Input
  }],
  items: [{
    type: _core.Input
  }],
  itemTemplate: [{
    type: _core.ContentChild,
    args: [VirtualListItemDirective, {
      read: _core.TemplateRef
    }]
  }]
};

var DgpVirtualListPanelModule = function DgpVirtualListPanelModule() {
  _classCallCheck(this, DgpVirtualListPanelModule);
};

exports.DgpVirtualListPanelModule = DgpVirtualListPanelModule;
DgpVirtualListPanelModule.decorators = [{
  type: _core.NgModule,
  args: [{
    imports: [_common.CommonModule, _scrolling.ScrollingModule],
    declarations: [VirtualListPanelComponent, VirtualListItemDirective],
    exports: [VirtualListPanelComponent, VirtualListItemDirective]
  }]
}];
var APP_REDUCER = new _core.InjectionToken("AppReducer");
exports.APP_REDUCER = APP_REDUCER;

var DgpNgAppModule = /*#__PURE__*/function () {
  function DgpNgAppModule() {
    _classCallCheck(this, DgpNgAppModule);
  }

  _createClass(DgpNgAppModule, null, [{
    key: "forRoot",
    value: function forRoot(config) {
      return {
        ngModule: DgpNgAppModule,
        providers: [{
          provide: APP_REDUCER,
          useValue: config.appReducer
        }]
      };
    }
  }]);

  return DgpNgAppModule;
}();

exports.DgpNgAppModule = DgpNgAppModule;
DgpNgAppModule.decorators = [{
  type: _core.NgModule,
  args: [{
    imports: [_platformBrowser.BrowserModule, _animations.BrowserAnimationsModule, _store.StoreModule.forRoot(APP_REDUCER, {
      metaReducers: [hmrReducer]
    }), _effects.EffectsModule.forRoot([]), DgpHamburgerShellModule.forRoot(), DgpThemeSwitcherModule.forRoot(), DgpHamburgerMenuModule, DgpLogModule, DgpRequestStoreModule, DgpRoutingOverlayModule],
    exports: [DgpHamburgerShellModule, DgpThemeSwitcherModule, DgpHamburgerMenuModule]
  }]
}];
/*
 * Public API Surface of dgp-ng-app
 */

/**
 * Generated bundle index. Do not edit.
 */
