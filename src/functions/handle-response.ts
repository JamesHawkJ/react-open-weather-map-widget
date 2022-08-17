export const handleResponse = async <T>(response: Response): Promise<T> => {
    switch (response.status) {
        case 200:
            const body: T = await response.json();
            return body;
        case 401:
        case 403:
            throw new Error('Your API token seems to be invalid.');
        case 404:
            throw new Error('The API request didn\'t return any results.');
        default:
            throw new Error('Unexpected error occured please try again later.');
    }
};
