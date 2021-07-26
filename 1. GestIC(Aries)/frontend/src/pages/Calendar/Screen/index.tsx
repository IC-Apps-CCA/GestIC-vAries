import * as React from 'react';
import { Box, Button, Heading, Link, useMediaQuery } from '@chakra-ui/react';
import { Page } from '../../../components/Page';
import { api } from '../../../services/api';
import { useHistory } from 'react-router';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { AddIcon } from '@chakra-ui/icons';
import { useAuth } from '../../../providers/AuthProvider';

const localizer = momentLocalizer(moment);

const CalendarPage = () => {
  const [isLargerThan766] = useMediaQuery('(max-width: 766px)');
  const { user } = useAuth();

  const history = useHistory();
  const [eventList, setEventList] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  const getEventList = async () => {
    // try {
    //   const { data } = await api.get('/event');
    //   if (data.length) {
    //     setEventList(data || []);
    //     setEventListSearch(data || []);
    //   }
    // } catch (err) {
    //   console.error(err);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  React.useEffect(() => {
    getEventList();
  }, []);

  return (
    <Page>
      <Box p={8} pt={isLargerThan766 ? 10 : 8} mb={16}>
        <Heading color="teal" textAlign="center" mr={2}>
          Calendário
        </Heading>
        {user && (
          <Button
            mt={4}
            leftIcon={<AddIcon />}
            onClick={() => history.push('eventos/new')}
            colorScheme="teal"
            variant="outline"
          >
            Criar evento
          </Button>
        )}
        <Box mt={10}>
          <Calendar
            localizer={localizer}
            events={eventList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </Box>
        <Box mt={8} color="teal">
          <Link href="/eventos">Ver lista e pesquisar por todos os eventos</Link>
        </Box>
      </Box>
    </Page>
  );
};

export default CalendarPage;
