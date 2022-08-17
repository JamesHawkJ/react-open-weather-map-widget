import { handleResponse } from './handle-response';

describe('handleResponse function', function () {
    let response: { status: number, json?: () => string };

    it('should return the body of response on 200 status', async function () {
        const body = 'response';
        response = { status: 200, json: () => body };
        expect(await handleResponse(response as unknown as Response)).toEqual(body);
    });

    it('should throw "Your API token seems to be invalid." error on 401 status', async function () {
        response = { status: 401 };

        try {
            await handleResponse(response as unknown as Response);
        } catch (error) {
            expect((error as Error).message).toEqual("Your API token seems to be invalid.");
        }
    });

    it('should throw "Your API token seems to be invalid." error on 403 status', async function () {
        response = { status: 403 };

        try {
            await handleResponse(response as unknown as Response);
        } catch (error) {
            expect((error as Error).message).toEqual("Your API token seems to be invalid.");
        }
    });

    it(`should throw "The API request didn't return any results." error on 404 status`, async function () {
        response = { status: 404 };

        try {
            await handleResponse(response as unknown as Response);
        } catch (error) {
            expect((error as Error).message).toEqual("The API request didn't return any results.");
        }
    });

    it('should throw "Unexpected error occured please try again later." error on any other status', async function () {
        response = { status: 201 };

        try {
            await handleResponse(response as unknown as Response);
        } catch (error) {
            expect((error as Error).message).toEqual("Unexpected error occured please try again later.");
        }

        response = { status: 301 };

        try {
            await handleResponse(response as unknown as Response);
        } catch (error) {
            expect((error as Error).message).toEqual("Unexpected error occured please try again later.");
        }

        response = { status: 500 };

        try {
            await handleResponse(response as unknown as Response);
        } catch (error) {
            expect((error as Error).message).toEqual("Unexpected error occured please try again later.");
        }
    });
});
