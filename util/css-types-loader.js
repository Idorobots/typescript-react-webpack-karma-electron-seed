var DtsCreator = require('typed-css-modules');

module.exports = function(source, map) {
    this.cacheable && this.cacheable();
    var callback = this.async();

    var creator = new DtsCreator({});

    creator.create(this.resourcePath, source).then(content => {
        content.writeFile().then(content => {
            // NOTE This hack makes it work on the first run.
            this.emitFile(content.outputFilePath, "");
            callback(null, source, map);
        });
    });
};
