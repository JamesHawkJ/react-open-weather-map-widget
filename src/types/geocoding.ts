import { FETCH_ACTIONS, GEOCODING_ACTIONS, TEST_ACTIONS } from "constants/action-types";

export interface IFetchGeocodingAction {
    type: FETCH_ACTIONS | TEST_ACTIONS;
    payload?: ICoords | string;
};

export interface IGeocodingAction {
    type: GEOCODING_ACTIONS;
    payload?: string;
};

export interface ICoords {
    lat: number;
    lon: number;
};

export interface IGeocodingState {
    coords: ICoords | null;
    loading: boolean;
    errors: string[];
};

export type GetCoordsParams = Record<'q' | 'appid' | 'limit', string>;

export interface IGeocodingData {
    name: string;
    local_names: any,
    lat: number,
    lon: number,
    country: string
};

export interface IGeocodingContext {
    state: IGeocodingState;
    dispatch: (action: IFetchGeocodingAction | IGeocodingAction) => void;
    getLocationCoords: CoordsAction;
    clearLocationCoords: VoidAction;
};

export type CoordsAction = (dispatch: ({ type, payload }: IFetchGeocodingAction) => void) => (appid: string, cityName: string, limit?: string) => void;

export type VoidAction = (dispatch: ({ type }: IGeocodingAction) => void) => () => void;
