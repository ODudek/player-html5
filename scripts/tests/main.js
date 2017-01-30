describe("Initialize player", function () {
    it("player should be implemented", function () {
        expect(initializePlayer).toBeDefined();
    });
});

describe("Got .mp4 file", function () {
    it(".mp4 file should be defined", function () {
        expect(videoSettings).toBeDefined();
    });
});

(function () {
    let env = jasmine.getEnv();
    env.addReporter(new jasmine.HtmlReporter());
    env.execute();
}());