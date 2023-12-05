import React, { useState,useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Alert, Button,TextInput } from 'react-native'
import { useRoute } from "@react-navigation/native";
import Styles from "./Styles";

const Customer_Update = () => {
    const [data, setData] = useState([])
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('')
    // const [isLoading, setIsLoading] = useState(true)
    const route = useRoute();
    const { _id } = route.params;
    console.log(_id);
    const fetchData = async () => {
        const value = await AsyncStorage.getItem('token');
        console.log(value);
        await fetch(`https://kami-backend-5rs0.onrender.com/customers/${_id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${value}`,
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
               
               name:name,
               phone:phone,
            }),
        }) .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            Alert.alert('Update Successfully!!!')
        }).then((d) => {
            setData(d)
            console.log("c: ", d)
           
        }).catch((error) => {
            console.error('Fetching error', error);
        })
    }

    return (
       
            <View style={Styles.container}>
                <Text>Custom name *</Text>
                <TextInput
                    style={Styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="Input a service name"
                />
                <Text>Phone*</Text>
                <TextInput
                    style={Styles.input}
                    onChangeText={setPhone}
                    value={phone}
                    keyboardType="numeric"
                    placeholder="Input phone number"
                />
                <Button style={Styles.button}
                    title="Update"
                    onPress={fetchData}
                />
            </View>
            // <View><Text>ok</Text></View>
    

    )
}
export default Customer_Update;