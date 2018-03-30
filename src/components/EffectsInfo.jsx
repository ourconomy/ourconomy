import React, { Component } from "react";
import pkg      from "../../package.json";
import oclogo   from "../img/ourconomy-logo.png";
import URLs     from "../constants/URLs";
import i18n     from "../i18n";

const t = (key) => {
  return i18n.t("effectsInfo." + key);
}

module.exports = ({serverVersion}) =>
    <div className="info">
        <h2>{t("heading1")}</h2>
        <p>
        </p>
        <br />

        <p>
          {t("text1.1")}
          <br /><br />
          {t("text1.2")}
          <br /><br />
        </p>
        <h3>{t("text1.3")}</h3>
        <p>
          {t("text1.bene1")}<br /><br />
          {t("text1.bene2")}<br /><br />
          {t("text1.bene3")}<br /><br />
          {t("text1.bene4")}<br /><br />
        </p>
        <h3>{t("text2.1")}</h3>
        <p>{t("text2.2")}</p>
        <span style={{fontFamily:"monospace,monospace"}}>
            <p>
            <em>{t("text2.bl1")}</em><br /><br />
            {t("text2.bl2")}<br /><br />
            {t("text2.bl3")}
            </p>
            <ul>
                <li>{t("text2.bl4b")}</li>
                <li>{t("text2.bl5b")}</li>
                <li>{t("text2.bl6b")}</li>
                <li>{t("text2.bl7b")}</li>
            </ul><br />
            <p>
            {t("text2.bl8")}<br /><br />
            {t("text2.bl9")}
            </p>
            <ul>
                <li>{t("text2.bl10b")}</li>
                <li>{t("text2.bl11b")}</li>
                <li>{t("text2.bl12b")}</li>
            </ul><br />
            <p>
            {t("text2.bl13")}<br /><br />
            {t("text2.bl14")}<br /><br />
            {t("text2.bl15")}<br /><br />
            </p>
        </span>
        <p>
        {t("text2.bl16")}<br /><br />
        </p>
        
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
