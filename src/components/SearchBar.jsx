require('./SearchBar.styl');
import { translate } from "react-i18next";
import React from "react";
import { pure } from "recompose";
import T from "prop-types";
import { MAIN_IDS, CSS_CLASS_SIZE, NAMES } from "../constants/Categories";

class RawCategoryButtons extends React.Component {

  render() {
    const { disabled, active, onToggle, t } = this.props;
    const buttons = MAIN_IDS.map((c) => {
      const act = [].indexOf.call(active || [], c) >= 0;
      return (
        <button
          key       = { c }
          disabled  = { disabled }
          onClick   = { () => { onToggle(c) }}
          className = { NAMES[c] + " " + CSS_CLASS_SIZE[c] + (act ? " active" : "")}>
          { t("category." + NAMES[c]) + " " }
          <i className = {'fa fa-toggle' + (act ? "-on" : "-off")}><i /></i>
        </button>);
    });
    return (<div>{ buttons }</div>);
  }
}

RawCategoryButtons.propTypes = {
  active     : T.array,
  disabled   : T.bool,
  onToggle   : T.func
};

const CategoryButtons = pure(RawCategoryButtons);

class SearchBar extends React.Component {

  onChange = (ev) => {
    var ref, v;
    if ((v = (ref = ev.target) != null ? ref.value : void 0) == null) {
      return;
    }
    this.props.onChange(v);
  }

  onKeyUp = (ev) => {
    ev.preventDefault();
    switch (ev.key) {
      case "Escape":
        this.props.onEscape();
        break;
      case "Enter":
        this.props.onEnter();
    }
  }

  render() {

    const { categories, disabled, toggleCat, searchText, t } = this.props;

    return (
      <div className = "SearchBar pure-g">
        <div className = "main-categories pure-u-1 pure-g">
          <CategoryButtons
            active    = { categories }
            disabled  = { disabled   }
            onToggle  = { toggleCat  }
            t         = { t }
           />
        </div>

        <div className = "pure-u-1">
          <div onClick = { this.props.onLenseClick } className = "search-icon">
            <i className = "fa fa-search" />
          </div>
          <input
            onChange    = { this.onChange }
            disabled    = { disabled }
            onKeyUp     = { this.onKeyUp }
            value       = { searchText || '' }
            className   = "pure-u-1"
            placeholder = { t("searchbar.placeholder") } />
        </div>
      </div>)
  }
}

SearchBar.propTypes = {
  searchText  : T.string,
  categories  : T.array,
  disabled    : T.bool,
  toggleCat   : T.func,
  onChange    : T.func,
  onEnter     : T.func,
  onEscape    : T.func,
  t           : T.func
}

module.exports = translate('translation')(pure(SearchBar))
