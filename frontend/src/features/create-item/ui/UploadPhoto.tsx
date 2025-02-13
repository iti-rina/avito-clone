import { FC } from 'react';
import { message, Upload } from 'antd';
import type { UploadProps } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const props: UploadProps = {
  // name: 'file',
  // multiple: true,
  // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  // onChange(info) {
  //   const { status } = info.file;
  //   if (status !== 'uploading') {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (status === 'done') {
  //     message.success(`${info.file.name} file uploaded successfully.`);
  //   } else if (status === 'error') {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // },
  // onDrop(e) {
  //   console.log('Dropped files', e.dataTransfer.files);
  // }
};

const { Dragger } = Upload;

export const UploadPhoto: FC = () => {
  const { t } = useTranslation('createItemForm');

  return (
    <Dragger
      {...props}
      style={{
        paddingTop: '8px',
        paddingBottom: '8px',
        backgroundColor: '#ffffff'
      }}
    >
      <Instructions>{t('uploadInstructions')}</Instructions>
      <Restrictions>{t('uploadRestrictions')}</Restrictions>
    </Dragger>
  );
};

const Instructions = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 157%;
  margin: 0;
`;

const Restrictions = styled.p`
  color: #aaaaaa;
  font-size: 14px;
  line-height: 157%;
  margin: 0;
`;
