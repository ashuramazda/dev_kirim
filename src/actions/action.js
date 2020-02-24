
import AsyncStorage from '@react-native-community/async-storage';

export const getToken = (token) => ({
    type: 'GET_TOKEN',
    token,
});

export const saveToken = token => ({
    type: 'SAVE_TOKEN',
    token
});

export const removeToken = () => ({
    type: 'REMOVE_TOKEN',
});

export const loading = bool => ({
    type: 'LOADING',
    isLoading: bool,
});

export const error = error => ({
    type: 'ERROR',
    error,
});

//LOCATION
export const getLocation = (location) => ({
    type: 'GET_LOCATION',
    location,
});

export const saveLocation = location => ({
    type: 'SAVE_LOCATION',
    location
});

//BOX
export const getBox = (box) => ({
    type: 'GET_BOX',
    box,
});

export const saveBox = box => ({
    type: 'SAVE_BOX',
    box
});

export const removeBox = () => ({
    type: 'REMOVE_BOX',
});

//SHIP
export const getShip = (ship) => ({
    type: 'GET_SHIP',
    ship,
});

export const saveShip = ship => ({
    type: 'SAVE_SHIP',
    ship
});

export const removeShip = () => ({
    type: 'REMOVE_SHIP',
});



export const getUserToken = () => dispatch => 

 AsyncStorage.getItem('userToken')
        .then((data) => {
            dispatch(loading(false));
            dispatch(getToken(data));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })



export const saveUserToken = token => dispatch => 
    AsyncStorage.setItem('userToken', token)
        .then(() => {
            dispatch(loading(false));
            dispatch(saveToken('token saved'));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })

export const removeUserToken = () => dispatch =>
    AsyncStorage.removeItem('userToken')
        .then((data) => {
            dispatch(loading(false));
            dispatch(removeToken(data));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })


//LOCATION
export const getUserLocation = () => dispatch => 

 AsyncStorage.getItem('userLocation')
        .then((data) => {
            dispatch(loading(false));
            dispatch(getLocation(JSON.parse(data)));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })



export const saveUserLocation = location => dispatch => 
    AsyncStorage.setItem('userLocation', JSON.stringify(location))
        .then(() => {
            dispatch(loading(false));
            dispatch(saveLocation('Location saved'));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })

//BOX
export const getBoxData = () => dispatch => 

 AsyncStorage.getItem('boxData')
        .then((data) => {
            dispatch(loading(false));
            dispatch(getBox(JSON.parse(data)));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })



export const saveBoxData = data => dispatch => 
    AsyncStorage.setItem('boxData', JSON.stringify(data))
        .then(() => {
            dispatch(loading(false));
            dispatch(saveBox('Box saved'));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })

export const removeBoxData = () => dispatch =>
    AsyncStorage.removeItem('boxData')
        .then((data) => {
            dispatch(loading(false));
            dispatch(removeBox(data));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })

//SHIP
export const getShipData = () => dispatch => 

 AsyncStorage.getItem('shipData')
        .then((data) => {
            dispatch(loading(false));
            dispatch(getShip(JSON.parse(data)));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })



export const saveShipData = data => dispatch => 
    AsyncStorage.setItem('shipData', JSON.stringify(data))
        .then(() => {
            dispatch(loading(false));
            dispatch(saveShip('Ship saved'));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })

export const removeShipData = () => dispatch =>
    AsyncStorage.removeItem('shipData')
        .then((data) => {
            dispatch(loading(false));
            dispatch(removeShip(data));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })