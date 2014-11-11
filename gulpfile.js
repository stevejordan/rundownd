var gulp = require('gulp'),
    file = require('gulp-file'),
    http = require('http');


var fixtureSeeds = {
  target: ['UAT1', 'UAT2', 'UAT3', 'Stage', 'Live'],
  project: ['MyCms', 'MyGreatSite', 'MyGreatApi'],
  branch: ['develop', '14.42.3.1', 'QA', 'some_feature'],
  user: ['bill', 'lenny', 'dave', 'charlie']
};

/**
 * Get a random element from arrays
 */
Array.prototype.randomElement = function () {
  return this[Math.floor(Math.random() * this.length)]
}

/**
 *
 */
gulp.task('gen-data-fixture', function() {

  var fixture = {},
      ts = Math.round(Date.now() / 1000);

  fixtureSeeds.target.forEach(function(t) {
    fixtureSeeds.project.forEach(function(p) {

      var required = Math.ceil(Math.random() * 3),
          key = t + ':' + p;

      fixture[key] = [];

      for (var i = 0; i < required; i++) {

        var b = fixtureSeeds.branch.randomElement();
        var u = fixtureSeeds.user.randomElement();

        fixture[key].push({
          target: t,
          project: p,
          branch: b,
          user: u,
          timestamp: ts
        });

        //console.log(t, p, b, u);

      }

    });
  });

  return file('default.json', JSON.stringify(fixture))
    .pipe(gulp.dest('data'));

});

gulp.task('default', function() {
  console.log('No default task');
});