import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';

// type RootStackParamList = {
//   Login: undefined;
//   Dashboard: undefined;
// };
// type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

// interface Props {
//   navigation: LoginScreenNavigationProp;
// }

interface user {
  username: string;
  email: string;
  image: string;
}

const loginUser = async (email:any, password:any) => {
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
  const condition = await loginUser(email.toLowerCase(),password)
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
    
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.innerContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text:any) => setEmail(text)}
        />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={(text:any) => setPassword(text)}
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});

export default LoginScreen;
