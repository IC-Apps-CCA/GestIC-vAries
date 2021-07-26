import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useMediaQuery,
  Center,
  Spinner,
} from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../../providers/AuthProvider';
import { Page } from '../../../components/Page';
import { api } from '../../../services/api';
import OfferItem from '../OfferItem';

interface offerData {
  id: string;
  name: string;
  code: string;
  codeClassroom: string;
  linkClassroom: string;
  linkMeets: string;
  linkWpp: string;
  linkTel: string;
}

const OfferShow = () => {
  const [isLargerThan766] = useMediaQuery('(max-width: 766px)');
  const history = useHistory();
  const [offer, setOffer] = useState<offerData>({} as offerData);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const getOffer = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/offer/${id}`);

      setOffer(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOffer();
  }, [id]);

  const clickToRemove = () => {
    setIsOpen(true);
  };

  const removeoffer = async () => {
    await api.delete(`/offer/${offer.id}`);
    onClose();
    history.push('/ofertas-disciplinas');
  };

  return (
    <Page>
      <Box p={8} pt={isLargerThan766 ? 10 : 8}>
        {!(Object.values(offer).length > 0) ? (
          <Center flexDirection="column">
            <Heading color="teal" textAlign="center" mb={6}>
              Disciplina
            </Heading>
            {isLoading ? <Spinner color="teal" size="xl" /> : <Text>Não há disciplina com essa id.</Text>}
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
              <Box display="flex" w="100%" mb={4} alignItems="center" justifyContent="center">
                <Heading color="teal" textAlign="center" mr={2}>
                  Disciplina
                </Heading>
              </Box>
            </Box>
            <Box maxW="80vh" margin="auto">
              <OfferItem offer={offer} clickToRemove={clickToRemove} withActions />
            </Box>
          </>
        )}
      </Box>

      {user && (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Remover Disciplina
              </AlertDialogHeader>

              <AlertDialogBody>
                Tem certeza que deseja remover a disciplina <strong>&quot;{offer.name}&quot;</strong>?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button colorScheme="red" onClick={removeoffer}>
                  Remover
                </Button>
                <Button ref={cancelRef} onClick={onClose} ml={3}>
                  Cancelar
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </Page>
  );
};

export default OfferShow;
