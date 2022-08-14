import { IGeocodingData, GetCoordsParams } from "types/geocoding";

import { handleResponse } from "functions/handle-response";

export const getCoords = async (params: GetCoordsParams): Promise<IGeocodingData> => {
    const query = new URLSearchParams(params).toString();
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?${query}`, { method: 'GET' });
        const body: IGeocodingData[] = await handleResponse<IGeocodingData[]>(response);
        if (!body.length) {
            throw new Error(`The API couldn't retrieve coordinates for "${params.q}".`);
        }
        return body[0];
    } catch (error) {
        throw error;
    };
};
