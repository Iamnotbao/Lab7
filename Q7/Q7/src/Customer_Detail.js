import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, ScrollView, Button, TouchableOpacity, Alert } from 'react-native'
import { useRoute } from "@react-navigation/native";
import Styles from "./Styles";




const Customer_Detail = ({ navigation }) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const route = useRoute();
    const { _id } = route.params;
    console.log(_id)
    const fetchData = async () => {
        const value = await AsyncStorage.getItem('token');
        console.log(value);

        await fetch(`https://kami-backend-5rs0.onrender.com/customers/${_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${value}`,
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (!response.ok) {
                throw new Error('Network was not ok ~~')
            }
            return response.json();
        }).then(async data => {
            setData(data);
            console.log(data);
            setIsLoading(false);
            // setPriceAfterDiscount(d.priceBeforePromotion);

        }).catch((error) => {
            console.error("Fetching error", error)
            setIsLoading(false)
        })
    }


    useEffect(() => {
        fetchData();
    }, [])


    const Delete_Customer = async () => {
        const value = await AsyncStorage.getItem('token');
        console.log(value);
        setIsLoading(false);
        await fetch(`https://kami-backend-5rs0.onrender.com/customers/${_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${value}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                console.log(data);
                if (!response.ok) {
                    throw new Error('NetWork response was not ok')
                }
                Alert.alert("Delete Succesfull!!!");
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }
    return (
        <View>
            <Button style={Styles.button}
                onPress={Delete_Customer}
                title="Delete" />

            <Button style={Styles.button}
                title="Update"
                onPress={() => navigation.navigate('Customer_Update', { _id: data._id })} />


            <Text style={Styles.input}>
                <View>
                    <Text style={Styles.subTitle}>General information</Text>
                    <Text style={Styles.script}>Customer:  {data.name}</Text>
                    <Text style={Styles.script}>Phone:  {data.phone}</Text>
                    <Text> Total spent:{data.totalSpent}</Text>
                    <Text>Time:</Text>
                    <Text>Last Update</Text>
                </View>
            </Text>


            <View>
                <Text style={Styles.subTitle}>Transaction history</Text>
                <ScrollView>
                    <View style={{ height: 1000 }}>

                        {isLoading ? <Text>Loading...</Text> : data.transactions ? data.transactions.map((transaction, index) => (
                            <View style={Styles.input} key={index}>
                                <Text style={Styles.priceStyle}>{transaction.price}đ</Text>
                                <Text>
                                    <Text style={Styles.script}>{transaction.id}-{transaction.createdAt}</Text>

                                </Text>
                                {transaction.services.map((service, serviceIndex) => (
                                    <Text key={`${index}-${serviceIndex}`}>
                                        - {service.name}

                                    </Text>
                                ))}

                            </View>

                        )) : null}

                    </View>
                </ScrollView>

            </View>


        </View>
        // <View>
        //     {isLoading ? <Text>Loading...</Text> : data.transactions ? data.transactions.map((transaction, index) => (
        //         <Text key={index}>- {transaction.customer.name}/</Text>)) : null}
        // </View>
    )
}
export default Customer_Detail;