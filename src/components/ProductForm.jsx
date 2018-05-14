import React, { Component } from "react"
import Actions              from "../Actions"
import validation           from "../util/validation"
import normalize            from "../util/normalize";
import { reduxForm, Field, initialize, FieldArray } from "redux-form"
import NavButton            from "./NavButton";
import { IDS              } from "../constants/Categories"
import { CC_LICENSE       } from "../constants/URLs"
import { PRODUCT	        } from "../constants/Form"
import { translate        } from "react-i18next";
import T                    from "prop-types";
import { AsyncCreatable   } from 'react-select';
import 'react-select/dist/react-select.css';
import appConst             from "../constants/App";
import { quickEntrySearch } from "../WebAPI4FX";


const errorMessage = ({meta}) =>
  meta.error && meta.touched
    ? <div className="err">{meta.error}</div>
    : null

const renderUpstreamEffects = ({ fields, meta: { touched, error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add component
      </button>
      {touched && error && <span>{error}</span>}
    </li>
    {fields.map((member, index) => (
      <li key={index}>
        <p>Upstream component #{index + 1}</p>
        <button
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}
        >
          Remove
        </button>
        <Field
          name={`${member}.upstreamNo`}
          type="text"
          component="input"
          placeholder="Number (required)"
        />
        <Field
          name={`${member}.upstreamEffect`}
          type="text"
          component="input"
          placeholder="Precursor product"
        />
        <Field
          name={`${member}.upstreamTransferUnit`}
          type="text"
          component="input"
          placeholder="Unit"
        />
        <Field
          name={`${member}.upstreamAmount`}
          type="text"
          component="input"
          placeholder="Amount used (required)"
        />
        <Field
          name={`${member}.upstreamComment`}
          type="text"
          component="input"
          placeholder="Comment"
        />
      </li>
    ))}
  </ul>
);


class ProductForm extends Component {

  render() {

    const { isEdit, license, dispatch, handleSubmit } = this.props;
    var t = (key) => {
      return this.props.t("productForm." + key);
    };

    var lastFormSearchTrigger = 0;
    var latestSearchTerm = "";

    const triggerQuickSearch = (input, callback) => {
      if ( Date.now() - lastFormSearchTrigger > appConst.SEARCH_DELAY ) {
        if (input == latestSearchTerm ) {
          lastFormSearchTrigger = Date.now();
          quickEntrySearch(input, callback);
          console.log("triggerQuickSearch: " + input);
        } else {
          return;
        }
      } else {
        setTimeout(triggerQuickSearch, 200, input, callback);
      }
    };

    const getOptions = (input, callback) => {
      const thisSearchStart = Date.now();
      latestSearchTerm = input;
      if ( input.length < 3 ) {
        callback(null, { options: [] });
      } else {
        triggerQuickSearch(input, callback);
      }
    };

    return (
    <div>
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
            <Field name="license" component={errorMessage} />
          </div>
        }
        <div className= "pure-form">
          <fieldset>

            <Field
              name="title"
              required={true}
              className="pure-input-1"
              type="text"
              component="input"
              placeholder="Produktname" />

            <Field
              name="title"
              component={errorMessage} />

            <Field name="description" className="pure-input-1" component="textarea" placeholder="Produkt-Beschreibung"  />
            <Field name="description" component={errorMessage} />

          </fieldset>

          <fieldset>
            <Field
              name="tags"
              required={true}
              className="pure-input-1"
              component="input"
              placeholder="Stichworte (Komma getrennt)"
              normalize={normalize.tags} />
            <Field
              name="tags"
              component={errorMessage} />
          </fieldset>

          <fieldset>
            <div className= "pure-g">
              <label className= "pure-u-2-24">
                <i className= "fa fa-globe" />
              </label>
              <div className= "pure-u-22-24">
                <Field
                  name="homepage"
                  className="pure-input-1"
                  component="input"
                  placeholder={"homepage"} />
                <Field name="homepage" component={errorMessage} />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <span className="text">Quelle</span>
            </legend>
            <div>
              <Field
                name="origin"
                component={props =>
                  <AsyncCreatable
                    loadOptions={getOptions}
                    value={props.input.value}
                    onChange={props.input.onChange}
                    onBlur={() => props.input.onBlur(props.input.value)}
                    placeholder="Produced by ..."
                    searchPromptText="Type to search ..."
                    loadingPlaceholder="Loading entries ..."
                    promptTextCreator={ label => 'Create new option "' + label + '"'}
                  />
                }
                />
              <Field name="origin" component={errorMessage} />
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <span className="text">Precursor products and effects</span>
            </legend>
            <FieldArray name="upstreams" component={renderUpstreamEffects} />
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
                <Field name="license" component="input" type="checkbox" />
              </div>
              <div className= "pure-u-20-24">
                <Field name="license" component={errorMessage} />
                Ich habe die {" "}
                <a target="_blank" href={CC_LICENSE.link}>
                  Bestimmungen der Creative-Commons Lizenz CC0
                </a> {" "}
                gelesen und akzeptiere sie
              </div>
            </div>
          </fieldset>
          <div style={{height:50}}>{' '}</div>
          <nav className="menu pure-g">
            <NavButton
              keyName = "cancel"
              classname = "pure-u-1-2"
              onClick = {() => {
                this.props.dispatch(initialize(PRODUCT.id, {}, PRODUCT.fields));
                this.props.dispatch(isEdit ? Actions.cancelEditProduct() : Actions.cancelNewProduct());
              }}
              icon = "fa fa-ban"
              text = { t("cancel") }
            />
            <NavButton
              keyName = "save"
              classname = "pure-u-1-2"
              onClick = { () => {
                this.props.handleSubmit();
              }}
              icon = "fa fa-floppy-o"
              text = { t("save") }
            />
          </nav>
        </div>
      </form>
    </div>)
  }
}


ProductForm.propTypes = {
  isEdit : T.bool,
  license: T.string,
  dispatch: T.func
};

module.exports = reduxForm({
  form            : PRODUCT.id,
  validate        : validation.productForm
})(translate('translation')(ProductForm))
