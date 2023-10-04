import { KeyboardAvoidingView, Modal, ScrollView, ActivityIndicator, Alert, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { styles } from './Admin.styled';
import Ionicons from 'react-native-vector-icons/AntDesign';
import { useAdmin } from './useAdmin.hook';
import Colors from 'constants/Colors';
import MatIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { tos } from 'constants/TermsOfService';

export function Admin() {

  const { state, actions } = useAdmin();

  const admin = async () => {
    try {
      await actions.access();
    }
    catch (err) {
      Alert.alert(
        state.strings.error,
        state.strings.tryAgain,
      );
    }
  }

  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior="padding" enabled={Platform.OS === 'ios' ? true : false}>
      <View style={styles.container}>
        <View style={styles.control}>
          <TouchableOpacity onPress={actions.login}>
            <Ionicons style={styles.config} name="user" size={24} color="#aaaaaa" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Databag</Text>
        <View style={styles.spacemid}>
          <Text style={styles.header}>{ state.strings.adminAccess }</Text>
        </View>
        <View style={styles.spacetop}>
          <View style={styles.inputwrapper}>
            <Ionicons style={styles.icon} name="database" size={18} color="#aaaaaa" />
            <TextInput style={styles.inputfield} value={state.server} onChangeText={actions.setServer}
                autoCorrect={false} autoCapitalize="none" placeholder={state.strings.server}
                placeholderTextColor={Colors.inputPlaceholder} />
            <View style={styles.space} />
          </View>
          <View style={styles.inputwrapper}>
            <Ionicons style={styles.icon} name="key" size={18} color="#aaaaaa" />
            <TextInput style={styles.inputfield} value={state.token} onChangeText={actions.setToken}
                secureTextEntry={!state.plainText} autoCapitalize="none" placeholder={state.strings.token}
                placeholderTextColor={Colors.inputPlaceholder} />
            <TouchableOpacity>
              { state.plainText && (
                <Ionicons style={styles.icon} name="eye" size={18} color="#aaaaaa" onPress={actions.hidePass}/>
              )}
              { !state.plainText && (
                <Ionicons style={styles.icon} name="eyeo" size={18} color="#aaaaaa" onPress={actions.showPass}/>
              )}
            </TouchableOpacity>
          </View>

          { state.enabled && (
            <TouchableOpacity style={styles.reset} onPress={admin}>
              { state.busy && (
                <ActivityIndicator size="small" color="#ffffff" />
              )}
              { !state.busy && (
                <Text style={styles.resettext}>Access</Text>
              )}
            </TouchableOpacity>
          )}
          { !state.enabled && (
            <View style={styles.noreset}>
              <Text style={styles.noresettext}>{ state.strings.access }</Text>
            </View>
          )}
        </View>      
        <View style={styles.version}>
          <Text style={styles.versiontext}>v{ state.version }</Text>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={state.showTerms}
        supportedOrientations={['portrait', 'landscape']}
        onRequestClose={actions.hideTerms}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.terms} persistentScrollbar={true}>
            <Text style={styles.termsheader}>{ state.strings.policy }</Text>
            <Text numberOfLines={0}>{ tos[state.strings.languageCode] }</Text>
          </ScrollView>
          <TouchableOpacity style={styles.done} onPress={actions.hideTerms}>
            <Text style={styles.donetext}>{ state.strings.close }</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}
