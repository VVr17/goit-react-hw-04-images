export const theme = Object.freeze({
  colors: {
    white: '#ffffff',
    red: '#8e1600',
    accent: '#987045',
    secondaryColor: '#00554e',
    muted: '#f6f6f6',

    mainText: '#333333',
    secondaryTextColor: '#ebebeb',
    accentTextColor: '#013220',
    inputText: 'rgba(117, 117, 117, 0.5)',

    mainBackgroundColor: '#f5f4fa',
    accentBackgroundColor: '#03453b',
    backgroundContactCardColor: 'rgba(247, 227, 201, 0.2)',
    bgErrorColor: ' rgba(142, 22, 0, 0.08)',
    btnShadowColor: 'rgba(0, 0, 0, 0.15)',
  },

  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],

  fontWeight: {
    normal: 400,
    semiBold: 600,
    bold: 700,
  },

  fontSizes: {
    xs: '12px',
    s: '16px',
    m: '24px',
    l: '32px',
    xl: '64px',
  },

  // lineHeights: {
  //   body: 1.5,
  //   heading: 1.125,
  // },

  borders: {
    none: 'none',
    normal: '1px solid',
  },

  radii: {
    none: '0',
    normal: '4px',
    custom: '0px 0px 4px 4px',
    round: '50%',
  },

  boxShadow: {
    first:
      '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.2)',
    second:
      ' 0 1px 4px rgba(0, 0, 0, 1), -23px 0 20px -23px rgba(0, 0, 0, 0.8), 23px 0 20px -23px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.1)',
  },
});
