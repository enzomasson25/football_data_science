import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import useAxios from 'axios-hooks'
import Papa from 'papaparse'
import {Button, Card, CardBody, CardImg, CardTitle, Col, Row} from 'reactstrap';
import {createUseStyles} from "react-jss";
import {Parallax} from "react-parallax";

const useStyles = createUseStyles({
    parallax: {
        marginTop: 63
    },
    teamLogo: {
        height: "15em",
        width: "15em",
        margin: "1em",
    },
    insideStyles: {
        background: "white",
        padding: 20,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)"
    }
})

const League = ({league, image, mainPanel}) => {
    const classes = useStyles()
    const [{ csv, loading, error }] = useCSV(
        '/teams.csv',
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
                            <Col key={team.squad} sm={12} md={3}>
                                <Card style={{width: '20rem'}} >
                                    <Row className="justify-content-md-center">
                                            <CardImg top src={team.logo} alt="..." className={classes.teamLogo} />
                                    </Row>
                                    <CardBody>
                                        <CardTitle>{team.squad}</CardTitle>
                                        <Button color="primary">Page de l'équipe</Button>
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
            parsed.data = parsed.data.filter(i => i.comp === league)
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
