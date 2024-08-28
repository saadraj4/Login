import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userDetails = await AsyncStorage.getItem('userDetails');

        if (userDetails) {
          setUser(JSON.parse(userDetails));
        } else {
          Alert.alert('Error', 'User details not found');
        }
      } catch (error) {
        console.error('Error retrieving user data', error);
        Alert.alert('Error', 'Failed to load user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      // Clear the token and user details from AsyncStorage
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userDetails');
      
      // Redirect to LoginScreen
      navigation.navigate('Login'); // Adjust the name based on your stack navigation
    } catch (error) {
      console.error('Error logging out', error);
      Alert.alert('Error', 'Failed to log out');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.userInfo}>
          <Image
            source={{ uri: `data:image/png;base64,${user.image}` }}
            style={styles.profileImage}
          />
          <Text style={styles.username}>Username: {user.username}</Text>
          <Text style={styles.email}>Email: {user.email}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      ) : (
        <Text>No user data available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  userInfo: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 18,
    marginVertical: 8,
  },
  email: {
    fontSize: 16,
    color: 'gray',
  },
});

export default DashboardScreen;
