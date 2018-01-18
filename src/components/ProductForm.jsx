import React, { Component } from "react"
import Actions              from "../Actions"
import validation           from "../util/validation"
import normalize            from "../util/normalize";
import { reduxForm, Field } from "redux-form"
import { IDS              } from "../constants/Categories"
import { CC_LICENSE       } from "../constants/URLs"
import { PRODUCT	  } from "../constants/Form"

/* const DataTemplateTemplate = {
  Explanation: 

*/

/*
const EffectTemplate = {
  FieldName: EffectID
  Explanation: "EffectID is filled by the system"   

  FieldName: EffectName
  VariableType: string
  Explanation: "Please enter the name of the product or service"

  FieldName: EffectDescription
    FieldName: EffectDescText
    VariableType: text

    FieldName: EffectDescLanguage
    VariableType: string

  FieldName: EffectOriginID
  VariableType: string
  Explanation: "Please enter the PlaceID of the producer or service provider"
  EffectSpec
    FieldName: EffectSpecCharacteristic
    FieldName: EffectSpecScore
    FieldName: EffectSpecUnit
*/

 
const errorMessage = ({meta}) =>
  meta.error && meta.touched
    ? <div className="err">{meta.error}</div>
    : null

class Form extends Component {

  render() {

    const { isEdit } = this.props;

    return (
    <form
      className = "add-entry-form"
      action    = 'javascript:void();' >

      <h3>{isEdit ? "Produkt bearbeiten" : "Neues Produkt"}</h3>
      { this.props.error &&
        <div className= "err">
          Der Eintrag konnte nicht gespeichert werden: {this.props.error.message}
        </div>
      }
      { (!this.props.error) && this.props.submitFailed &&
        <div className="err">Bitte überprüfen Sie ihre Eingaben!
          <Field name="EffectLicense" component={errorMessage} />
        </div>
      }
      <div className= "pure-form">
        <fieldset>

          <Field
            name="EffectName"
            required={true}
            className="pure-input-1"
            type="text"
            component="input"
            placeholder="Produktname" />

          <Field
            name="EffectName"
            component={errorMessage} />

          <Field name="EffectDescription" className="pure-input-1" component="textarea" placeholder="Produkt-Beschreibung"  />
          <Field name="EffectDescription" component={errorMessage} />

        </fieldset>

        <fieldset>
          <Field
            name="EffectTags"
            required={true}
            className="pure-input-1"
            component="input"
            placeholder="Stichworte (Komma getrennt)"
            normalize={normalize.tags} />
          <Field
            name="EffectTags"
            component={errorMessage} />
        </fieldset>

        <fieldset>
          <legend>
            <span className="text">Liste der Bestandteile (geplant)</span>
          </legend>
        </fieldset>

        <fieldset>
          <legend>
            <span className="text">Wo kriegt man dieses Produkt?</span>
          </legend>
          <div className= "pure-g">
            <Field name="EffectOrigin" className="pure-input-1" component="input" placeholder="Produzent*in (Auswahlmenü geplant)" />
            <Field name="EffectOrigin" component={errorMessage} />
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <span className="text">Lizenz</span>
            <span className="desc">(CC-0)</span>
          </legend>
          <div className= "pure-g license">
            <label className= "pure-u-2-24">
              <i className= "fa fa-creative-commons" />
            </label>
            <div className= "pure-u-2-24 pure-controls">
              <Field name="EffectLicense" component="input" type="checkbox" />
            </div>
            <div className= "pure-u-20-24">
              <Field name="EffectLicense" component={errorMessage} />
              Ich habe die {" "}
              <a target="_blank" href={CC_LICENSE.link}>
                Bestimmungen der Creative-Commons Lizenz CC0
              </a> {" "}
              gelesen und akzeptiere sie
            </div>
          </div>
        </fieldset>
      </div>
    </form>)
  }
}

const T = React.PropTypes;

Form.propTypes = { isEdit : T.bool };

module.exports = reduxForm({
  form            : PRODUCT.id,
  validate        : validation.productForm,
})(Form)
