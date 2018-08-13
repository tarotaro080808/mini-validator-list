import * as actionTypes from "../actions/actionTypes";
import { IFilter, State } from "../../types";
import { updateObject } from "../utility";
import {
  filterValidators,
  distinctDomains,
  groupDomainsByLocation,
  calculateStats
} from "../dataOperations";

const initialState: State.Validator = {
  _validators: undefined,
  filter: {
    defaultOnly: true,
    verifiedOnly: true,
    mainNetOnly: true,
    filterWord: "",
    sort: undefined
  },
  filteredValidators: undefined,
  filteredValidatorsForAutosuggest: undefined,
  uniqueDomains: undefined,
  archives: undefined,
  selectedDefaultUnlId: undefined
};

const overrideForAutosuggest = {
  verifiedOnly: true,
  unique: true,
  sort: true
};

const createArchivesSelectOptions = archives =>
  archives.map(archive => ({
    label: archive.date,
    value: archive
  }));

const filterValidatorsReducer = (state: State.Validator, action) => {
  const filter = <IFilter>action.data;
  const v1 = filterValidators(state._validators, filter, {});
  const v2 = filterValidators(
    state._validators,
    filter,
    overrideForAutosuggest
  );
  const d = distinctDomains(v1);
  const l = groupDomainsByLocation(v1);
  const s = calculateStats(v1, d);
  return updateObject(state, {
    filteredValidators: v1,
    filteredValidatorsForAutosuggest: v2,
    filter: filter,
    stats: s,
    uniqueDomains: d,
    positions: l
  });
};

const setValidatorsReducer = (state: State.Validator, action) => {
  // original validator data
  const data = <any>action.data;
  const archivesSelectOptions = createArchivesSelectOptions(data.archives);

  const newState = updateObject(state, {
    _validators: data.validators,
    archives: data.archives,
    archivesSelectOptions,
    selectedDefaultUnlId: data.selectedDefaultUnlId
      ? data.selectedDefaultUnlId
      : data.archives[0].id,
    lastUpdated: data.lastUpdated
  });
  return updateObject(
    newState,
    filterValidatorsReducer(newState, { data: data.filter || state.filter })
  );
};

const selectDefaultUnlReducer = (state, action) => {
  return updateObject(state, {
    selectedDefaultUnlId: action.data
  });
};

const unselectDefaultUnlReducer = (state: State.Validator) => {
  return updateObject(state, {
    selectedDefaultUnlId: state.archives[0].id
  });
};

const reducer = (state: State.Validator = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_VALIDATORS:
      return setValidatorsReducer(state, action);
    case actionTypes.FILTER_VALIDATORS:
      return filterValidatorsReducer(state, action);
    case actionTypes.DEFAULT_UNL_SELECTED:
      return selectDefaultUnlReducer(state, action);
    case actionTypes.DEFAULT_UNL_UNSELECTED:
      return unselectDefaultUnlReducer(state);
    default:
      return state;
  }
};

export default reducer;
