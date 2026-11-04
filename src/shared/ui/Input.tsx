import { useState } from "react";
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity
} from "react-native";

 
interface InputProps {
  label:           string;
  value:           string;
  onChangeText:    (t: string) => void;
  placeholder?:    string;
  secureTextEntry?: boolean;
  keyboardType?:   "default" | "email-address" | "numeric";
  error?:          string;
  autoCapitalize?: "none" | "sentences" | "words";
}
 
export const Input = ({
  label, value, onChangeText, placeholder,
  secureTextEntry, keyboardType = "default", error,
  autoCapitalize = "none",
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, error ? styles.inputError : null]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          style={styles.input}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible((visible) => !visible)}
            style={styles.visibilityButton}
            accessibilityRole="button"
            accessibilityLabel={isPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
            accessibilityState={{ selected: isPasswordVisible }}
          >
            <Text style={styles.visibilityIcon}>{isPasswordVisible ? "🙈" : "👁"}</Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};
 
const styles = StyleSheet.create({
  wrapper:    { gap:6 },
  label:      { fontSize:14, fontWeight:"500", color:"#334155" },
  inputContainer: { flexDirection:"row", alignItems:"center", borderWidth:1.5,
                    borderColor:"#CBD5E1", borderRadius:10, backgroundColor:"#F8FAFC" },
  input:      { flex:1, minWidth:0, paddingHorizontal:16, paddingVertical:13,
                fontSize:15, color:"#0F172A" },
  inputError: { borderColor:"#DC2626" },
  visibilityButton: { minWidth:44, minHeight:44, alignItems:"center",
                      justifyContent:"center" },
  visibilityIcon: { fontSize:18 },
  error:      { fontSize:12, color:"#DC2626" },
});
