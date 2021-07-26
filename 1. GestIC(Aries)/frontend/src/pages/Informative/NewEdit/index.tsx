import * as React from 'react';
import { Box, Button, Heading, Spinner, Stack, useMediaQuery, Text, useToast } from '@chakra-ui/react';
import { Page } from '../../../components/Page';
import { useHistory, useParams } from 'react-router-dom';
import { api } from '../../../services/api';
import { Controller, useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomInput } from '../../../components/CustomInput';
import { CustomTextarea } from '../../../components/CustomTextarea';

const schema = yup.object().shape({
  title: yup.string().required('Campo obrigatório'),
  content: yup.string().required('Campo obrigatório'),
});

type InformativeFormInputs = {
  id?: string;
  title: string;
  content: string;
};

const InformativeNewEdit = () => {
  const [isLargerThan766] = useMediaQuery('(max-width: 766px)');
  const history = useHistory();
  const { id } = useParams();
  const [oldInformative, setOldInformative] = React.useState<InformativeFormInputs>({});
  const [isLoading, setIsLoading] = React.useState(false);

  const toast = useToast();

  const getInformative = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/informative/${id}`);
      if (data) {
        setOldInformative(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (id) {
      getInformative();
    }
  }, [id]);

  const { handleSubmit, formState, control } = useForm<InformativeFormInputs>({
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const { errors } = formState;
  const onSubmit = async (data: InformativeFormInputs) => {
    try {
      if (id) {
        await api.put('informative', { ...data, id });
      } else {
        await api.post('informative', data);
      }
      toast({
        title: id ? 'Informativo editado com sucesso' : 'Novo informativo criado com sucesso',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
      history.push('/informativos');
    } catch {
      toast({
        title: `Ocorreu um erro ao ${id ? 'editar' : 'criar'} um novo informativo na plataforma`,
        description: 'Tente novamente mais tarde',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  console.log(oldInformative)

  return (
    <Page>
      <Box p={8} pt={isLargerThan766 ? 10 : 8} maxW={isLargerThan766 ? '100%' : '60vw'}>
        <Heading color="teal" mb={6}>
          {id ? 'Editar' : 'Novo'} informativo
        </Heading>
        {!(Object.values(oldInformative).length > 0) && id ? (
          <Box textAlign={isLoading ? 'center' : 'inherit'}>
            {isLoading ? <Spinner color="teal" size="xl" /> : <Text>Não há informativo com esse id.</Text>}
          </Box>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <CustomInput {...field} type="text" placeholder="Título" errorMessage={errors?.title?.message} />
                )}
                defaultValue={oldInformative?.title}
              />

              <Box my={2} />

              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <CustomTextarea
                    {...field}
                    rows={6}
                    type="text"
                    placeholder="Conteúdo"
                    errorMessage={errors?.content?.message}
                    defaultValue={oldInformative?.content}
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
                Adicionar Novo
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Page>
  );
};

export default InformativeNewEdit;
