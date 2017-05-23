<?php
/**
 * The Header.
 *
 * This is the template that displays default header.
 *
 * @package <%= name %>
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <?php get_template_part( 'og-meta', 'tags'); ?>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <style>
        <?php get_template_part( 'critical/critical', 'global' ); ?>
        /**
        * Other criticals should be added here depending on page template used
        **/
    </style>
    <?php wp_head(); ?>
</head>

<body <?php body_class( 'loading' ); ?>>
<div class="page-preloader">
    <div class="preloader-holder">
        <div id="progress-width" class="preloader-progress"></div>
    </div>
</div>