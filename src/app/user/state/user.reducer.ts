import { createAction, createReducer , on} from "@ngrx/store";

export const maskUserName = createReducer(
    {maskUserName : false},
    on(createAction('[maskUserName] Toggle mask user'), (state) => {
        return {
        ...state,
        maskUserName : !state.maskUserName
        }
    })
);