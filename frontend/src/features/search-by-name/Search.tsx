import { Input } from 'antd';
import { useState, useEffect, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';

type SearchInputProps = {
  onSearch: (value: string) => void;
  isLoading: boolean;
};

export const SearchInput: FC<SearchInputProps> = ({ onSearch, isLoading }) => {
  const { t } = useTranslation('actionButton');

  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearch] = useDebounce(searchValue, 500);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  return (
    <Input.Search
      placeholder={t('searchPlaceholder')}
      size='large'
      loading={isLoading}
      allowClear
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onSearch={onSearch}
      style={{ outline: 'none' }}
    />
  );
};
