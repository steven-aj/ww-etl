import WPAPI from 'wpapi';
import { wp_config } from '../../config.js';
import { File } from '@web-std/file';

var wp = new WPAPI(wp_config);

async function createImageBuffer(response) {
    return Buffer.from( await response.arrayBuffer() );
}

const WPClient = {
    createPost: (data) => wp.posts()
        .create({ status: 'publish', ...data })
        .catch(console.error),
    
    createCategory: (label) => wp.categories()
        .create({name: label})
        .then(({id}) => id)
        .catch(({data}) => data.term_id),
    
    getCategoryId: (label) => wp.categories()
        .search(label)
        .then(data => data.length ? data[0].id : WPClient.createCategory(label)),
    
    importCoverPhoto: async ({image}) => fetch(image.url)
            .then( createImageBuffer )
            .then( buffer => wp.media().file(buffer, image.id).create({title: image.id}) )
            .then(({id}) => id)
            .catch( console.error )
}

export default WPClient;