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
import { quickSearch }      from "../WebAPI4FX";
import i18n                 from '../i18n';

const errorMessage = ({meta}) =>
  meta.error && meta.touched
    ? <div className="err">{meta.error}</div>
    : null

var lastFormSearchTrigger = 0;
var latestSearchTerm = "";

//oc: Passing t on to Upstream component created infinite loop, therefore:
var effT = (key) => {
  return i18n.t("effectsTranslation:productForm." + key);
};

const renderUpstreamEffects = ({ fields, meta: { touched, error } }) => (
  <ul>
    {fields.map((member, index) => (
      <li key={index} style={{margin:"10px"}}>
        <Field
          name={`${member}.upstreamNo`}
          type="text"
          className="pure-u-4-24"
          component="input"
          placeholder={effT("upstreamNo")}
        />
          <label className="pure-u-20-24">
            <div style={{marginLeft:"5px"}}>{' '}{effT("upstreamItemReq")}
            </div>
          </label>
        <Field
          name={`${member}.upstreamNo`}
          component={errorMessage} />
        <Field
          name={`${member}.upstreamEffect`}
          type="text"
          component={props =>
            <AsyncCreatable
              loadOptions={getEffectOptions}
              value={props.input.value}
              onChange={props.input.onChange}
              onBlur={() => props.input.onBlur(props.input.value)}
              placeholder={effT("upstreamPrecursor")}
              searchPromptText={effT("searchPrompt")}
              loadingPlaceholder={effT("loadingPlaceholder")}
              promptTextCreator={ label => effT("creatingOptions") + label + effT("creatingOptionsEnd")}
            />
          }
        />
        <Field
          name={`${member}.upstreamTransferUnit`}
          className="pure-u-12-24"
          type="text"
          component="input"
          placeholder={effT("upstreamUnit")}
        />
        <Field
          name={`${member}.upstreamAmount`}
          className="pure-u-12-24"
          type="text"
          component="input"
          placeholder={effT("upstreamAmount")}
        />
        <Field
          name={`${member}.upstreamAmount`}
          component={errorMessage} />
        <Field
          name={`${member}.upstreamComment`}
          className="pure-u-20-24"
          type="text"
          component="input"
          placeholder={effT("upstreamComment")}
        />
        <div className="pure-u-1-24">
        </div>
        <button
          type="button"
          className="pure-u-3-24"
          style={{marginTop:"7px"}}
          title={effT("upstreamRemove")}
          onClick={() => fields.remove(index)}
        >
          <i className= "fa fa-trash" />
        </button>
      </li>
   ))}
    <li>
      <button type="button" onClick={() => fields.push({})}>
        <i className= "fa fa-plus" />{' '}{effT("upstreamAdd")}
      </button>
    </li>
  </ul>
);

const triggerQuickSearch = (input, callback, goal) => {
  if ( Date.now() - lastFormSearchTrigger > appConst.SEARCH_DELAY ) {
    if (input == latestSearchTerm ) {
      lastFormSearchTrigger = Date.now();
      quickSearch(input, callback, goal);
      console.log("ProductForm, triggerQuickSearch with: " + input + ", goal: " + goal);
    } else {
      return;
    }
  } else {
    setTimeout(triggerQuickSearch, 200, input, callback, goal);
  }
};

const getEntryOptions = (input, callback) => {
  const thisSearchStart = Date.now();
  latestSearchTerm = input;
  if ( input.length < 3 ) {
    callback(null, { options: [] });
  } else {
    const goal = "entry";
    triggerQuickSearch(input, callback, goal);
  }
};

const getEffectOptions = (input, callback) => {
  const thisSearchStart = Date.now();
  latestSearchTerm = input;
  if ( input.length < 3 ) {
    callback(null, { options: [] });
  } else {
    const goal = "effect";
    triggerQuickSearch(input, callback, goal);
  }
};


class ProductForm extends Component {

  render() {

    const { isEdit, license, dispatch, handleSubmit } = this.props;

    var t = (key) => {
      return this.props.t("effectsTranslation:productForm." + key);
    };

    return (
    <div>
      <form
        className = "add-entry-form"
        action    = 'javascript:void();' >

        <h3>{isEdit ?
          t("editProductHeading")
          : t("createProductHeading")}
        </h3>
        <legend>
          <span className="text" style={{fontSize:"75%"}}>
            {t("respectCopyright")}
          </span>
        </legend>
        { this.props.error &&
          <div className= "err">
            {t("savingError")} {' '}
            {this.props.error.message}
          </div>
        }
        { (!this.props.error) && this.props.submitFailed &&
          <div className="err">
            {t("valueError")}
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
              placeholder={t("title")} />
            <Field
              name="title"
              component={errorMessage} />

            <Field name="description" className="pure-input-1" component="textarea" placeholder={t("description")} />
            <Field name="description" component={errorMessage} />
          </fieldset>

          <fieldset>
            <div className= "pure-g">
              <label className= "pure-u-2-24">
                <i className= "fa fa-tags" />
              </label>
              <div className= "pure-u-22-24">
                <Field
                  name="tags"
                  required={true}
                  className="pure-input-1"
                  component="input"
                  placeholder={t("tags")}
                  normalize={normalize.tags} />
                <Field
                  name="tags"
                  component={errorMessage} />
              </div>
            </div>
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
                  placeholder={t("homepage")} />
                <Field name="homepage" component={errorMessage} />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <div>
              <Field
                name="origin"
                component={props =>
                  <AsyncCreatable
                    loadOptions={getEntryOptions}
                    value={props.input.value}
                    onChange={props.input.onChange}
                    onBlur={() => props.input.onBlur(props.input.value)}
                    placeholder={t("producer")}
                    searchPromptText={t("searchPrompt")}
                    loadingPlaceholder={t("loadingPlaceholder")}
                    promptTextCreator={ label => t("creatingOptions") + label + t("effectsTranslation:productForm.creatingOptionsEnd")}
                  />
                }
                />
              <Field name="origin" component={errorMessage} />
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <span className="text">{t("upstreamLegend")}</span>
            </legend>
            <FieldArray
              name="upstreams"
              component={renderUpstreamEffects}
            />
          </fieldset>

          <fieldset>
            <legend>
              <span className="text">
                {t("license")}
              </span>
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
                {t("iHaveRead")} {" "}
                <a target="_blank" href={CC_LICENSE.link}>
                  {t("creativeCommonsLicense")}
                </a> {" "}
                {t("licenseAccepted")}
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
              text = { this.props.t("translation:entryForm.cancel") }
            />
            <NavButton
              keyName = "save"
              classname = "pure-u-1-2"
              onClick = { () => {
                this.props.handleSubmit();
              }}
              icon = "fa fa-floppy-o"
              text = { this.props.t("translation:entryForm.save") }
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
