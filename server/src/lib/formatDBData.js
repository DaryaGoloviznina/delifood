exports.formatSendData = (data) => {
  return Object.fromEntries(
    Object.entries(data).filter(
      ([key, value]) =>
        key !== "updatedAt" && key !== "createdAt" && key !== "password"
    )
  );
};

exports.formatToRawSendData = (data) => {
  return data.filter(
      (el) => el.toJSON()
    )
};
