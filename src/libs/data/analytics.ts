export type DataTypeKey = 'literacy' | 'population' | 'livelihood' | 'employment' | 'migration' | 'cultural';

export interface DataTypeConfig {
  label: string;
  apiEndpoint: string;
  chartLabel: string;
  valueFields: string[];
  valueLabels: string[];
  labelKey: string;
}

export const dataTypeConfig: Record<DataTypeKey, DataTypeConfig> = {
  literacy: {
    label: 'Literacy Rates',
    apiEndpoint: 'literacy-stats',
    chartLabel: 'Literacy Rate (%)',
    valueFields: ['avg', 'min', 'max'],
    valueLabels: ['Average Literacy Rate (%)', 'Minimum Literacy Rate (%)', 'Maximum Literacy Rate (%)'],
    labelKey: 'state',
  },
  population: {
    label: 'Population Distribution',
    apiEndpoint: 'population-by-state',
    chartLabel: 'Total Population',
    valueFields: ['population'],
    valueLabels: ['Total Population'],
    labelKey: 'state',
  },
  livelihood: {
    label: 'Livelihood Types',
    apiEndpoint: 'livelihood-types',
    chartLabel: 'Number of Tribes',
    valueFields: ['count'],
    valueLabels: ['Number of Tribes'],
    labelKey: 'livelihood',
  },
  employment: {
    label: 'Employment Types',
    apiEndpoint: 'livelihood-distribution',
    chartLabel: 'Number of Tribes',
    valueFields: ['count'],
    valueLabels: ['Number of Tribes'],
    labelKey: 'type',
  },
  migration: {
    label: 'Migration Trends',
    apiEndpoint: 'migration-trends',
    chartLabel: 'Number of Tribes',
    valueFields: ['count'],
    valueLabels: ['Number of Tribes'],
    labelKey: 'trend',
  },
  cultural: {
    label: 'Cultural Practices',
    apiEndpoint: 'cultural-practices',
    chartLabel: 'Number of Tribes',
    valueFields: ['count'],
    valueLabels: ['Number of Tribes'],
    labelKey: 'practice',
  },
}; 