import Dashboard from "views/Dashboard.jsx";
import League from "./views/League";
import {leagues} from "./csv-properties";
import Team from "./views/Team";

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
            league: leagues.premierLeague,
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
            league: leagues.championship,
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
            league: leagues.leagueOne,
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
            league: leagues.leagueTwo,
            image: "https://www.efl.com/contentassets/aab4ff03e22a460e8226c902dc69d430/l2-16x9549-3222841_1600x900/Large",
        },
        layout: "/admin"
    },
    {
        path: "/teams/:name",
        name: "Page d'équipe",
        hidden: true,
        icon: "nc-icon nc-bank",
        component: Team,
        layout: "/admin"
    }
]

export default routes;
