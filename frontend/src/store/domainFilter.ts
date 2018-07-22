export default (validatorList: any[], state: any, options: any) => {
  const domainHashMap = {};
  validatorList = validatorList.reduce((prev, curr) => {
    if (curr.domain && !domainHashMap[curr.domain] && curr.ip) {
      domainHashMap[curr.domain] = true;
      prev.push(curr);
    }
    return prev;
  }, []);

  return validatorList;
};
