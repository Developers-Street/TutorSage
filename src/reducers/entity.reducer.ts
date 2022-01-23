import { Entity } from "../Models/Entity";

export interface EntityState<T extends Entity = Entity> {
    byId: {
        [id: number]: T;
    }
    selectedId?: number;
    isFormSubmitting?: boolean;
    errorMessage?: string;
    query: string;
    loadingOne: boolean;
    loadingList: boolean;
    loadingListErrorMessage?: string;
    loadingOneErrorMessage?: string;
};

export const initialEntityState = {
    byId: {},
    query: "",
    loadingOne: false,
    loadingList: false
};

export const getIds = (entities: Entity[]) => entities.map((e) => e.id);;

export const selectMany = (state: EntityState, query: string) => ({
    ...state,
    query: query,
    loadingList: true,
    loadingListErrorMessage: undefined
});

export const selectOne = (state: EntityState, id: number) => ({
    ...state, selectedId: id,
    loadingOne: true,
    loadingOneErrorMessage: undefined,
});

// export const setErrorMessage = (
//     state: EntityState,
//     id: number,
//     message: string
// ) => {
//     if (state.selectedId !== id) return state;
//     return {
//         ...state,
//         errorMessage: message,
//         loadingOne: false,
//     };
// };

export const setErrorForMany = (state: EntityState, query: string ,msg: string) => {
    if(state.query !== query) {
        return state;
    }

    return {...state, loadingListErrorMessage: msg, loadingList: false};
}

export const setErrorForOne = (state: EntityState, id: number, msg: string) => {
    if (state.selectedId !== id) {
        return state;
    }

    return { ...state, loadingOneError: msg, loadingOne: false };
}

export const addOne = (state: EntityState, entity: Entity, loading?: boolean) => {
    const newLoading = loading === undefined ? state.loadingOne : loading;
    return {
        ...state,
        byId: { ...state.byId, [entity.id]: entity },
        loadingOne: newLoading
    };
};

export const addMany = (state: EntityState, entities: Entity[]) => {
    if (entities.length === 0) {
        return state;
    }
    const entityMap = entities.reduce((prev, entity) => {
        return { ...prev, [entity.id]: entity };
    }, {});
    return {
        ...state,
        byId: { ...state.byId, ...entityMap }
    };
}