<?php
/**
 * Theme functions
 *
 * Sets up the theme and provides some helper functions.
 *
 * @package <%= name %>
 */
define('BASEURL', get_template_directory_uri() );
define('HOMEURL', home_url());

/* THEME SETUP
 ========================== */
if ( ! function_exists( '<%= name %>_setup' ) ):
    function <%= name %>_setup() {
        // Available for translation
        load_theme_textdomain( '<%= name %>', get_template_directory() . '/languages' );

        // Add default posts and comments RSS feed links to <head>.
        add_theme_support( 'automatic-feed-links' );

        // Add custom nav menu support
        register_nav_menu( 'primary', __( 'Primary menu', '<%= name %>' ) );
        register_nav_menu( 'footer', __( 'Footer meni', '<%= name %>' ) );

       // Add featured image support
        add_theme_support( 'post-thumbnails' );

        // Enable support for HTML5 markup.
        add_theme_support( 'html5', array(
            'comment-list',
            'search-form',
            'comment-form'
        ) );

        $content_width = 1024;

        // Add custom image sizes
        add_image_size( 'facebook', 1200, 630, true );
    }
endif;
add_action( 'after_setup_theme', '<%= name %>_setup' );

/* ENQUEUE SCRIPTS & STYLES */
function load_custom_wp_admin_style() {
    wp_register_style( 'custom_wp_admin_css', get_template_directory_uri() . '/admin-style.css', array(), null, false );
    wp_enqueue_style( 'custom_wp_admin_css' );
}
add_action( 'admin_enqueue_scripts', 'load_custom_wp_admin_style' );

// custom login for theme
function <%= name %>_custom_login() {	echo '<link rel="stylesheet" type="text/css" href="' . get_bloginfo('stylesheet_directory') . '/login.css" />'; }
add_action('login_head', '<%= name %>_custom_login');

remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );

function <%= name %>_scripts() {
    wp_deregister_script( 'jquery' );
    wp_deregister_script('sitepress');
    wp_deregister_script('wp-embed'); //remove wp-embed script
}
add_action('wp_enqueue_scripts', '<%= name %>_scripts');

function <%= name %>_get_pages($type = "page") {
    $pages = get_posts(array(
        'post_type' => $type,
        'posts_per_page' => '50',
        'orderby' => 'post_date',
        'order' => 'DESC'
    ));
    return $pages;
}
function <%= name %>_get_pages_array($type = "page") {
    $return = array();
    $tempReturn = <%= name %>_get_pages($type);
    $return[0] = __('Choose please...', '<%= name %>');
    foreach ($tempReturn as $temp) {
        $return[$temp->ID] = $temp->post_title;
    }
    return $return;
}

<% if(phpCustomPosts) { %>include('includes/cpt.php'); //defining custom post types<% } %>
<% if(phpMetaFields) { %>include('includes/metaboxes.php'); //defining custom meta fields<% } %>
<% if(phpCustomizer) { %>include('includes/customizer.php'); //theme customizer setup<% } %>