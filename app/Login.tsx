import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';



const loginUser = async (email: any, password: any) => {
  try {
    const response = await axios.post('http://192.168.100.33:5000/api/auth/login', { email, password });
    const { token, user } = response.data;

    console.log(user);

    // Store the token in AsyncStorage
    await AsyncStorage.setItem('userToken', token);

    // Store user details if needed
    await AsyncStorage.setItem('userDetails', JSON.stringify(user));
    return true; // Login successful
  } catch (error) {
    return false; // Login failed
  }
};

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();



  const handleLogin = async () => {

    //  const condition = email.toLowerCase() == "admin@gmail.com"   && password == "admin"; 
    const condition = await loginUser(email.toLowerCase(), password)
    // Handle login logic here
    if (condition) {
      Alert.alert("Successfully logged in")
      console.log('Email:', email);
      console.log('Password:', password);
      navigation.navigate('Dashboard'); // Navigate to Dashboard screen
    }
    else {
      Alert.alert("Invalid email or password")
    }

    setEmail('');
    setPassword('');

  };

  return (
    // <SafeAreaView style={styles.container}>
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
            <Text style={styles.title}>
               <Text>LOGIN</Text>
            </Text>
            
          </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              onChangeText={email => setEmail(email)}
              placeholder="abc@example.com"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={email} />
          </View>


          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput

              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={password => setPassword(password)}
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
              value={password} />
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={() => {
                handleLogin();
              }}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign in</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  // Header
  title: {
    fontSize: 31,
    fontWeight: '700',
    marginBottom: 6,
    color: '#075eec'
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },

  // Inputs
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  // Forms
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },

  // Buttons
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
    // others
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
      backgroundColor: '#f5f5f5',
    },
    innerContainer: {
      paddingHorizontal: 24,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      color: '#333',
    },
});

export default LoginScreen;
