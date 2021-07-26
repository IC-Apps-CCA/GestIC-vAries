import * as React from 'react';
import { Link, useToast, Box, Button, Stack } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';
import { useForm, Controller } from 'react-hook-form';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import * as E from './styles';
import { CustomInput } from '../../components/CustomInput';
import { Page } from '../../components/Page';

const schema = yup.object().shape({
  email: yup.string().email('Digite um email válido').required('Email é obrigatório'),
});

type ForgotPasswordFormInputs = {
  email: string;
};

const ForgotPassword = () => {
  const { handleSubmit, formState, control } = useForm<ForgotPasswordFormInputs>({
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const toast = useToast();

  const { errors } = formState;

  const onSubmit = (data: ForgotPasswordFormInputs) => {
    console.log(data);
    try {
      // api.post()
      //
      toast({
        title: 'Foi enviado um email para prosseguir com a troca de senha',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
    } catch {
      toast({
        title: 'Ocorreu um erro ao enviar o email para troca de senha',
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
                name="email"
                control={control}
                render={({ field }) => (
                  <CustomInput {...field} type="email" placeholder="E-mail" errorMessage={errors?.email?.message} />
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
                Recuperar
              </Button>

              <Link color="teal.500" href="/" mt={5} display="flex" alignItems="center" justifyContent="center">
                <FiArrowLeft />
                Voltar para pagina inicial
              </Link>
            </Box>
          </form>
        </E.Box>
      </E.Container>
    </Page>
  );
};

export default ForgotPassword;
