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
          lineHeightHeading3: 1.916
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
            fontSize: 16
          },
          Typography: {
            titleMarginBottom: 0
          }
        }
      }}
    >
      <Component />
    </ConfigProvider>
  );
};
