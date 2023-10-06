import React from 'react';
import { Box } from '@mui/material';
import ControlFilter, { FiltersFormValue } from './ControlFilter';
import { selectLocation, ControlLocationType } from '../../../state/modules/control/controlReducer';

export const FilterMore = ({
  handleOpenLocation,
  filtersFormValue,
  setFiltersFormValue,
  handleClearFilter,
  handleFilter,
}: {
  handleOpenLocation: (localtion: ControlLocationType) => void;
  filtersFormValue: FiltersFormValue;
  setFiltersFormValue: (filtersFormValue: FiltersFormValue) => void;
  handleClearFilter: () => void;
  handleFilter: () => void;
}) => {
  return (
    <Box>
      <ControlFilter
        handleOpenLocation={handleOpenLocation}
        filtersFormValue={filtersFormValue}
        setFiltersFormValue={setFiltersFormValue}
        handleClearFilter={handleClearFilter}
        handleFilter={handleFilter}
      />
    </Box>
  );
};
