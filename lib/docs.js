import path from 'path';

import { getSortedData, getAllIds, getData } from './helpers'

const docsDirectory = path.join(process.cwd(), '_docs');

export const getSortedDocsData = () => {
  return getSortedData(docsDirectory);
}

export const getAllDocIds = () => {
  return getAllIds(docsDirectory)
}

export const getDocData = async(id) => {
  return await getData(id, docsDirectory)
}