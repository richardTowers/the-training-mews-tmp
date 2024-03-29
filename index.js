// Get our requirements, installed by npm
const Metalsmith  = require('metalsmith'),
    markdown    = require('@metalsmith/markdown'),
    layouts     = require('@metalsmith/layouts'),
    fingerprint = require('metalsmith-fingerprint');

// Run Metalsmith in the current directory.
// When the .build() method runs, this reads
// and strips the frontmatter from each of our
// source files and passes it on to the plugins.
Metalsmith(__dirname)
    // Global settings
    .metadata({
        description: 'The Training Mews is a boutique gym in Kensington, London that offers high-quality equipment and personal training to an exclusive group of clients.',
        keywords: 'The Training Mews, gym, personal training, Kensington, London',
        canonicalUrl: 'https://www.thetrainingmews.co.uk',
    })

    .use(files =>
        Object.values(files)
            .filter(f => f.id)
            .forEach(f => f.active = { [f.id]: true })
    )

    .use(fingerprint({ pattern: 'stylesheets/index.css' }))

    // Use @metalsmith/markdown to convert
    // our source files' content from markdown
    // to HTML fragments.
    .use(markdown())

    // Put the HTML fragments from the step above
    // into our template, using the Frontmatter
    // properties as template variables.
    .use(layouts())

    // And tell Metalsmith to fire it all off.
    .build(function(err, files) {
        if (err) { throw err; }
    });
