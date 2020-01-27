import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { reduxForm, SubmissionError } from 'redux-form';
import reduxFormResetAfterSubmit from '../forms/reduxFormResetAfterSubmit';
import { cleanGraphqlError } from '../../utils';
import { get } from 'lodash';

import VenueNoteForm from '../../components/admin/VenueNoteForm';
import { VenueNotesQuery } from './VenueNotes';

const addMutation = gql`
  mutation AddNote($venueID: Int!, $text: String!) {
    addVenueNote(venueID: $venueID, text: $text) {
      id
      text
    }
  }
`;

const editMutation = gql`
  mutation EditNote($id: Int!, $text: String!) {
    editVenueNote(id: $id, text: $text) {
      id
      text
    }
  }
`;

const createSucessHandler = (mutationName, onSubmit) => result => {
  if (result && get(result, `data.${mutationName}.id`)) {
    onSubmit && onSubmit(result);
    return result;
  }
  throw new SubmissionError({
    _error:
      result && result.errors && result.errors.length
        ? result.errors.map(error => error.message).join('\n')
        : 'Error Saving'
  });
};

const errorHandler = error => {
  throw new SubmissionError({
    _error: cleanGraphqlError(error)
  });
};

export default compose(
  graphql(addMutation, {
    skip: ({ note }) => !!note,
    props: ({ mutate, ownProps: { note, venueID, onSubmit, resetForm } }) => {
      // Should NOT need this, but skip is not working for some reason!
      if (!!note) {
        return {};
      }
      return {
        form: 'AddVenueNote',
        isNew: true,
        onSubmit: values =>
          mutate({
            variables: { venueID, text: values.text },
            optimisticResponse: {
              __typename: 'Mutation',
              addVenueNote: {
                __typename: 'VenueNote',
                text: values.text,
                id: null
              }
            },
            update: (store, { data: { addVenueNote } }) => {
              if (!addVenueNote) {
                return;
              }
              const variables = { venueID };
              const data = store.readQuery({
                query: VenueNotesQuery,
                variables
              });
              data.venue.notes.push(addVenueNote);
              store.writeQuery({ query: VenueNotesQuery, data, variables });
            }
          }).then(createSucessHandler('addVenueNote', onSubmit), errorHandler)
      };
    }
  }),
  graphql(editMutation, {
    skip: ({ note }) => !note,
    props: ({ mutate, ownProps: { note, onSubmit, resetForm } }) => {
      // Should NOT need this, but skip is not working for some reason!
      if (!note) {
        return {};
      }
      return {
        form: 'EditVenueNote' + note.id,
        isNew: false,
        onSubmit: values =>
          mutate({
            variables: { id: note.id, text: values.text },
            optimisticResponse: {
              __typename: 'Mutation',
              editVenueNote: {
                __typename: 'VenueNote',
                id: note.id,
                text: values.text
              }
            }
          }).then(createSucessHandler('editVenueNote', onSubmit), errorHandler),
        initialValues: note
      };
    }
  }),
  reduxFormResetAfterSubmit({})
)(VenueNoteForm);
