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
  description: yup.string().required('Campo obrigatório'),
  activities: yup.string().required('Campo obrigatório'),
});

type ResearchGroupsFormInputs = {
  id?: string;
  name: string;
  description: string;
  activities: string;
};

const GruposPesquisaNewEdit = () => {
  const { handleSubmit, formState, control, reset } = useForm<ResearchGroupsFormInputs>({
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const [isLargerThan766] = useMediaQuery('(max-width: 766px)');
  const history = useHistory();
  const { id } = useParams();
  // const [oldResearchGroup, setOldResearchGroup] = React.useState<ResearchGroupsFormInputs>({});
  const [isLoading, setIsLoading] = React.useState(false);

  const toast = useToast();

  const getResearchGroup = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/research/${id}`);
      reset(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (id) {
      getResearchGroup();
    }
  }, [id]);

  const { errors } = formState;

  const onSubmit = async (data: ResearchGroupsFormInputs) => {
    try {
      if (id) {
        await api.put('research', { ...data, id });
      } else {
        await api.post('research', data);
      }
      toast({
        title: id ? 'Grupo de pesquisa editado com sucesso' : 'Novo grupo de pesquisa criado com sucesso',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
      history.push('/grupos-de-pesquisa');
    } catch {
      toast({
        title: `Ocorreu um erro ao ${id ? 'editar' : 'criar'} um novo grupo de pesquisa na plataforma`,
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
          {id ? 'Editar' : 'Novo'} informativo
        </Heading>
        {isLoading && id ? (
          <Box textAlign={isLoading ? 'center' : 'inherit'}>
            {isLoading ? <Spinner color="teal" size="xl" /> : <Text>Não há informativo com esse id.</Text>}
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
                // defaultValue={oldResearchGroup?.name}
              />

              <Box my={2} />

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <CustomTextarea
                    {...field}
                    rows={6}
                    type="text"
                    placeholder="Descrição"
                    errorMessage={errors?.description?.message}
                    // defaultValue={oldResearchGroup?.description}
                  />
                )}
              />

              <Controller
                name="activities"
                control={control}
                render={({ field }) => (
                  <CustomTextarea
                    {...field}
                    rows={6}
                    type="text"
                    placeholder="Atividades"
                    errorMessage={errors?.activities?.message}
                    // defaultValue={oldResearchGroup?.activities}
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
                {!id ? 'Adicionar Novo' : 'Editar grupo'}
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Page>
  );
};

export default GruposPesquisaNewEdit;
