import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import colors from '../config/colors';
import {fontSz} from '../config/responsiveSize';
import routes from '../navigation/routes';
import AppText from './AppText';
import AppForm from './form/AppForm';
import navigation from '../navigation/rootNavigation';

const AuthForm = ({
  children,
  welcomeMessage,
  authTypeLabel,
  initialValues,
  validationSchema,
  onSubmit,
}) => {
  const navigateLinkLabel =
    authTypeLabel === 'Login'
      ? "Don't have an Account?"
      : 'Already have an Account?';
  const navigateLinkTitle = authTypeLabel === 'Login' ? 'Sign up' : 'Login';
  const routeName = authTypeLabel === 'Login' ? routes.SIGNUP : routes.LOGIN;

  return (
    <View style={styles.container}>
      <AppText style={styles.welcome}>{welcomeMessage}</AppText>
      <AppText style={styles.authLabel}>{authTypeLabel}</AppText>
      <AppForm
        enableReinitialize
        validateOnMount
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {children}
      </AppForm>
      <AppText style={styles.linkLabel}>{navigateLinkLabel}</AppText>
      <TouchableOpacity
        style={{paddingHorizontal: 10}}
        onPress={() => navigation.navigate(routeName)}>
        <AppText style={styles.link}>{navigateLinkTitle}</AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'yellow',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: fontSz(12),
    // fontWeight: '600',
    marginBottom: 25,
  },
  authLabel: {
    fontSize: fontSz(20),
    fontWeight: '700',
    marginBottom: 10,
  },
  linkLabel: {
    marginTop: 10,
  },
  link: {
    fontWeight: '700',
    marginTop: 5,
    color: colors.purple,
  },
});

export default AuthForm;
