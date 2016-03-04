import { readFileSync } from 'fs';
import mime from 'mime';
import handleAssets from './components/assets';
import handleCatalogue from './components/catalogue';
import handlePost from './components/post';
import handlePosts from './components/posts';
import handleUniversal from './components/universal';

/**
 * @method configure
 * @param {Object} options
 * @return {Function}
 */
export function configure(options) {

    const script = options.fromCore('/dory.js');
    const styles = options.fromCore('/dory.css');
    const favIcon = readFileSync(`${options.publicPath}/favicon.ico`);

    /**
     * @method sendFile
     * @param {Object} file
     * @return {Function}
     */
    const sendFile = file => {

        return (request, response) => {
            response.set('content-type', mime.lookup(request.url));
            response.send(file);
        };

    };

    return app => {

        // Define the API routes.
        app.get('/api/catalogue', handleCatalogue(options));
        app.get('/api/catalogue', handleCatalogue(options));
        app.get('/api/post/:slug', handlePost(options));
        app.get('/api/posts/:pageNumber', handlePosts(options));

        // Followed by the asset routes.
        app.get('/dory.js', sendFile(script));
        app.get('/dory.css', sendFile(styles));
        app.get('/favicon.ico', sendFile(favIcon));
        app.use('(/images|.json$)', handleAssets(`${options.publicPath}/images`)(options));

        // ...And finally the universal application.
        app.use(handleUniversal(options));

    };

}