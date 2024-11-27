
const BASE_URL = import.meta.env.VITE_API_URL;

export const ROUTE_NAME = {

    postRecommendations: `${BASE_URL}/recommendations`,
    getRecomended(user_id: string | number){
        return `${BASE_URL}/users/${user_id}/recommendations`;
    } 

}