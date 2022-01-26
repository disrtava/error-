import React from 'react'
import {StyleSheet,TouchableOpacity,Text,View,SafeAreaView, ImageBackground, Alert} from 'react-native'
import {MapView,Marker} from 'react-native-maps'


export default class locationScreen extends React.Component {
    constructor(){
        super()
        this.state = {
            location : {}
        }
    }
    componentDidMount(){
        this.getIssLocation()
    }
    getIssLocation = ()=>{
        axios
        .get('https://api.wheretheiss.at/v1/satellites/25544')
        .then(response =>{
            this.setState({
                location : response.data()
            })
            .catch(error=>{
                Alert.alert(error.message())
            })
        })
    }
    render(){
        return(
            <View>
                <SafeAreaView style = {styles.droidSafeArea}/>
                <ImageBackground source = {require('../assets/meteor_bg1.png')} style = {styles.backgroundImage}/>
                <View style = {styles.titleContainer}>
                    <Text style = {styles.titleText}>
                        Iss Location
                    </Text>
                </View>
                <View style = {styles.mapContainer}>
                    <MapView style = {styles.map}
                    region = {{
                        latitude : this.state.location.latitude,
                        longitude : this.state.location.longitude,
                        latitudeDelta : 100,
                        longitudeDelta : 100,
                    }}>
                        <Marker coordinate = {{
                            latitude : this.state.location.latitude,
                            longitude : this.state.location.longitude
                        }}>
                            <Image source = {require('../assets/iss_icon.png')} style = {{height : 50,width : 50}}></Image>

                        </Marker>
                    </MapView>
                </View>
                <View style = {styles.infoContainer}>
                    <Text style = {styles.infoText}>
                        Latitude : {this.state.location.latitude}
                    </Text>
                    <Text style = {styles.infoContainer}>
                    longitude : {this.state.location.longitude}
                    </Text>
                </View>
                
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    titleContainer: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    mapContainer: {
        flex: 0.7
    },
    map: {
        width: "100%",
        height: "100%"
    },
    infoContainer:{
        backgroundColor:"white",
        marginTop : -10 ,
        borderRadius : 30,
        padding : 30,

    },
    infoText : {
        fontSize : 15,
        color : "black",
        fontWeight : "bold"
        

    }

})
