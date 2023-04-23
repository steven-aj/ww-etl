# Wix-to-WordPress Blog ETL Kit
`v1.1-alpha` - Only supports blog migrations

> **DISCLAIMER** This project is still in its early stages of development and may produce undesired results. Use at your own risk.

> **SECURITY WARNING** This kit uses Basic Authentication for WordPress. This isn't the most secure method and is likely to change in the future. To use it, be sure to installl the [Basic Authentication Handler](https://github.com/WP-API/Basic-Auth) plugin on your WordPress project before executing the script. I recommend de-activating the plugin after migration.

## Pre-requisites
You'll need NPM to run this kit.

*Before running*, be sure to install NPM packages and to configure the library to point to your Wix source & WordPress target projects.

To ensure that cover photos on your Wix project migrate approprately, it's worth noting that you will need to be certain your WordPress hosting environment can handle all of the image-sizes of your Wix Blog Posts.

### 1. Installing Dependencies
Run `npm i` in  your terminal

#### Packages Included:
- [nodemon](https://github.com/remy/nodemon)
- [axios](https://www.npmjs.com/package/axios)
- [wpapi](https://github.com/wp-api/node-wpapi)

### 2. Configuring the Kit
Open `config.js` and locate the `wix_config` & `wp_config` JSON objects.

For `wix_config`, you will need the Site ID (*found as a slug of your Wix Dashboard's UR*L) plus your Account ID and API key - both of which can be found under ```Account > Account Settings > API Key``` through your **Wix Dashboard**.

For `wp_config`, replace `https://yoursite.com` with your WordPress project's domain and enter your username & password.

## Running the Script
As of this version, you may use `npm run dev` or `npm run start`. Both will execute the script immediately.