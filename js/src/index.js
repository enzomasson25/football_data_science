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
import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {HashRouter, Route} from "react-router-dom";
import AdminLayout from "layouts/Admin.jsx";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.1.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import {UrlProvider} from "./contexts";

const hist = createBrowserHistory();
const url = window.location.href.replace(window.location.hash,"");

ReactDOM.render((
    <UrlProvider.Provider value={url}>
        <HashRouter history={hist}>
            <Route path="/" render={props => <AdminLayout {...props} />} />
        </HashRouter>
    </UrlProvider.Provider>
    ), document.getElementById("root")
);
