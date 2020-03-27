import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import { Feather } from '@expo/vector-icons';
import logoImg from '../../assets/logo.png';
import styles from './styles.js';
import api from '../../services/api';

export default function Detail() {

    const navigator = useNavigation();
    const route = useRoute();

    const incident = route.params.incident
    const message = `Olá ${incident.name}, quero ajudar no caso 'gato louco'`;

    function popPage() {
        navigator.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.name}`,
            recipients: [`${incident.email}`],
            body: message
        });
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
               <Image source={logoImg} />
                
                <TouchableOpacity onPress={popPage}>
                    <Feather name="arrow-left" size={28} color="#E02041" />
                </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
            >
             <View style={styles.incident}>
               <Text style={[styles.incidentProperty, { marginTop: 0 }]}> ONG: </Text>
                <Text style={styles.incidentValue}> {incident.name} de {incident.city}/{incident.uf} </Text>
                <Text style={styles.incidentProperty}> CASO: </Text>
                <Text style={styles.incidentValue}> {incident.title} </Text>
                <Text style={styles.incidentProperty}> DESCRIÇÃO: </Text>
                <Text style={styles.incidentValue}> {incident.description} </Text>
                <Text style={styles.incidentProperty}> VALOR: </Text>
                
                <Text style={styles.incidentValue}> 
                     {Intl.NumberFormat('pt-BR', 
                     { style: 'currency', currency: 'BRL'})
                     .format(incident.value)} 
                </Text>
            </View>
            
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}> Whatsapp </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}> Email </Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </View>
    )
}