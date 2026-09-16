import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import {typography} from "../../../../../theme/typography";
import {colors} from "../../../../../theme/colors";
import { Camera } from "lucide-react-native"
import {spacing} from "../../../../../theme/spacing";

type PhotoSectionProps = {
    capturedPhotoUri: string;
    takePhoto: () => Promise<void>;
}

const PhotoSection = ({ takePhoto, capturedPhotoUri }: PhotoSectionProps) => {
  return (
      <View style={styles.container}>

          <Text style={styles.title}>A tua foto</Text>

          <View style={styles.cameraSection}>
              { capturedPhotoUri
                  ? <Image source={{ uri: capturedPhotoUri }} style={{width: '100%', height: '100%'}} />

                  : <Pressable onPress={takePhoto}>
                      <Camera size={30} color={colors.secondaryText} />
                      <Text style={styles.cameraSectionText}>Tirar Foto</Text>
                  </Pressable>



              }

          </View>

      </View>
  )
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        gap: spacing.md
    },

    title: {
        alignSelf: "baseline",
        marginStart: spacing.lg,
        color: colors.secondaryText,
        fontSize: typography.fontSizes.subtitle,
        fontWeight: typography.fontWeights.semibold,
    },

    cameraSection: {
        width: "90%",
        height: 400,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: spacing.lg,
        gap: spacing.sm,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: colors.secondaryText,
    },

    cameraSectionText: {
        color: colors.secondaryText,
        fontSize: typography.fontSizes.subtitle,
        fontWeight: typography.fontWeights.semibold,
    }
})


export default PhotoSection;