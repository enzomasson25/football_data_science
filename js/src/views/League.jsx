import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import useAxios from 'axios-hooks'
import Papa from 'papaparse'
import {Button, Card, CardBody, CardImg, CardTitle, Col, Row} from 'reactstrap';
import {createUseStyles} from "react-jss";
import {Parallax} from "react-parallax";
import {UrlProvider} from "../contexts";
import {Link} from "react-router-dom";
import {teamCSV, teamImgUrl, teamLeague, teamName} from "../csv-properties";

const useStyles = createUseStyles({
    parallax: {
        marginTop: 63
    },
    teamLogo: {
        height: "15em",
        width: "15em",
        margin: "1em",
    },
})

const League = ({league, image, mainPanel}) => {
    const url = useContext(UrlProvider)
    const classes = useStyles()
    const [{ csv, loading, error }] = useCSV(
        url + teamCSV,
        league
    )

    if (loading) return <p>ça charge putain...</p>
    if (error) return <p>C'est la merde, tout a planté</p>


    return (
        <>
            <div className={classes.parallax}>
                <Parallax
                    bgImage={image}
                    strength={500}
                    blur={{ min: -15, max: 20 }}
                    parent={mainPanel.current}
                >
                    <div style={{ height: 500 }} />
                </Parallax>
            </div>
            <div className="content">
                {csv ? (
                    <Row>
                        {csv.map(team => (
                            <Col key={team[teamName]} xs={12} sm={6} md={4} xl={3}>
                                <Card>
                                    <Row className="justify-content-center">
                                            <CardImg top src={team[teamImgUrl]} alt={team[teamName]} className={classes.teamLogo} />
                                    </Row>
                                    <CardBody>
                                        <CardTitle>{team[teamName]}</CardTitle>
                                        <Link to={`/teams/${team[teamName].replace(/ /g, '-')}`}>
                                            <Button color="primary">Page de l'équipe</Button>
                                        </Link>
                                    </CardBody>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : ''}
            </div>
        </>
    )
}

const useCSV = (url, league) => {
    const [{ data, loading, error }, refetch] = useAxios(url)
    const [parsed, setParsed] = useState({ data:null, error: null, meta: null })

    useEffect(() => {
        if (data) {
            const parsed = Papa.parse(data, {
                header: true
            })

            parsed.data = parsed.data.filter(i => i[teamLeague] === league)
            setParsed(parsed)
        }
    }, [data, league])

    return [{
        csv: parsed.data,
        csvErrors: parsed.errors,
        meta: parsed.meta,
        loading, error
    }, refetch]
}

League.propTypes = {
    image: PropTypes.string.isRequired,
    league: PropTypes.string.isRequired,
    mainPanel: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
}

export default League
