import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View,
    PermissionsAndroid,
    Platform
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux';
import { getUserToken, saveUserLocation } from '../actions/action';
import ENV from '../../env';

class AuthLoadingScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor() {
        super();

        this.getLocation = this.getLocation.bind(this);
        this.locationToAddress = this.locationToAddress.bind(this);
    }

    componentDidMount() {
        this._bootstrapAsync();
        this.getLocation();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = () => {
        this.props.getUserToken().then(() => {
            this.props.navigation.navigate(this.props.token.token !== null ? 'App' : 'Auth');
        })
            .catch(error => {
                this.setState({ error })
            })

    };

    getLocation(){
        var that =this;

        //Checking for the permission just after component loaded
        if(Platform.OS === 'ios'){
            this.callLocation(that);
        }else{
            async function requestLocationPermission() {
                try {
                    const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                        'title': 'Location Access Required',
                        'message': 'This App needs to Access your location'
                    }
                    )
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //To Check, If Permission is granted
                    that.callLocation(that);
                    } else {
                    alert("Permission Denied");
                    }
                } catch (err) {
                    alert("err",err);
                    console.warn(err)
                }
            }
            requestLocationPermission();
        }
    }

    callLocation(that){
        //alert("callLocation Called");
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude);
                const currentLatitude = JSON.stringify(position.coords.latitude);

                const data = {
                    currentLongitude: currentLongitude,
                    currentLatitude: currentLatitude
                }
                this.locationToAddress(data);
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        that.watchID = Geolocation.watchPosition((position) => {
            //Will give you the location on location change
            const currentLongitude = JSON.stringify(position.coords.longitude);
            const currentLatitude = JSON.stringify(position.coords.latitude);

            const data = {
                currentLongitude: currentLongitude,
                currentLatitude: currentLatitude
            }
            this.locationToAddress(data);
        });
    }

    locationToAddress = (data) => {
        const latlng = `${data.currentLatitude},${data.currentLongitude}`;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&sensor=true&key=${ENV.API_KEY_MAPS}`;
        fetch(url)
            .then(response => response.json())
            .then((response) => {
                const { results } = response;
                const componentForm = {
                    administrative_area_level_2: 'long_name',
                    administrative_area_level_1: 'long_name',
                    country: 'long_name'
                };

                var location = {};

                for (var i = 0; i < results[0].address_components.length; i++) {
                    var addressType = results[0].address_components[i].types[0];
                    if (componentForm[addressType]) {
                        if(addressType == "administrative_area_level_2" || addressType == "country" || addressType == "administrative_area_level_1")
                        {
                            locality_found = true;
                            var val = results[0].address_components[i][componentForm[addressType]];   
                            if(addressType == "administrative_area_level_2"){
                                location['city'] = val;
                            };
                            if(addressType == "country"){
                                location['country'] = val;
                                if(val == 'Indonesia'){
                                    location['currency_symbol'] = 'Rp';
                                    location['currency_name'] = 'Rupiah';
                                }else{
                                    location['currency_symbol'] = '¥';
                                    location['currency_name'] = 'Yuan';
                                }
                            };
                            if(addressType == "administrative_area_level_1"){
                                location['province'] = val;
                            };
                        }
                    }
                }

                location['latitude'] = data.currentLatitude;
                location['longitude'] = data.currentLongitude;
                
                this.props.saveUserLocation(location)
                .then(() => {
                    console.log('location saved');
                })
                .catch((error) => {
                    console.log(error);
                })
                
            })
            .catch((e) => {
                console.log(e)
            });
    }

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = state => ({
    token: state.token,
    location: state.location
});


const mapDispatchToProps = dispatch => ({
    getUserToken: () => dispatch(getUserToken()),
    saveUserLocation: (data) => dispatch(saveUserLocation(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);