import { ConfigProvider } from 'antd';

export const withStyles = (Component: React.FC) => () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 2,
          fontFamily: 'Roboto, sans-serif',
          fontWeightStrong: 500,
          fontSize: 16,
          fontSizeHeading3: 24,
          fontSizeHeading1: 38,
          lineHeightHeading3: 1.916,
          colorPrimary: '#616161',
          colorPrimaryHover: '#757575',
          colorPrimaryActive: '#616161'
        },
        components: {
          Radio: {
            borderRadius: 16,
            colorBorder: 'rgba(217, 217, 217, 1)',
            buttonCheckedBg: 'rgba(217, 217, 217, 0.2)',
            colorText: 'black'
          },
          Upload: {
            borderRadiusLG: 10
          },
          Button: {
            fontSize: 16,
            boxShadow: 'none'
          },
          Typography: {
            titleMarginBottom: 0
          },
          Select: {
            optionSelectedBg: '#757575',
            optionSelectedColor: '#fff'
          }
        }
      }}
    >
      <Component />
    </ConfigProvider>
  );
};
