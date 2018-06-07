import React, { Component } from "react";
import logo                 from "../img/logo.png";
import oclogo               from "../img/ourconomy-logo.png";
import CityList             from "./CityList";
//oc import Info                 from "./Info";
import EffectsInfo          from "./EffectsInfo";
import Contact              from "./Contact";
import EffectsContact       from "./EffectsContact";
import Imprint              from "./Imprint";
//oc   import Explain              from "./LandingExplain";
import EffectsExplain       from "./EffectsLandingExplain";
import EffectsContrib       from "./EffectsContrib";
import Register             from "./Register";
import Login                from "./Login";
import ProductResultList    from "./ProductResultList";
import ResultList           from "./ResultList";
import URLs                 from "../constants/URLs";
import EffectsURLs          from "../constants/EffectsURLs";
import V                    from "../constants/PanelView";
import { pure }             from "recompose";
import { translate }        from "react-i18next";
import i18n                 from "../i18n";
import T                    from "prop-types";

var cityInput = false;

class LandingPage extends Component {

  render() {

    const { content, searchText, searchError, cities,
      onSelection, onEscape, onChange, onRegister, onLogin, loggedIn,
      user, onDeleteAccount,
      searchWord, onSearchWordChange, effects, onProductClick, entries,
      invisibleEntries, entryRatings, onEntryClick, dispatch
      } = this.props;
      {/* contains oc items */}
    const onClick = this.props.onMenuItemClick;
    var t = (key) => {
      return this.props.t("landingPage." + key);
    };

    const onKeyUp = ev => {
      ev.preventDefault();
      switch (ev.key) {
        case "Escape":
          onEscape();
          break;
        case "Enter":
          onSelection(cities[0]);
      }
    }

    const onPlaceSearch = ev => {
      const target = ev.target;
      const v = target != null ? target.value : void 0;
      if (v == null) {
        return;
      }
      onChange(v);
    }

    const onSearchClick = () => {    //oc function
      onSelection(cities[0])
    }

    const onTextSearch = ev => {     //oc function
      const target = ev.target;
      const v = target != null ? target.value : void 0;
      if (v == null) {
        return;
      }
      onSearchWordChange(v);
    }

    let subscriptionLink = user.subscriptionExists ? t("subscribeToBbox.edit-link")
    : t("subscribeToBbox.new-link");

    let loginInfo = <div className="login-info">
      <p>{t("subscribeToBbox.message")}<br/>
      <a onClick={() => onClick(V.SUBSCRIBE_TO_BBOX)} href="#">{subscriptionLink}</a>.</p>
    </div>;

    let contentComp = null;
    switch (content) {
      case V.TEAM:
      case V.SUPPORTERS:
        contentComp = <Explain onClick={onClick} />;
        break;
      case V.IMPRINT:
        contentComp = <Imprint />;
        break;
      case V.MAP_INFO:
      case V.OPEN_SOURCE:
        contentComp = <Info />;
        break;
      case V.INFO:
        contentComp = <Info />;
        break;
      case V.EFFECTS_INFO:
        contentComp = <EffectsInfo />;
        break;
      case V.CONTACT:
        contentComp = <Contact />;
        break;
      case V.EFFECTS_CONTACT:
        contentComp = <EffectsContact />;
        break;
      case V.DONATE:
        contentComp = <div>
          <h2>{t("donate.heading")}</h2>
          <p>
            {t("donate.paragraph1")}
          </p>
          <strong>
            <a target="_blank" href="https://www.betterplace.org/de/projects/36213-von-morgen-alles-gute-auf-einer-karte/donations/new">
            {t("donate.betterplace-link")}
            </a>
          </strong>
          <p>
            <strong>{t("donate.paragraph2.bank-details1")}</strong> <br/>
            <br/>
            {t("donate.paragraph2.bank-details2")}<br/>
            {t("donate.paragraph2.bank-details3")}<br/>
            {t("donate.paragraph2.bank-details4")}<br/><br/>

            {t("donate.paragraph2.text")}
          </p>
          <h1>{t("donate.paragraph3.heading")}</h1>

          <p>
            {t("donate.paragraph3.text1")}
            {" "}<a href="http://bildungsagenten.org/solidargemeinschaftvonmorgen">{t("donate.paragraph3.form-link")}</a>)
            {t("donate.paragraph3.text2")}
          </p>
          <iframe src="https://app.box.com/embed/s/yae4jb2g0awtqkxj3cb98jyd4uld9hza"
              width="800" height="550" frameborder="0">
          </iframe>
          <p>
            {t("donate.paragraph3.text3")}
            {" "}<a target="_blank" href = {URLs.DONATE.link}>{URLs.DONATE.name}</a> <br/>
            {t("donate.paragraph3.text4")}
          </p>
          <p>
            {t("donate.paragraph3.text5")}
          </p>
          <p>{t("donate.paragraph3.text6")}</p>
        </div>;
        break;
      case V.EFFECTS_CONTRIB:
        contentComp = <EffectsContrib />;
        break;
      case V.REGISTER:
        contentComp = <div>
          <Register
            onSubmit = { onRegister }
            onLogin = {() => {
              onClick(V.LOGIN)
            }}
           />
        </div>;
        break;
      case V.REGISTER_SUCCESS:
        contentComp = <div>
          <p>
            {t("user.register-success.text1")}<br/>
            {t("user.register-success.text2")} {user.email} {t("user.register-success.text3")}
          </p>
        </div>;
        break;
      case V.CONFIRMING_EMAIL:
        contentComp = <div>
          <p>
          {t("user.confirming-email-address.text")}<br/>
          </p>
          </div>;
          break;
      case V.CONFIRM_EMAIL_ERROR:
        contentComp = <div>
          <p>
          {t("user.confirm-email-error.message")}
          <a onClick={() => {onClick(V.REGISTER)}} href="#">{t("user.confirm-email-error.link")}</a>.<br/>
          </p>
          </div>;
          break;
      case V.EMAIL_CONFIRMED:
        contentComp = <div>
          <p>
          {t("user.email-confirmed.text1")}<br/>
          {t("user.email-confirmed.text2")}
          <a onClick={() => {onClick(V.LOGIN)}} href="#">{t("user.email-confirmed.link")}</a>.
          </p>
          </div>;
          break;
      case V.LOGIN_ERROR:  // fall through
      case V.LOGIN:
        contentComp = <div>
          <Login
            onSubmit = { onLogin }
            onRegister = {() => {
              onClick(V.REGISTER)
            }}
           />
        </div>;
        break;
      case V.LOGIN_SUCCESS:
        contentComp = loginInfo;
        break;
      case V.LOGOUT:
        contentComp = <div>
          <p>{t("user.logged-out")}</p>
        </div>;
        break;
      case V.JOIN:
        contentComp = <div>
          <h3>{t("join.heading")}</h3>
          <p>
            {t("join.paragraph1")}
          </p>
          <p>
            <a target="_blank" href={URLs.JOB_ADS.link}>{URLs.JOB_ADS.name}</a>
          </p>
          <p>
            {t("join.paragraph2")}
          </p>
          <p>
            {t("join.paragraph3")}
            <br />
            <a target="_blank" href= "mailto:netzwerk@kartevonmorgen.org">
              netzwerk@kartevonmorgen.org
            </a>
          </p>
        </div>;
        break;
      case V.RESULT_PAGE:
        contentComp = <div>
          <p>Search results</p>
          <div className="group-header">
            Found {effects.length > 10 ? 10 : effects.length} of{' '}
            {effects.length} "{searchWord}" products or services:
          </div>
          <ProductResultList
            products={effects.slice(0,10)}
            onClick={onProductClick}
            dispatch={dispatch}
            />
          <div className="group-header">
            Found {entries.length} "{searchWord}" places in "{searchText}":
          </div>
          <ResultList
            entries={entries.slice(0,10)}
            onClick={onEntryClick}
            ratings={entryRatings}
            highlight={[0, 0]}
            dispatch={dispatch}
            />
          {((invisibleEntries && invisibleEntries.length > 0 ) ?
            <div>
              <div className="group-header">
                Found {invisibleEntries.length} places elsewhere:
              </div>
              <ResultList
                entries={invisibleEntries}
                onClick={onEntryClick}
                ratings={entryRatings}
                highlight={[0, 0]}
                dispatch={dispatch}
                />
            </div>
            : <div><div className="group-header">
                To find places related to "{searchWord}" elsewhere, please go to <a href={ "#/?search=" + searchWord } onClick={() => onClick('map')}>Map</a>
              </div><br /></div> )}
          <div className="group-header">External ressouces</div>
          <p style={{fontSize:"80%"}} >(ourconomy does not have an affiliation with these{' '}
            organisations:)</p>
          <p>Fairmondo: <a target="_blank"
            href={"https://fairmondo.de/articles?article_search_form[q]=" +
              searchWord }>
            Look for "{searchWord}" on Fairmondo
          </a></p>
          <p>Utopia.de: <br />
            <a target="_blank" href={"https://utopia.de/?s=" +
              searchWord }>
              Look for "{searchWord}" on Utopia.de (Watch out! Google search!)
            </a></p>
          <p>City-Search of Utopia.de: <br />
            <a
              target="_blank"
              href={"https://city.utopia.de/0/suche?fc=1&q=" + searchWord +
              "&o=" + searchText }>{' '}
                Find sustainable sources for "{searchWord}" in{' '}
                "{searchText}", Germany
            </a>
          </p>
          <p>WikiRate (finds best company names): <br />
            <a
              target="_blank"
              href=
              {"https://wikirate.org/*search?utf8=%E2%9C%93&" +
              "query[keyword]=" + searchWord }>{' '}
                Find out more about "{searchWord}" on WikiRate
            </a>
          </p>
          <p>Wiki-Products (works best for German search terms): <br />
            <a
              target="_blank"
              href={"http://de.wiki-products.org/index.php?" +
              "title=Spezial%3ASuche&search=" + searchWord + "&go=Seite"
              }>{' '}
                Find sustainable sources for "{searchWord}"
            </a>
          </p>
          {/* wiki-rate */}
        </div>;
        break;
        default:
    }

