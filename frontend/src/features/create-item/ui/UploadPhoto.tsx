import { FC, useState } from 'react';
import { message, Upload } from 'antd';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import imageCompression from 'browser-image-compression';

const { Dragger } = Upload;

export const UploadPhoto: FC = () => {
  const { t } = useTranslation('createItemForm');

  const { setValue } = useFormContext();
  const [fileList, setFileList] = useState([]);

  const getBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleUpload = async (file: File) => {
    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024
      });

      const base64 = await getBase64(compressedFile);
      setValue('photo', base64);
      setFileList([
        { uid: file.uid, name: file.name, status: 'done', url: base64 }
      ]);
    } catch (error) {
      message.error('Ошибка загрузки файла');
    }
    return false;
  };

  return (
    <Dragger
      accept='image/*'
      beforeUpload={handleUpload}
      fileList={fileList}
      maxCount={1}
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
