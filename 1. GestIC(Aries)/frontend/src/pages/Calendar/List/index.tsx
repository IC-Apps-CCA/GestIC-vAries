import * as React from 'react';
import {
  Box,
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  Text,
  Divider,
  Button,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useMediaQuery,
  Center,
  Spinner,
  Link,
  useToast,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { BsSearch, BsTrashFill } from 'react-icons/bs';
import { MdModeEdit } from 'react-icons/md';
import { AddIcon } from '@chakra-ui/icons';
import { Page } from '../../../components/Page';
import { api } from '../../../services/api';
import { useAuth } from '../../../providers/AuthProvider';
import { EventItem } from '../EventItem';

const EventList = () => {
  const [isLargerThan766] = useMediaQuery('(max-width: 766px)');
  const history = useHistory();
  const { user } = useAuth();
  const toast = useToast();

  const [eventList, setEventList] = React.useState([]);
  const [eventListSearch, setEventListSearch] = React.useState([]);
  const [currentEvent, setCurrentEvent] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const getEventList = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/event');
      if (data.length) {
        setEventList(data);
        setEventListSearch(data);
      } else {
        setEventList([]);
        setEventListSearch([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getEventList();
  }, []);

  const handleChange = event => {
    const { value } = event.target;
    if (eventList.length) {
      if (value) {
        const newEventList = eventList.filter(eventItem => {
          return (
            eventItem?.title?.toLowerCase().includes(value.toLowerCase()) ||
            eventItem?.content?.toLowerCase().includes(value.toLowerCase())
          );
        });
        setEventListSearch(newEventList);
      } else {
        setEventListSearch(eventList);
      }
    }
  };

  const clickToRemove = event => {
    setCurrentEvent(event);
    setIsOpen(true);
  };

  const removeEvent = async () => {
    try {
      await api.delete(`/event/${currentEvent.id}`);
      toast({
        title: 'Evento deletado com sucesso',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
      getEventList();
    } catch {
      toast({
        title: 'Ocorreu um erro ao deletar o evento na plataforma',
        description: 'Tente novamente mais tarde',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    } finally {
      onClose();
    }
  };

  return (
    <Page>
      <Box p={8} pt={isLargerThan766 ? 10 : 8}>
        {eventList.length === 0 ? (
          <Center flexDirection="column">
            <Box display="flex" w="100%" mb={4} alignItems="center" justifyContent="center">
              <Heading color="teal" textAlign="center" mr={2}>
                Eventos
              </Heading>
              {!isLoading && user && (
                <Button
                  leftIcon={<AddIcon />}
                  onClick={() => history.push('eventos/new')}
                  colorScheme="teal"
                  variant="outline"
                >
                  Criar novo
                </Button>
              )}
            </Box>
            {isLoading ? <Spinner color="teal" size="xl" /> : <Text>Não há eventos por enquanto.</Text>}
          </Center>
        ) : (
          <>
            <Box
              display="flex"
              mb={10}
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
              // ml={6}
              maxW={isLargerThan766 ? '80vw' : '50vw'}
              margin="auto"
            >
              <Box
                display="flex"
                w="100%"
                mb={4}
                alignItems="center"
                justifyContent={user ? 'space-between' : 'center'}
              >
                <Heading color="teal" textAlign="center" mr={2}>
                  Eventos
                </Heading>
                {user && (
                  <Button
                    leftIcon={<AddIcon />}
                    onClick={() => history.push('eventos/new')}
                    colorScheme="teal"
                    variant="outline"
                  >
                    Criar novo
                  </Button>
                )}
              </Box>
              <Box minW="55%" w="100%">
                <InputGroup color="teal">
                  <Input placeholder="Buscar" bg="white" onChange={handleChange} />
                  <InputRightElement>
                    <BsSearch />
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Box>
            {isLoading ? (
              <Center flexDirection="column" mt={4}>
                <Spinner color="teal" size="xl" />
              </Center>
            ) : (
              <Box maxW="80vh" margin="auto">
                {eventListSearch.map((event, index) => {
                  return (
                    <React.Fragment key={index}>
                      {index !== 0 && <Divider maxW="400px" borderBottomWidth="3px" size="md" m="auto" />}
                      <EventItem event={event} clickToRemove={() => clickToRemove(event)} />
                    </React.Fragment>
                  );
                })}
              </Box>
            )}
          </>
        )}
      </Box>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remover Evento
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja remover o evento <strong>&quot;{currentEvent.title}&quot;</strong>?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={removeEvent}>
                Remover
              </Button>
              <Button ref={cancelRef} onClick={onClose} ml={3}>
                Cancelar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Page>
  );
};

export default EventList;
