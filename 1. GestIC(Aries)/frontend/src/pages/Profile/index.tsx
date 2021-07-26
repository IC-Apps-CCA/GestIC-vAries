import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { useToast, Box, Button, Stack } from '@chakra-ui/react';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useHistory } from 'react-router-dom';

import * as E from './styles';
import { CustomInput } from '../../components/CustomInput';
import { Page } from '../../components/Page';
import { api } from '../../services/api';

import { useAuth } from '../../providers/AuthProvider';

const schema = yup.object().shape({
  name: yup.string(),
  surname: yup.string(),
  old_password: yup.string(),
  password: yup.string().when('old_password', {
    is: (val: string) => {
      return !!val.length;
    },
    then: yup.string().required('Campo obrigátorio'),
    otherwise: yup.string(),
  }),
  password_confirmation: yup
    .string()
    .when('old_password', {
      is: (val: string) => {
        return !!val.length;
      },
      then: yup.string().required('Campo obrigátorio'),
      otherwise: yup.string(),
    })
    .oneOf([yup.ref('password')], 'Confirmação incorreta'),
});

type ProfileFormInputs = {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
};

const Profile = () => {
  const { handleSubmit, formState, control } = useForm<ProfileFormInputs>({
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const toast = useToast();

  const history = useHistory();

  const { user, updateUser } = useAuth();

  const { errors } = formState;

  const onSubmit = async (data: ProfileFormInputs) => {
    try {
      const response = await api.put('/user', {
        id: user.id,
        name: data.name,
        old_password: data.old_password,
        new_password: data.password,
      });

      updateUser(response.data);
      history.push('/');

      toast({
        title: 'Alterações realizadas com sucesso',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
    } catch {
      toast({
        title: 'Ocorreu um erro ao alterar os dados na plataforma',
        description: 'Tente novamente mais tarde',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  return (
    <Page>
      <E.Container>
        <E.Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                name="name"
                control={control}
                defaultValue={user.name}
                render={({ field }) => (
                  <CustomInput {...field} type="text" placeholder="Nome" errorMessage={errors?.name?.message} />
                )}
              />

              <Box my={2} />

              <Box my={2} />

              <Box my={2} />

              <Controller
                name="old_password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    type="password"
                    name="old_password"
                    placeholder="Senha antiga"
                    errorMessage={errors?.old_password?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    type="password"
                    name="password"
                    placeholder="Nova senha"
                    errorMessage={errors?.password?.message}
                  />
                )}
              />

              <Controller
                name="password_confirmation"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirmação da senha"
                    errorMessage={errors?.password_confirmation?.message}
                  />
                )}
              />
            </Stack>

            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
              <Button
                mt={7}
                width="100%"
                colorScheme="teal"
                isLoading={formState.isSubmitting}
                type="submit"
                display="flex"
                alignSelf="end"
                disabled={Object.values(errors).length > 0}
              >
                Confirmar mudanças
              </Button>
            </Box>
          </form>
        </E.Box>
      </E.Container>
    </Page>
  );
};

export default Profile;
