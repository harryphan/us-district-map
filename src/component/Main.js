import React, {Component} from "react";
import {Box, Button, Container, Link, Typography} from "@material-ui/core";
import USMapContainer from "../containers/USMapContainer";
import ReactTooltip from "react-tooltip";
import Copyright from "./Copyright";
import MapViewSelector from "../containers/MapViewSelector";

class Main extends Component{

    render(){
        return(
            <Container lg={3} height={'100vh'} width={'100%'}>
                <Box height={'10vh'}>
                    <Typography variant="h3">US Map</Typography>
                </Box>
                <Box height={'5vh'}>
                    <MapViewSelector />
                </Box>
                <Box lg={3} height={'70vh'} width={'100%'}>
                    <USMapContainer />
                </Box>
                <Box height={'10vh'} lg={3}>
                    <Typography variant="caption" gutterBottom>
                        Source code: <Link href="https://github.com/harryphan/us-district-map">Github</Link>
                        <br/>
                        Data sources: <Link href="https://www.cnn.com/election/2020/results/president?iid=politics_election_national_map">CNN</Link>
                        &nbsp;
                        <Link href="https://www.politico.com/2020-election/results/">Politico</Link>
                        &nbsp;
                        <Link href="https://covid.cdc.gov/covid-data-tracker/#county-view">
                           CDC
                        </Link>
                    </Typography>
                </Box>
                <Box height={'5vh'}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
}

export default Main;