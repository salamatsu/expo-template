import { View, Text, Modal, ActivityIndicator, StyleSheet } from "react-native";

const Loading = ({ showDialog }) => {

  return (
    <Modal visible={showDialog} transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ActivityIndicator
            size={35}
            style={{ right: 7, bottom: 2 }}
            color={"#C91F82"}
          />
          <Text style={{ fontSize: 16 }}>Loading please wait...</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Loading;
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 25,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
});
