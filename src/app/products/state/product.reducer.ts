import { createAction, createReducer, on } from "@ngrx/store";

export const productReducer = createReducer(
    {showProductCode : false},
    on(createAction('[Product] Toggle product code'), (state) =>{
        console.log('initial state' ,state);
        return {
            ...state,
            showProductCode : !state.showProductCode
        }
    })
)