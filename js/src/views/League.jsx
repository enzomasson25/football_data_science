import React, {useEffect, useState} from 'react'
import useAxios from 'axios-hooks'
import Papa from 'papaparse'
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { Row, Col } from "reactstrap";


const League = ({league, image}) => {
    const [{ csv, csvErrors, meta, loading, error }, refetch] = useCSV(
        '/teams.csv',
        league
    )

    if (loading) return <p>ça charge putain...</p>
    if (error) return <p>C'est la merde, tout a planté</p>


    return (
        <div className="content">
            <img src={image}/>
            {csv ? (
                <Row>
                    {csv.map(team => (
                        <Col key={team.squad} sm={12} md={3}>
                            <Card style={{width: '20rem'}}>
                                <CardImg top src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22320%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20320%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16164ef782f%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16164ef782f%22%3E%3Crect%20width%3D%22320%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22119.0859375%22%20y%3D%2297.35%22%3E320x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" alt="..."/>
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

export default League
