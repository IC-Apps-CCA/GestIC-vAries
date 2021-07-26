import * as React from 'react';
import { Box, Table, Tr, Td, Tbody, Heading, Text, IconButton, Center } from '@chakra-ui/react';
import { MdModeEdit } from 'react-icons/md';
// import { useHistory } from 'react-router-dom';
import { BsTrashFill } from 'react-icons/bs';
import { useAuth } from '../../../providers/AuthProvider';

interface projectData {
  id: string;
  userId: string;
  name: string;
  description: string;
  researchType: string;
  participants: {
    name: string;
  }[];
  activities: string;
}

interface PropsProjectItem {
  project: projectData;
  withActions: boolean;
  clickToRemove(): void;
}

const ProjectItem: React.FC<PropsProjectItem> = ({ project, clickToRemove = () => {}, withActions = true }) => {
  // const history = useHistory();
  const { user } = useAuth();

  // const goToPage = (id: string | number) => {
  //   history.push(`projetos-ativos/show/${id}`);
  // };

  return (
    <Box mt={4} mb={8}>
      <Box mb={3} display="flex" alignItems="center" justifyContent="space-between">
        <Center flexDirection="column">
          <Heading color="black" textAlign="center" mb={6}>
            {project.name}
          </Heading>
        </Center>

        {user && withActions && (
          <Box>
            <IconButton variant="outline" colorScheme="blue" aria-label="Editar" mr={2} icon={<MdModeEdit />} />
            <IconButton
              variant="outline"
              colorScheme="red"
              aria-label="Remover"
              onClick={clickToRemove}
              icon={<BsTrashFill />}
            />
          </Box>
        )}
      </Box>

      <Box mt={2} textAlign="left">
        <Text fontSize="22px">{project.description}</Text>
      </Box>

      <Box mt={3} textAlign="left">
        <Text fontSize="18px">
          <b>Tipo de pesquisa: </b>
          {project.researchType}
        </Text>
      </Box>

      <Box mt={3} textAlign="left">
        <Text fontSize="18px">
          <b>Atividades e objetivos: </b>
          {project.activities}
        </Text>
      </Box>

      <Box mt={3} textAlign="left">
        <Text fontSize="18px">
          <div>
            <b>Participantes: </b>
          </div>
          {project.participants && project.participants.length !== 0 ? (
            <Table variant="simple">
              <Tbody>
                {project.participants.map(student => {
                  return (
                    <Tr key={student.name}>
                      <Td>{student.name}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          ) : (
            <Text>Não há alunos participando deste projeto ainda.</Text>
          )}
        </Text>
      </Box>
    </Box>
  );
};

export default ProjectItem;
