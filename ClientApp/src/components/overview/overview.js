import { Box } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { useRef, useCallback } from "react";
import { useEffect, useContext, useState } from "react";
import Tree from "react-d3-tree";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ProjectContext } from "../../context/ProjectContext";
import useDashboardQuery from "../dashboard/hooks/useDashboardQuery";
import ReactDOM from "react-dom";
import TaskCardClass from "./TaskCardClass";
import useProjectTaskQuery from "../tasksBoard/hooks/useProjectTaskQuery";
import { LoadingSpinner } from "../generalComponents/LoadingSpinner";

export const Overview = () => {
  const [node, setNode] = useState();

  const { setNavBarVisible } = useContext(AuthContext);
  const { setSelectedProject } = useContext(ProjectContext);
  const { id } = useParams();
  const bgColor = useColorModeValue("#d2d4d9", "#0b1437");

  const { project } = useDashboardQuery(id);

  useEffect(() => {
    setNavBarVisible(true);
    setSelectedProject(project);
  }, [setNavBarVisible, setSelectedProject, project]);
  const { projectTasks, projectTasksLoading } = useProjectTaskQuery(id);

  const rootTask = projectTasks?.find((task) => task.parentTaskId === -1);

  const [tree, setTree] = useState({
    name: rootTask?.name,
    attributes: {
      id: rootTask?.id,
      icon: rootTask?.icon,
      estimation: rootTask?.estimation,
      logged: rootTask?.logged,
    },
    children: [],
  });

  const setTreeData = useCallback(
    (node) => {
      const childTasks = projectTasks?.filter(
        (task) => task.parentTaskId === node?.attributes?.id
      );
      let elementsToReturn = [];
      console.log(childTasks, projectTasks, node);
      if (childTasks !== null && childTasks !== undefined) {
        childTasks.forEach((childTask) => {
          const childNode = {
            name: childTask?.name,
            attributes: {
              id: childTask?.id,
              icon: childTask?.icon,
              estimation: childTask?.estimation,
              logged: childTask?.logged,
            },
            children: [],
          };
          childNode.children = setTreeData(childNode);
          elementsToReturn = [...elementsToReturn, childNode];
        });
      }
      // console.log(elementsToReturn);
      return elementsToReturn;
    },
    [projectTasks]
  );

  useEffect(() => {
    const rootNode = {
      name: rootTask?.name,
      attributes: {
        id: rootTask?.id,
        icon: rootTask?.icon,
        estimation: rootTask?.estimation,
        logged: rootTask?.logged,
      },
      children: [],
    };

    console.log(rootNode);
    rootNode.children = setTreeData(rootNode);

    console.log(rootNode);

    setTree(rootNode);
  }, [rootTask, projectTasks, setTree, setTreeData]);

  const handleNodeClick = (datum) => {
    setNode(datum);
  };

  const treeContainerRef = useRef(null);

  var element = ReactDOM.findDOMNode(treeContainerRef?.current);
  var dimensions = element?.getBoundingClientRect();

  const translate = {
    x: dimensions?.width / 2,
    y: dimensions?.height / 2,
  };

  const nodeSize = { x: 400, y: 200 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 20 };

  const renderForeignObjectNode = ({ nodeDatum }) => (
    <g>
      <foreignObject x="-70px" height="120px" width="500px" y="-60px">
        <TaskCardClass
          item={{
            name: nodeDatum?.name,
            type: { icon: nodeDatum?.attributes?.icon },
            estimation: nodeDatum?.attributes?.estimation,
            logged: nodeDatum?.attributes?.logged,
          }}
          nodeDatum={nodeDatum}
        />
      </foreignObject>
    </g>
  );

  if (projectTasksLoading) return <LoadingSpinner />;

  return (
    <Box
      w="100%"
      h="88vh"
      bg={bgColor}
      marginY={3}
      borderWidth="1px"
      borderRadius="xl"
      ref={treeContainerRef}
    >
      <Tree
        orientation={"vertical"}
        data={tree}
        zoomable={true}
        nodeSize={{ x: 400, y: 200 }}
        onNodeClick={handleNodeClick}
        translate={translate}
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
        }
      />
    </Box>
  );
};
