import React, { Component } from "react"
import Actions              from "../Actions"
import validation           from "../util/validation"
import normalize            from "../util/normalize";
import { reduxForm, Field, initialize } from "redux-form"
import NavButton            from "./NavButton";
import { IDS              } from "../constants/Categories"
import { CC_LICENSE       } from "../constants/URLs"
import { PRODUCT	  }     from "../constants/Form"
import { translate        } from "react-i18next";
import T                    from "prop-types";
import Select               from 'react-select';
import { AsyncCreatable }   from 'react-select';
import 'react-select/dist/react-select.css';
//oc temp
import request              from "superagent/lib/client";
import saPrefix             from "superagent-prefix";

const prefix = saPrefix("http://localhost:8080/api")

const errorMessage = ({meta}) =>
  meta.error && meta.touched
    ? <div className="err">{meta.error}</div>
    : null



class ProductForm extends Component {

  render() {

    const { isEdit, license, dispatch, handleSubmit } = this.props;
    var t = (key) => {
      return this.props.t("productForm." + key);
    };

    const getOptions = (input, callback) => {

      //oc debugly:
      console.log("input in getOptions: " + input );

      if ( input.length > 2 ) {
        setTimeout(() => {

            //oc request section
            request
              .get('/search')
              .use(prefix)
              .query({
                text: input.trim()
               })
               .query('bbox=-90,-180,90,180' )
               .set('Accept', 'application/json')
               .end( (err,res) => {
                 var ids = [];
                 var searchObjects = {};
                 searchObjects = res.body.visible;
                 //oc add res.body.invisible
                 ids = searchObjects.map(e => e.id);

                 if ( ids !== null ) {
                 request
                   .get('/entries/' + ids.join(','))
                   .use(prefix)
                   .set('Accept', 'application/json')
                   .end( (err, res) => {
                     var options = [];
                     var searchObjects = {};
                     searchObjects = res.body;
                     Object.keys(searchObjects).forEach( key => {
                       var optionLine = {
                       label: searchObjects[key].title,
                       value: searchObjects[key].id
                       };
                     options.push(optionLine);
                     });
                     var newres = {options: options};

                     //oc debugly
                     console.log("ProductForm callback result : " +
                       err + ", " + JSON.stringify(newres));

                     callback(err, newres)
                   });
                   //oc: is redundant when options var is moved to main comp
                   } else {
                      callback(null, {options: [] })
                   }

                 });
         }, 500);
       } else {
         callback(null, {options: [] })
       }
     };

    //oc debugly:
    console.log("ProductForm updated.");

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

        <fieldset style={{border:"none",boxShadow:"none"}}>
          <legend>
            <span className="text">Quelle</span>
          </legend>
          <div>
            <Field
              name="origin"
              component={props =>
                <AsyncCreatable
                  type="text"
                  loadOptions={getOptions}
                  value={props.input.value}
                  onChange={props.input.onChange}
                  onBlur={() => props.input.onBlur(props.input.value)}
                  placeholder="Produziert von ..."
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
          <nav className="menu pure-g">
            //our hack, clean up!
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
             //end
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
