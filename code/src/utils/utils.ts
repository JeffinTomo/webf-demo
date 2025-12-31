export const logger = (name, data: any) => {
  console.log(`[points page] ${name}: ${JSON.stringify(data)}`);
};