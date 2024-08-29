import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary, launchCamera, ImagePickerResponse, Asset } from 'react-native-image-picker';


const SignUp: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null);

    const navigation = useNavigation();

    const handleSignup = async () => {

        try {

            console.log("username: ", username);
            console.log("email: ", email);
            console.log("password: ", password);
            console.log("confirmpassword: ", confirmPassword);
            console.log("imageUri: ", imageUri);


            const response = await axios.post('http://localhost:5000/api/auth/register', { username, email, password, confirmPassword, imageUri })
            const { token } = response.data;

            Alert.alert("Successfully Signed Up")
            console.log('Token:', token);

            navigation.navigate('Login'); // Navigate to Login   screen

        }
        catch (error) {
            console.error('Error signing up', error);
            Alert.alert('Error', 'Failed to sign up');
        }

        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

    };

    // Image setting up
    const selectImage = async () => {
        try {
          const response: ImagePickerResponse = await launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true, // Include base64 data in response
          });
    
          if (response.didCancel) {
            Alert.alert('Image selection canceled');
          } else if (response.errorCode) {
            Alert.alert('ImagePicker Error: ', response.errorMessage || '');
          } else if (response.assets && response.assets.length > 0) {
            const selectedImage: Asset = response.assets[0];
            setImageUri(selectedImage.uri || null);
          }
        } catch (error) {
          console.error('Error selecting image', error);
          Alert.alert('Error', 'Something went wrong while selecting the image');
        }
      };
    
      const takePhoto = async () => {
        try {
          const response: ImagePickerResponse = await launchCamera({
            mediaType: 'photo',
            includeBase64: true, // Include base64 data in response
          });
    
          if (response.didCancel) {
            Alert.alert('Camera usage canceled');
          } else if (response.errorCode) {
            Alert.alert('Camera Error: ', response.errorMessage || '');
          } else if (response.assets && response.assets.length > 0) {
            const takenPhoto: Asset = response.assets[0];
            setImageUri(takenPhoto.uri || null);
          }
        } catch (error) {
          console.error('Error taking photo', error);
          Alert.alert('Error', 'Something went wrong while taking the photo');
        }
      };

    return (
        // <SafeAreaView style={styles.container}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
            <View style={styles.container}>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>
                        <Text>Sign Up</Text>
                    </Text>

                </View>
                {/* Input */}
                <View style={styles.form}>
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Username</Text>
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            clearButtonMode="while-editing"
                            onChangeText={username => setUsername(username)}
                            placeholder="username"
                            placeholderTextColor="#6b7280"
                            style={styles.inputControl}
                            value={username} />
                    </View>

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
                    <View style={styles.input}>
                        <Text style={styles.inputLabel}>Confirm Password</Text>
                        <TextInput

                            autoCorrect={false}
                            clearButtonMode="while-editing"
                            onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                            placeholder="********"
                            placeholderTextColor="#6b7280"
                            style={styles.inputControl}
                            secureTextEntry={true}
                            value={confirmPassword} />
                    </View>
                    {/* Image input */}

                    <View>
                        <Button title="Select Image from Gallery" onPress={selectImage} />
                        <Button title="Take Photo" onPress={takePhoto} />
                        {imageUri && (
                            <Image
                                source={{ uri: imageUri }}
                                style={{ width: 200, height: 200, marginTop: 20 }}
                            />
                        )}
                    </View>
                    <View style={styles.formAction}>
                        <TouchableOpacity
                            onPress={() => {
                                handleSignup();
                            }}>
                            <View style={styles.btn}>
                                <Text style={styles.btnText}>Sign Up</Text>
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

export default SignUp;