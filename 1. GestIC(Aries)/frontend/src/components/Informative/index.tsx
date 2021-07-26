import * as React from 'react';
import { Box, Divider, Heading, Link, Text, Spinner } from '@chakra-ui/react';
import { api } from '../../services/api';
import { InformativeItem } from '../../pages/Informative/Item';

const Informative = () => {
  const [informativeList, setInformativeList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getInformativeList = async () => {
    try {
      const { data } = await api.get('/informative');
      if (data.length) {
        setInformativeList(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getInformativeList();
  }, []);

  const render = () => {
    if (!informativeList.length) {
      if (isLoading) {
        return <Spinner color="teal" size="xl" />;
      }
      return <Text>Não há informativos por enquanto.</Text>;
    }
    return informativeList.map((informative, index) => (
      <React.Fragment key={index}>
        {index !== 0 && <Divider maxW="400px" borderBottomWidth="3px" size="md" m="auto" />}
        <InformativeItem informative={informative} withActions={false} />
      </React.Fragment>
    ));
  };

  return (
    <Box fontSize="xl" w="100%">
      <Box color="teal" mb={4} display="flex" alignItems="center" position="relative" top="25px">
        <Heading width="100%" position="absolute">
          Informativos
        </Heading>
        {!!informativeList.length && (
          <Text fontSize="md" right="0" position="absolute">
            <Link href="informativos">Ver todos</Link>
          </Text>
        )}
      </Box>
      <Box mt={16}>{render()}</Box>
    </Box>
  );
};

export default Informative;
