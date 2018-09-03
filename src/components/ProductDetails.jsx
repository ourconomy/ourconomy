import React, { Component }   from "react";
import Address                from "./AddressLine";
import { pure }               from "recompose";
import styled                 from "styled-components";
import Colors                 from "./styling/Colors"
import Ratings                from "./Ratings"
import NavButton              from "./NavButton";
import NavButtonWhite         from "./NavButtonWhite";
//import { translate }          from "react-i18next";
import Actions                from "../Actions";

    const TagsWrapper = styled.div `
      margin-top: 0.5em;
    `;

    const TagList = styled.ul `
      list-style: none;
      padding: 0;
      margin: 0;
    `;

    const Tag = styled.li `
      display:       inline-block;
      margin-right:  0.2em;
      background:    #777;
      color:         #fff;
      border-radius: 0.3em;
      padding:       0.1em;
      padding-left:  0.4em;
      padding-right: 0.4em;
      font-size:     0.9em;
    `;

    const Tags = (tags=[]) =>
      <TagsWrapper className = "pure-g">
        <i className = "pure-u-2-24 fa fa-tags" />
        <span className = "pure-u-22-24">
          <TagList>
          { tags
              .filter(t => t != "")
              .map(t => <Tag key={t}>{t}</Tag>)
          }
          </TagList>
        </span>
      </TagsWrapper>

    const EntryDetailPage = styled.div`
      padding:  1em;
      max-width: 500px;
    `;

    const EntryLink = styled.a`
      color: ${Colors.darkGray};
      text-decoration: none;
    `;

    const EntryTitle = styled.h3`
      margin-top:  0;
      color:       ${Colors.anthracite};
    `;

    const EntryDescription = styled.p`
      color: ${Colors.darkGray};
    `;

    const CategoryDescription = styled.div`
      text-align:      right;
      text-transform:  uppercase;
      color:    ${props => Colors[props.category]};
    `;

    const EntryDetailsDetails = styled.div`
      font-family: Museo;
    `;

    const EffectPrecursors = styled.span`
      font-size: 75%;
    `;

    class ProductDetails extends Component {

      render() {
        const { effect } = this.props;

        if (!effect) {
          return(
            <EntryDetailPage>
              <span>Eintrag wird geladen...</span>
            </EntryDetailPage>
          );
        }
    else {
      return (
      <div>
        <nav className="menu-top">
          <NavButtonWhite
            keyName = "back"
            buttonRight = { false }
            icon = "fa fa-chevron-left"
            text = {"back"}
            onClick = {() => {
              this.props.dispatch(Actions.setCurrentProduct(null, null));
              this.props.dispatch(Actions.showProductSearchResults());
              this.props.dispatch(Actions.setCenterInUrl(mapCenter));
            }}
          />
          <NavButtonWhite
            keyName = "edit"
            buttonRight = { true }
            icon = "fa fa-pencil"
            text = ""
            onClick = {() => {
              this.props.dispatch(Actions.editCurrentProduct());
            }}
          />
        </nav>
        <EntryDetailPage>
          <CategoryDescription>
            <span style={{color:'rgb(255,221,0)'}}>Produkt/Service</span>
          </CategoryDescription>
          <div>
            <EntryTitle>{effect.title}</EntryTitle>
            <EntryDescription>{effect.description}</EntryDescription>
            <EntryDescription>von: {effect.origin.label}
            </EntryDescription>
            <EntryDetailsOtherData>{[
              (effect.homepage ?
                <div key="hp" className="pure-g">
                  <i className = "pure-u-2-24 fa fa-globe" />
                  <EntryLink className="pure-u-22-24" href={effect.homepage} target="_blank">
                    { effect.homepage }
                  </EntryLink>
                </div> : null),
                //oc: make tags right!
              (effect.tags && effect.tags.filter(t => t !="").length > 0
                ? Tags(effect.tags)
                : null)
            ]}</EntryDetailsOtherData>
            <EntryDescription>
              gemacht aus:
              <EffectPrecursors>
                <ul>{[
                  ((effect.upstreams && effect.upstreams.length) > 0
                  ? effect.upstreams.map(u =>
                      <li>
                      {u.upstreamAmount}{' '}
                      {u.upstreamTransferUnit}{' '}
                      {u.upstreamEffect.label}
                      {u.upstreamComment && ' \('}
                        {u.upstreamComment}
                      { u.upstreamComment && '\)'}
                      </li>)
                  : <li>Noch keine Angaben</li>)
                ]}</ul>
              </EffectPrecursors>
            </EntryDescription>
            <EntryDescription style={{fontSize:"75%"}}>
              The information on this product has been 
              provided by volunteers and comes without any warranty 
              for correctness. All trademarks belong to their respective 
              owners.
            </EntryDescription>
          </div>
        </EntryDetailPage>
      </div>)
    }
  }
}

module.exports = pure(ProductDetails)
