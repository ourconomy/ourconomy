import React            from "react";
import { pure }         from "recompose";
import URLs             from "../constants/URLs";
import EffectsURLs      from "../constants/EffectsURLs";
import pkg              from "../../package.json";
import EffectsImprint   from "./EffectsImprint";
import {translate}      from "react-i18next";

class EffectsContact extends React.Component {

  render () {
    var t = (key) => {
      return this.props.t("effectsContact." + key);
    };

    return (
      <div>
        <h2>{t("heading")}</h2>
        <p>
          {t("text0")}<br /><br />
          Oliver <br />

        </p>
        <p>
          <br />
          <i className = "fa fa-envelope-o" />
          {" "}<a target="_blank" href = {EffectsURLs.MAIL.link}>{ EffectsURLs.MAIL.name }</a>
          <br />
          <i className = "fa fa-github" />
          {" "}<a target="_blank" href = {EffectsURLs.REPOSITORY.link}>{ EffectsURLs.REPOSITORY.name }</a>
        </p>
        <p>
          <h2>{t("imprint")}</h2>
          <h3>{t("heading1")}</h3>
          Oliver Sendelbach,
          Augustastr. 26,
          40721 Hilden
          <br />
          Tel: +49 (0) 162 878 2690
          <br />
          <a target="_blank" href = {EffectsURLs.MAIL.link}>{ EffectsURLs.MAIL.name }</a>
          <br />
        </p> 
        <p>
          <h3>{t("heading2")}</h3>
          Oliver Sendelbach,
          Augustastr. 26,
          40721 Hilden
        </p> 
        <p>
          <h3>{t("heading3")}</h3>
          Oliver Sendelbach{t("text3")}
          <br />
          {t("text31")}
        </p> 
        <p>
          <h3>{t("heading4")}</h3>
          Oliver Sendelbach{t("text4")}{' '}Helmut Wolman.
          <h3>{t("heading5")}</h3>
          Anja Dannemann{', '}
          <a href= "mailto:anja.dannemann@kartevonmorgen.org">
          anja.dannemann@kartevonmorgen.org
          </a>
          <h3>{t("heading6")}</h3>
          {t("text61")}Oliver Sendelbach
          <br />
          {t("text62")}
          <a target="_blank" href="https://slowtec.de/">slowtec GmbH</a>
          <br />
          <a href = "mailto:markus@kartevonmorgen.org">
            markus@kartevonmorgen.org
          </a>
          <br />
        </p>
      <br />
      <br />
        <EffectsImprint />
      </div>);
  }
}

module.exports = translate("translation")(pure(EffectsContact));
