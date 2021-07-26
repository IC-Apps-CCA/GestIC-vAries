import * as React from 'react';
import {
  Box,
  Button,
  Heading,
  Spinner,
  Stack,
  useMediaQuery,
  Text,
  useToast,
  FormControl,
  FormLabel,
  SimpleGrid,
  Checkbox,
} from '@chakra-ui/react';
import { Page } from '../../../components/Page';
import { useHistory, useParams } from 'react-router-dom';
import { api } from '../../../services/api';
import { Controller, useForm } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomInput } from '../../../components/CustomInput';
import { CustomTextarea } from '../../../components/CustomTextarea';
import DatePicker from 'react-date-picker';

const schema = yup.object().shape({
  title: yup.string().required('Campo obrigatório'),
  startDate: yup.string().required('Campo obrigatório'),
});

type EventFormInputs = {
  id?: string;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  allDay: boolean;
};

const EventNewEdit = () => {
  const [isLargerThan766] = useMediaQuery('(max-width: 766px)');
  const history = useHistory();
  const { id } = useParams();
  const [oldEvent, setOldEvent] = React.useState<EventFormInputs>({});
  const [isLoading, setIsLoading] = React.useState(false);

  const toast = useToast();

  const getEvent = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get(`/event/${id}`);
      if (data) {
        setOldEvent(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (id) {
      getEvent();
    }
  }, [id]);

  const { handleSubmit, formState, control, watch } = useForm<EventFormInputs>({
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const { errors } = formState;
  const onSubmit = async (data: EventFormInputs) => {
    console.log(data)
    // try {
    //   if (id) {
    //     await api.put('event', { ...data, id });
    //   } else {
    //     await api.post('event', data);
    //   }
    //   toast({
    //     title: id ? 'Evento editado com sucesso' : 'Novo evento criado com sucesso',
    //     status: 'success',
    //     position: 'top-right',
    //     isClosable: true,
    //   });
    //   history.push('/eventos');
    // } catch {
    //   toast({
    //     title: `Ocorreu um erro ao ${id ? 'editar' : 'criar'} um novo evento na plataforma`,
    //     description: 'Tente novamente mais tarde',
    //     status: 'error',
    //     position: 'top-right',
    //     isClosable: true,
    //   });
    // }
  };

  return (
    <Page>
      <Box p={8} pt={isLargerThan766 ? 10 : 8} maxW={isLargerThan766 ? '100%' : '60vw'}>
        <Heading color="teal" mb={6}>
          {id ? 'Editar' : 'Novo'} evento
        </Heading>
        {!(Object.values(oldEvent).length > 0) && id ? (
          <Box textAlign={isLoading ? 'center' : 'inherit'}>
            {isLoading ? <Spinner color="teal" size="xl" /> : <Text>Não há evento com esse id.</Text>}
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
                defaultValue={oldEvent?.title}
              />

              <Box my={2} />

              <SimpleGrid columns={[1, null, 3]} spacingX={4}>
                <FormControl>
                  <FormLabel>Data Inicial</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        // rows={6}
                        // type="text"
                        // placeholder="Conteúdo"
                        // errorMessage={errors?.content?.message}
                        // defaultValue={oldEvent?.content}
                      />
                    )}
                    defaultValue={oldEvent?.startDate}
                    name="startDate"
                    control={control}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Data Final</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <DatePicker
                        {...field}

                        // rows={6}
                        // type="text"
                        // placeholder="Conteúdo"
                        // errorMessage={errors?.content?.message}
                        // defaultValue={oldEvent?.content}
                      />
                    )}
                    defaultValue={oldEvent?.endDate}
                    name="endDate"
                    control={control}
                  />
                </FormControl>

                <FormControl display="flex">
                  <Controller
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        errorMessage={errors?.allDay?.message}
                        defaultValue={oldEvent?.allDay}
                      >
                        É o dia inteiro?
                      </Checkbox>
                    )}
                    defaultValue={oldEvent?.allDay}
                    name="allDay"
                    control={control}
                  />
                </FormControl>
              </SimpleGrid>

              <Box my={2} />

              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <CustomTextarea
                    {...field}
                    rows={6}
                    type="text"
                    placeholder="Informações"
                    errorMessage={errors?.content?.message}
                    defaultValue={oldEvent?.content}
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

export default EventNewEdit;
