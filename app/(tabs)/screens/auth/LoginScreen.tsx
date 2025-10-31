

// const LoginSchema = Yup.object().shape({
//   email: Yup.string().email('Invalid email').required('Email is required'),
//   password: Yup.string()
//     .min(6, 'Password must be at least 6 characters')
//     .required('Password is required'),
// });

// const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const { login } = useAuth();

//   const handleLogin = async (values: { email: string; password: string }) => {
//     try {
//       setIsLoading(true);
//       await login(values.email, values.password);
//       // Navigation is handled by AuthNavigator based on auth state
//     } catch (error) {
//       console.error('Login error:', error);
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
//           <Text style={styles.title}>Welcome Back</Text>
//           <Text style={styles.subtitle}>Sign in to continue</Text>
//         </View>

//         <Formik
//           initialValues={{ email: '', password: '' }}
//           validationSchema={LoginSchema}
//           onSubmit={handleLogin}
//         >
//           {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
//             <View style={styles.formContainer}>
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
//                 label="Password"
//                 mode="outlined"
//                 left={<TextInput.Icon icon="lock" />}
//                 right={<TextInput.Icon icon="eye" />}
//                 style={styles.input}
//                 value={values.password}
//                 onChangeText={handleChange('password')}
//                 onBlur={handleBlur('password')}
//                 secureTextEntry
//                 error={touched.password && !!errors.password}
//               />
//               {touched.password && errors.password && (
//                 <Text style={styles.errorText}>{errors.password}</Text>
//               )}

//               <TouchableOpacity
//                 style={styles.forgotPassword}
//                 onPress={() => navigation.navigate('ForgotPassword')}
//               >
//                 <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//               </TouchableOpacity>

//               <Button
//                 mode="contained"
//                 onPress={() => handleSubmit()}
//                 loading={isLoading}
//                 disabled={isLoading}
//                 style={styles.button}
//                 labelStyle={styles.buttonLabel}
//               >
//                 Sign In
//               </Button>

//               <View style={styles.footer}>
//                 <Text style={styles.footerText}>Don't have an account? </Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//                   <Text style={styles.footerLink}>Sign Up</Text>
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
//     justifyContent: 'center',
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   logo: {
//     width: 120,
//     height: 120,
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
//   forgotPassword: {
//     alignSelf: 'flex-end',
//     marginBottom: 20,
//   },
//   forgotPasswordText: {
//     color: '#1a73e8',
//     fontSize: 14,
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
//   },
//   footerText: {
//     color: '#666',
//   },
//   footerLink: {
//     color: '#1a73e8',
//     fontWeight: 'bold',
//   },
// });

// export default LoginScreen;
