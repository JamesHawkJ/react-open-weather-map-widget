import { IGeocodingContext, IGeocodingState } from "types/geocoding";

export const geocoding: IGeocodingState = {
    coords: null,
    loading: false,
    errors: [],
};

export const geocodingContext: IGeocodingContext = {
    state: geocoding,
    dispatch: () => null,
    getLocationCoords: () => () => null,
    clearLocationCoords: () => () => null,
};
