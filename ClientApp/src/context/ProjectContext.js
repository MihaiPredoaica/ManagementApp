import React, { createContext, useState } from "react";

export const ProjectContext = createContext();

function ProjectProvider({ children }) {
  const [selectedProject, setselectedProject] = useState({});

  return (
    <ProjectContext.Provider value={{ selectedProject, setselectedProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export { ProjectProvider };
