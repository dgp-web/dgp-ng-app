import {AppFeature} from "../models/models";

export const coreFeatures: ReadonlyArray<AppFeature> = [{
    route: "/authentication",
    matIconName: "person",
    label: "Authentication",
    description: "Authenticate users and perform startup tasks."
}, {
    route: "/broadcasting",
    matIconName: "dynamic_feed",
    label: "Broadcasting",
    description: "Bidirectional data sync between windows and tabs."
}, {
    route: "/empty-state",
    matIconName: "texture",
    label: "Empty state",
    description: "Configurable placeholder for empty views."
}, {
    route: "/file-upload",
    matIconName: "attach_file",
    label: "File upload",
    description: "Overlay-based file-upload with integrated viewer."
}, {
    route: "/file-viewer",
    matIconName: "file_present",
    label: "File viewer",
    description: "Extendable file viewer for presenting documents."
}, {
    route: "/hamburger-shell",
    matIconName: "chrome_reader_mode",
    label: "Hamburger shell",
    description: "Responsive navigation drawer for applications."
}, {
    route: "/inspector",
    matIconName: "view_sidebar",
    label: "Inspector",
    description: "Compact, elegant detail menus."
}, {
    route: "/list-details-page",
    matIconName: "vertical_split",
    label: "List-details page",
    description: "Page with a collapsible list and a central details view."
}, {
    route: "/log",
    matIconName: "receipt",
    label: "Log",
    description: "Feature to create and view log entries."
}, {
    route: "/request-store",
    matIconName: "import_export",
    label: "Request store",
    description: "A request queue that allows to dispatch requests as actions."
}, {
    route: "/routing-overlay",
    matIconName: "schedule",
    label: "Routing overlay",
    description: "Loading spinner that indicates idle states when routing."
}, {
    route: "/spacer",
    matIconName: "space_bar",
    label: "Spacer",
    description: "Invisible component that fills empty space."
}, {
    route: "/styling",
    matIconName: "color_lens",
    label: "Styling",
    description: "Theming utilities for easy setup of bright/dark mode."
}, {
    route: "/table-cell-editor",
    matIconName: "featured_video",
    label: "Table-cell editor",
    description: "Editing functionality for table cells."
}, {
    route: "/theme-switcher",
    matIconName: "style",
    label: "Theme switcher",
    description: "Setup theming-related components in your app."
}];
