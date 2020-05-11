import React, {useContext, useEffect, useState} from 'react'
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Switch";
import {Card, CardBody, CardHeader, CardImg, Col, Nav, NavItem, NavLink, Row} from "reactstrap";
import {Link} from "react-router-dom";
import {teamCSV, teamImgUrl, teamName} from "../csv-properties";
import useAxios from "axios-hooks";
import Papa from "papaparse";
import {UrlProvider} from "../contexts";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
    // parallax: {
    //     marginTop: 63
    // },
    teamLogo: {
        height: "20em",
        width: "20em",
        margin: "1em",
    },
})

const Team = ({match, location}) => {
    const {name} = match.params
    const {pathname} = location
    const classes = useStyles()
    const [{ team, loading, error }] = useTeam(name)

    if (loading) return <p>ça charge putain...</p>
    if (error) return <p>C'est la merde, tout a planté</p>
    if (!team) return <p>404 : équipe introuvable</p>

    console.log(team)

    return (
        <div className="content">
            <Row>
                <Col className="justify-content-center" xs={12} sm={4}>
                    <CardImg top src={team[teamImgUrl]} alt={team[teamName]} className={classes.teamLogo}/>
                </Col>
                <Col className="justify-content-center" xs={12} sm={8}>
                    <p>Equipe {team[teamName]}</p>
                </Col>
            </Row>
            <Card className="text-center">
                <CardHeader>
                    <div className="nav-tabs-navigation">
                        <div className="nav-tabs-wrapper">
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        to={`/teams/${name}`}
                                        active={pathname === `/teams/${name}`}
                                    >
                                        Statistiques
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        to={`/teams/${name}/players`}
                                        active={pathname === `/teams/${name}/players`}
                                    >
                                        Joueurs
                                    </NavLink>
                                </NavItem>
                                <NavItem />
                            </Nav>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    <Switch>
                        <Route path={`/teams/${name}`} exact>
                            stats
                        </Route>
                        <Route path={`/teams/${name}/players`} exact>
                            joueurs
                        </Route>
                    </Switch>
                </CardBody>
            </Card>
        </div>
    )
}

const useTeam = (teamUrl) => {
    const rootUrl = useContext(UrlProvider)
    const [{ data, loading, error }, fetch] = useAxios(rootUrl + teamCSV)
    const [parsed, setParsed] = useState({ data:null, error: null, meta: null })

    useEffect(() => {
        if (data) {
            const parsed = Papa.parse(data, {
                header: true
            })

            parsed.data = parsed.data.filter(i => i[teamName] !== undefined && i[teamName].replace(' ', '-') === teamUrl)
            setParsed(parsed.data[0] || null)
        }
    }, [data, teamUrl])

    return [{
        team: parsed,
        csvErrors: parsed.errors,
        meta: parsed.meta,
        loading, error
    }, fetch]
}

export default Team
