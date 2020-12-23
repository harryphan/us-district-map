import React, {Component, PureComponent} from "react";
import {Box, Button, Container, Typography} from "@material-ui/core";
import USMapContainer from "../containers/USMapContainer";
import ReactTooltip from "react-tooltip";
import Copyright from "./Copyright";
import MapViewSelector from "../containers/MapViewSelector";

class Main extends PureComponent{
    render(){
        const {tooltip,isLoading}=this.props;

        if(isLoading){
            return 'Loading';
        }

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
                    <ReactTooltip>{tooltip}</ReactTooltip>
                </Box>
                <Box height={'10vh'} lg={3}>
                    <Typography variant="caption" gutterBottom>
                        Source code: <a href="https://github.com/harryphan/us-district-map">Github</a>
                        <br/>
                        Data sources: <a href="https://www.cnn.com/election/2020/results/president?iid=politics_election_national_map">CNN</a>
                        &nbsp;
                        <a href="https://www.politico.com/2020-election/results/">Politico</a>
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