import React, {useContext, createContext, useReducer } from 'react'

const StateContext = createContext();

const initialState = {
    user: "George",
};

const reducer = (state, action) => {
    console.log(action);
    switch(action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            };

        default:
            return state;
    }
};

function StateProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value= {state, dispatch};
    return <StateContext.Provider value = {value}>
        {children}
    </StateContext.Provider>
}

function useStateContext() {
    const context = useContext(StateContext)
    if(context === undefined) {
        throw new Error("WHAT THE FUCK")
    }
    return context;
}

export default useStateContext;







/*export const StateProvider = ({reducer, initialState, children}) => {
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
};

export const useStateValue = () => useContext(StateContext);*/



