import React, { useEffect, useState } from 'react';

import { FlatList, View, Image, Text, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import logoImg from '../../assets/logo.png';

import styles from './styles';

import api from '../../services/api';
import { set } from 'react-native-reanimated';
// import { set } from 'react-native-reanimated';

export default function Incidents () {

    const [incidents, setIncidents] = useState([]); // pegando o estado do objeto

    const [total, setTotal] = useState(0); //contador de casos

    const [page, setPage] = useState(1); // controle casos em tela

    const [loading, setLoading] = useState(false); // armezenar dados, evitando que seja recarregados novamente

    const navigation = useNavigation (); //Função para navegar entre telas, chamada no Onpress
   
    function navigationToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    // Função p/ chamada da api
    async function loadIncidents(){
        // retornando o loading, se verdadeiro
        if(loading) {
            return;
        }
        // não carregando dados acima valor total
        if (total > 0 && incidents.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', { params: { page } }); // pegando a rota da navigation 

        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']); // total de casos
        setPage(page + 1);
        setLoading(false);

    }
    
    //Função p/ disparar dados do BD
    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                   Total de <Text style={styles.headerTextBold}> {total} casos </Text>. 
                </Text>
            </View>

          <Text style={styles.title}>Bem-vindo!</Text>  
          <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>  
           
           <FlatList 
               data={incidents} 
               style={styles.incidentList} 
               keyExtractor={incident => String(incident.id)}
               showsVerticalScrollIndicator={false} //remove o scroll
               onEndReached={loadIncidents} //carregar listagem a mais
                onEndReachedThreshold={0.2}
               renderItem={({ item: incident }) => (
                
                <View style={styles.incident}>
                    
                <Text style={styles.incidentProperty}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('pt-BR', { 
                        style: 'currency', 
                        currency: 'BRL'
                        }).format(incident.value)}
                </Text>

                <TouchableOpacity 
                style={styles.detailsButton} 
                onPress={() => navigationToDetail(incident)}
                >
                    <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>

                    <Feather name="arrow-right" size={16} color="#e02041" />
                </TouchableOpacity>

            </View>
               )}          
           />
           

         </View>
                
          
        
    );
} 