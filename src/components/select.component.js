import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Select } from '@ui-kitten/components';

export const SelectRole = ({ label, placeholder, selectedOption, onSelect, data}) => {

  console.log(data)
  return (
    <Layout style={styles.container}>
      <Select
        label={label}
        placeholder={placeholder}
        data={data}
        selectedOption={selectedOption}
        onSelect={onSelect}
        style={{marginBottom: 10}}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    // minHeight: 228,
  },
});