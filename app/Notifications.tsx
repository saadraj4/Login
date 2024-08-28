import { Text, Button, View } from "react-native"
import { useNavigation } from '@react-navigation/native';


const Notifications: React.FC = () => {
const navigation = useNavigation();
    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
    )
}

export default Notifications;