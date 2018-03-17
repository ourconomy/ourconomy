import T                          from "../constants/ActionTypes";
import ServerConstants            from "../constants/Server";
import WebAPI                     from "../WebAPI";
import { EDIT, RATING, PRODUCT, LOGIN, REGISTER } from "../constants/Form";
import { NEW_ENTRY_LICENSE }      from "../constants/App";
import { initialize, stopSubmit } from "redux-form";
import mapConst                   from "../constants/Map";
import appConst                   from "../constants/App";
import LICENSES                   from "../constants/Licenses";
import { MAIN_IDS, IDS }          from "../constants/Categories";
import i18n                       from "../i18n";


const flatten = nestedArray => nestedArray.reduce(
  (a, next) => a.concat(Array.isArray(next) ? flatten(next) : next), []
);

const getLicenseForEntry = currentLicense => {
  if (currentLicense && currentLicense == LICENSES.ODBL) {
    return currentLicense;
  } else {
    return NEW_ENTRY_LICENSE;
  }
};

const Actions = {

  search: () =>
    (dispatch, getState) => {

      dispatch({
        type: T.SET_SEARCH_TIME,
        payload: Date.now()
      });

      const searchFn = () => {
          dispatch({
            type: T.SET_SEARCH_TIME,
            payload: null
          });
          console.log("SEARCH\n");
          const { search, map } = getState();
          var cats = search.categories;
          const sw = map.bbox._southWest;
          const ne = map.bbox._northEast;
          const bbox = [sw.lat, sw.lng, ne.lat, ne.lng];

          // show no-category entries (e.g. from OSM) when standard categories are shown:
          if(cats && cats.includes(MAIN_IDS[0]) && cats.includes(MAIN_IDS[2])) {
            cats = [];
          }

          if (search.text == null || !search.text.trim().endsWith("#")) {

            WebAPI.search(search.text, cats, bbox, (err, res) => {
              dispatch({
                type: T.SEARCH_RESULT,
                payload: err || res,
                error: err != null,
                noList: search.text == null
              });

              const entries =
                Array.isArray(res != null ? res.visible : void 0)
                ? Array.isArray(res.invisible)
                  ? res.visible.concat(res.invisible)
                  : res.visible
                : res != null
                  ? res.invisible
                  : void 0;

              const ids = entries ? entries.map(e => e.id) : null;

              if (ids && (Array.isArray(ids)) && ids.length > 0) {
                dispatch(Actions.getEntries(ids));
              } else {
                dispatch({
                  type: T.NO_SEARCH_RESULTS
                });
              }
            });

            if (search.text != null) {
              const address = search.text.replace(/#/g, "");
              WebAPI.searchAddressTilehosting(address, (err, res) => {
                dispatch({
                  type: T.SEARCH_ADDRESS_RESULT,
                  payload: err || res.results,
                  error: err != null
                });
              });
            }
          }
//<<<<< HEAD

          //our: delete logging when works
          console.log("Action:server: res.effects available to getProducts?: " + res.effects);
          const prod_ids =
            Array.isArray(res != null ? res.effects : void 0) ? res.effects : void 0; 
          //our: delete logging when works
          console.log("Action:server: res.effects is array: " + Array.isArray(res.effects));

          if ((Array.isArray(prod_ids)) && prod_ids.length > 0) {
            dispatch(Actions.getProducts(prod_ids));
          } else {
            dispatch({
              type: T.NO_PRODUCT_SEARCH_RESULTS
            });
          }
        };
//=====
//our   schl.klammer;
//>>>>> master

      const triggerSearch = () => {

        const { timedActions } = getState();
        const lastTriggered = timedActions.searchLastTriggered;

        if (lastTriggered != null) {
          const duration = Date.now() - lastTriggered;
          if (duration > appConst.SEARCH_DELAY) {
            searchFn();
          } else {
            setTimeout(triggerSearch, appConst.SEARCH_DELAY);
          }
        }
      };

      setTimeout(triggerSearch, appConst.SEARCH_DELAY+5);

    },

  searchCity: () =>
    (dispatch, getState) => {
      const s = getState().search;
      WebAPI.searchAddressTilehosting(s.city, (err, res) => {
        dispatch({
          type: T.SEARCH_ADDRESS_RESULT,
          payload: err || res.results,
          error: err != null
        });
      });
    },

  getEntries: (ids = []) =>
    (dispatch, getState) => {
      let {
        fetchedAllEntries,
        moreEntriesAvailable
      } = getState().search;
      dispatch({
        type: T.SET_MORE_ENTRIES_AVAILABLE,
        payload: !fetchedAllEntries && (ids.length > ServerConstants.NUM_ENTRIES_TO_FETCH)
      });
      ids = ids.slice(0, ServerConstants.NUM_ENTRIES_TO_FETCH);

      const entries = getState().server.entries;
      const fetch_ids_entries = ids.filter((x) => entries[x] == null);
      if (fetch_ids_entries.length > 0) {
        WebAPI.getEntries(ids, (err, res) => {
          dispatch({
            type: T.ENTRIES_RESULT,
            payload: err || res,
            error: err != null
          });
          if (!err) {
            const {
              ratings
            } = getState().server;
            const ids = flatten(res.map(e => e.ratings));
            const fetch_ids_ratings = ids.filter((x) => ratings[x] == null);
            if (fetch_ids_ratings.length > 0) {
              dispatch(Actions.getRatings(fetch_ids_ratings));
            }
          }
        });
      } else {
        const entr = Object.keys(entries).map((key) => entries[key])
        dispatch({
          type: T.ENTRIES_RESULT,
          payload: entr.filter((e) => ids.includes(e.id)),
          error: false
        })
      }
    },

  getRatings: (ids = []) =>
    (dispatch) => {
      WebAPI.getRatings(ids, (err, res) => {
        dispatch({
          type: T.RATINGS_RESULT,
          payload: err || res,
          error: err != null
        });
      });
    },

  getProducts: (ids = []) => // does this var have to be prod_ids?
    (dispatch) => {
      WebAPI.getProducts(ids, (err, res) => {
        dispatch({
          type: T.PRODUCTS_RESULT,
          payload: err || res,
          error: err != null
        });
      });
    },

  getAllCategories: () =>
    (dispatch) => {
      WebAPI.getAllCategories((err, res) => {
        dispatch({
          type: T.CATEGORIES_RESULT,
          payload: err || res,
          error: err != null
        });
      });
    },

  getServerInfo: () =>
    (dispatch) => {
      WebAPI.getServerInfo((err, res) => {
        dispatch({
          type: T.SERVER_INFO_RESULT,
          payload: err || res,
          error: err != null
        });
      });
    },

  subscribeToBbox: (bbox, changeExistingBbox) =>
    (dispatch) => {
      WebAPI.subscribeToBbox(bbox, (err, res) => {
        if (err) {
          dispatch({
            type: T.SUBSCRIBE_TO_BBOX_RESULT,
            payload: err
          });
          dispatch({
            type: 'GROWLER__SHOW',
            growler: {
              text: i18n.t("growler.genericError"),
              type: 'growler--error'
            }
          });
        } else {
          dispatch({
            type: T.SUBSCRIBE_TO_BBOX_RESULT,
            payload: res
          });
          dispatch({
            type: 'GROWLER__SHOW',
            growler: {
              text: changeExistingBbox ? i18n.t("growler.subscriptionChanged") : i18n.t("growler.subscriptionAdded"),
              type: 'growler--success'
            }
          });
          dispatch({
            type: 'UPDATE_SUBSCRIPTION_INFO',
            subscriptionExists: true
          })
        }
      })
    },

  unsubscribeFromBboxes: (username) =>
    (dispatch, getState) => {
      WebAPI.unsubscribeFromBboxes((err, res) => {
        if (err) {
          dispatch({
            type: 'GROWLER__SHOW',
            growler: {
              text: i18n.t("growler.genericError"),
              type: 'growler--error'
            }
          });
        } else {
          dispatch({
            type: 'GROWLER__SHOW',
            growler: {
              text: i18n.t("growler.unsubscribingSuccessfull"),
              type: 'growler--success'
            }
          });
          dispatch({
            type: 'UPDATE_SUBSCRIPTION_INFO',
            subscriptionExists: false
          })
        }
      })
    },

  saveEntry: (e) =>
    (dispatch, getState) => {
      const saveFunc = (e != null ? e.id : void 0) ? WebAPI.saveEntry : WebAPI.saveNewEntry;
      e.license = getLicenseForEntry(e.license);

      saveFunc(e, (err, res) => {
        if (err) {
          dispatch(stopSubmit(EDIT.id, {
            _error: err
          }));
        } else {
          const id = (e != null ? e.id : void 0) || res;
          WebAPI.getEntries([id], (err, res) => {
            dispatch(initialize(EDIT.id, {}, EDIT.fields));
            if (!err) {
              dispatch({
                type: T.SET_CURRENT_ENTRY,
                payload: id,
              });
              dispatch({
                type: T.NEW_ENTRY_RESULT,
                payload: res[0]
              });
              dispatch({
                type: 'GROWLER__SHOW',
                growler: {
                  text: i18n.t("growler.entrySaved"),
                  type: 'growler--success'
                }
              });
            }
          });
        }
      });
    },

  editCurrentEntry: () =>
    (dispatch, getState) => {
      dispatch({
        type: T.SHOW_IO_WAIT
      });
      WebAPI.getEntries([getState().search.current], (err, res) => {
        if (!err) {
          dispatch({
            type: T.ENTRIES_RESULT,
            payload: res
          });
          const currentEntry = getState().server.entries[getState().search.current]
          dispatch({
            type: T.EDIT_CURRENT_ENTRY,
            payload: currentEntry
          });
          if(!currentEntry.street || !currentEntry.zip || !currentEntry.city){
            const latlng = {
              lat: currentEntry.lat,
              lng: currentEntry.lng
            }
            console.log("\n\nSET ADDRESS FROM MARKER\n\n", latlng);
            dispatch(Actions.setMarker(latlng));
          }
        } else {
          dispatch({
            type: T.EDIT_CURRENT_ENTRY,
            payload: err,
            error: true
          });
        }
      });
    },

  editCurrentProduct: () =>
    (dispatch, getState) => {
      dispatch({
        type: T.SHOW_IO_WAIT
      });
      WebAPI.getProducts([getState().search.current], (err, res) => {
        if (!err) {
          dispatch({
            type: T.PRODUCTS_RESULT,
            payload: res
          });
          const state = getState();
          dispatch({
            type: T.EDIT_CURRENT_PRODUCT,
            payload: state.server.products[state.search.current]
          });
        } else {
          dispatch({
            type: T.EDIT_CURRENT_PRODUCT,
            payload: err,
            error: true
          });
        }
      });
    },

  createRating: (rating) =>
    (dispatch, getState) => {
      const r = {
        ...rating,
        value: Number.parseInt(rating.value)
      };
      WebAPI.createRating(r, (err, res) => {
        if (err) {
          dispatch(stopSubmit(RATING.id, {
            _error: err
          }));
        } else {
          WebAPI.getEntries([r.entry], (err, res) => {
            dispatch({
              type: T.ENTRIES_RESULT,
              payload: err || res,
              error: err != null
            });
            if (!err && res && res.length == 1) {
              dispatch({
                type: T.SET_CURRENT_ENTRY,
                payload: res[0].id,
              });
              dispatch(Actions.getRatings(res[0].ratings));
              dispatch({
                type: 'GROWLER__SHOW',
                growler: {
                  text: i18n.t("growler.ratingSaved"),
                  type: 'growler--success'
                }
              });
              dispatch(initialize(RATING.id, {}, RATING.fields));
            }
          });
        }
      });
    },

  saveProduct: (p) =>
    (dispatch, getState) => {
      const saveFunc = (p != null ? p.id : void 0) ? WebAPI.saveProduct : WebAPI.saveNewProduct;
      p.license = getLicenseForEntry(p.license);
      //our log, delete when works
      console.log('saveProduct Action, value of p: ' + JSON.stringify(p));

      saveFunc(p, (err, res) => {
        if (err) {
          dispatch(stopSubmit(PRODUCT.id, {
            _error: err
          }));
        } else {
          const id = (p != null ? p.id : void 0) || res;
          WebAPI.getProducts([id], (err, res) => {
            dispatch(initialize(PRODUCT.id, {}, PRODUCT.fields));
            if (!err) {
              dispatch({
                type: T.SET_CURRENT_PRODUCT,
                payload: id,
              });	
              dispatch({
                type: T.NEW_PRODUCT_RESULT,
                payload: res[0]
              });
              dispatch({
                type: 'GROWLER__SHOW',
                growler: {
                  text: 'Produkt wurde gespeichert.',
                  type: 'growler--success'
                }
              });
            }
          });
        }
      });
    },

  setMarker: (latlng) =>
    (dispatch, getState) => {
      dispatch({
        type: T.SET_MARKER,
        payload: latlng,
        manual: true
      });
      WebAPI.searchGeolocation(latlng, (err, res) => {
        dispatch({
          type: T.MARKER_ADDRESS_RESULT,
          payload: err || res,
          error: err != null
        });
      });
    },

  geocodeAndSetMarker: (address) =>
    (dispatch, getState) => {
      if (!getState().form.edit.kvm_flag_markerWasEnteredManually) {
        WebAPI.searchAddressNominatim(address, (err, res) => {
          if (!(err || getState().form.edit.kvm_flag_markerWasEnteredManually)) {
            if (res && res.length && res[0] && res[0].lat && res[0].lon) {
              dispatch({
                type: T.SET_MARKER,
                payload: {
                  lat: parseFloat(res[0].lat),
                  lng: parseFloat(res[0].lon)
                },
                manual: false,
                error: err != null
              });
              dispatch({
                type: T.SET_ZOOM,
                payload: parseFloat(mapConst.ENTRY_DEFAULT_ZOOM)
              });
            }
          }
        });
      }
    },

  login: (username, password) =>
    (dispatch, getState) => {
      dispatch({
        type: T.LOGIN_SUBMITTING
      });
      WebAPI.login({
        username,
        password
      }, (err, res) => {
        if (err) {
          dispatch(stopSubmit(LOGIN.id, {
            _error: err
          }));
        } else {
          WebAPI.getUser(username, (err, res) => {
            dispatch({
              type: T.LOGIN_RESULT,
              payload: err || res,
              error: err != null
            });
          });
          WebAPI.getBboxSubscriptions((err, res) => {
            if (!err) {
              dispatch({
                type: T.UPDATE_SUBSCRIPTION_INFO,
                subscriptionExists: res.body.length > 0
              })
            }
          });
        }
      });
    },

  register: (username, password, email) =>
    (dispatch, getState) => {
      dispatch({
        type: T.REGISTER_SUBMITTING
      });
      WebAPI.register({
        username,
        password,
        email
      }, (err, res) => {
        if (err) {
          dispatch(stopSubmit(REGISTER.id, {
            _error: err
          }));
        } else {
          dispatch({
            type: T.REGISTER_RESULT,
            result: res,
            email: email
          });
        }
      });
    },

  confirmEmail: (username) =>
    (dispatch, getState) => {
      WebAPI.confirmEmail(username, (err, res) => {
        if (err) {
          dispatch({
            type: T.EMAIL_CONFIRMATION_RESULT,
            error: true
          })
        } else {
          dispatch({
            type: T.EMAIL_CONFIRMATION_RESULT,
            error: false
          })
        }
      })
    },

  deleteAccount: () =>
    (dispatch, getState) => {
      WebAPI.deleteAccount(getState().user.username, (err, res) => {
        if (!err) {
          dispatch({
            type: T.LOGOUT
          });
        }
      });
    },

  highlight: (id) => {
    if (id == null) {
      id = [];
    }
    if (!Array.isArray(id)) {
      id = [id];
    }
    return {
      type: T.HIGHLIGHT_ENTRIES,
      payload: id
    };
  }
}

module.exports = {
  Actions: Actions,
  getLicenseForEntry: getLicenseForEntry
};
