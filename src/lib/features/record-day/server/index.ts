export const recordDayForm = async (e: ServerLoadEvent) => {
  return await superValidate(zod());
};
