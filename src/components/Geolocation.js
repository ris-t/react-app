import React, { Component } from 'react';
// import { geolocated } from 'react-geolocated';
import { instance as axios } from '../axios';

const geolocation = (props) => {

    let lat = props.lat;
    let long = props.long;

    let data = {
        lat: props.lat,
        lon: props.long
    };

    let res;

    axios.get('/geocode', {params: data})
                .then((response) => {
                    console.log(response);
                    let entity_data = {
                        entity_id: response.data.location.entity_id,
                        entity_type: response.data.location.entity_type
                    };
                    axios.get('/location_details', {params: entity_data})
                        .then(function (response) {
                            console.log(response);
                            res = response;
                        })
                        .catch(function (error) {
                            console.log(error);
                            res = error;
                        });
                            
                        })
                .catch(function (error) {
                    console.log(error);
                    res = error;
                });

    return res;
}
 
// class Geolocation extends Component {

//     state = {
//         entity_id: null,
//         entity_type: null
//     }

//     getNearbyRestaurant = () => {
//         let data = {
//             lat: this.props.coords.lat,
//             lon: this.props.coords.long
//         };

//         let res;

//         axios.get('/geocode', {params: data})
//             .then((response) => {
//                 console.log(response);
//                 let entity_data = {
//                     entity_id: response.data.location.entity_id,
//                     entity_type: response.data.location.entity_type
//                 };
//                 axios.get('/location_details', {params: entity_data})
//                     .then(function (response) {
//                         console.log(response);
//                         return response;
//                     })
//                     .catch(function (error) {
//                         console.log(error);
//                         return error;
//                     });
                        
//                     })
//             .catch(function (error) {
//                 console.log(error);
//                 return error;
//             });
        
//     }

    // getNearbyPlaces = (id, type) => {
    //     let data = {
    //         entity_id: id,
    //         entity_type: type
    //     };
        
    // }




    // render() {
    //     return !this.props.isGeolocationAvailable
    //     ? <div>Your browser does not support Geolocation</div>
    //     : !this.props.isGeolocationEnabled
    //         ? <div>Geolocation is not enabled</div>
    //         : this.props.coords
    //         ? <table>
    //             <tbody>
    //             <tr><td>latitude</td><td>{this.props.coords.lat}</td></tr>
    //             <tr><td>longitude</td><td>{this.props.coords.long}</td></tr>
    //             {this.getNearbyRestaurant()}
    //             </tbody>
    //         </table>
    //         : <div>Getting the location data&hellip; </div>;
    // }
// }

// export default geolocated()(geolocation);
export default geolocation;