'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var remote = require('yeoman-remote');
var git = require('simple-git')();
var wp = require('wp-util');
var request = require('request');
var globalFs = require('fs');
var googleFontDownload = require('got-google-fonts');
var ascii = "+............................+\n:                            :\n:                            :\n:           `                :\n:         omh                :\n:         dMh                :\n:         dMh   .os          :\n:         dMh  yMMs          :            We are the konstrukt dev team\n:         dMh `s/`           :            and we love to automate\n:         dMmhNMy-           :\n:         dMMNysNMh-         :\n:         dMM`  `dMM`        :\n:                            :\n:                            :\n+............................+";

var arrContains = function(needle) {
  // Per spec, the way to identify NaN is that it is not equal to itself
  var findNaN = needle !== needle;
  var indexOf;

  if(!findNaN && typeof Array.prototype.indexOf === 'function') {
    indexOf = Array.prototype.indexOf;
  } else {
    indexOf = function(needle) {
      var i = -1, index = -1;

      for(i = 0; i < this.length; i++) {
        var item = this[i];

        if((findNaN && item !== item) || item === needle) {
          index = i;
          break;
        }
      }

      return index;
    };
  }

  return indexOf.call(this, needle) > -1;
};

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the dazzling ' + chalk.blue('wordpress-theme-gulp') + ' generator'
    ));

    this.log('\n' + chalk.white('------------------------------------------'));
    // this.log('\n' + chalk.yellow('Created by: '));
    this.log('\n\n' + chalk.blue(ascii) + '\n\n');

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name? (This will be used as a folder name for your WP theme)',
      default: 'default-theme'
    }, {
      type: 'input',
      name: 'website',
      message: 'Project website address?',
      default: 'http://www.myproject.com',
      filter: function (value) {
        value = value.replace(/\/+$/g, '');
        if (!/^http[s]?:\/\//.test(value)) {
          value = 'http://' + value;
        }
        return value;
      }
    }, {
      type: 'input',
      name: 'localURL',
      message: 'Project local domain address?',
      default: 'myproject.dev',
      filter: function (value) {
        value = value.replace(/\/+$/g, '');
        if (!/^http[s]?:\/\//.test(value)) {
          value = 'http://' + value;
        }
        return value;
      }
    }, {
      type: 'input',
      name: 'dbName',
      message: 'Database Name ?',
      default: 'localSiteDB'
    }, {
      type: 'input',
      name: 'dbUser',
      message: 'Database User ?',
      default: 'root'
    }, {
      type: 'input',
      name: 'dbPass',
      message: 'Database Password ?',
      default: 'root'
    }, {
      type: 'input',
      name: 'dbServer',
      message: 'Database Server ?',
      default: 'localhost'
    }, {
      type: 'input',
      name: 'wpLang',
      message: 'Localize Wordpress. Enter Your language code. If none provided, English will be used',
      default: ''
    }, {
      type: 'confirm',
      name: 'wpDebug',
      message: 'Enable Wordpress debug mode?',
      default: false
    }, {
      type: 'input',
      name: 'dbTablePrefix',
      message: 'Database Table Prefix?',
      default: 'wp_'
    }, {
      type: 'input',
      name: 'authors',
      message: 'Project Authors?',
      default: 'konstrukt dev team'
    }, {
      type: 'input',
      name: 'AuthorURI',
      message: 'Project Authors\' URI?',
      default: 'http://www.konstrukt.rs'
    }, {
      type: 'confirm',
      name: 'foundationDefaultStyles',
      message: 'Use foundation default styles?',
      default: false
    }, {
      type: 'confirm',
      name: 'foundationOverrides',
      message: 'Choose specific Foundation\'s javascript components?\n If ' + chalk.green('YES') + ' is selected, you\'ll chose from the list one by one.\n If ' + chalk.red('NO') + ' is selected all components will be included by default',
      default: true
    }, {
      when: function (response) {
        return response.foundationOverrides;
      },
      type: 'confirm',
      name: 'utilJs',
      message: 'Use Foundation '+ chalk.blue('JavaScript Utilities')+' ?\nNote that some of the JS Components such as accordion, tabs etc. depend on js utils, thus it would be wise to include them.',
      default: true
    }, {
      when: function (response) {
        return response.foundationOverrides;
      },
      type: 'checkbox',
      name: 'componentsJs',
      message: 'What Foundation JS components do you wish to use?',
      choices: [
        {
          name: 'Abide',
          value: 'includeAbide',
          checked: false
        }, {
          name: 'Accordion',
          value: 'includeAccordion',
          checked: false
        }, {
          name: 'Accordion Menu',
          value: 'includeAccordionMenu',
          checked: false
        }, {
          name: 'Drilldown Menu',
          value: 'includeDrilldown',
          checked: false
        }, {
          name: 'Dropdown',
          value: 'includeDropdown',
          checked: false
        }, {
          name: 'Dropdown Menu',
          value: 'includeDropdownMenu',
          checked: false
        }, {
          name: 'Equalizer',
          value: 'includeEqualizer',
          checked: false
        }, {
          name: 'Interchange',
          value: 'includeInterchange',
          checked: false
        }, {
          name: 'Magellan',
          value: 'includeMagellan',
          checked: false
        }, {
          name: 'Offcanvas',
          value: 'includeOffcanvas',
          checked: false
        }, {
          name: 'Orbit Slider',
          value: 'includeOrbit',
          checked: false
        }, {
          name: 'Responsive Menu',
          value: 'includeResponsiveMenu',
          checked: false
        }, {
          name: 'Responsive Toggle',
          value: 'includeResponsiveToggle',
          checked: false
        }, {
          name: 'Reveal (Modal)',
          value: 'includeReveal',
          checked: false
        }, {
          name: 'Slider',
          value: 'includeSlider',
          checked: false
        }, {
          name: 'Sticky',
          value: 'includeSticky',
          checked: false
        }, {
          name: 'Tabs',
          value: 'includeTabs',
          checked: false
        }, {
          name: 'Toggler',
          value: 'includeToggler',
          checked: false
        }, {
          name: 'Tooltip',
          value: 'includeTooltip',
          checked: false
        }, {
          name: 'Responsive Accordion/Tabs',
          value: 'includeAccordionTabs',
          checked: false
        }
      ]
    }, {
      type: 'confirm',
      name: 'flexGrid',
      message: 'Use Foundation Flex Grid?',
      default: false
    }, {
      type: 'confirm',
      name: 'motionui',
      message: 'Use motion UI for Foundation 6?',
      default: true
    }, {
      type: 'confirm',
      name: 'gulpUseSvgSprites',
      message: '-----------------------\n  GULP SETTINGS\n\n  Use svg sprites?',
      default: true
    }, {
      type: 'confirm',
      name: 'useWpCli',
      message: 'Install node.js JavaScript client for working with WordPress?',
      default: true
    }, {
      type: 'confirm',
      name: 'phpCustomPosts',
      message: '-----------------------\n  PHP theme Settings\n\n  Use Custom Post Types?',
      default: true
    }, {
      type: 'confirm',
      name: 'phpMetaFields',
      message: 'Use Meta Fileds?',
      default: true
    }, {
      type: 'confirm',
      name: 'phpCustomizer',
      message: 'Use Theme Customizer?',
      default: true
    }, {
      when: function (response) {
        return response.phpCustomizer;
      },
      type: 'confirm',
      name: 'phpSMTP',
      message: 'Enable SMTP settings in customizer?',
      default: true
    }];


    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
      this.wpSite = new wp.Site({
        contentDirectory: 'wp-content',
        wpBaseDirectory: '.',
        databaseCredentials: {
          host: this.props.dbServer,
          user: this.props.dbUser,
          password: this.props.dbPass,
          name: this.props.dbName,
          prefix: this.props.dbTablePrefix
        }
      });
      if (!Array.isArray(props.componentsJs)) {
        this.props.componentsJs = [];
      }
    }.bind(this));
  },

  writing: function () {
    //copyng wordpress, must be above all content

    remote('wordpress', 'wordpress', function(err, cachePath) {
      if (err) {
        this.log('\n'+chalk.red(err)+'\n');
      } else {
        this.fs.copy(
          this.templatePath(cachePath),
          this.destinationPath()
        );
        this.log('WordPress installed');
      }
    }.bind(this));

    //install wordpress languages if language is set
    if (this.props.wpLang !== '' && this.props.wpLang !== null) {
      //get language file and install
      wp.locale.getLanguage(this.props.wpLang, 'wp-content', function (err) {
        if (err) this.log('\n'+chalk.red(err)+'\n');
      }.bind(this));
    }

    //set wp-keys
    wp.misc.getSaltKeys(function(err, saltKeys) {
      if (err) {
        this.log('\n'+chalk.red('Failed to get salt keys, remember to change them.')+'\n');
      }
      this.fs.copyTpl(
        this.templatePath('wp-config.php.tmpl'),
        this.destinationPath('wp-config.php'), {
          wpKeys: saltKeys,
          dbName: this.props.dbName,
          dbUser: this.props.dbUser,
          dbPass: this.props.dbPass,
          dbServer: this.props.dbServer,
          dbTablePrefix: this.props.dbTablePrefix,
          wpLang: this.props.wpLang,
          wpDebug: this.props.wpDebug
        }
      );
    }.bind(this));

    //setting database connection
    this.wpSite.database.createIfNotExists(function(err) {
      if (err) {
        this.log('\n'+chalk.yellow('Cannot access database')+'\n');
        this.log('\n'+chalk.yellow('Make sure you create the database and update the credentials in the wp-config.php')+'\n');
      }
    }.bind(this));

    //copyng other content
    this.fs.copy(
      this.templatePath('eslintrc'),
      this.destinationPath('.eslintrc')
    );
    this.fs.copy(
      this.templatePath('htaccess'),
      this.destinationPath('.htaccess')
    );
    this.fs.copy(
      this.templatePath('scss-lint'),
      this.destinationPath('scss-lint.yml')
    );
    this.fs.copy(
      this.templatePath('gulpfile'),
      this.destinationPath('gulpfile.js')
    );
    this.fs.copyTpl(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore'), {
        name: this.props.name,
        gulpUseSvgSprites: this.props.gulpUseSvgSprites
      }
    );
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'), {
        name: this.props.name,
        useWpCli: this.props.useWpCli
      }
    );
    this.fs.copyTpl(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json'), {
        name: this.props.name,
        website: this.props.website,
        authors: this.props.authors,
        foundationOverrides: this.props.foundationOverrides,
        utilJs: this.props.utilJs,
        motionui: this.props.motionui,
        useAbide: arrContains.call(this.props.componentsJs, 'includeAbide'),
        useAccordion: arrContains.call(this.props.componentsJs, 'includeAccordion'),
        useAccordionMenu: arrContains.call(this.props.componentsJs, 'includeAccordionMenu'),
        useDrilldown: arrContains.call(this.props.componentsJs, 'includeDrilldown'),
        useDropdown: arrContains.call(this.props.componentsJs, 'includeDropdown'),
        useDropdownMenu: arrContains.call(this.props.componentsJs, 'includeDropdownMenu'),
        useEqualizer: arrContains.call(this.props.componentsJs, 'includeEqualizer'),
        useInterchange: arrContains.call(this.props.componentsJs, 'includeInterchange'),
        useMagellan: arrContains.call(this.props.componentsJs, 'includeMagellan'),
        useOffcanvas: arrContains.call(this.props.componentsJs, 'includeOffcanvas'),
        useOrbit: arrContains.call(this.props.componentsJs, 'includeOrbit'),
        useResponsiveMenu: arrContains.call(this.props.componentsJs, 'includeResponsiveMenu'),
        useResponsiveToggle: arrContains.call(this.props.componentsJs, 'includeResponsiveToggle'),
        useReveal: arrContains.call(this.props.componentsJs, 'includeReveal'),
        useSlider: arrContains.call(this.props.componentsJs, 'includeSlider'),
        useSticky: arrContains.call(this.props.componentsJs, 'includeSticky'),
        useTabs: arrContains.call(this.props.componentsJs, 'includeTabs'),
        useToggler: arrContains.call(this.props.componentsJs, 'includeToggler'),
        useTooltip: arrContains.call(this.props.componentsJs, 'includeTooltip'),
        useResponsiveAccordionTabs: arrContains.call(this.props.componentsJs, 'includeAccordionTabs')
      }
    );
    this.fs.copyTpl(
      this.templatePath('bowerrc'),
      this.destinationPath('.bowerrc'), {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('remote'),
      this.destinationPath('remote.json'), {
        name: this.props.name,
        website: this.props.website
      }
    );
    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'), {
        name: this.props.name,
        website: this.props.website,
        localURL: this.props.localURL,
        dbName: this.props.dbName,
        dbTablePrefix: this.props.dbTablePrefix
      }
    );
    if (this.props.phpCustomizer && this.props.phpSMTP) {
      this.fs.copy(
        this.templatePath('_composer.json'),
        this.destinationPath('composer.json')
      );
    }

    //gulp files copy
    this.fs.copy(
      this.templatePath('gulp/_eslintrc'),
      this.destinationPath('gulp/.eslintrc')
    );
    this.fs.copyTpl(
      this.templatePath('gulp/_build.js'),
      this.destinationPath('gulp/build.js'), {
        gulpUseSvgSprites: this.props.gulpUseSvgSprites
      }
    );
    this.fs.copyTpl(
      this.templatePath('gulp/_conf.js'),
      this.destinationPath('gulp/conf.js'), {
        name: this.props.name,
        localURL: this.props.localURL,
        foundationOverrides: this.props.foundationOverrides
      }
    );
    this.fs.copy(
      this.templatePath('gulp/_critical.js'),
      this.destinationPath('gulp/critical.js')
    );
    this.fs.copy(
      this.templatePath('gulp/_deploy.js'),
      this.destinationPath('gulp/deploy.js')
    );
    this.fs.copy(
      this.templatePath('gulp/_fonts.js'),
      this.destinationPath('gulp/fonts.js')
    );
    if (this.props.foundationOverrides) {
      this.fs.copy(
        this.templatePath('gulp/_foundation.js'),
        this.destinationPath('gulp/foundation.js')
      );
    }
    this.fs.copy(
      this.templatePath('gulp/_images.js'),
      this.destinationPath('gulp/images.js')
    );
    this.fs.copyTpl(
      this.templatePath('gulp/_inject.js'),
      this.destinationPath('gulp/inject.js'), {
        foundationOverrides: this.props.foundationOverrides
      }
    );
    this.fs.copy(
      this.templatePath('gulp/_scripts.js'),
      this.destinationPath('gulp/scripts.js')
    );
    this.fs.copyTpl(
      this.templatePath('gulp/_scsslint.js'),
      this.destinationPath('gulp/scsslint.js'), {
        gulpUseSvgSprites: this.props.gulpUseSvgSprites
      }
    );
    this.fs.copy(
      this.templatePath('gulp/_server.js'),
      this.destinationPath('gulp/server.js')
    );
    this.fs.copyTpl(
      this.templatePath('gulp/_styles.js'),
      this.destinationPath('gulp/styles.js'), {
        gulpUseSvgSprites: this.props.gulpUseSvgSprites,
        motionui: this.props.motionui
      }
    );
    this.fs.copyTpl(
      this.templatePath('gulp/_svg.js'),
      this.destinationPath('gulp/svg.js'), {
        gulpUseSvgSprites: this.props.gulpUseSvgSprites
      }
    );
    this.fs.copyTpl(
      this.templatePath('gulp/_watch.js'),
      this.destinationPath('gulp/watch.js'), {
        gulpUseSvgSprites: this.props.gulpUseSvgSprites
      }
    );

    //php theme files copy
    var themePath = 'wp-content/themes/'+this.props.name+'/'; //path to wordpress theme setup

    this.fs.copyTpl(
      this.templatePath('wpTheme/_index.php'),
      this.destinationPath(themePath+'index.php'), {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('wpTheme/_functions.php'),
      this.destinationPath(themePath+'functions.php'), {
        name: this.props.name,
        phpCustomPosts: this.props.phpCustomPosts,
        phpMetaFields: this.props.phpMetaFields,
        phpCustomizer: this.props.phpCustomizer
      }
    );
    this.fs.copyTpl(
      this.templatePath('wpTheme/_header.php'),
      this.destinationPath(themePath+'header.php'), {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('wpTheme/_page-home.php'),
      this.destinationPath(themePath+'/page-home.php'), {
        name: this.props.name,
        phpCustomPosts: this.props.phpCustomPosts
      }
    );
    if (this.props.phpCustomPosts) {
      this.fs.copyTpl(
        this.templatePath('wpTheme/includes/_cpt.php'),
        this.destinationPath(themePath+'includes/cpt.php'), {
          name: this.props.name
        }
      );
    }
    if (this.props.phpMetaFields) {
      this.fs.copyTpl(
        this.templatePath('wpTheme/includes/_metaboxes.php'),
        this.destinationPath(themePath+'includes/metaboxes.php'), {
          name: this.props.name,
          phpCustomPosts: this.props.phpCustomPosts
        }
      );
    }
    if (this.props.phpCustomizer) {
      this.fs.copyTpl(
        this.templatePath('wpTheme/includes/_customizer.php'),
        this.destinationPath(themePath+'includes/customizer.php'), {
          name: this.props.name,
          phpSMTP: this.props.phpSMTP
        }
      );
      if (this.props.phpSMTP) {
        this.fs.copyTpl(
          this.templatePath('wpTheme/_send-contact.php'),
          this.destinationPath(themePath+'send-contact.php'), {
            name: this.props.name,
            website: this.props.website
          }
        );
      }
    }
    this.fs.copyTpl(
      this.templatePath('wpTheme/_footer.php'),
      this.destinationPath(themePath+'/footers/footer.php'), {
        name: this.props.name
      }
    );
    this.fs.copyTpl(
      this.templatePath('wpTheme/templateParts/_content-none.php'),
      this.destinationPath(themePath+'/template-parts/content-none.php'), {
        name: this.props.name
      }
    );
    if (this.props.phpMetaFields) {
      this.fs.copyTpl(
        this.templatePath('wpTheme/templateParts/_homepage-slider.php'),
        this.destinationPath(themePath+'/template-parts/homepage-slider.php'), {
          name: this.props.name
        }
      );
    }
    this.fs.copyTpl(
      this.templatePath('wpTheme/languages/_en_US.po'),
      this.destinationPath(themePath+'languages/en_US.po'), {
        name: this.props.name,
        authors: this.props.authors,
        authorURI: this.props.authorURI
      }
    );
    this.fs.copyTpl(
      this.templatePath('wpTheme/languages/_en_US.mo'),
      this.destinationPath(themePath+'languages/en_US.mo'), {
        name: this.props.name,
        authors: this.props.authors,
        authorURI: this.props.authorURI
      }
    );
    this.fs.copyTpl(
      this.templatePath('wpTheme/languages/_sr_RS.po'),
      this.destinationPath(themePath+'languages/sr_RS.po'), {
        name: this.props.name,
        authors: this.props.authors,
        authorURI: this.props.authorURI
      }
    );
    this.fs.copyTpl(
      this.templatePath('wpTheme/languages/_sr_RS.mo'),
      this.destinationPath(themePath+'languages/sr_RS.mo'), {
        name: this.props.name,
        authors: this.props.authors,
        authorURI: this.props.authorURI
      }
    );

    this.fs.copy(
      this.templatePath('wpTheme/scripts/_index.js'),
      this.destinationPath(themePath+'/scripts/index.js')
    );
    this.fs.copy(
      this.templatePath('wpTheme/scripts/_initialization.js'),
      this.destinationPath(themePath+'/scripts/Initialization.js')
    );

    this.fs.copy(
      this.templatePath('wpTheme/scss/__settings.scss'),
      this.destinationPath(themePath+'/scss/_settings.scss')
    );
    this.fs.copy(
      this.templatePath('wpTheme/scss/__custom-globals.scss'),
      this.destinationPath(themePath+'/scss/_custom-globals.scss')
    );
    this.fs.copyTpl(
      this.templatePath('wpTheme/scss/_admin-style.scss'),
      this.destinationPath(themePath+'/scss/admin-style.scss'), {
        name: this.props.name,
        website: this.props.website,
        authors: this.props.authors,
        AuthorURI: this.props.AuthorURI
      }
    );
    this.fs.copyTpl(
      this.templatePath('wpTheme/scss/_critical-global.scss'),
      this.destinationPath(themePath+'/scss/critical-global.scss'), {
        name: this.props.name,
        website: this.props.website
      }
    );
    this.fs.copyTpl(
      this.templatePath('wpTheme/scss/_login.scss'),
      this.destinationPath(themePath+'/scss/login.scss'), {
        name: this.props.name,
        website: this.props.website,
        authors: this.props.authors,
        AuthorURI: this.props.AuthorURI
      }
    );
    this.fs.copyTpl(
      this.templatePath('wpTheme/scss/_style.scss'),
      this.destinationPath(themePath+'/scss/style.scss'), {
        motionui: this.props.motionui,
        gulpUseSvgSprites: this.props.gulpUseSvgSprites,
        flexGrid: this.props.flexGrid,
        foundationDefaultStyles: this.props.foundationDefaultStyles
      }
    );
    this.fs.copyTpl(
      this.templatePath('wpTheme/_style.css'),
      this.destinationPath(themePath+'/style.css'), {
        name: this.props.name,
        website: this.props.website,
        authors: this.props.authors,
        AuthorURI: this.props.AuthorURI
      }
    );
    this.fs.copy(
      this.templatePath('wpTheme/assets/svg/_bg-twitter.svg'),
      this.destinationPath(themePath+'/assets/svg/bg-twitter.svg')
    );
  },

  install: function () {
    if (this.props.phpCustomizer && this.props.phpSMTP) {
      this.spawnCommand('composer', ['install']);
    }
    this.installDependencies({
      npm: true,
      bower: true
    });
  }
});
