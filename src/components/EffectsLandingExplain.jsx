import React, { Component } from "react";
import pkg      from "../../package.json";
import Colors   from "./styling/Colors";
import oclogo   from "../img/ourconomy-logo.png";
import i18n     from "../i18n";

const t = (key) => {
  return i18n.t("effectsLandingExplain." + key);
}

module.exports = ({serverVersion}) =>
    <div className="info">
        <h2>{t("heading1")}</h2>
        <br />
        <p>
          {t("text1.1")}<br />
          {t("text1.2")}<br />
          {t("text1.3")}<br />
        </p>
        <h3>{t("text1.head4")}</h3>
        <p style={{color: Colors.blue}}>{t("text1.goal5")}</p>
        <p>{t("text1.6")}</p>
        <h3>{t("text1.head7")}</h3>
        <p style={{color: Colors.blue}}>{t("text1.goal8")}</p>
        <p>{t("text1.9")}</p>
        <p>
        </p>
    </div>
