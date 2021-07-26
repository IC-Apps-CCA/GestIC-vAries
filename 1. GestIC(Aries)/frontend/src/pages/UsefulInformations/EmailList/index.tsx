import * as React from 'react';
import { Box, Flex, Heading, Input, InputGroup, InputRightElement, Link, Text, useMediaQuery } from '@chakra-ui/react';
import { Page } from '../../../components/Page';
import { useHistory } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';

const fixedEmails = [
  {
    id: '1',
    name: 'Direção',
    email: 'direcao@ic.ufal.br',
  },
  {
    id: '2',
    name: 'Secretaria',
    email: 'secretaria@ic.ufal.br',
  },
  {
    id: '3',
    name: 'Coordenação de Ciência da Computação',
    email: 'coordenacao.cc@ic.ufal.br',
  },
  {
    id: '4',
    name: 'Coordenação de Engenharia de Computação',
    email: 'coordenacao.ec@ic.ufal.br',
  },
];

const EmailListPage = () => {
  const [isSmallerThan766] = useMediaQuery('(max-width: 766px)');
  const history = useHistory();

  const [fixedEmailList, setFixedEmailList] = React.useState(fixedEmails);
  const [fixedEmailListSearch, setFixedEmailListSearch] = React.useState(fixedEmails);
  const [emailList, setEmailList] = React.useState([]);
  const [emailListSearch, setEmailListSearch] = React.useState([]);

  const getEmailList = async () => {
    try {
      // const { data } = await api.get('/informative');
      // if (data.length) {
      //   setEmailList(data || []);
      //   setEmailListSearch(data || []);
      // }
      setEmailList(fixedEmails);
      setEmailListSearch(fixedEmails);
    } catch (err) {
      console.error(err);
    } finally {
      // setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getEmailList();
  }, []);

  const handleChange = event => {
    const { value } = event.target;
    if (fixedEmailList.length) {
      if (value) {
        const newfixedEmailList = fixedEmailList.filter(currentFixedEmail => {
          return (
            currentFixedEmail?.name?.toLowerCase().includes(value.toLowerCase()) ||
            currentFixedEmail?.email?.toLowerCase().includes(value.toLowerCase())
          );
        });
        setFixedEmailListSearch(newfixedEmailList);

        const newEmailList = emailList.filter(currentEmail => {
          return (
            currentEmail?.name?.toLowerCase().includes(value.toLowerCase()) ||
            currentEmail?.email?.toLowerCase().includes(value.toLowerCase())
          );
        });
        setEmailListSearch(newEmailList);
      } else {
        setFixedEmailListSearch(fixedEmailList);
        setEmailListSearch(emailList);
      }
    }
  };

  return (
    <Page>
      <Box p={8} pt={isSmallerThan766 ? 10 : 8} maxW={isSmallerThan766 ? '100%' : '60vw'}>
        <Heading color="teal">Lista de E-mails do IC</Heading>
        <Box minW="55%" w="100%" my={4}>
          <InputGroup color="teal">
            <Input placeholder="Procurar e-mail" bg="white" onChange={handleChange} />
            <InputRightElement>
              <BsSearch />
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box color="teal">
          {fixedEmailListSearch.length ? (
            fixedEmailListSearch.map(currentItem => (
              <>
                <Flex flexDirection={isSmallerThan766 ? 'column': 'row'}>
                  <Text fontWeight="bolder" mr={2}>
                    {currentItem.name}:
                  </Text>
                  <Link href={`mailto:${currentItem.email}`}>{currentItem.email}</Link>
                </Flex>
              </>
            ))
          ) : (
            <></>
          )}
        </Box>
        <Box color="teal">
          {emailListSearch.length ? (
            <>
              <Heading size="md" my={4}>
                Docentes
              </Heading>
              {emailListSearch.map(currentItem => (
                <>
                  <Flex flexDirection={isSmallerThan766 ? 'column': 'row'}>
                    <Text fontWeight="bolder" mr={2}>
                      {currentItem.name}:
                    </Text>
                    <Link href={`mailto:${currentItem.email}`}>{currentItem.email}</Link>
                  </Flex>
                </>
              ))}
            </>
          ) : (
            <Box>Não há algum pessoa ou email com esse nome.</Box>
          )}
        </Box>
      </Box>
    </Page>
  );
};

export default EmailListPage;
