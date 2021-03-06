import React, { PropTypes } from 'react';
import {ManagedForm, ManagedField} from '../../../ManagedEditor';
import FormFieldTextInput from '../../../FormFields/FormFieldTextInput';
import uuidv4 from 'uuid/v4';

export class StoryQuestionsQuestion extends React.Component {
  static propTypes = {
    fieldLabel: PropTypes.string,
    fieldName: PropTypes.string,
    fieldValue: PropTypes.shape({
      questionId: PropTypes.string,
      questionText: PropTypes.string
    }),
    fieldPlaceholder: PropTypes.string,
    onUpdateField: PropTypes.func
  };

  updateQuestion = (questionObject) => {
    const questionWithId = Object.assign({}, questionObject, {
      questionId: questionObject.questionId || uuidv4()
    });

    this.props.onUpdateField(questionWithId);
  }

  render () {
    return (
      <div className="form__field">
        <ManagedForm data={this.props.fieldValue} updateData={this.updateQuestion}>
          <ManagedField fieldLocation="questionText" name="Question">
            <FormFieldTextInput />
          </ManagedField>
        </ManagedForm>
      </div>
    );
  }
}
