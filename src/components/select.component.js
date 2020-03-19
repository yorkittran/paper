import React from 'react';
import { Layout, Select } from '@ui-kitten/components';

export const PaperSelect = ({ label, placeholder, data, multiSelect, selectedOption, onSelect, message }) => {

  return (
    <Layout>
      <Select
        label={label}
        placeholder={placeholder}
        multiSelect={multiSelect}
        data={data}
        status={message ? 'danger' : ''}
        caption={message ?? ''}
        selectedOption={selectedOption}
        onSelect={onSelect}
        style={{marginBottom: 10}}
      />
    </Layout>
  );
};