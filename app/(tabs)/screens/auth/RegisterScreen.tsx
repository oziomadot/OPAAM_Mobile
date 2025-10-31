// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { Formik } from 'formik';
// import React, { useState } from 'react';
// import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { Button, Checkbox, TextInput } from 'react-native-paper';
// import * as Yup from 'yup';
// import { useAuth } from '../../../../app-example/app/context/AuthContext';
// import { RootStackParamList } from '../../../../app-example/app/navigation/types';

// type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

// const RegisterSchema = Yup.object().shape({
//   name: Yup.string().required('Full name is required'),
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   phone: Yup.string().required('Phone number is required'),
//   password: Yup.string()
//     .min(8, 'Password must be at least 8 characters')
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
//       'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
//     )
//     .required('Password is required'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password')], 'Passwords must match')
//     .required('Please confirm your password'),
//   termsAccepted: Yup.boolean()
//     .oneOf([true], 'You must accept the terms and conditions')
//     .required('You must accept the terms and conditions'),
// });

// const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const { register } = useAuth();

//   const handleRegister = async (values: {
//     name: string;
//     email: string;
//     phone: string;
//     password: string;
//   }) => {
//     try {
//       setIsLoading(true);
//       await register(values);
//       // Navigation is handled by AuthNavigator based on auth state
//     } catch (error) {
//       console.error('Registration error:', error);
//       // Error is handled by AuthContext
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.logoContainer}>
//           <Image
//             source={{ uri: 'https://reactnative.dev/img/header_logo.svg' }}
//             style={styles.logo}
//             resizeMode="contain"
//           />
//           <Text style={styles.title}>Create Account</Text>
//           <Text style={styles.subtitle}>Fill in your details to get started</Text>
//         </View>

//         <Formik
//           initialValues={{
//             name: '',
//             email: '',
//             phone: '',
//             password: '',
//             confirmPassword: '',
//             termsAccepted: false,
//           }}
//           validationSchema={RegisterSchema}
//           onSubmit={handleRegister}
//         >
//           {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
//             <View style={styles.formContainer}>
//               <TextInput
//                 label="Full Name"
//                 mode="outlined"
//                 left={<TextInput.Icon icon="account" />}
//                 style={styles.input}
//                 value={values.name}
//                 onChangeText={handleChange('name')}
//                 onBlur={handleBlur('name')}
//                 error={touched.name && !!errors.name}
//               />
//               {touched.name && errors.name && (
//                 <Text style={styles.errorText}>{errors.name}</Text>
//               )}

//               <TextInput
//                 label="Email"
//                 mode="outlined"
//                 left={<TextInput.Icon icon="email" />}
//                 style={styles.input}
//                 value={values.email}
//                 onChangeText={handleChange('email')}
//                 onBlur={handleBlur('email')}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 error={touched.email && !!errors.email}
//               />
//               {touched.email && errors.email && (
//                 <Text style={styles.errorText}>{errors.email}</Text>
//               )}

//               <TextInput
//                 label="Phone Number"
//                 mode="outlined"
//                 left={<TextInput.Icon icon="phone" />}
//                 style={styles.input}
//                 value={values.phone}
//                 onChangeText={handleChange('phone')}
//                 onBlur={handleBlur('phone')}
//                 keyboardType="phone-pad"
//                 error={touched.phone && !!errors.phone}
//               />
//               {touched.phone && errors.phone && (
//                 <Text style={styles.errorText}>{errors.phone}</Text>
//               )}

//               <TextInput
//                 label="Password"
//                 mode="outlined"
//                 left={<TextInput.Icon icon="lock" />}
//                 right={
//                   <TextInput.Icon
//                     icon={showPassword ? 'eye-off' : 'eye'}
//                     onPress={() => setShowPassword(!showPassword)}
//                   />
//                 }
//                 style={styles.input}
//                 value={values.password}
//                 onChangeText={handleChange('password')}
//                 onBlur={handleBlur('password')}
//                 secureTextEntry={!showPassword}
//                 error={touched.password && !!errors.password}
//               />
//               {touched.password && errors.password && (
//                 <Text style={styles.errorText}>{errors.password}</Text>
//               )}

//               <TextInput
//                 label="Confirm Password"
//                 mode="outlined"
//                 left={<TextInput.Icon icon="lock-check" />}
//                 style={styles.input}
//                 value={values.confirmPassword}
//                 onChangeText={handleChange('confirmPassword')}
//                 onBlur={handleBlur('confirmPassword')}
//                 secureTextEntry={!showPassword}
//                 error={touched.confirmPassword && !!errors.confirmPassword}
//               />
//               {touched.confirmPassword && errors.confirmPassword && (
//                 <Text style={styles.errorText}>{errors.confirmPassword}</Text>
//               )}

//               <View style={styles.termsContainer}>
//                 <Checkbox.Android
//                   status={values.termsAccepted ? 'checked' : 'unchecked'}
//                   onPress={() => setFieldValue('termsAccepted', !values.termsAccepted)}
//                   color="#1a73e8"
//                 />
//                 <Text style={styles.termsText}>
//                   I agree to the{' '}
//                   <Text style={styles.termsLink} onPress={() => {}}>
//                     Terms of Service
//                   </Text>{' '}
//                   and{' '}
//                   <Text style={styles.termsLink} onPress={() => {}}>
//                     Privacy Policy
//                   </Text>
//                 </Text>
//               </View>
//               {touched.termsAccepted && errors.termsAccepted && (
//                 <Text style={styles.errorText}>{errors.termsAccepted}</Text>
//               )}

//               <Button
//                 mode="contained"
//                 onPress={() => handleSubmit()}
//                 loading={isLoading}
//                 disabled={isLoading}
//                 style={styles.button}
//                 labelStyle={styles.buttonLabel}
//               >
//                 Create Account
//               </Button>

//               <View style={styles.footer}>
//                 <Text style={styles.footerText}>Already have an account? </Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//                   <Text style={styles.footerLink}>Sign In</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           )}
//         </Formik>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     padding: 20,
//     paddingTop: 40,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     marginBottom: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#333',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//   },
//   formContainer: {
//     width: '100%',
//   },
//   input: {
//     marginBottom: 8,
//     backgroundColor: '#fff',
//   },
//   errorText: {
//     color: '#ff3b30',
//     fontSize: 12,
//     marginBottom: 8,
//     marginLeft: 8,
//   },
//   termsContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//     marginBottom: 16,
//   },
//   termsText: {
//     flex: 1,
//     fontSize: 14,
//     color: '#666',
//   },
//   termsLink: {
//     color: '#1a73e8',
//     fontWeight: '500',
//   },
//   button: {
//     marginTop: 8,
//     paddingVertical: 8,
//     borderRadius: 8,
//     backgroundColor: '#1a73e8',
//   },
//   buttonLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#fff',
//     paddingVertical: 4,
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 24,
//     marginBottom: 20,
//   },
//   footerText: {
//     color: '#666',
//   },
//   footerLink: {
//     color: '#1a73e8',
//     fontWeight: 'bold',
//   },
// });

// export default RegisterScreen;
