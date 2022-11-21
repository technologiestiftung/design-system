import { createContext, useContext } from 'react';
import path from 'path';
import fs from 'fs';


const docsDirectory = path.join(process.cwd(), '_docs');
export const getAllIds = () => {
  const fileNames = fs.readdirSync(docsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.mdx?$/, ''),
      },
    };
  });
}


export async function getStaticProps() {
  const allDocsData = getAllIds(docsDirectory);

  console.log("ALL",allDocsData)

  return {
    props: {
      allDocsData,
      allComponentsData
    },
  };
}

const NavigationContext = createContext();

export function NavigationContextProvider({ children, allDocsData,
  allComponentsData }) {

  const docsData = getAllIds(docsDirectory);
  console.log("UPDATEDOCS", docsData)

  const navigationState = {
    allDocsData,
    allComponentsData
}
  

  return (
    <NavigationContext.Provider value={navigationState}>
      {children}
    </NavigationContext.Provider>
  );
}
export function useNavigationContext() {
  return useContext(NavigationContext);
}