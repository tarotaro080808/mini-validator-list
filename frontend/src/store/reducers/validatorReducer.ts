import * as actionTypes from "../actions/actionTypes";
import { Response, ValidatorList, ValidatorState, IFilter } from "../../types";
import { updateObject } from "../utility";
import applyValidatorFilter from "../validatorFilter";
import applyDomainFilter from "../domainFilter";

const initialState: ValidatorState = {
  _validators: undefined,
  filteredValidators: undefined,
  filteredValidatorsForAutosuggest: undefined,
  domainStats: undefined,
  ready: false
};

const overrideForAutosuggest = {
  verifiedOnly: true,
  unique: true,
  sort: true
};

const filterValidators = (state, action) => {
  const filter = <IFilter>action.data;
  const v1 = applyValidatorFilter(state._validators, filter, {});
  const v2 = applyValidatorFilter(
    state._validators,
    filter,
    overrideForAutosuggest
  );
  const d = applyDomainFilter(v1, {}, {});
  return updateObject(state, {
    filteredValidators: v1,
    filteredValidatorsForAutosuggest: v2,
    domainStats: d
  });
};

const setValidators = (state, action) => {
  // original validator data
  const data = <Response<ValidatorList>>action.data;
  // fitlered validators with default filter
  const defaultFilter: IFilter = {
    defaultOnly: true,
    verifiedOnly: true,
    mainNetOnly: true,
    sort: false,
    filterWord: ""
  };
  const v1 = applyValidatorFilter(data.list, defaultFilter, {});
  const v2 = applyValidatorFilter(
    data.list,
    defaultFilter,
    overrideForAutosuggest
  );
  const d = applyDomainFilter(v1, {}, {});
  return updateObject(state, {
    _validators: data.list,
    lastUpdated: data.lastUpdated,
    filteredValidators: v1,
    filteredValidatorsForAutosuggest: v2,
    domainStats: d,
    ready: true
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_VALIDATORS:
      return setValidators(state, action);
    case actionTypes.FILTER_VALIDATORS:
      return filterValidators(state, action);
    default:
      return state;
  }
};

export default reducer;
