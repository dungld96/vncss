export const downloadCSV = (csv: any, filename: string) => {
  const link = document.createElement('a');
  link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csv));
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const escapeDangerousCSVCharacters = (data: any) => {
  if (typeof data === 'string') {
    // Places single quote before the appearance of dangerous characters if they
    // are the first in the data string.
    return data.replace(/^\+|^/g, `$&`);
  }
  return data;
};

export const replaceDoubleQuoteInString = (columnData: any) =>
  typeof columnData === 'string' ? columnData.replace(/"/g, '""') : columnData;
