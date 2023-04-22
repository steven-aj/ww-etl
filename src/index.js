import WPClient from './clients/WPClient.js';
import WPCLient from './clients/WPClient.js';
import WixClient from "./clients/WixClient.js";
import WixParser from './lib/WixParser.js';

async function loadPosts() {
    let { posts } = await WixClient.getPosts();
    return posts;
}

async function transcribeCategories(labels) {
    let categories = [];
    for (let i = 0; i < labels.length; i++) {
        categories.push( await WPClient.getCategoryId(labels[i]) )
    }
    return categories;
}

function transferMedia(coverMedia) {
    if (!coverMedia.image) return null;
    console.log("... cover found. Transferring media.")
    return WPClient.importCoverPhoto(coverMedia);
}

function formatSingle(post) {
    return new Promise(async (resolve, reject) => {
        if (!post) reject('Failed to format single post: no post found.');

        post.categoryIds = await WixClient.getCategoryLabels(post.categoryIds).then( transcribeCategories );
        post.coverMedia = await transferMedia(post.coverMedia);

        resolve({
            title: post.title,
            excerpt: post.excerpt,
            firstPublishedDate: post.firstPublishedDate,
            lastPublishedDate: post.lastPublishedDate,
            categories: post.categoryIds,
            featured_media: post.coverMedia,
            content: WixParser.parseContent(post.richContent)
        })
    });
}

async function start() {
    let posts = await loadPosts();

    for (let i = 0; i < posts.length; i++) {
        let post = await WixClient
        .getSingle(posts[i].id)
        .then(async ({ post }) => await formatSingle(post));

        console.log(`Publishing: ${post.title}...`);

        await WPCLient.createPost(post);
    }
}

start();