<?php
add_action( 'init', 'register_cpt_homepageslider' );
function register_cpt_homepageslider() {
    $labels = array(
        'name' => __('Slider', '<%= name %>'),
        'singular_name' => __('Slider', '<%= name %>'),
        'add_new' => __('Add New Slider', '<%= name %>'),
        'add_new_item' => __('Add New Slide', '<%= name %>'),
        'edit_item' => __('Edit Slide', '<%= name %>'),
        'new_item' => __('New Slide', '<%= name %>'),
        'view_item' => __('View Slide', '<%= name %>'),
        'search_items' => __('Search Slides', '<%= name %>'),
        'not_found' => __('No Slides Found', '<%= name %>'),
        'not_found_in_trash' => __('No Slides Found in Trash', '<%= name %>'),
        'menu_name' => __('Slider', '<%= name %>'),
    );
    $args = array(
        'labels' => $labels,
        'hierarchical' => false,
        'supports' => array( 'title', 'thumbnail', 'page-attributes' ),
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        'menu_icon' => 'dashicons-slides',
        'show_in_nav_menus' => false,
        'publicly_queryable' => true,
        'exclude_from_search' => false,
        'has_archive' => false,
        'query_var' => true,
        'can_export' => true,
        'rewrite' => true,
        'capability_type' => 'post'
    );
    register_post_type( 'slide', $args );
}
?>