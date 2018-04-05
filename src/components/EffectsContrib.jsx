import React, { Component } from "react";
import pkg              from "../../package.json";
import oclogo           from "../img/ourconomy-logo.png";
import EffectsURLs      from "../constants/EffectsURLs";
import i18n             from "../i18n";

const t = (key) => {
  return i18n.t("effectsContrib." + key);
}

module.exports = ({serverVersion}) =>
    <div className="info">
        <h2>{t("heading1")}</h2>
        <p>
          {t("text1.1")}
        </p>
        <ol>
          <li>
          {t("text1.2-bullet1")}
          </li><li>
          {t("text1.2-1-bullet2")}{' '}
            <a target="_blank" href = 
              {EffectsURLs.CHARTER.link}>{ EffectsURLs.CHARTER.name }
            </a>
          </li><li>
          {t("text1.3-bullet3")}
          </li><li>
          {t("text1.4-bullet4")}
          </li><li>
          {t("text1.5-bullet5")}
          </li><li>
          {t("text1.6-bullet6")}{" "}
          <i className = "fa fa-envelope-o" />
          {" "}<a target="_blank" href = {EffectsURLs.MAIL.link}>{ EffectsURLs.MAIL.name }</a>
          </li>
        </ol>
        <br /><br />

        <p>
          {t("text1.7")}{" "}
          <i className = "fa fa-github" />
          {" "}<a target="_blank" href = {EffectsURLs.REPOSITORY.link}>{ EffectsURLs.REPOSITORY.name }</a>
          <br />
          {t("text1.8")}{" "}
        </p>

        <br /><br />
        <p className="version">{
            t("clientVersion") + " " + pkg.version
        }
        </p>
        {serverVersion
            ?   <p className="version">
                    {t("serverVersion") + " " + serverVersion}
                </p>
            : ""
        }
    </div>
