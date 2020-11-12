import React from "react";
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from "@expo-google-fonts/nunito";
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';

import mapMarker from '../images/map-marker.png';
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

export default function OrphanagesMap() {
    const navigation = useNavigation();

    function handleToOrphanageDetails() {
        navigation.navigate('OrphanageDetails');
    }
    function handleNavigateToCreateOrphanage() {
        navigation.navigate('SelectMapPosition');
    }

    function regionFrom(lat: number, lon: number) {

        const { width, height } = Dimensions.get('window');
        const ASPECT_RATIO = width / height;
        const LATITUDE_DELTA = 0.008;
        const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

        return {
            latitude: Number(lat),
            longitude: Number(lon),
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
        };
    }

    const coord = regionFrom(38.689462, -9.352235);

    const [fontsLoaded] = useFonts({
        Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <MapView
                style={styles.mapStyles}
                provider={PROVIDER_GOOGLE}
                initialRegion={coord}>
                <Marker
                    icon={mapMarker}
                    coordinate={coord}
                    calloutAnchor={{ x: 2.7, y: 0.8 }}>
                    <Callout tooltip={true}
                        onPress={ handleToOrphanageDetails }>
                        <View style={styles.calloutContainer}>
                            <Text style={styles.calloutText}>Teste</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    orfanatos encontrados
              </Text>
                <RectButton
                    style={styles.createOrphanageButton}
                    onPress={handleNavigateToCreateOrphanage}>
                    <Feather name='plus' size={20} color='#FFF' />
                </RectButton>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapStyles: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 16,
        justifyContent: 'center'

    },
    calloutText: {
        color: '#0089A5',
        fontFamily: 'Nunito_700Bold',
        fontSize: 14
    },
    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,

        backgroundColor: '#FFF',
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    footerText: {
        fontFamily: 'Nunito_700Bold',
        color: '#8fa7b3'
    },
    createOrphanageButton: {
        width: 56,
        height: 56,
        backgroundColor: '#15C3D6',
        borderRadius: 20,

        justifyContent: 'center',
        alignItems: 'center'
    }
});
