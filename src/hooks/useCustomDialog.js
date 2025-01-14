import React, { createContext, useContext, useState, useCallback } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { useTheme } from "react-native-paper";
import Loading from "../components/Loading/Loading";

// Context and Provider
const CustomDialogContext = createContext();
export const CUSTOMDIALOGSTATUS = {
  success: "success",
  warning: "warning",
  error: "error",
};

export const CustomDialogProvider = ({ children }) => {
  const { colors } = useTheme()
  const [dialogProps, setDialogProps] = useState(null);
  const [loading, setLoading] = useState(false);

  const openDialog = useCallback((props) => {
    setDialogProps(props);
  }, []);

  const closeDialog = useCallback(() => {
    setDialogProps(null);
  }, []);

  const confirmAction = useCallback(() => {
    if (dialogProps?.onConfirm) {
      setLoading(true);
      dialogProps.onConfirm(dialogProps.selectedData);
      setLoading(false);
    }
    closeDialog();
  }, [dialogProps, closeDialog]);

  const CustomDialog = () => {
    if (!dialogProps) return null;

    const {
      visible = true,
      onClose = closeDialog,
      title = "Confirmation",
      message = "Are you sure you want to confirm?",
      confirmText = "Confirm",
      cancelText = "Cancel",
      showCancel = true,
      showConfirm = true,
      status = CUSTOMDIALOGSTATUS.warning,
      allowClickOutside = true,
    } = dialogProps;

    return (
      <View>
        <Modal
          visible={visible}
          animationType="fade"
          transparent={true}
          onRequestClose={onClose}
        >
          <TouchableWithoutFeedback
            onPress={allowClickOutside ? onClose : () => { }}
          >
            <View
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            />
          </TouchableWithoutFeedback>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              className="rounded"
              style={{
                backgroundColor: "#fff",
                elevation: 5,
                padding: 15,
                width: "90%",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {status == CUSTOMDIALOGSTATUS.warning ? (
                  <Ionicons name="alert-circle" size={28} color="#ffae42" />
                ) : status == CUSTOMDIALOGSTATUS.success ? (
                  <Ionicons name="check-circle" size={28} color="green" />
                ) : (
                  <Ionicons name="close-circle" size={28} color="red" />
                )}
                <Text
                  style={{
                    fontSize: 16,
                    marginLeft: 8,
                    marginTop: 2,
                    fontWeight: "500",
                  }}
                >
                  {title}
                </Text>
              </View>
              <View style={{ marginTop: 5, marginLeft: 36 }}>
                <Text style={{ fontSize: 14 }}>{message}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  marginLeft: 36,
                  justifyContent: "flex-end",
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  className="rounded"
                  style={{
                    borderWidth: 1,
                    paddingVertical: 5,
                    borderColor: "#ccc",
                    flex: 1,
                    display: showCancel ? "block" : "none",
                    maxWidth: 150,
                  }}
                  onPress={onClose}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      textAlign: "center",
                    }}
                  >
                    {cancelText}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="rounded"
                  style={{
                    paddingVertical: 5,
                    flex: 1,
                    backgroundColor: colors.primary,
                    display: showConfirm ? "block" : "none",
                    maxWidth: 150,
                  }}
                  onPress={confirmAction}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    {confirmText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Loading showDialog={loading} />
      </View>
    );
  };

  return (
    <CustomDialogContext.Provider value={openDialog}>
      {children}
      <CustomDialog />
    </CustomDialogContext.Provider>
  );
};

// Custom hook to use the dialog
export const useCustomDialog = () => {
  const openDialog = useContext(CustomDialogContext);
  if (!openDialog) {
    throw new Error(
      "useCustomDialog must be used within a CustomDialogProvider"
    );
  }
  return openDialog;
};
