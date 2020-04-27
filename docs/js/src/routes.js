/*!

=========================================================
* Paper Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-pro-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.jsx";
import League from "./views/League";

const routes = [
    {
        path: "/home",
        name: "Dashboard",
        icon: "nc-icon nc-bank",
        component: Dashboard,
        layout: "/admin"
    },
    {
        path: "/premier-league",
        name: "Premier League",
        icon: "nc-icon nc-bank",
        component: League,
        props: {
            league: "Premier League",
            image: "https://obamabcn.com/wp-content/uploads/2019/11/logo-premier-league.jpg",
        },
        layout: "/admin"
    },
    {
        path: "/efl-championship",
        name: "EFL Championship",
        icon: "nc-icon nc-bank",
        component: League,
        props: {
            league: "EFL Championship",
            image: "https://static.ostadium.com/galleries/efl-championship-illus.jpg",
        },
        layout: "/admin"
    },
    {
        path: "/efl-league-one",
        name: "EFL League One",
        icon: "nc-icon nc-bank",
        component: League,
        props: {
            league: "EFL League One",
            image: "https://www.scunthorpe-united.co.uk/contentassets/c0c95f40218748a8995ac676770fc02b/skybet22.jpg/Large",
        },
        layout: "/admin"
    },
    {
        path: "/efl-league-two",
        name: "EFL League Two",
        icon: "nc-icon nc-bank",
        component: League,
        props: {
            league: "EFL League Two",
            image: "https://www.efl.com/contentassets/aab4ff03e22a460e8226c902dc69d430/l2-16x9549-3222841_1600x900/Large",
        },
        layout: "/admin"
    },
]

// const routes = [
//   {
//     path: "/dashboard",
//     name: "Dashboard",
//     icon: "nc-icon nc-bank",
//     component: Dashboard,
//     layout: "/admin"
//   },
//   {
//     collapse: true,
//     name: "Pages",
//     icon: "nc-icon nc-book-bookmark",
//     state: "pagesCollapse",
//     views: [
//       {
//         path: "/timeline",
//         name: "Timeline",
//         mini: "T",
//         component: Timeline,
//         layout: "/admin"
//       },
//       {
//         path: "/login",
//         name: "Login",
//         mini: "L",
//         component: Login,
//         layout: "/auth"
//       },
//       {
//         path: "/register",
//         name: "Register",
//         mini: "R",
//         component: Register,
//         layout: "/auth"
//       },
//       {
//         path: "/lock-screen",
//         name: "LockScreen",
//         mini: "LS",
//         component: LockScreen,
//         layout: "/auth"
//       },
//       {
//         path: "/user-profile",
//         name: "UserProfile",
//         mini: "UP",
//         component: UserProfile,
//         layout: "/admin"
//       }
//     ]
//   },
//   {
//     collapse: true,
//     name: "Components",
//     icon: "nc-icon nc-layout-11",
//     state: "componentsCollapse",
//     views: [
//       {
//         path: "/buttons",
//         name: "Buttons",
//         mini: "B",
//         component: Buttons,
//         layout: "/admin"
//       },
//       {
//         path: "/grid-system",
//         name: "Grid System",
//         mini: "GS",
//         component: GridSystem,
//         layout: "/admin"
//       },
//       {
//         path: "/panels",
//         name: "Panels",
//         mini: "P",
//         component: Panels,
//         layout: "/admin"
//       },
//       {
//         path: "/sweet-alert",
//         name: "Sweet Alert",
//         mini: "SA",
//         component: SweetAlert,
//         layout: "/admin"
//       },
//       {
//         path: "/notifications",
//         name: "Notifications",
//         mini: "N",
//         component: Notifications,
//         layout: "/admin"
//       },
//       {
//         path: "/icons",
//         name: "Icons",
//         mini: "I",
//         component: Icons,
//         layout: "/admin"
//       },
//       {
//         path: "/typography",
//         name: "Typography",
//         mini: "T",
//         component: Typography,
//         layout: "/admin"
//       }
//     ]
//   },
//   {
//     collapse: true,
//     name: "Forms",
//     icon: "nc-icon nc-ruler-pencil",
//     state: "formsCollapse",
//     views: [
//       {
//         path: "/regular-forms",
//         name: "Regular Forms",
//         mini: "RF",
//         component: RegularForms,
//         layout: "/admin"
//       },
//       {
//         path: "/extended-forms",
//         name: "Extended Forms",
//         mini: "EF",
//         component: ExtendedForms,
//         layout: "/admin"
//       },
//       {
//         path: "/validation-forms",
//         name: "Validation Forms",
//         mini: "VF",
//         component: ValidationForms,
//         layout: "/admin"
//       },
//       {
//         path: "/wizard",
//         name: "Wizard",
//         mini: "W",
//         component: Wizard,
//         layout: "/admin"
//       }
//     ]
//   },
//   {
//     collapse: true,
//     name: "Tables",
//     icon: "nc-icon nc-single-copy-04",
//     state: "tablesCollapse",
//     views: [
//       {
//         path: "/regular-tables",
//         name: "Regular Tables",
//         mini: "RT",
//         component: RegularTables,
//         layout: "/admin"
//       },
//       {
//         path: "/extended-tables",
//         name: "Extended Tables",
//         mini: "ET",
//         component: ExtendedTables,
//         layout: "/admin"
//       },
//       {
//         path: "/react-tables",
//         name: "React Tables",
//         mini: "RT",
//         component: ReactTables,
//         layout: "/admin"
//       }
//     ]
//   },
//   {
//     collapse: true,
//     name: "Maps",
//     icon: "nc-icon nc-pin-3",
//     state: "mapsCollapse",
//     views: [
//       {
//         path: "/google-maps",
//         name: "Google Maps",
//         mini: "GM",
//         component: GoogleMaps,
//         layout: "/admin"
//       },
//       {
//         path: "/full-screen-map",
//         name: "Full Screen Map",
//         mini: "FSM",
//         component: FullScreenMap,
//         layout: "/admin"
//       },
//       {
//         path: "/vector-map",
//         name: "Vector Map",
//         mini: "VM",
//         component: VectorMap,
//         layout: "/admin"
//       }
//     ]
//   },
//   {
//     path: "/widgets",
//     name: "Widgets",
//     icon: "nc-icon nc-box",
//     component: Widgets,
//     layout: "/admin"
//   },
//   {
//     path: "/charts",
//     name: "Charts",
//     icon: "nc-icon nc-chart-bar-32",
//     component: Charts,
//     layout: "/admin"
//   },
//   {
//     path: "/calendar",
//     name: "Calendar",
//     icon: "nc-icon nc-calendar-60",
//     component: Calendar,
//     layout: "/admin"
//   }
// ];

export default routes;
