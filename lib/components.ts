import path from 'path';

import { getSortedData, getAllIds, getData } from './helpers'

const componentLibraryDirectory = path.join(process.cwd(), '_components');

export const getSortedComponentsData = () => {
  return getSortedData(componentLibraryDirectory);
}

export const getAllComponentIds = () => {
  return getAllIds(componentLibraryDirectory)
}

export const getComponentData = async(id) => {
  return await getData(id, componentLibraryDirectory)
}