import React, { useState, useEffect } from 'react'

import { View, Text, TextInput,Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Transaction_Add = () => {
    const [data, setData] = useState([]);
    const [CustomerID, setCustomerID] = useState('');
    const [Service, setService] = useState('')
    const [serviceID, setServiceId] = useState('');
    const [serviceQuantity, SetServiceQuantity] = useState('');
    const [serviceUserID, setServiceUserID] = useState('');
    const [isLoading, setIsLoading] = useState(true);


    const getData = async () => {
        const value = await AsyncStorage.getItem('Token');
        console.log(value);
        await fetch('https://kami-backend-5rs0.onrender.com/transactions', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer:${value}`,
                'ConTent-Type': 'application/json'
            },
        }).then(res => res.json())
            .then((d) => {
                setData(d)
                console.log('d:',d)
            }).catch((error) => { console.error("Fetching error:", error) })
    }
 useEffect(()=>{
    getData();
   
 },[])

 


    const fetchData = async () => {
        let service = [
            {
                _id: serviceID,
                quantity: serviceQuantity,
                UserID: serviceUserID,
            },
        ]
        console.log(CustomerID)
        console.log(service);
        const value = await AsyncStorage.getItem('token');
        console.log(data);
        console.log(value);
        await fetch('https://kami-backend-5rs0.onrender.com/transactions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${value}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                CustomerID: CustomerID,
                Service: service,
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network was not ok :<')
            }
            return response.json();
        })
        .then(async data => {
            setData(data)
            setIsLoading(false)
            console.log(data)
        })
        .catch((error) => {
            console.error('Fetching error', error);
            console.log(error.message);
        })
       
    }
    
    
    return (
        <View>
        <Text>{data[0]}</Text>
{/* <Button
title='test'
onPress={fetchData}

/> */}





        </View>
    )



}
export default Transaction_Add;