import * as React from 'react';
import { Box, Button, Heading, Spinner, Stack, useMediaQuery, Text, useToast } from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router-dom';
import { Controller, useForm, useFormContext } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from '../../../services/api';
import { Page } from '../../../components/Page';
import { CustomInput } from '../../../components/CustomInput';
import { CustomTextarea } from '../../../components/CustomTextarea';

const schema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  code: yup.string().required('Campo obrigatório'),
  codeClassroom: yup.string().required('Campo obrigatório'),
  linkClassroom: yup.string().required('Campo obrigatório'),
  linkMeets: yup.string().required('Campo obrigatório'),
  linkWpp: yup.string().required('Campo obrigatório'),
  linkTel: yup.string().required('Campo obrigatório'),
});

type OfferFormInputs = {
  id?: string;
  name: string;
  code: string;
  codeClassroom: string;
  linkClassroom: string;
  linkMeets: string;
  linkWpp: string;
  linkTel: string;
};

const OfferEdit = () => {
  const { handleSubmit, formState, control, reset } = useForm<OfferFormInputs>({
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const [isLargerThan766] = useMediaQuery('(max-width: 766px)');
  const history = useHistory();
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);

  const toast = useToast();

  const getOffer = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/offer/${id}`);
      reset(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (id) {
      getOffer();
    }
  }, [id]);

  const { errors } = formState;

  const onSubmit = async (data: OfferFormInputs) => {
    try {
      if (id) {
        await api.put('/offer', { ...data, id });
      } else {
        await api.post('/offer', data);
      }
      toast({
        title: id ? 'Oferta editada com sucesso' : 'Nova oferta criado com sucesso',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
      history.push('/ofertas-disciplinas');
    } catch {
      toast({
        title: `Ocorreu um erro ao ${id ? 'editar' : 'criar'} uma nova oferta na plataforma`,
        description: 'Tente novamente mais tarde',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  return (
    <Page>
      <Box p={8} pt={isLargerThan766 ? 10 : 8} maxW={isLargerThan766 ? '100%' : '60vw'}>
        <Heading color="teal" mb={6}>
          {id ? 'Editar' : 'Novo'} Oferta
        </Heading>
        {isLoading && id ? (
          <Box textAlign={isLoading ? 'center' : 'inherit'}>
            {isLoading ? <Spinner color="teal" size="xl" /> : <Text>Não há oferta com esse id.</Text>}
          </Box>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <CustomInput {...field} type="text" placeholder="Nome" errorMessage={errors?.name?.message} />
                )}
              />
              <Box my={2} />
              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <CustomTextarea
                    {...field}
                    rows={1}
                    type="text"
                    placeholder="Código"
                    errorMessage={errors?.code?.message}
                  />
                )}
              />
              <Controller
                name="codeClassroom"
                control={control}
                render={({ field }) => (
                  <CustomTextarea
                    {...field}
                    rows={1}
                    type="text"
                    placeholder="Código Classroom"
                    errorMessage={errors?.codeClassroom?.message}
                  />
                )}
              />
              <Controller
                name="linkClassroom"
                control={control}
                render={({ field }) => (
                  <CustomTextarea
                    {...field}
                    rows={1}
                    type="text"
                    placeholder="Link classroom"
                    errorMessage={errors?.linkClassroom?.message}
                  />
                )}
              />

              <Controller
                name="linkMeets"
                control={control}
                render={({ field }) => (
                  <CustomTextarea
                    {...field}
                    rows={1}
                    type="text"
                    placeholder="Link Meet"
                    errorMessage={errors?.linkMeets?.message}
                  />
                )}
              />
              <Controller
                name="linkWpp"
                control={control}
                render={({ field }) => (
                  <CustomTextarea
                    {...field}
                    rows={1}
                    type="text"
                    placeholder="Link Whatsapp"
                    errorMessage={errors?.linkWpp?.message}
                  />
                )}
              />
              <Controller
                name="linkTel"
                control={control}
                render={({ field }) => (
                  <CustomTextarea
                    {...field}
                    rows={1}
                    type="text"
                    placeholder="Link Telegram"
                    errorMessage={errors?.linkTel?.message}
                  />
                )}
              />
            </Stack>

            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={formState.isSubmitting}
                type="submit"
                alignSelf="end"
                disabled={Object.values(errors).length > 0}
              >
                {!id ? 'Adicionar Nova' : 'Editar oferta'}
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Page>
  );
};

export default OfferEdit;
