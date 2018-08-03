import * as actionTypes from "../actions/actionTypes";
import { Response, ValidatorList, ValidatorState, IFilter } from "../../types";
import { updateObject } from "../utility";
import { filterValidators, distinctDomains, groupDomainsByLocation } from "../dataOperations";

const initialState: ValidatorState = {
  _validators: undefined,
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
  return updateObject(state, {
    filteredValidators: v1,
    filteredValidatorsForAutosuggest: v2,
    uniqueDomains: d,
    positions: l
  });
};

const setValidatorsReducer = (state, action) => {
  // original validator data
  const data = <Response<ValidatorList>>action.data;
  return updateObject(state, {
    _validators: data.list,
    lastUpdated: data.lastUpdated,
    ready: true
  });
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
