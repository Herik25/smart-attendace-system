import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../../store/store";

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="loginMonitor" />
        <Stack.Screen name="signUpMonitor" />
        <Stack.Screen name="monitorHome" />
        <Stack.Screen name="scanner" />
        <Stack.Screen name="students" />
        <Stack.Screen name="addStudent" />
        <Stack.Screen name="attendanceReport" />
        <Stack.Screen name="sortingStudents" />
        <Stack.Screen name="markAllStudents" />
        <Stack.Screen name="deleteStudent" />
        <Stack.Screen name="[user]" />
      </Stack>
    </Provider>
  );
}
