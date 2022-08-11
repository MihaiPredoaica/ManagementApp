import React, { createContext, useState } from "react";

export const ProjectContext = createContext();

function ProjectProvider({ children }) {
  const [selectedProject, setSelectedProject] = useState({});

  return (
    <ProjectContext.Provider value={{ selectedProject, setSelectedProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export { ProjectProvider };
