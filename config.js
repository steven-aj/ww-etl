export const wix_config = {
    //Site ID: can be found in the slug of the user's Dashboard
    'wix-site-id': 'xxxxxxxxx-xxxxxxxxx-xxxxxxxxx',
    //Account ID: found in Account > Account Settings > API Keys
    'wix-account-id': 'xxxxxxxxx-xxxxxxxxx-xxxxxxxxx',
    //Authorization: API Key generated through: Account > Account Settings > API Keys
    Authorization: '[massive-token-here]'

};



export const wp_config = {
    // The target of your website (must include /wp-json slug)
    endpoint: 'https://your_site.com/wp-json',
    // Assuming you're using basic auth
    username: 'your-username',
    password: 'your-password'
};