    return (
      <div className = "landing">
        <div className = "banner">
          <div className = "content pure-g">
            <div className = "logo-wrapper pure-u-11-24 pure-u-md-1-3">
              <div className = "pure-u-1 pure-menu-horizontal">
                <div className = "logo pure-u-1 pure-u-md-1">
                  <span style={{align: 'left',fontSize:'0.8em',color:'rgb(102, 102, 102)'}}>{/*oc conflict*/}
                  <a onClick={() => onClick('landing')} href="#">
                    {/*oc real conflict*/}
                    {/*<img className="logo pure-img" src={logo} />
                  </a>
                </div> 
                <div className= "pure-u-1-2 pure-u-md-1-2" >*/}
                  <img className="pure-img" width={300} src={oclogo} />
                  </a>
                  A product enhancement for 
                  <a target="_blank" style={{textDecoration: "none",color: "rgb(45,45,45)",fontWeight: "bold"}} href="https://kartevonmorgen.org">{' '}
                  Karte von morgen
                  </a>
                  </span>
                   {/*oc end real conflict*/}
                </div>
              </div>
            </div>
            <div className="menu-wrapper pure-u-1 pure-u-md-2-3">
              <div className = "language-wrapper">
                <a onClick={() => {i18n.changeLanguage('de');}} href="#"
                  className={"language-link" + ((i18n.language == "de") ? " selected" : " unselected")}>de</a>
                {" "}
                <a onClick={() => {i18n.changeLanguage('en');}} href="#"
                  className={"language-link" + ((i18n.language == "en") ? " selected" : " unselected")}>en</a>
              </div>
              <div className="menu pure-menu pure-menu-horizontal">
                <ul className="pure-g">
                  <li className="pure-u-1-3 pure-u-md-1-6 menu-item">
                    <a
                      onClick={() => onClick('map')}
                      href={ "#/?search=" + searchWord }
                      className="pure-menu-link"> {/* oc special link */}
                      {t("menu.map")}
                    </a>
                  </li>
                  <li className="pure-u-1-3 pure-u-md-1-6 menu-item">
                    <a
                      onClick={() => onClick('products')}
                      href={ "#/?search=" + searchWord }
                      className="pure-menu-link"> {/* oc special link */}
                      {t("effects.menu.effects")}{' '}
                      <span style=
                      {{fontWeight:'bold',color:'rgb(255, 221 ,  0)'}}>
                      {t("effects.menu.new")}
                      </span>
                    </a>
                  </li>
                  <li className="pure-u-1-3 pure-u-md-1-6 menu-item">
{/*                  <a onClick= {() => onClick(V.INFO)} href="#" className="pure-menu-link"> */}
                    <a onClick= {() => onClick(V.EFFECTS_INFO)} href="#" className="pure-menu-link">
                      {t("effects.menu.infos")}
                    </a>
                  </li>
                  <li className="pure-u-1-3 pure-u-md-1-6 menu-item">
                    <a onClick = {() => onClick(V.EFFECTS_CONTACT)} href="#" className="pure-menu-link"> {/* oc conflict line */}
                      {t("menu.contact")}
                    </a>
                  </li>
                  <li className="pure-u-1-3 pure-u-md-1-6 menu-item">
                 {/*<a onClick={() => onClick(V.DONATE)} href="#" className="pure-menu-link"> oc conflict line */}
                    <a onClick={() => onClick(V.EFFECTS_CONTRIB)} href="#" className="pure-menu-link">
                      {t("effects.menu.donate")}
                    </a>
                  </li>
                  <li className="pure-u-1-3 pure-u-md-1-6 menu-item">
                    { loggedIn ?
                      <a onClick = {() => onClick(V.LOGOUT)} href="#" className="pure-menu-link">
                        {t("menu.logout")}
                      </a>
                      : <a onClick = {() => onClick(V.LOGIN)} href="#" className="pure-menu-link">
                        {t("menu.login")}
                      </a>
                    }
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      <div className ={ "search" + (content ? '' : ' start')}>
        <div className = "landing-content">
          <h1>{t("effects.slogan")}</h1> {/*oc real conflict*/}
          <div className="place-search">
            <div className= "pure-g pure-form">
              <input
                className   = "pure-u-10-24"
                onChange    = {onTextSearch}
                onKeyUp     = {onKeyUp}
                value       = {searchWord || ''}
                type        = 'text'
                style       = {{fontSize:"85%"}}
                placeholder = {"What are you looking for?"}
              />
              <div className = "pure-u-1-24" />
              <input
                onFocus     = {() => {cityInput = true}}
                onBlur      = {() => {cityInput = false}}
                className   = "pure-u-10-24"
                onChange    = {onPlaceSearch}
                onKeyUp     = {onKeyUp}
                value       = {searchText || ''}
                type        = 'text'
                style       = {{fontSize:"85%"}}
                placeholder = {t("city-search.placeholder")}
                />
              <div className = "pure-u-1-24" />
              <button
                className = "pure-u-2-24"
                onClick     = {onSearchClick}
                >
                Go!
              </button>
                <div className = "pure-u-8-24" />
                <div className = "pure-u-16-24">
                { searchText && searchText.length > 3 && cityInput == true
                  ? (searchError
                    ? <div className="error">
                      <span className="errorText">{t("city-search.error")}</span>&nbsp;&nbsp;
                      <a
                        onClick={() => onClick('map')}
                        href={ "#/?search=" + searchWord }
                        className="link"> {/* oc special link */}
                        {t("city-search.show-map")}
                      </a></div>
                    : cities && cities.length > 0
                        ? <CityList cities={cities} onClick={onSelection} />
                        : <div className="error">{t("city-search.no-results")}&nbsp;&nbsp;
                        <a
                          onClick={() => onClick('map')}
                          className="link">
                          href={ "#/?search=" + searchWord }
                          > {/* oc special link */}
                        {t("city-search.show-map")}
                        </a></div>
                    )
                  : null
                }
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className = "explain">{
        content == null
          ? <a href= "#tutorial" className= "circleTutorial">
              <strong>
                Info
                <div style ={{ paddingTop: "10px", fontSize: "12px"}}>
                  <i className = "fa fa-chevron-down" />
                </div>
              </strong>
            </a>
          : null }
        <div className = "content">{
          content == null
            ? <div>
              {loggedIn ? loginInfo : null} <EffectsExplain onClick = { onClick } /> {/* oc conflict */}
              </div>
            : contentComp
        }</div>
      </div>
      <div className= "footer">
        <h3>{t("effects.footer.heading")}</h3>
        <p>
          {t("footer.contact")}<a target="_blank" href={EffectsURLs.MAIL.link}>{EffectsURLs.MAIL.name}</a>
          <br />
          {t("footer.open-source")}<a target="_blank" href={EffectsURLs.REPOSITORY.link}>{EffectsURLs.REPOSITORY.name}</a>
          <br />
          {t("effects.footer.trademark")} {/* oc line */}
        </p>
        <p>
          {/*<a href="#" onClick={() => onClick(V.IMPRINT)}>{t("footer.imprint")}</a> oc conflict */}
          <a href="#" onClick={() => onClick(V.EFFECTS_CONTACT)}>{t("footer.imprint")}</a>{/* oc conflict */}
        </p>
        <p>
          {user.username != null ? <a onClick={onDeleteAccount} href="#">
            Account löschen
          </a> : ""}
        </p>
      </div>
    </div>);
  }
}

LandingPage.propTypes = {
  content             : T.string,
  searchText          : T.string,
  searchWord          : T.string,
  searchError         : T.bool,
  cities              : T.array,
  onChange            : T.func,
  onSearchWordChange  : T.func,
  onEscape            : T.func,
  onSelection         : T.func
};
{/* propTypes contain oc items */}

module.exports = translate('translation')(pure(LandingPage))
