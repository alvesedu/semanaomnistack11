import React from 'react';
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // import p/ navegar entre rotas
import styles from './styles';
import logoImg from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer'; //import da lib p/ enviar email


export default function Detail () { 

    const navigation = useNavigation (); //Funcão de navegação entre telas 

    const route = useRoute(); // Pega detalhes da pagina atual no app

    const incident = route.params.incident; 

    // inserindo via BD nome ong, title e o valor em reais
    const message = `${incident.name}, entrei em contato, pois ajudarei o caso "${incident.title}" com o valor 
    ${
        Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL'
        }).format(incident.value)}`;

    function navigateBack() { // chamada na arrow function
        navigation.goBack ();
    }
    // Função de enviar e-mail via app
    function sendMail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }

    // Função de acionar/abrir Whatsapp via app, chamada no button da arrow function
    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                    <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041"/>
                    </TouchableOpacity>
            </View>

                <View style={styles.incident}>

                    <Text style={[styles.incidentProperty, {marginTop: 0 }]}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name} de {incident.city} / {incident.uf} </Text>
                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>
                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>
                        {Intl.NumberFormat('pt-BR', { 
                            style: 'currency', 
                            currency: 'BRL'
                            }).format(incident.value)}
                    </Text>
               
                </View>

                <View style={styles.contactBox}>
                    <Text style={styles.heroTitle}> Salve o dia!</Text>
                    <Text style={styles.heroTitle}> Seja o herói desse caso.</Text>
                    <Text style={styles.heroDescription}>Entre em contato:</Text>

                        <View style={styles.actions}>
                            <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                            <Text style={styles.actionText}>Whatsapp</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.action} onPress={sendMail}>
                            <Text style={styles.actionText}>E-mail</Text>
                            </TouchableOpacity>
                        </View>
                </View>
        </View>
    );
}

