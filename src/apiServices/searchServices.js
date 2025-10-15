import * as request from '~/utils/request';

export async function search(q, type = 'less') {
    try {
        const res = await request.get('users/search', {
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
