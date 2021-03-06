import React, {PropTypes} from 'react';
import ShowErrors from '../Utilities/ShowErrors';
import { errorPropType } from '../../constants/errorPropType';

export default class FormFieldRadioButtons extends React.Component {

  static propTypes = {
    fieldLabel: PropTypes.string,
    fieldName: PropTypes.string,
    selectValues: PropTypes.arrayOf(PropTypes.string),
    fieldValue: PropTypes.string,
    fieldErrors: PropTypes.arrayOf(errorPropType),
    formRowClass: PropTypes.string,
    onUpdateField: PropTypes.func
  };

  onUpdate = (e) => {
    this.props.onUpdateField(e.target.value);
  }

  renderButton(value, i) {
    return (
      <div key={i} className="form__group form__group--radio">
        <input className="form__radio-btn" type="radio" name={this.props.fieldName} value={value} checked={this.props.fieldValue === value ? 'checked' : false} onChange={this.onUpdate} />
        <span className="form__label form__label--radio">{value}</span>
      </div>
    );
  }

  renderButtons() {
    return this.props.selectValues.map(this.renderButton, this);
  }

  render() {
    return (
        <div className={this.props.formRowClass || "form__row"}>
          {this.props.fieldLabel ? <label htmlFor={this.props.fieldName} className="form__label">{this.props.fieldLabel}</label> : false}
          {this.renderButtons()}
          <ShowErrors errors={this.props.fieldErrors}/>
        </div>
    );
  }
}
