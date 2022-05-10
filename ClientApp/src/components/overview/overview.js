import { Box, Stack, Container, Center } from "@chakra-ui/layout";
import React from 'react';
import { useState } from "react";
import Tree from "react-d3-tree";

export const Overview = () => {
  const [tree, setTree] = useState({
    name: "Root",
    attributes: {
      id: "411d9783-85ba-41e5-a6a3-5e1cca3d294f",
    },
    children: [
      {
        name: "Root 1.1",
        attributes: {
          id: "411d9783-85ba-41e5-a6a3-5e1cca3d294f2",
        },
        children: [],
      },
      {
        name: "Root 1.2",
        attributes: {
          id: "411d9783-85ba-41e5-a6a3-5e1cca3d294f3",
        },
        children: [],
      },
      {
        name: "Root 1.2",
        attributes: {
          id: "411d9783-85ba-41e5-a6a3-5e1cca3d294f4",
        },
        children: [],
      },
      {
        name: "Root 1.2",
        attributes: {
          id: "411d9783-85ba-41e5-a6a3-5e1cca3d294f5",
        },
        children: [],
      },
      {
        name: "Root 1.2",
        attributes: {
          id: "411d9783-85ba-41e5-a6a3-5e1cca3d294f6",
        },
        children: [],
      },
      {
        name: "Root 1.2",
        attributes: {
          id: "411d9783-85ba-41e5-a6a3-5e1cca3d294f7",
        },
        children: [],
      },
    ],
  });
  const [node, setNode] = useState();

  const close = () => setNode(undefined);

  const handleNodeClick = (datum) => {
    setNode(datum);
  };

  const renderRectSvgNode = (customProps, click) => {
    const { nodeDatum } = customProps;

    return (
      <g>
        <circle r="15" fill={"#777"} onClick={() => click(nodeDatum)} />
        <text fill="black" strokeWidth="0.5" x="20" y="-5">
          {nodeDatum.name}
        </text>
      </g>
    );
  };

  return (

      <Box w="100%" h="83vh" bg={"gray.100"} marginY={10} >
        <Tree
          orientation={"vertical"}
          data={tree}
          zoomable={true}
          onNodeClick={handleNodeClick}
          translate={{
            x: 900,
            y: 200,
          }}
          renderCustomNodeElement={(nodeInfo) =>
            renderRectSvgNode(nodeInfo, handleNodeClick)
          }
        />
      </Box>
  );
}
