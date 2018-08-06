import * as actionTypes from "../actions/actionTypes";
import { ValidatorState, IFilter } from "../../types";
import { updateObject } from "../utility";
import {
  filterValidators,
  distinctDomains,
  groupDomainsByLocation,
  calculateStats
} from "../dataOperations";

const initialState: ValidatorState = {
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
  ready: false
};

const overrideForAutosuggest = {
  verifiedOnly: true,
  unique: true,
  sort: true
};

const filterValidatorsReducer = (state, action) => {
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

const setValidatorsReducer = (state, action) => {
  // original validator data
  const data = <any>action.data;
  const newState = updateObject(state, {
    _validators: data.validators,
    lastUpdated: data.lastUpdated
  });
  return updateObject(
    newState,
    filterValidatorsReducer(newState, { data: data.filter || state.filter })
  );
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_VALIDATORS:
      return setValidatorsReducer(state, action);
    case actionTypes.FILTER_VALIDATORS:
      return filterValidatorsReducer(state, action);
    default:
      return state;
  }
};

export default reducer;
