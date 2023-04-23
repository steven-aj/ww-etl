import WPClient from './clients/WPClient.js';
import WixClient from "./clients/WixClient.js";
import WixParser from './lib/WixParser.js';

async function extract() {
    let { posts } = await WixClient.getPosts();
    return posts;
}

function transform(post) {
    return new Promise(async (resolve, reject) => {
        if (!post) reject('Failed to transform Wix post: no post found.');
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

async function transcribeCategories(labels) {
    let categories = [];
    for (let i = 0; i < labels.length; i++) {
        categories.push( await WPClient.getCategoryId(labels[i]) )
    }
    return categories;
}

function transferMedia(coverMedia) {
    if (!coverMedia.image) return null;
    console.log("... cover photo found. Transferring media.")
    return WPClient.importCoverPhoto(coverMedia);
}

async function load() {
    let posts = await extract();

    for (let i = 0; i < posts.length; i++) {
        let post = await WixClient
        .getSingle(posts[i].id)
        .then(async ({ post }) => await transform(post));

        console.log(`Publishing: ${post.title}...`);

        post.categories = await WixClient.getCategoryLabels(post.categories).then( transcribeCategories );
        post.featured_media = await transferMedia(post.featured_media);

        await WPCLient.createPost(post);
    }
}

load();