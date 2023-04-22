import axios from 'axios';
import { wix_config } from '../../config.js';

let wix = axios.create({
    baseURL: 'http://www.wixapis.com/blog/v3',
    headers: wix_config
});

const WixClient = {
    /**
     * Fetches the first 100 wix posts.
     * 
     * @returns {Promise} Array of Wix posts
     */
    getPosts: async () => wix
        .get('/posts')
        .then(res => res.data),

    /**
     * Fetches a single post by its ID
     * 
     * @param {String} id Wix Post ID 
     * @returns {Promise} Single Wix post
     */
    getSingle: async (id) => await wix
        .get(`/posts/${id}`, {
            params: { fieldsToInclude: 'RICH_CONTENT' }
        })
        .then(res => res.data),

    /**
     * Fetches a single category by its ID
     * 
     * @param {String} id Wix Category ID 
     * @returns {Promise} Single Wix Category
     */
    getCategory: async (id) => await wix
        .get(`/categories/${id}`)
        .then(res => res.data),

    /**
     * Fetches category labels by their ID.
     * 
     * @param {Array} list Array of Wix Category IDS 
     * @returns {Promise} Array of Wix Category Labels
     */
    getCategoryLabels: async (list) => await new Promise(async (resolve) => {
        if (!list.length) resolve(list);

        let categories = [];
        for (let i = 0; i < list.length; i++) {
            let { category } = await WixClient.getCategory(list[i]);
            categories.push(category.label);
        }
        resolve(categories);
    }),
}

export default WixClient