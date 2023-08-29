import { createAction, createReducer , on} from "@ngrx/store";

export const maskUserNameReducer = createReducer(
    {maskUserName : false},
    on(createAction('[maskUserName] Toggle mask user'), (state) => {
        return {
        ...state,
        maskUserName : !state.maskUserName
        }
    })
);