export const parse = <T>(payload: string) => {
  return <T>JSON.parse(payload);
};

export const stringify = (payload: any) => {
  return JSON.stringify(payload);
};
