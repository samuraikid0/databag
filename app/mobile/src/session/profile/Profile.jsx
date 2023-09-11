import { ActivityIndicator, KeyboardAvoidingView, Image, Modal, View, Switch, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import AntIcons from 'react-native-vector-icons/AntDesign';
import MatIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker'
import { BlurView } from "@react-native-community/blur";
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Colors } from 'constants/Colors';
import { useProfile } from './useProfile.hook';
import { styles } from './Profile.styled';
import avatar from 'images/avatar.png';

export function Profile() {

  const { state, actions } = useProfile();

  const onGallery = async () => {
    try {
      const full = await ImagePicker.openPicker({ mediaType: 'photo', width: 256, height: 256 });
      const crop = await ImagePicker.openCropper({ path: full.path, width: 256, height: 256, cropperCircleOverlay: true, includeBase64: true });
      try {
        await actions.setProfileImage(crop.data);
      }
      catch (err) {
        console.log(err);
        Alert.alert(
          state.strings.error,
          state.strings.tryAgain,
        );
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  const setVisible = async (visible) => {
    try {
      await actions.setVisible(visible);
    }
    catch (err) {
      console.log(err);
      Alert.alert(
        state.strings.error,
        state.strings.tryAgain,
      );
    }
  }

  const saveDetails = async () => {
    try {
      await actions.saveDetails();
      actions.hideEditDetails();
    }
    catch (err) {
      console.log(err);
      Alert.alert(
        state.strings.error,
        state.strings.tryAgain,
      )
    }
  }

const triggerStyles = {
  triggerTouchable: {
    activeOpacity: 70,
  },
};


  return (
    <ScrollView style={styles.content} contentContainerStyle={{ display: 'flex', alignItems: 'center' }}>

      <Image source={state.imageSource} style={{ width: state.imageWidth, height: state.imageHeight, alignSelf: 'center' }} resizeMode={'contain'} />

      <View style={{ ...styles.details, width: state.detailWidth }}>
        <View style={styles.control}>

    <Menu>
      <MenuTrigger customStyles={styles.trigger}>
        <View style={styles.edit}>
          <Text style={styles.editLabel}>{ state.strings.edit }</Text>
          <MatIcons name="square-edit-outline" size={14} color={Colors.linkText} />
        </View>
      </MenuTrigger>
      <MenuOptions optionsContainerStyle={{ width: 'auto' }} style={styles.options}>
        <MenuOption onSelect={onGallery}>
          <Text style={styles.option}>{ state.strings.editImage }</Text>
        </MenuOption>
        <MenuOption onSelect={actions.showDetails}>
          <Text style={styles.option}>{ state.strings.editDetails }</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>

        </View>

        { state.name && (
          <Text style={styles.nameSet} numberOfLines={1} adjustsFontSizeToFit={true}>{ state.name }</Text>
        )}
        { !state.name && (
          <Text style={styles.nameUnset}>{ state.strings.name }</Text>
        )}

        <Text style={styles.username} numberOfLines={1}>{ state.username }</Text>

        <View style={styles.group}>
          <View style={styles.entry}>
            <AntIcons name="enviromento" style={styles.icon} size={20} color={Colors.text} />
            { state.location && (
              <Text style={styles.locationSet}>{ state.location }</Text>
            )}
            { !state.location && (
              <Text style={styles.locationUnset}>Location</Text>
            )}
          </View>
          <View style={styles.divider} />
          <View style={styles.entry}>
            <MatIcons name="book-open-outline" style={styles.icon} size={20} color={Colors.text} />
            { state.location && (
              <Text style={styles.descriptionSet}>{ state.description }</Text>
            )}
            { !state.description && (
              <Text style={styles.descriptionUnset}>Description</Text>
            )}
          </View>
        </View>

        <View style={styles.group}>
          <TouchableOpacity style={styles.entry} activeOpacity={1}>
            <MatIcons name="eye-outline" style={styles.icon} size={20} color={Colors.text} />
            <Text style={styles.visibleLabel}>{ state.strings.visibleRegistry }</Text>
            <Switch value={state.searchable} style={styles.visibleSwitch} thumbColor={Colors.sliderGrip} ios_backgroundColor={Colors.disabledIndicator}
                trackColor={styles.track} onValueChange={setVisible} />
          </TouchableOpacity>
        </View>

      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={state.details}
        supportedOrientations={['portrait', 'landscape']}
        onRequestClose={actions.hideDetails}
      >
        <BlurView style={styles.modalOverlay} blurType={Colors.overlay} blurAmount={2} reducedTransparencyFallbackColor="black">
          <View style={styles.modalContainer}>
            <View style={styles.modalClose}>
              <TouchableOpacity style={styles.dismissButton} activeOpacity={1} onPress={actions.hideDetails}>
                <MatIcons name="close" size={20} color={Colors.descriptionText} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalHeader}>{ state.strings.editDetails }</Text>

            <View style={styles.modalInput}>
              <FloatingLabelInput
                label={state.strings.name}
                value={state.detailName}
                autoCapitalize={'none'}
                spellCheck={false}
                inputStyles={styles.floatingInput}
                labelStyles={styles.floatingLabel}
                customLabelStyles={styles.floatingCustomLabel}
                containerStyles={styles.floatingContainer}
                onChangeText={actions.setDetailName}
              />
            </View>

            <View style={styles.modalInput}>
              <FloatingLabelInput
                label={state.strings.location}
                value={state.detailLocation}
                autoCapitalize={'none'}
                spellCheck={false}
                inputStyles={styles.floatingInput}
                labelStyles={styles.floatingLabel}
                customLabelStyles={styles.floatingCustomLabel}
                containerStyles={styles.floatingContainer}
                onChangeText={actions.setDetailLocation}
              />
            </View>

            <View style={styles.modalInput}>
              <FloatingLabelInput
                label={state.strings.description}
                value={state.detailDescription}
                autoCapitalize={'none'}
                spellCheck={false}
                multiline={true}
                inputStyles={styles.floatingInput}
                labelStyles={styles.floatingLabel}
                customLabelStyles={styles.floatingCustomLabel}
                containerStyles={styles.floatingContainer}
                onChangeText={actions.setDetailDescription}
              />
            </View>

          </View>
        </BlurView>
      </Modal>

    </ScrollView>
  );
}

