import {
  Stack,
  useColorModeValue,
  Button,
  Flex,
  Icon,
  Text,
  Link,
} from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ProjectContext } from "../../context/ProjectContext";
import { LoadingSpinner } from "../generalComponents/LoadingSpinner";
import useDashboardQuery from "./hooks/useDashboardQuery";
import { PageHeader } from "./PageHeader";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { GoTasklist } from "react-icons/go";

export const Dashboard = () => {
  const { setNavBarVisible } = useContext(AuthContext);
  const { setSelectedProject } = useContext(ProjectContext);
  const { id } = useParams();
  const buttonsColor = useColorModeValue("#cacafe", "#0b1437");

  const { project, projectLoading } = useDashboardQuery(id);

  useEffect(() => {
    setNavBarVisible(true);
    setSelectedProject(project);
  }, [setNavBarVisible, setSelectedProject, project]);

  if (projectLoading) return <LoadingSpinner />;

  return (
    <Stack>
      <PageHeader showProjectSettingsButton={true} project={project} />
      <Flex>
        <Link
          margin={3}
          size="md"
          height="300px"
          width="50%"
          href={`/tasks/${id}` ?? "#"}
          style={{ textDecoration: "none" }}
          _focus={{ boxShadow: "none" }}
        >
          <Button
            bg={buttonsColor}
            size="md"
            height="300px"
            width="100%"
            borderWidth="1px"
            borderRadius="xl"
          >
            <Stack>
              <Icon
                fontSize="100"
                _groupHover={{
                  color: "white",
                }}
                as={GoTasklist}
              />
              <Text fontSize="2xl">Tasks</Text>
            </Stack>
          </Button>
        </Link>
        <Link
          margin={3}
          size="md"
          height="300px"
          width="50%"
          href={`/overview/${id}` ?? "#"}
          style={{ textDecoration: "none" }}
          _focus={{ boxShadow: "none" }}
        >
          <Button
            bg={buttonsColor}
            size="md"
            height="300px"
            width="100%"
            borderWidth="1px"
            borderRadius="xl"
          >
            <Stack>
              <Icon
                fontSize="100"
                _groupHover={{
                  color: "white",
                }}
                as={VscTypeHierarchySub}
              />
              <Text fontSize="2xl">Overview</Text>
            </Stack>
          </Button>
        </Link>
      </Flex>
    </Stack>
  );
};
