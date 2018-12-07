import React, { Component } from 'react';
import { instance as axios } from '../../axios';
import Restaurant from '../Restaurant/Restaurant';
import Grid from '@material-ui/core/Grid';
import classes from './RestaurantList.css'

class RestaurantList extends Component {
    state = {
        coords: {
            lat: null,
            long: null,
        },
        view: this.props.view,
        geoData: {},
        resClicked: false,
        id: null
    }

    componentWillMount () {
        navigator.geolocation.getCurrentPosition(this.success, this.error);
    }

    componentDidMount () {
        
    }

    geolocation = (lati, longi) => {
    
        let data = {
            lat: lati,
            lon: longi
        };
    
        axios.get('/geocode', {params: data})
            .then((response) => {
                console.log(response);
                let entity_data = {
                    entity_id: response.data.location.entity_id,
                    entity_type: response.data.location.entity_type
                };
                axios.get('/location_details', {params: entity_data})
                    .then((response) => {
                        console.log(response);
                        this.setState({geoData: response.data.best_rated_restaurant, resClicked: false, id: null});
                        // this.getList(this.state.view);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                                
            })
            .catch((error) => {
                console.log(error);
            });
    }

    success = (position) => {
        console.log(position);
        this.setState({coords: {lat: position.coords.latitude, long: position.coords.longitude}});
        this.geolocation(position.coords.latitude, position.coords.longitude);
    }

    error = (pos) => {
        console.log("No location");
    }

    getList = (view) => {
        let grid = 4;
        let list = 10;
        let resListJSX = null;
        let resList = this.state.geoData;
        console.log(resList);
        console.log(resList.length);
        console.log(resList[0]);
        console.log(resList[0].restaurant);

        // if (resList) {
        //     if (view === 'list') {
        //         for (let i = 0; i < resList.length; i++) {
        //             resListJSX += <Grid item xs={list}>
        //                 <div style={{backgroundImage: 'url(' + resList[i].restaurant.featured_image + ')'}}> */}
        //                 <div>Name: {resList[i].restaurant.name}</div>
        //                 <div>Rating: {resList[i].restaurant.user_rating.aggregate_rating}</div>
        //                 <div>Address: {resList[i].restaurant.location.address}</div> */}
        //                 </div> 
        //             </Grid>
        //         }
        //     }
        //     else {
        //         for (let i = 0; i < resList.length; i++) {
        //             resListJSX += <Grid item xs={grid}>
        //                 <Paper>{grid}</Paper>
        //                 </Grid>
        //         }
        //     }
        // }
        // this.setState({resList: resListJSX});
            
        // return (
        //     <div>
        //         <Grid container spacing={24}>
        //         {resListJSX}
        //         </Grid>
        //     </div>
        // )
        // let data = this.geoData.getNearbyRestaurant();
        // console.log(data);
    }

    resClickHandler = (res_id) => {
        console.log(res_id);
        this.setState({resClicked: true, id: res_id});
    }

    render () {
        let space = this.props.view === 'list' ? 10 : 4;
        let resList = [];
        let data = this.state.geoData;
        if (this.state.resClicked) {
            resList.push(
                <Restaurant key={this.state.id} id={this.state.id} />
            )
        }
        else {
            for (let i = 0; i < data.length; i++) {
                resList.push(
                    <Grid key={i} item xs={space} className={space == 4 ? classes.Restgrid : classes.Restlist}
                    onClick={() => this.resClickHandler(data[i].restaurant.R.res_id)} >
                        <div style={{backgroundImage: 'url(' + data[i].restaurant.thumb + ')', height: '200px', position: 'relative'}}></div> 
                        <div className={classes.Rating} >{data[i].restaurant.user_rating.aggregate_rating}</div>
                        <div><h3>{data[i].restaurant.name}</h3></div>
                        <div>{data[i].restaurant.location.address}</div> 
                    </Grid>
                )
            }
        }

        return (
            <div>
                <Grid container spacing={16}>
                {resList}
                </Grid>
            </div>
        )
    }
}

export default RestaurantList;