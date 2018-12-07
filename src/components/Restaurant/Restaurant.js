import React, { Component } from 'react';
import { instance as axios} from '../../axios';
import classes from './Restaurant.css';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';

class Restaurant extends Component {
    state = {
        id: this.props.id,
        details: {
            img: null,
            res_name: null,
            rating: null,
            address: null,
            reviews: null
        }
    }

    componentDidMount () {
        this.getRestaurantInfo();
    }

    // componentDidUpdate () {
    //     this.getRestaurantInfo();
    // }

    shouldComponentUpdate () {
        if (this.props.id !== this.state.id) {
            this.setState({id: this.props.id});
            return true;
        }
        return true;
    }

    getRestaurantInfo = () => {
        let data = {
            res_id: this.state.id 
        }
        axios.get('/restaurant', {params: data})
            .then((response) => {
                let data = response.data;
                let des = {
                    img: data.featured_image,
                    res_name: data.name,
                    rating: data.user_rating.aggregate_rating,
                    address: data.location.address
                }
                this.setState({details: des});

                // var sectionStyle = {
                //     width: '100%',
                //     height: '400px',
                //     backgroundImage: 'url('+ data.featured_image + ')' 
                // };
                console.log(response);
            //    // this.setState({details: response});
            //    var re = <section style={{
            //         width: '100%',
            //         height: '400px',
            //         backgroundImage: 'url('+ data.featured_image + ')' 
            //     }}></section>;
            //    return re;
                // this.setState({details: {
                //     img: data.featured_image,
                //     res_name: data.name,
                //     rating: data.user_rating.aggregate_rating,
                //     address: data.location.address
                // }});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getRestaurantReviews = (start, count) => {
        let data = {
            'res_id': this.state.id,
            'start': start,
            'count': count
        }
        axios.get('/reviews', {params: data})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    render() {
        return (
            <div className={classes.Restaurant}>
                <div style={{backgroundImage: 'url(' + this.state.details.img + ')', height: '400px'}}></div>
                <div><h3>{this.state.details.res_name}</h3></div>
                <div className={classes.Rating}>{this.state.details.rating} / 5.0</div>
                <div>{this.state.details.address}</div>
                <div>Reviews</div>
            </div>
        )
    }
}

export default Restaurant;