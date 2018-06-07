import T from "../constants/ActionTypes";
import V from "../constants/PanelView";
import C from "../constants/Categories";

const initialState = {
  menu: false,
  left: V.RESULT,
  right: null,
  modal: null,
  waiting_for_search_results: true,
  explainRatingContext: null,
  selectedContext: null,
  showLeftPanel: true
};

module.exports = (state=initialState, action={}) => {

  const { payload } = action;
  const m = !state.menu;
  let newView = V[payload];

  switch (action.type) {
    case T.TOGGLE_MENU:
      if (state.modal != null) {
        return state;
      }
      return {
        ...state,
        menu: m,
        //oc need: right: m ? state.right : null,
        //oc need: left: m ? null : state.left
      }

    case T.SHOW_MENU:
      return {
        ...state,
        menu: true,
        right: null
      }

    case T.SHOW_INFO:
      if (newView === void 0) {
        newView = null;
      }
      return {
        ...state,
        menu: newView !== null,
        right: newView
      }

    case T.SHOW_SUBSCRIBE_TO_BBOX:
      return {
        ...state,
        menu: false,
        right: null,
        left: V.SUBSCRIBE_TO_BBOX
      }

    case T.SUBSCRIBE_TO_BBOX_RESULT: 
      return {
        ...state,
        left: V.RESULT
      }

    case T.REGISTER_RESULT:
      if (state.right === V.REGISTER) {
        return {
          ...state,
          right: V.REGISTER_SUCCESS
        }
      }
      return state

    case T.LOGIN_RESULT:
      if (action.error) {
        return {
          ...state,
          right: V.LOGIN_ERROR
        }
      } else {
        return {
          ...state,
          right: V.LOGIN_SUCCESS
        }
      }

    case T.SHOW_IMPRINT:
      return {
        ...state,
        menu: true,
        right: V.IMPRINT
      }

    case T.SHOW_NEW_ENTRY:
      return {
        ...state,
        menu: false,
        left: V.NEW
      }
    case T.SHOW_NEW_PRODUCT:
      return {
        ...state,
        menu: false,
        left: V.NEW_PRODUCT
      }
    case T.SHOW_NEW_RATING:
      return {
        ...state,
        menu: false,
        left: V.NEW_RATING,
        explainRatingContext: null,
        selectedContext: null
      }
    case T.EDIT_CURRENT_ENTRY:
      if (!action.error) {
        return {
          ...state,
          menu: false,
          left: V.EDIT
        }
      }
      return {
        ...state,
        left: V.IO_ERROR
      }

    case T.EDIT_CURRENT_PRODUCT:
      if (!action.error) {
        return {
          ...state,
          menu: false,
          left: V.EDIT_PRODUCT
        }
      }
      return {
        ...state,
        left: V.IO_ERROR
      }

    case T.SHOW_IO_WAIT:
      return {
        ...state,
        left: V.WAIT
      }

    case T.CANCEL_NEW:
    case T.CANCEL_WAIT_IO:
      return {
        ...state,
        left: V.RESULT
      }
    case T.CLOSE_IO_ERROR_MESSAGE:
      return {
        ...state,
        left: null
      }

    case T.CANCEL_NEW_PRODUCT:
      return {
        ...state,
        left: V.RESULT_PRODUCT
      }
    case T.CANCEL_RATING:
    case T.CANCEL_EDIT:
      return {
        ...state,
        left: V.ENTRY
      }
    case T.CANCEL_EDIT_PRODUCT:
      return {
        ...state,
        left: V.PRODUCT
      }
    case T.NEW_ENTRY_RESULT:
      if (!action.error) {
        return {
          ...state,
          left: V.ENTRY
        }
      }
      return state;

    case T.NEW_PRODUCT_RESULT: 
      if (!action.error) {
        return {
          ...state,
          left: V.PRODUCT }
      }
      return state;

    case T.SEARCH_RESULT:
      if (action.error) {
        return {
          ...state,
          left: V.IO_ERROR
        }
      } else if (!((state.left != null) || action.noList)) {
        return {
          ...state,
          left: V.RESULT
        }
      }
      return state;

    case T.ENTRIES_RESULT:
    case T.NO_SEARCH_RESULTS:
    case T.NO_PRODUCT_SEARCH_RESULT:
      return {
        ...state,
        waiting_for_search_results: false
      }

    case T.SET_CURRENT_ENTRY:
      return {
        ...state,
        left: action.payload != null ? V.ENTRY : V.RESULT,
        menu: false
      }

    case T.SET_CURRENT_PRODUCT:
      return {
        ...state,
        left: action.payload != null ? V.PRODUCT : V.RESULT_PRODUCT,
        menu: false
      }

    case T.SHOW_MAP:
      return {
        ...state,
        menu: false,
      }

    case T.SHOW_LEFT_PANEL:
      return {
        ...state,
        showLeftPanel: true
      }

    case T.HIDE_LEFT_PANEL:
      return {
        ...state,
        showLeftPanel: false
      }

    case T.SHOW_SEARCH_RESULTS:
      return {
        ...state,
        left: V.RESULT,
        waiting_for_search_results: true
      }

    case T.SHOW_PRODUCT_SEARCH_RESULTS:
      return {
        ...state,
        left: V.RESULT_PRODUCT,
        waiting_for_search_results: true
      }

    case T.SHOW_OWN_POSITION:
      return {
        ...state,
        modal: V.LOCATE
      }

    case T.CANCEL_OWN_POSITION:
      return {
        ...state,
        modal: null
      }
    case T.OWN_POSITION_RESULT:

      if (action.payload) {
        return {
          ...state,
          modal: null
        }
      } else if (state.modal === V.LOCATE) {
        return {
          ...state,
          modal: V.LOCATE_DISABLED
        }
      }
      return state;

    case T.SHOW_FEATURE_TO_DONATE:
      if (payload) {
        switch (payload) {
          case "events":
            return {
              ...state,
              modal: V.DONATE_FOR_EVENTS
            }
          default:
            return state;
        }
      }
      return {
        ...state,
        modal: null
      }

    case T.EXPLAIN_RATING_CONTEXT:
      return{
        ...state,
        explainRatingContext: action.payload
      }

    case T.EMAIL_CONFIRMATION_RESULT:
      if(action.error){
        return{
          ...state,
          menu: true,
          right: V.CONFIRM_EMAIL_ERROR
        }
      } else{
        return{
          ...state,
          menu: true,
          right: V.EMAIL_CONFIRMED
        }
      }

    case "@@redux-form/CHANGE":
      if (action.meta.field === "category" && action.payload === C.IDS.EVENT) {
        return {
          ...state,
          modal: V.DONATE_FOR_EVENTS
        }
      }
      if (action.meta.field === "context"){
        return {
          ...state,
          selectedContext: action.payload
        }
      }
      return state;
    case T.SHOW_RESULT_PAGE:
      return {
        ...state,
        menu: true,
        right: V.RESULT_PAGE
      }


    default:
      return state;
  }
};
