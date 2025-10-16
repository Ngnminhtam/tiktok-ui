import * as httpRequest from '~/utils/httpRequest';

export async function search(q, type = 'less') {
    try {
        const res = await httpRequest.get('users/search', {
            params: {
                q,
                type,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
}
