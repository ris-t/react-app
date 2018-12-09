import React, { Component } from 'react';
import { instance as axios} from '../../axios';
import classes from './Restaurant.css';
import CrossImg from '../../assets/cross.png';
import TickImg from '../../assets/tick.png';

class Restaurant extends Component {
    state = {
        id: this.props.id,
        details: {
            img: null,
            res_name: null,
            rating: null,
            address: null,
            has_online_delivery: null,
            has_table_booking: null
        },
        reviews: null
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
                    address: data.location.address,
                    has_online_delivery: data.has_online_delivery,
                    has_table_booking: data.has_table_booking
                }
                this.setState({details: des});
                this.getRestaurantReviews();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getRestaurantReviews = () => {
        let data = {
            'res_id': this.state.id,
            'start': 0,
            'count': 10
        }
        axios.get('/reviews', {params: data})
            .then((response) => {
                console.log(response);
                this.setState({reviews: response.data.user_reviews});
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
                <br />
                <br />
                <div><img src={this.state.details.has_online_delivery == 0 ? TickImg : CrossImg} alt="" width="18" height="18" />Online Delivery</div>
                <div><img src={this.state.details.has_table_booking == 0 ? TickImg : CrossImg} alt="" width="18" height="18" />Table Booking</div>
                <br />
                <br />
                <br />
                {/* <div>
                    <div>
                        {this.state.reviews}
                    </div>
                Reviews</div> */}
            </div>
        )
    }
}

export default Restaurant;