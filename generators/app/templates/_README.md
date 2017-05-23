<%= name %> Wordpress Theme
===========================


Virtual hosts setup
------------
  * Go to you apache config dir on console. If you use MAMP it should be in `Applications/MAMP/conf/apache`
  * use nano | sublime | vim or any other editor to edit config file. in console type `sudo nano httpd-vhosts.conf`. Once you enter edit mode, scroll down to `#Include /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf` and remove #. Save the changes and exit file
  * Go to `Applications/MAMP/conf/apache/extra/` and type `sudo nano httpd-vhosts.conf`. This is to define your virtual hosts
  * Edit both examples on the bottom. Virtual hosts override the existing localhost, so the first one needs to re-establish localhost. Edit the second one for the virtual host you want to add. Only the DocumentRoot and ServerName directives are required. To add a virtual host for <%= website %>, the edited definitions should look like this:
      ```bash
      <VirtualHost *:80>
          DocumentRoot /Applications/MAMP/htdocs
          ServerName localhost
      </VirtualHost>

      <VirtualHost *:80>
          DocumentRoot "/Applications/MAMP/htdocs/github/<%= name %>"
          ServerName <%= localURL %>
      </VirtualHost>
      ```
  * Once you set virtual hosts you need to edit your hosts and set IP for eba. in console navigate to root and than '/etc/hosts' using `sudo nano etc/hosts` should open hosts. Scroll to bottom and add this line `127.0.0.1       <%= localURL %>`. Save and close and you are done
  * restart apache server making sure your ports are set to 80 for localhost and 3306 for MySQL

  basic setup
  ------------
  * make sure you have node and bower installed globally
  * run `npm install` and `bower install` in order to get all development files
  * if you are pulling the source from git repository, go to local phpMyAdmin and create a database named `<%= dbName %>`
  * rename `wp-config-sample.php` to `wp-config.php`
  * generate new keys for wp-config on [https://api.wordpress.org/secret-key/1.1/salt/] and enter them in wp-config
  * define **DB_NAME**, **DB_USER**, **DB_PASSWORD** and **DB_HOST** in wp-config
  * change table prefix in `wp-config.php` to `$table_prefix  = '<%= dbTablePrefix %>';`
  * login at admin part using standard user/pass , each time content has been added, don't forget to export new database and commit

  config
  ------------
  * in `bower.json` add path to foundation js files you need. By default only config is added. Keep in mind that path is set to `bower_components/foundation-sites` by default, thus you'll need to go up 2 levels in order to reach root theme's folder. Since foundation 6 scripts are ES6 standard, they are initially transformed to es5 via babel and saved in `.tmp/foundation-js folder`
  * gulp/conf.js keeps all configuration paths for development environment. Change if needed there.
  * You must create `remote.json` for deploying files. If you don't plan to deploy yourself use following templatestructure:
    ```json
    {
      "host": "domain.com",
      "user": "username",
      "password": "******",
      "port": "21",
      "parallel": 8,
      "remotePath": "/public-html/.../wp-content/themes/<%= name %>/"
    }
    ```
  * for linting scss use `gulp lint` command. NOTE make sure you have ruby and linting gem installed.
      ```bash
      ruby -v # test that Ruby is installed
      gem update --system && gem install scss-lint
      ```
  * set all scss settings for foundation sites in `wp-content/.themes/{theme_name}/scss/_settings.scss` file


  development
  ------------
  * run `gulp watch` to develop
  * run `gulp build` to build theme

  Once the theme has been build, go to wp-admin and switch to msnet-build in order to see build theme

  * run `gulp deply` to deploy theme to remote webserver

