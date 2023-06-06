import { Platform } from "react-native";
import * as Application from 'expo-application';

export async function getDeviceId() {
    try {
        return Platform.OS === 'android' ? Application.androidId : await Application.getIosIdForVendorAsync()
    } catch (error) {
        console.log(error);
        throw error;
    }
}
