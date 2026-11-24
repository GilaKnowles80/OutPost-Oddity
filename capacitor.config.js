const config = {
  appId: 'com.outpostoddity.app',
  appName: 'Outpost Oddity',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    url: 'https://outpost-oddity.vercel.app',
    cleartext: false,
  },
  android: {
    buildOptions: {
      release: {
        keystorePath: 'release.keystore',
        keystorePassword: '',
        keyAlias: 'outpostoddity',
        keyPassword: '',
      },
    },
  },
  ios: {
    contentInset: 'automatic',
    scrollEnabled: true,
    backgroundColor: '#0f172a',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0f172a',
      showSpinner: true,
      spinnerColor: '#8b5cf6',
      androidSpinnerStyle: 'large',
      iosSpinnerStyle: 'small',
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#0f172a',
    },
    Keyboard: {
      resize: 'body',
      style: 'dark',
    },
    App: {
      launchShowDuration: 0,
    },
  },
};

export default config;
