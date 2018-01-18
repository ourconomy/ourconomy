import React    from "react"
import Actions  from "../Actions"
import Address  from "./AddressLine"
import { pure } from "recompose"
//import Flower   from "./Flower";
import styled    from "styled-components";

//import { NAMES, CSS_CLASSES } from "../constants/Categories"


const ProductResultListElement = ({entry, onClick}) => {
  return (
    <li
      key           = { entry.id }
      onClick       = { (ev) => { onClick(entry.id, {lat: entry.lat, lng: entry.lng}) }}
    >
      <div className = "pure-g">
        <div className = "pure-u-23-24">
          <div>
            <span className="title">{entry.title}</span>
          </div>
          <div>
            <span className= "subtitle">{entry.description}</span>
          </div>
          <div>
            <span className= "origin">{entry.origin}</span>
          </div>
          {
            (entry.tags.length > 0)
              ? <div className="tags" >
                  <ul >
                  { entry.tags.map(t => <li key={t}>{t}</li>) }
                  </ul>
                </div>
              : null
          }
        </div>
        <div className = "pure-u-1-24 chevron">
          <i className = "fa fa-chevron-right" />
        </div>
      </div>
    </li>)
}

const ProductResultList = ({ waiting, products, onClick }) => {
  let results = products.map( e =>
    <ProductResultListElement
      entry        = { e            }
      //ratings      = { (e.ratings || []).map(id => ratings[id])}
      key          = { e.id         }
      onClick      = { onClick      }
    />);

  return ( 
    <div className= "result-list">
    {
      (results.length > 0)
        ? <ul>{results}</ul>
        : (waiting ? 
        <p className= "loading">
          <span>Produkte werden geladen...</span>
        </p>
        : <p className= "no-results">
            <i className= "fa fa-frown-o" />
            <span>Es konnten keine Produkte gefunden werden</span>
          </p>)
    }
    </div>)
}

module.exports = pure(ProductResultList)
